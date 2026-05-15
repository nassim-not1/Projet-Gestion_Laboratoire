<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PublicationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        $publicationId = $this->route('publication')?->id;

        return [
            'title' => ['required', 'string', 'max:255'],
            'abstract' => ['nullable', 'string'],
            'publication_type' => ['required', Rule::in(['article', 'conference', 'livre', 'chapitre', 'these', 'autre'])],
            'journal_or_conference' => ['nullable', 'string', 'max:255'],
            'publication_year' => ['required', 'integer', 'between:1900,'.(((int) date('Y')) + 1)],
            'doi' => ['nullable', 'string', 'max:255', Rule::unique('publications', 'doi')->ignore($publicationId)],
            'link' => ['nullable', 'url', 'max:255'],
            'keywords' => ['nullable', 'string'],
            'research_project_id' => ['nullable', 'exists:research_projects,id'],
            'authors' => ['required', 'array', 'min:1'],
            'authors.*' => ['exists:members,id'],
        ];
    }
}
