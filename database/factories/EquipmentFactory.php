<?php

namespace Database\Factories;

use App\Models\Equipment;
use App\Models\Member;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Equipment>
 */
class EquipmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->words(3, true),
            'type' => fake()->randomElement(['Calcul scientifique', 'Imagerie', 'Mesure', 'Infrastructure']),
            'description' => fake()->optional()->paragraph(),
            'inventory_code' => 'LAB-' . fake()->unique()->bothify('???-###'),
            'status' => fake()->randomElement(['disponible', 'utilise', 'maintenance', 'indisponible']),
            'location' => fake()->optional()->randomElement(['Salle IA', 'Atelier embarque', 'Salle data', 'Local technique']),
            'responsible_member_id' => Member::factory(),
        ];
    }
}
