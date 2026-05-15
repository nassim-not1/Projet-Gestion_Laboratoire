<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ValorisationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return in_array($this->user()?->role, ['admin', 'responsable'], true);
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'type' => ['required', Rule::in(['brevet', 'partenariat', 'evenement', 'prix', 'transfert_technologique', 'autre'])],
            'date' => ['required', 'date'],
            'partner_name' => ['nullable', 'string', 'max:255'],
            'research_project_id' => ['nullable', 'exists:research_projects,id'],
            'member_id' => ['nullable', 'exists:members,id'],
        ];
    }
}
