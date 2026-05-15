<?php

namespace App\Http\Controllers;

use App\Http\Requests\ValorisationRequest;
use App\Models\Member;
use App\Models\ResearchProject;
use App\Models\Valorisation;
use Illuminate\Database\QueryException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ValorisationController extends Controller
{
    private const TYPES = ['brevet', 'partenariat', 'evenement', 'prix', 'transfert_technologique', 'autre'];

    public function index(Request $request): Response
    {
        $filters = $request->only(['search', 'type']);

        $valorisations = Valorisation::query()
            ->with(['member', 'researchProject'])
            ->when($filters['search'] ?? null, function ($query, string $search): void {
                $query->where('title', 'like', "%{$search}%")
                    ->orWhere('partner_name', 'like', "%{$search}%");
            })
            ->when($filters['type'] ?? null, fn ($query, string $type) => $query->where('type', $type))
            ->latest('date')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Valorisations/Index', [
            'valorisations' => $valorisations,
            'filters' => $filters,
            'types' => self::TYPES,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Valorisations/Create', [
            'members' => $this->memberOptions(),
            'projects' => $this->projectOptions(),
            'types' => self::TYPES,
        ]);
    }

    public function store(ValorisationRequest $request): RedirectResponse
    {
        $valorisation = Valorisation::create($request->validated());

        return redirect()->route('valorisations.show', $valorisation)->with('success', 'Activite de valorisation ajoutee.');
    }

    public function show(Valorisation $valorisation): Response
    {
        $valorisation->load(['member', 'researchProject']);

        return Inertia::render('Valorisations/Show', [
            'valorisation' => $valorisation,
        ]);
    }

    public function edit(Valorisation $valorisation): Response
    {
        return Inertia::render('Valorisations/Edit', [
            'valorisation' => $valorisation,
            'members' => $this->memberOptions(),
            'projects' => $this->projectOptions(),
            'types' => self::TYPES,
        ]);
    }

    public function update(ValorisationRequest $request, Valorisation $valorisation): RedirectResponse
    {
        $valorisation->update($request->validated());

        return redirect()->route('valorisations.show', $valorisation)->with('success', 'Activite de valorisation modifiee.');
    }

    public function destroy(Valorisation $valorisation): RedirectResponse
    {
        try {
            $valorisation->delete();
        } catch (QueryException) {
            return back()->with('error', 'Impossible de supprimer cette activite.');
        }

        return redirect()->route('valorisations.index')->with('success', 'Activite de valorisation supprimee.');
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

    private function projectOptions()
    {
        return ResearchProject::query()
            ->orderBy('title')
            ->get(['id', 'title']);
    }
}
