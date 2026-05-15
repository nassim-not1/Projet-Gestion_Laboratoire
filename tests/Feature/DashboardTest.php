<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    use RefreshDatabase;

    public function test_dashboard_is_accessible_for_authenticated_user(): void
    {
        $user = User::factory()->create(['role' => 'responsable']);

        $this->actingAs($user)
            ->get(route('dashboard'))
            ->assertOk();
    }
}
