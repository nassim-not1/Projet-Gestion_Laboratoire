<?php

namespace Tests\Feature;

use App\Models\Member;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MemberTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_user_can_view_members_list(): void
    {
        $user = User::factory()->create(['role' => 'chercheur']);
        Member::factory()->count(2)->create();

        $this->actingAs($user)
            ->get(route('members.index'))
            ->assertOk();
    }

    public function test_admin_can_create_member_with_valid_data(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);

        $this->actingAs($admin)
            ->post(route('members.store'), [
                'first_name' => 'Amina',
                'last_name' => 'Toumi',
                'email' => 'amina.toumi@example.com',
                'phone' => '0600000000',
                'grade' => 'chercheur',
                'research_domain' => 'NLP, machine learning',
                'bio' => 'Chercheuse en intelligence artificielle.',
            ])
            ->assertRedirect();

        $this->assertDatabaseHas('members', [
            'email' => 'amina.toumi@example.com',
        ]);
    }

    public function test_member_validation_fails_with_invalid_data(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);

        $this->actingAs($admin)
            ->post(route('members.store'), [
                'first_name' => '',
                'last_name' => '',
                'email' => 'not-an-email',
                'grade' => 'invalid',
                'research_domain' => '',
            ])
            ->assertSessionHasErrors(['first_name', 'last_name', 'email', 'grade', 'research_domain']);
    }
}
