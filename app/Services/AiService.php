<?php

namespace App\Services;

use App\Models\Member;
use Illuminate\Support\Facades\Http;
use RuntimeException;

class AiService
{
    public function extractKeywords(string $text): array
    {
        if (trim($text) === '') {
            return [];
        }

        $response = Http::timeout(5)
            ->acceptJson()
            ->post($this->baseUrl().'/extract-keywords', [
                'text' => $text,
            ]);

        if (! $response->successful()) {
            throw new RuntimeException('Service IA indisponible pour le moment.');
        }

        return $response->json('keywords', []);
    }

    public function recommendCollaborations(Member $member): array
    {
        $member->loadMissing('publications');

        $candidates = Member::query()
            ->with('publications')
            ->whereKeyNot($member->id)
            ->get()
            ->map(fn (Member $candidate) => $this->payloadForMember($candidate))
            ->values()
            ->all();

        $response = Http::timeout(5)
            ->acceptJson()
            ->post($this->baseUrl().'/recommend-collaborations', [
                'target_member' => $this->payloadForMember($member),
                'members' => $candidates,
            ]);

        if (! $response->successful()) {
            throw new RuntimeException('Service IA indisponible pour le moment.');
        }

        return $response->json('recommendations', []);
    }

    private function payloadForMember(Member $member): array
    {
        return [
            'id' => $member->id,
            'name' => "{$member->first_name} {$member->last_name}",
            'research_domain' => $member->research_domain,
            'keywords' => $this->keywordsForMember($member),
        ];
    }

    private function keywordsForMember(Member $member): array
    {
        return $member->publications
            ->flatMap(fn ($publication) => explode(',', (string) $publication->keywords))
            ->map(fn (string $keyword) => trim(mb_strtolower($keyword)))
            ->filter()
            ->unique()
            ->values()
            ->all();
    }

    private function baseUrl(): string
    {
        return rtrim((string) config('services.ai.url', 'http://127.0.0.1:8001'), '/');
    }
}
