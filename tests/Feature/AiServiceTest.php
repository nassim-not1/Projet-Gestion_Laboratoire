<?php

namespace Tests\Feature;

use App\Models\Member;
use App\Models\Publication;
use App\Services\AiService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class AiServiceTest extends TestCase
{
    use RefreshDatabase;

    public function test_ai_service_extracts_keywords_with_http_mock(): void
    {
        Http::fake([
            '*' => Http::response(['keywords' => ['machine learning', 'nlp']], 200),
        ]);

        $keywords = app(AiService::class)->extractKeywords('Texte scientifique sur le NLP.');

        $this->assertSame(['machine learning', 'nlp'], $keywords);
    }

    public function test_ai_service_recommends_collaborations_with_http_mock(): void
    {
        Http::fake([
            '*' => Http::response([
                'recommendations' => [
                    [
                        'member_id' => 2,
                        'name' => 'Autre Chercheur',
                        'score' => 0.82,
                        'reason' => 'Domaines proches : machine learning',
                    ],
                ],
            ], 200),
        ]);

        $target = Member::factory()->create(['research_domain' => 'NLP, machine learning']);
        $candidate = Member::factory()->create(['research_domain' => 'data mining, machine learning']);
        $publication = Publication::factory()->create(['keywords' => 'nlp, deep learning']);
        $target->publications()->attach($publication->id, ['author_order' => 1]);

        $recommendations = app(AiService::class)->recommendCollaborations($target);

        $this->assertSame(2, $recommendations[0]['member_id']);
        $this->assertNotSame($target->id, $candidate->id);
    }
}
