<?php

namespace App\Http\Controllers;

use App\Http\Requests\EquipmentRequest;
use App\Http\Requests\EquipmentReservationRequest;
use App\Models\Equipment;
use App\Models\EquipmentReservation;
use App\Models\Member;
use Illuminate\Database\QueryException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class EquipmentController extends Controller
{
    private const STATUSES = ['disponible', 'utilise', 'maintenance', 'indisponible'];

    public function index(Request $request): Response
    {
        $filters = $request->only(['search', 'status']);

        $equipments = Equipment::query()
            ->with('responsibleMember')
            ->withCount('reservations')
            ->when($filters['search'] ?? null, function ($query, string $search): void {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('inventory_code', 'like', "%{$search}%")
                    ->orWhere('type', 'like', "%{$search}%");
            })
            ->when($filters['status'] ?? null, fn ($query, string $status) => $query->where('status', $status))
            ->orderBy('name')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Equipments/Index', [
            'equipments' => $equipments,
            'filters' => $filters,
            'statuses' => self::STATUSES,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Equipments/Create', [
            'members' => $this->memberOptions(),
            'statuses' => self::STATUSES,
        ]);
    }

    public function store(EquipmentRequest $request): RedirectResponse
    {
        $equipment = Equipment::create($request->validated());

        return redirect()->route('equipments.show', $equipment)->with('success', 'Equipement ajoute avec succes.');
    }

    public function show(Equipment $equipment): Response
    {
        $equipment->load(['responsibleMember', 'reservations.member']);

        return Inertia::render('Equipments/Show', [
            'equipment' => $equipment,
            'members' => $this->memberOptions(),
            'statuses' => self::STATUSES,
        ]);
    }

    public function edit(Equipment $equipment): Response
    {
        return Inertia::render('Equipments/Edit', [
            'equipment' => $equipment,
            'members' => $this->memberOptions(),
            'statuses' => self::STATUSES,
        ]);
    }

    public function update(EquipmentRequest $request, Equipment $equipment): RedirectResponse
    {
        $equipment->update($request->validated());

        return redirect()->route('equipments.show', $equipment)->with('success', 'Equipement modifie avec succes.');
    }

    public function updateStatus(Request $request, Equipment $equipment): RedirectResponse
    {
        $data = $request->validate([
            'status' => ['required', Rule::in(self::STATUSES)],
        ]);

        $equipment->update($data);

        return back()->with('success', 'Statut de l equipement mis a jour.');
    }

    public function storeReservation(EquipmentReservationRequest $request, Equipment $equipment): RedirectResponse
    {
        if (in_array($equipment->status, ['maintenance', 'indisponible'], true)) {
            return back()->with('error', 'Cet equipement ne peut pas etre reserve dans son etat actuel.');
        }

        $data = $request->validated();
        $hasConflict = EquipmentReservation::query()
            ->where('equipment_id', $equipment->id)
            ->where('reservation_date', $data['reservation_date'])
            ->where('status', 'acceptee')
            ->where('start_time', '<', $data['end_time'])
            ->where('end_time', '>', $data['start_time'])
            ->exists();

        if ($hasConflict) {
            return back()->with('error', 'Une reservation acceptee existe deja sur ce creneau.');
        }

        $equipment->reservations()->create([
            ...$data,
            'status' => 'en_attente',
        ]);

        return back()->with('success', 'Demande de reservation enregistree.');
    }

    public function destroy(Equipment $equipment): RedirectResponse
    {
        try {
            $equipment->delete();
        } catch (QueryException) {
            return back()->with('error', 'Impossible de supprimer cet equipement car il est lie a des reservations.');
        }

        return redirect()->route('equipments.index')->with('success', 'Equipement supprime avec succes.');
    }

    private function memberOptions()
    {
        return Member::query()
            ->orderBy('last_name')
            ->get(['id', 'first_name', 'last_name'])
            ->map(fn (Member $member) => [
                'id' => $member->id,
                'name' => "{$member->first_name} {$member->last_name}",
            ]);
    }
}
