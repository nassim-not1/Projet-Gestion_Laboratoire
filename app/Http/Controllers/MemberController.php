<?php

namespace App\Http\Controllers;

use App\Http\Requests\MemberRequest;
use App\Models\Member;
use Illuminate\Database\QueryException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MemberController extends Controller
{
    private const GRADES = ['professeur', 'doctorant', 'chercheur', 'administratif'];

    public function index(Request $request): Response
    {
        $filters = $request->only(['search', 'grade']);

        $members = Member::query()
            ->withCount(['projects', 'publications'])
            ->when($filters['search'] ?? null, function ($query, string $search): void {
                $query->where(function ($query) use ($search): void {
                    $query->where('first_name', 'like', "%{$search}%")
                        ->orWhere('last_name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhere('research_domain', 'like', "%{$search}%");
                });
            })
            ->when($filters['grade'] ?? null, fn ($query, string $grade) => $query->where('grade', $grade))
            ->orderBy('last_name')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Members/Index', [
            'members' => $members,
            'filters' => $filters,
            'grades' => self::GRADES,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Members/Create', [
            'grades' => self::GRADES,
        ]);
    }

    public function store(MemberRequest $request): RedirectResponse
    {
        $member = Member::create($request->validated());

        return redirect()->route('members.show', $member)->with('success', 'Membre ajoute avec succes.');
    }

    public function show(Member $member): Response
    {
        $member->load(['user', 'projects.responsable', 'publications.researchProject']);

        return Inertia::render('Members/Show', [
            'member' => $member,
        ]);
    }

    public function edit(Member $member): Response
    {
        return Inertia::render('Members/Edit', [
            'member' => $member,
            'grades' => self::GRADES,
        ]);
    }

    public function update(MemberRequest $request, Member $member): RedirectResponse
    {
        $member->update($request->validated());

        return redirect()->route('members.show', $member)->with('success', 'Membre modifie avec succes.');
    }

    public function destroy(Member $member): RedirectResponse
    {
        try {
            $member->delete();
        } catch (QueryException) {
            return back()->with('error', 'Impossible de supprimer ce membre car il est lie a des donnees du laboratoire.');
        }

        return redirect()->route('members.index')->with('success', 'Membre supprime avec succes.');
    }
}
