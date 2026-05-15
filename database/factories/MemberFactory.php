<?php

namespace Database\Factories;

use App\Models\Member;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Member>
 */
class MemberFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => null,
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'email' => fake()->unique()->safeEmail(),
            'phone' => fake()->optional()->phoneNumber(),
            'grade' => fake()->randomElement(['professeur', 'doctorant', 'chercheur', 'administratif']),
            'research_domain' => fake()->randomElement([
                'Intelligence artificielle, NLP',
                'Big data, aide a la decision',
                'Reseaux, securite informatique',
                'Vision par ordinateur',
                'Systemes embarques, IoT',
            ]),
            'bio' => fake()->optional()->paragraph(),
        ];
    }
}
