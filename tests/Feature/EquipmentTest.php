<?php

namespace Tests\Feature;

use App\Models\Equipment;
use App\Models\Member;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class EquipmentTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_user_can_view_equipments_list(): void
    {
        $user = User::factory()->create(['role' => 'chercheur']);
        Equipment::factory()->create();

        $this->actingAs($user)
            ->get(route('equipments.index'))
            ->assertOk();
    }

    public function test_admin_can_create_equipment_with_valid_data(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $member = Member::factory()->create();

        $this->actingAs($admin)
            ->post(route('equipments.store'), [
                'name' => 'Microscope numerique',
                'type' => 'Imagerie',
                'description' => 'Equipement de test.',
                'inventory_code' => 'LAB-TEST-001',
                'status' => 'disponible',
                'location' => 'Salle test',
                'responsible_member_id' => $member->id,
            ])
            ->assertRedirect();

        $this->assertDatabaseHas('equipments', [
            'inventory_code' => 'LAB-TEST-001',
        ]);
    }

    public function test_inventory_code_must_be_unique(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $existing = Equipment::factory()->create(['inventory_code' => 'LAB-UNIQUE-001']);

        $this->actingAs($admin)
            ->post(route('equipments.store'), [
                'name' => 'Autre equipement',
                'type' => 'Mesure',
                'inventory_code' => $existing->inventory_code,
                'status' => 'disponible',
            ])
            ->assertSessionHasErrors(['inventory_code']);
    }
}
