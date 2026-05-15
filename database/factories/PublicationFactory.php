<?php

namespace Database\Factories;

use App\Models\Publication;
use App\Models\ResearchProject;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Publication>
 */
class PublicationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->unique()->sentence(7),
            'abstract' => fake()->optional()->paragraph(),
            'publication_type' => fake()->randomElement(['article', 'conference', 'livre', 'chapitre', 'these', 'autre']),
            'journal_or_conference' => fake()->optional()->company(),
            'publication_year' => fake()->numberBetween(2020, ((int) date('Y')) + 1),
            'doi' => fake()->boolean(70) ? fake()->unique()->numerify('10.5555/lab.####.###') : null,
            'link' => fake()->optional()->url(),
            'keywords' => implode(', ', fake()->words(4)),
            'research_project_id' => ResearchProject::factory(),
        ];
    }
}
