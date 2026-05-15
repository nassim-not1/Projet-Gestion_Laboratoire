<?php

namespace App\Http\Controllers;

use App\Models\Member;
use App\Models\Publication;
use App\Services\AiService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class AiController extends Controller
{
    public function extractKeywords(Publication $publication, AiService $aiService): RedirectResponse
    {
        try {
            $keywords = $aiService->extractKeywords($publication->title."\n".$publication->abstract);
        } catch (Throwable) {
            return back()->with('error', 'Service IA indisponible pour le moment.');
        }

        if ($keywords === []) {
            return back()->with('error', 'Aucun mot-cle pertinent detecte.');
        }

        $publication->update([
            'keywords' => implode(', ', $keywords),
        ]);

        return back()->with('success', 'Mots-cles IA extraits avec succes.');
    }

    public function recommendations(): Response
    {
        return Inertia::render('Ai/Recommendations', [
            'members' => $this->memberOptions(),
            'selectedMemberId' => null,
            'recommendations' => [],
        ]);
    }

    public function generateRecommendations(Request $request, AiService $aiService): Response|RedirectResponse
    {
        $data = $request->validate([
            'member_id' => ['required', 'exists:members,id'],
        ]);

        $member = Member::findOrFail($data['member_id']);

        try {
            $recommendations = $aiService->recommendCollaborations($member);
        } catch (Throwable) {
            return back()->with('error', 'Service IA indisponible pour le moment.');
        }

        return Inertia::render('Ai/Recommendations', [
            'members' => $this->memberOptions(),
            'selectedMemberId' => $member->id,
            'recommendations' => $recommendations,
        ]);
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
}
