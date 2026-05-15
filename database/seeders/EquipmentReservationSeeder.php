<?php

namespace Database\Seeders;

use App\Models\Equipment;
use App\Models\EquipmentReservation;
use App\Models\Member;
use Illuminate\Database\Seeder;

class EquipmentReservationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $members = Member::query()->get()->keyBy('email');
        $equipments = Equipment::query()->get()->keyBy('inventory_code');

        $reservations = [
            [
                'equipment_code' => 'LAB-GPU-001',
                'member_email' => 'yassine.idrissi@univ.test',
                'reservation_date' => '2026-05-20',
                'start_time' => '09:00',
                'end_time' => '12:00',
                'purpose' => 'Entrainement d un modele de classification de publications.',
                'status' => 'acceptee',
            ],
            [
                'equipment_code' => 'LAB-IOT-003',
                'member_email' => 'mehdi.aitlahcen@univ.test',
                'reservation_date' => '2026-05-21',
                'start_time' => '14:00',
                'end_time' => '16:30',
                'purpose' => 'Test de collecte de donnees environnementales.',
                'status' => 'en_attente',
            ],
        ];

        foreach ($reservations as $reservation) {
            $equipmentCode = $reservation['equipment_code'];
            $memberEmail = $reservation['member_email'];
            unset($reservation['equipment_code'], $reservation['member_email']);

            EquipmentReservation::updateOrCreate(
                [
                    'equipment_id' => $equipments->get($equipmentCode)->id,
                    'member_id' => $members->get($memberEmail)->id,
                    'reservation_date' => $reservation['reservation_date'],
                    'start_time' => $reservation['start_time'],
                ],
                [
                    ...$reservation,
                    'equipment_id' => $equipments->get($equipmentCode)->id,
                    'member_id' => $members->get($memberEmail)->id,
                ],
            );
        }
    }
}
