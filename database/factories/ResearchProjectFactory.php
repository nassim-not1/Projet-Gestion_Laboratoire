<?php

namespace Database\Factories;

use App\Models\Member;
use App\Models\ResearchProject;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ResearchProject>
 */
class ResearchProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startDate = fake()->dateTimeBetween('-2 years', 'now');

        return [
            'title' => fake()->unique()->sentence(5),
            'description' => fake()->paragraph(),
            'start_date' => $startDate->format('Y-m-d'),
            'end_date' => fake()->optional()->dateTimeBetween($startDate, '+1 year')?->format('Y-m-d'),
            'status' => fake()->randomElement(['en_cours', 'termine', 'suspendu']),
            'funding_source' => fake()->optional()->company(),
            'budget' => fake()->optional()->randomFloat(2, 10000, 250000),
            'responsable_id' => Member::factory(),
        ];
    }
}
