<?php

namespace App\Http\Controllers;

use App\Http\Requests\PublicationRequest;
use App\Models\Member;
use App\Models\Publication;
use App\Models\ResearchProject;
use Illuminate\Database\QueryException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PublicationController extends Controller
{
    private const TYPES = ['article', 'conference', 'livre', 'chapitre', 'these', 'autre'];

    public function index(Request $request): Response
    {
        $filters = $request->only(['search', 'publication_type']);

        $publications = Publication::query()
            ->with(['authors', 'researchProject'])
            ->when($filters['search'] ?? null, function ($query, string $search): void {
                $query->where('title', 'like', "%{$search}%")
                    ->orWhere('keywords', 'like', "%{$search}%")
                    ->orWhere('publication_year', 'like', "%{$search}%");
            })
            ->when($filters['publication_type'] ?? null, fn ($query, string $type) => $query->where('publication_type', $type))
            ->latest('publication_year')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Publications/Index', [
            'publications' => $publications,
            'filters' => $filters,
            'types' => self::TYPES,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Publications/Create', [
            'members' => $this->memberOptions(),
            'projects' => $this->projectOptions(),
            'types' => self::TYPES,
        ]);
    }

    public function store(PublicationRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $authors = $data['authors'];
        unset($data['authors']);

        $publication = Publication::create($data);
        $publication->authors()->sync($this->authorSyncData($authors));

        return redirect()->route('publications.show', $publication)->with('success', 'Publication ajoutee avec succes.');
    }

    public function show(Publication $publication): Response
    {
        $publication->load(['authors', 'researchProject']);

        return Inertia::render('Publications/Show', [
            'publication' => $publication,
        ]);
    }

    public function edit(Publication $publication): Response
    {
        $publication->load('authors');

        return Inertia::render('Publications/Edit', [
            'publication' => $publication,
            'members' => $this->memberOptions(),
            'projects' => $this->projectOptions(),
            'types' => self::TYPES,
            'selectedAuthors' => $publication->authors->pluck('id')->values(),
        ]);
    }

    public function update(PublicationRequest $request, Publication $publication): RedirectResponse
    {
        $data = $request->validated();
        $authors = $data['authors'];
        unset($data['authors']);

        $publication->update($data);
        $publication->authors()->sync($this->authorSyncData($authors));

        return redirect()->route('publications.show', $publication)->with('success', 'Publication modifiee avec succes.');
    }

    public function destroy(Publication $publication): RedirectResponse
    {
        try {
            $publication->delete();
        } catch (QueryException) {
            return back()->with('error', 'Impossible de supprimer cette publication.');
        }

        return redirect()->route('publications.index')->with('success', 'Publication supprimee avec succes.');
    }

    private function memberOptions()
    {
        return Member::query()
            ->orderBy('last_name')
            ->get(['id', 'first_name', 'last_name', 'research_domain'])
            ->map(fn (Member $member) => [
                'id' => $member->id,
                'name' => "{$member->first_name} {$member->last_name}",
                'research_domain' => $member->research_domain,
            ]);
    }

    private function projectOptions()
    {
        return ResearchProject::query()
            ->orderBy('title')
            ->get(['id', 'title']);
    }

    private function authorSyncData(array $authors): array
    {
        return collect($authors)
            ->values()
            ->mapWithKeys(fn ($memberId, int $index) => [$memberId => ['author_order' => $index + 1]])
            ->all();
    }
}
