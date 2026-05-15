<?php

namespace Database\Factories;

use App\Models\Equipment;
use App\Models\EquipmentReservation;
use App\Models\Member;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<EquipmentReservation>
 */
class EquipmentReservationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'equipment_id' => Equipment::factory(),
            'member_id' => Member::factory(),
            'reservation_date' => fake()->dateTimeBetween('now', '+1 month')->format('Y-m-d'),
            'start_time' => '09:00',
            'end_time' => '11:00',
            'purpose' => fake()->optional()->sentence(),
            'status' => fake()->randomElement(['en_attente', 'acceptee', 'refusee']),
        ];
    }
}
