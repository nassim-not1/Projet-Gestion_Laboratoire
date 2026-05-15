<?php

namespace Database\Seeders;

use App\Models\Member;
use App\Models\ResearchProject;
use Illuminate\Database\Seeder;

class ResearchProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $members = Member::query()->get()->keyBy('email');

        $projects = [
            [
                'title' => 'Plateforme intelligente de veille scientifique',
                'description' => 'Conception d une plateforme de collecte, indexation et analyse des publications scientifiques du laboratoire.',
                'start_date' => '2025-01-15',
                'end_date' => null,
                'status' => 'en_cours',
                'funding_source' => 'Universite Hassan II',
                'budget' => 120000,
                'responsable_email' => 'salma.benali@univ.test',
                'team' => [
                    'salma.benali@univ.test' => 'Responsable scientifique',
                    'yassine.idrissi@univ.test' => 'Chercheur IA',
                    'imane.rami@univ.test' => 'Doctorante NLP',
                ],
            ],
            [
                'title' => 'IoT securise pour laboratoires connectes',
                'description' => 'Mise en place de capteurs connectes pour le suivi des equipements sensibles et de leur disponibilite.',
                'start_date' => '2024-09-01',
                'end_date' => null,
                'status' => 'en_cours',
                'funding_source' => 'CNRST',
                'budget' => 95000,
                'responsable_email' => 'nadia.elfassi@univ.test',
                'team' => [
                    'nadia.elfassi@univ.test' => 'Responsable projet',
                    'mehdi.aitlahcen@univ.test' => 'Developpement embarque',
                    'anas.tazi@univ.test' => 'Optimisation',
                ],
            ],
            [
                'title' => 'Vision par ordinateur pour imagerie medicale',
                'description' => 'Etude de modeles de deep learning pour l aide au diagnostic sur des images medicales anonymisees.',
                'start_date' => '2023-03-10',
                'end_date' => '2025-12-30',
                'status' => 'en_cours',
                'funding_source' => 'Partenariat CHU',
                'budget' => 160000,
                'responsable_email' => 'khadija.berrada@univ.test',
                'team' => [
                    'khadija.berrada@univ.test' => 'Coordinatrice',
                    'omar.mansouri@univ.test' => 'Doctorant vision',
                    'yassine.idrissi@univ.test' => 'Modelisation',
                ],
            ],
            [
                'title' => 'Entrepot de donnees pour le pilotage universitaire',
                'description' => 'Construction d un prototype BI pour consolider les indicateurs de recherche et de formation.',
                'start_date' => '2022-05-01',
                'end_date' => '2024-06-30',
                'status' => 'termine',
                'funding_source' => 'Budget interne',
                'budget' => 70000,
                'responsable_email' => 'khadija.berrada@univ.test',
                'team' => [
                    'khadija.berrada@univ.test' => 'Responsable BI',
                    'rachid.qasmi@univ.test' => 'Architecture cloud',
                    'hajar.slaoui@univ.test' => 'Suivi administratif',
                ],
            ],
            [
                'title' => 'Optimisation des reservations d equipements scientifiques',
                'description' => 'Prototype d algorithme de planification pour reduire les conflits de reservation au sein du laboratoire.',
                'start_date' => '2024-02-20',
                'end_date' => null,
                'status' => 'suspendu',
                'funding_source' => null,
                'budget' => 30000,
                'responsable_email' => 'anas.tazi@univ.test',
                'team' => [
                    'anas.tazi@univ.test' => 'Responsable algorithmique',
                    'mehdi.aitlahcen@univ.test' => 'Integration capteurs',
                    'hajar.slaoui@univ.test' => 'Coordination',
                ],
            ],
        ];

        foreach ($projects as $projectData) {
            $team = $projectData['team'];
            $responsableEmail = $projectData['responsable_email'];
            unset($projectData['team'], $projectData['responsable_email']);

            $project = ResearchProject::updateOrCreate(
                ['title' => $projectData['title']],
                [
                    ...$projectData,
                    'responsable_id' => $members->get($responsableEmail)->id,
                ],
            );

            $syncData = [];
            foreach ($team as $email => $role) {
                $syncData[$members->get($email)->id] = ['role_in_project' => $role];
            }

            $project->members()->sync($syncData);
        }
    }
}
