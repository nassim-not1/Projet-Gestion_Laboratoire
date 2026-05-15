<?php

namespace Database\Seeders;

use App\Models\Equipment;
use App\Models\Member;
use Illuminate\Database\Seeder;

class EquipmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $members = Member::query()->get()->keyBy('email');

        $equipments = [
            [
                'name' => 'Station GPU NVIDIA A6000',
                'type' => 'Calcul scientifique',
                'description' => 'Station de calcul pour entrainement de modeles IA.',
                'inventory_code' => 'LAB-GPU-001',
                'status' => 'disponible',
                'location' => 'Salle IA - R1',
                'responsible_email' => 'salma.benali@univ.test',
            ],
            [
                'name' => 'Serveur de stockage NAS',
                'type' => 'Infrastructure',
                'description' => 'Stockage centralise des jeux de donnees du laboratoire.',
                'inventory_code' => 'LAB-NAS-002',
                'status' => 'utilise',
                'location' => 'Local technique',
                'responsible_email' => 'rachid.qasmi@univ.test',
            ],
            [
                'name' => 'Kit capteurs IoT',
                'type' => 'Electronique',
                'description' => 'Ensemble de capteurs temperature, humidite et vibration.',
                'inventory_code' => 'LAB-IOT-003',
                'status' => 'disponible',
                'location' => 'Atelier embarque',
                'responsible_email' => 'mehdi.aitlahcen@univ.test',
            ],
            [
                'name' => 'Camera industrielle haute resolution',
                'type' => 'Imagerie',
                'description' => 'Camera utilisee pour les projets de vision par ordinateur.',
                'inventory_code' => 'LAB-CAM-004',
                'status' => 'maintenance',
                'location' => 'Salle vision',
                'responsible_email' => 'omar.mansouri@univ.test',
            ],
            [
                'name' => 'Imprimante 3D de prototypage',
                'type' => 'Prototypage',
                'description' => 'Fabrication rapide de supports et boitiers experimentaux.',
                'inventory_code' => 'LAB-3DP-005',
                'status' => 'disponible',
                'location' => 'FabLab',
                'responsible_email' => 'mehdi.aitlahcen@univ.test',
            ],
            [
                'name' => 'Oscilloscope numerique',
                'type' => 'Mesure',
                'description' => 'Analyse des signaux pour cartes embarquees.',
                'inventory_code' => 'LAB-OSC-006',
                'status' => 'disponible',
                'location' => 'Atelier embarque',
                'responsible_email' => 'nadia.elfassi@univ.test',
            ],
            [
                'name' => 'Projecteur interactif',
                'type' => 'Presentation',
                'description' => 'Support pour seminaires, soutenances et ateliers.',
                'inventory_code' => 'LAB-PRJ-007',
                'status' => 'indisponible',
                'location' => 'Salle de reunion',
                'responsible_email' => 'hajar.slaoui@univ.test',
            ],
            [
                'name' => 'Poste de travail BI',
                'type' => 'Analyse de donnees',
                'description' => 'Machine dediee aux outils d analyse et visualisation.',
                'inventory_code' => 'LAB-BI-008',
                'status' => 'utilise',
                'location' => 'Salle data',
                'responsible_email' => 'khadija.berrada@univ.test',
            ],
        ];

        foreach ($equipments as $equipment) {
            $responsibleEmail = $equipment['responsible_email'];
            unset($equipment['responsible_email']);

            Equipment::updateOrCreate(
                ['inventory_code' => $equipment['inventory_code']],
                [
                    ...$equipment,
                    'responsible_member_id' => $members->get($responsibleEmail)?->id,
                ],
            );
        }
    }
}
