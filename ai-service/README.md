# Service IA FastAPI

Microservice local pour la plateforme de digitalisation des activites de laboratoire.

## Fonctionnalites

- `POST /extract-keywords` : extrait des mots-cles a partir d un titre et resume.
- `POST /recommend-collaborations` : recommande des collaborations par similarite TF-IDF.
- `GET /health` : verifie que le service est lance.

## Installation

```powershell
cd ai-service
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8001
```

## Exemple extraction

```json
{
  "text": "machine learning pour la classification de publications scientifiques"
}
```

## Exemple recommandation

```json
{
  "target_member": {
    "id": 1,
    "name": "Salma Benali",
    "research_domain": "NLP, machine learning",
    "keywords": ["nlp", "deep learning"]
  },
  "members": [
    {
      "id": 2,
      "name": "Yassine Idrissi",
      "research_domain": "data mining, machine learning",
      "keywords": ["classification", "machine learning"]
    }
  ]
}
```
