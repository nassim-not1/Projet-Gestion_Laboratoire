<?php

namespace App\Http\Controllers;

use App\Http\Requests\ResearchProjectRequest;
use App\Models\Member;
use App\Models\ResearchProject;
use Illuminate\Database\QueryException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ResearchProjectController extends Controller
{
    private const STATUSES = ['en_cours', 'termine', 'suspendu'];

    public function index(Request $request): Response
    {
        $filters = $request->only(['search', 'status']);

        $projects = ResearchProject::query()
            ->with('responsable')
            ->withCount(['members', 'publications'])
            ->when($filters['search'] ?? null, fn ($query, string $search) => $query->where('title', 'like', "%{$search}%"))
            ->when($filters['status'] ?? null, fn ($query, string $status) => $query->where('status', $status))
            ->latest('start_date')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('ResearchProjects/Index', [
            'projects' => $projects,
            'filters' => $filters,
            'statuses' => self::STATUSES,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('ResearchProjects/Create', [
            'members' => $this->memberOptions(),
            'statuses' => self::STATUSES,
        ]);
    }

    public function store(ResearchProjectRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $memberIds = $this->memberIdsForProject($data);
        unset($data['members']);

        $project = ResearchProject::create($data);
        $project->members()->sync($memberIds);

        return redirect()->route('research-projects.show', $project)->with('success', 'Projet ajoute avec succes.');
    }

    public function show(ResearchProject $researchProject): Response
    {
        $researchProject->load(['responsable', 'members', 'publications', 'valorisations']);

        return Inertia::render('ResearchProjects/Show', [
            'project' => $researchProject,
        ]);
    }

    public function edit(ResearchProject $researchProject): Response
    {
        $researchProject->load('members');

        return Inertia::render('ResearchProjects/Edit', [
            'project' => $researchProject,
            'members' => $this->memberOptions(),
            'statuses' => self::STATUSES,
            'selectedMembers' => $researchProject->members->pluck('id')->values(),
        ]);
    }

    public function update(ResearchProjectRequest $request, ResearchProject $researchProject): RedirectResponse
    {
        $data = $request->validated();
        $memberIds = $this->memberIdsForProject($data);
        unset($data['members']);

        $researchProject->update($data);
        $researchProject->members()->sync($memberIds);

        return redirect()->route('research-projects.show', $researchProject)->with('success', 'Projet modifie avec succes.');
    }

    public function destroy(ResearchProject $researchProject): RedirectResponse
    {
        try {
            $researchProject->delete();
        } catch (QueryException) {
            return back()->with('error', 'Impossible de supprimer ce projet car il est lie a des donnees existantes.');
        }

        return redirect()->route('research-projects.index')->with('success', 'Projet supprime avec succes.');
    }

    private function memberOptions()
    {
        return Member::query()
            ->orderBy('last_name')
            ->get(['id', 'first_name', 'last_name', 'grade', 'research_domain'])
            ->map(fn (Member $member) => [
                'id' => $member->id,
                'name' => "{$member->first_name} {$member->last_name}",
                'grade' => $member->grade,
                'research_domain' => $member->research_domain,
            ]);
    }

    private function memberIdsForProject(array $data): array
    {
        return collect($data['members'] ?? [])
            ->push($data['responsable_id'])
            ->filter()
            ->unique()
            ->values()
            ->all();
    }
}
