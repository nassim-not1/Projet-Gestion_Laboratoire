<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class MemberRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->role !== 'chercheur';
    }

    public function rules(): array
    {
        $memberId = $this->route('member')?->id;

        return [
            'first_name' => ['required', 'string', 'max:100'],
            'last_name' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email', 'max:255', Rule::unique('members', 'email')->ignore($memberId)],
            'phone' => ['nullable', 'string', 'max:30'],
            'grade' => ['required', Rule::in(['professeur', 'doctorant', 'chercheur', 'administratif'])],
            'research_domain' => ['required', 'string', 'max:255'],
            'bio' => ['nullable', 'string'],
            'user_id' => ['nullable', 'exists:users,id'],
        ];
    }
}
