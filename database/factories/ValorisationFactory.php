<?php

namespace Database\Factories;

use App\Models\Member;
use App\Models\ResearchProject;
use App\Models\Valorisation;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Valorisation>
 */
class ValorisationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->unique()->sentence(5),
            'description' => fake()->paragraph(),
            'type' => fake()->randomElement(['brevet', 'partenariat', 'evenement', 'prix', 'transfert_technologique', 'autre']),
            'date' => fake()->dateTimeBetween('-2 years', 'now')->format('Y-m-d'),
            'partner_name' => fake()->optional()->company(),
            'research_project_id' => ResearchProject::factory(),
            'member_id' => Member::factory(),
        ];
    }
}
