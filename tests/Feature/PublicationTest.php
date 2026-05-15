<?php

namespace Tests\Feature;

use App\Models\Member;
use App\Models\Publication;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PublicationTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_user_can_view_publications_list(): void
    {
        $user = User::factory()->create(['role' => 'chercheur']);
        Publication::factory()->create();

        $this->actingAs($user)
            ->get(route('publications.index'))
            ->assertOk();
    }

    public function test_authenticated_user_can_create_publication_with_valid_data(): void
    {
        $user = User::factory()->create(['role' => 'chercheur']);
        $member = Member::factory()->create();

        $this->actingAs($user)
            ->post(route('publications.store'), [
                'title' => 'Publication IA test',
                'abstract' => 'Resume scientifique.',
                'publication_type' => 'article',
                'journal_or_conference' => 'Revue Test',
                'publication_year' => 2026,
                'doi' => '10.5555/test.001',
                'link' => 'https://example.com/publication',
                'keywords' => 'ia, nlp',
                'authors' => [$member->id],
            ])
            ->assertRedirect();

        $this->assertDatabaseHas('publications', [
            'doi' => '10.5555/test.001',
        ]);
    }

    public function test_doi_must_be_unique_when_present(): void
    {
        $user = User::factory()->create(['role' => 'admin']);
        $member = Member::factory()->create();
        Publication::factory()->create(['doi' => '10.5555/unique.001']);

        $this->actingAs($user)
            ->post(route('publications.store'), [
                'title' => 'Publication duplicate DOI',
                'publication_type' => 'article',
                'publication_year' => 2026,
                'doi' => '10.5555/unique.001',
                'authors' => [$member->id],
            ])
            ->assertSessionHasErrors(['doi']);
    }
}
