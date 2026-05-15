<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class EquipmentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return in_array($this->user()?->role, ['admin', 'responsable'], true);
    }

    public function rules(): array
    {
        $equipmentId = $this->route('equipment')?->id;

        return [
            'name' => ['required', 'string', 'max:255'],
            'type' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'inventory_code' => ['required', 'string', 'max:100', Rule::unique('equipments', 'inventory_code')->ignore($equipmentId)],
            'status' => ['required', Rule::in(['disponible', 'utilise', 'maintenance', 'indisponible'])],
            'location' => ['nullable', 'string', 'max:255'],
            'responsible_member_id' => ['nullable', 'exists:members,id'],
        ];
    }
}
