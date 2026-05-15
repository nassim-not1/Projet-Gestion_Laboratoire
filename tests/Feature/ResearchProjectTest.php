<?php

namespace Tests\Feature;

use App\Models\Member;
use App\Models\ResearchProject;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ResearchProjectTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_user_can_view_projects_list(): void
    {
        $user = User::factory()->create(['role' => 'chercheur']);
        ResearchProject::factory()->create();

        $this->actingAs($user)
            ->get(route('research-projects.index'))
            ->assertOk();
    }

    public function test_responsable_can_create_project_with_valid_data(): void
    {
        $responsable = User::factory()->create(['role' => 'responsable']);
        $member = Member::factory()->create();

        $this->actingAs($responsable)
            ->post(route('research-projects.store'), [
                'title' => 'Projet IA durable',
                'description' => 'Projet de recherche sur l IA responsable.',
                'start_date' => '2026-01-01',
                'end_date' => '2026-12-31',
                'status' => 'en_cours',
                'funding_source' => 'Universite',
                'budget' => 50000,
                'responsable_id' => $member->id,
                'members' => [$member->id],
            ])
            ->assertRedirect();

        $this->assertDatabaseHas('research_projects', [
            'title' => 'Projet IA durable',
        ]);
    }

    public function test_project_end_date_must_be_after_or_equal_start_date(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $member = Member::factory()->create();

        $this->actingAs($admin)
            ->post(route('research-projects.store'), [
                'title' => 'Projet dates invalides',
                'description' => 'Description valide.',
                'start_date' => '2026-05-10',
                'end_date' => '2026-05-01',
                'status' => 'en_cours',
                'responsable_id' => $member->id,
                'members' => [$member->id],
            ])
            ->assertSessionHasErrors(['end_date']);
    }
}
