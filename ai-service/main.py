from __future__ import annotations

import re
from typing import List

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


app = FastAPI(
    title="Laboratory AI Service",
    description="Simple NLP service for keyword extraction and collaboration recommendations.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:8000", "http://localhost:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


STOP_WORDS = {
    "a",
    "au",
    "aux",
    "avec",
    "ce",
    "ces",
    "dans",
    "de",
    "des",
    "du",
    "elle",
    "en",
    "et",
    "il",
    "la",
    "le",
    "les",
    "leur",
    "leurs",
    "nous",
    "pour",
    "par",
    "plus",
    "que",
    "qui",
    "sur",
    "un",
    "une",
    "the",
    "and",
    "or",
    "of",
    "in",
    "for",
    "to",
    "with",
    "on",
    "this",
    "that",
    "from",
    "using",
}


class KeywordRequest(BaseModel):
    text: str = Field(default="")


class KeywordResponse(BaseModel):
    keywords: List[str]


class MemberPayload(BaseModel):
    id: int
    name: str = ""
    research_domain: str = ""
    keywords: List[str] = Field(default_factory=list)


class CollaborationRequest(BaseModel):
    target_member: MemberPayload
    members: List[MemberPayload] = Field(default_factory=list)


class Recommendation(BaseModel):
    member_id: int
    name: str
    score: float
    reason: str


class CollaborationResponse(BaseModel):
    recommendations: List[Recommendation]


@app.get("/health")
def health() -> dict:
    return {"status": "ok"}


@app.post("/extract-keywords", response_model=KeywordResponse)
def extract_keywords(payload: KeywordRequest) -> KeywordResponse:
    text = normalize(payload.text)
    if not text:
        return KeywordResponse(keywords=[])

    try:
        vectorizer = TfidfVectorizer(
            stop_words=list(STOP_WORDS),
            ngram_range=(1, 2),
            max_features=20,
            token_pattern=r"(?u)\b[a-zA-Z][a-zA-Z0-9_+-]{2,}\b",
        )
        matrix = vectorizer.fit_transform([text])
        scores = matrix.toarray()[0]
        terms = vectorizer.get_feature_names_out()
        ranked = sorted(zip(terms, scores), key=lambda item: item[1], reverse=True)
        keywords = [term for term, score in ranked if score > 0][:8]
    except ValueError:
        keywords = fallback_keywords(text)

    return KeywordResponse(keywords=keywords)


@app.post("/recommend-collaborations", response_model=CollaborationResponse)
def recommend_collaborations(payload: CollaborationRequest) -> CollaborationResponse:
    if not payload.members:
        return CollaborationResponse(recommendations=[])

    target_doc = member_document(payload.target_member)
    member_docs = [member_document(member) for member in payload.members]
    documents = [target_doc, *member_docs]

    if not target_doc.strip():
        return CollaborationResponse(recommendations=[])

    try:
        vectorizer = TfidfVectorizer(stop_words=list(STOP_WORDS), ngram_range=(1, 2))
        matrix = vectorizer.fit_transform(documents)
        similarities = cosine_similarity(matrix[0:1], matrix[1:]).flatten()
    except ValueError:
        similarities = [0.0 for _ in payload.members]

    recommendations: list[Recommendation] = []
    target_terms = term_set(target_doc)

    for member, score in zip(payload.members, similarities):
        if score <= 0:
            continue

        common_terms = sorted(target_terms.intersection(term_set(member_document(member))))[:4]
        reason = (
            "Domaines proches : " + ", ".join(common_terms)
            if common_terms
            else "Similarite detectee entre domaines et mots-cles."
        )
        recommendations.append(
            Recommendation(
                member_id=member.id,
                name=member.name,
                score=round(float(score), 2),
                reason=reason,
            )
        )

    recommendations.sort(key=lambda item: item.score, reverse=True)
    return CollaborationResponse(recommendations=recommendations[:5])


def member_document(member: MemberPayload) -> str:
    return normalize(" ".join([member.research_domain, " ".join(member.keywords)]))


def normalize(text: str) -> str:
    text = text.lower()
    text = re.sub(r"[^a-z0-9A-Z_+\-\s]", " ", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def term_set(text: str) -> set[str]:
    return {term for term in normalize(text).split() if len(term) > 2 and term not in STOP_WORDS}


def fallback_keywords(text: str) -> list[str]:
    terms = list(term_set(text))
    terms.sort(key=lambda term: (-text.count(term), term))
    return terms[:8]
