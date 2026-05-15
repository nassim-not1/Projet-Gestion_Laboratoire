<?php

namespace Database\Seeders;

use App\Models\Member;
use App\Models\ResearchProject;
use App\Models\Valorisation;
use Illuminate\Database\Seeder;

class ValorisationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $members = Member::query()->get()->keyBy('email');
        $projects = ResearchProject::query()->get()->keyBy('title');

        $valorisations = [
            [
                'title' => 'Convention de partenariat avec un CHU',
                'description' => 'Collaboration pour experimenter des modeles IA sur des donnees medicales anonymisees.',
                'type' => 'partenariat',
                'date' => '2024-11-12',
                'partner_name' => 'Centre Hospitalier Universitaire',
                'project_title' => 'Vision par ordinateur pour imagerie medicale',
                'member_email' => 'khadija.berrada@univ.test',
            ],
            [
                'title' => 'Atelier IA pour doctorants',
                'description' => 'Formation pratique sur l extraction de mots-cles et la classification de publications.',
                'type' => 'evenement',
                'date' => '2025-04-18',
                'partner_name' => 'Ecole Doctorale Sciences et Techniques',
                'project_title' => 'Plateforme intelligente de veille scientifique',
                'member_email' => 'salma.benali@univ.test',
            ],
            [
                'title' => 'Prix innovation campus intelligent',
                'description' => 'Distinction obtenue pour le prototype de suivi des equipements par capteurs IoT.',
                'type' => 'prix',
                'date' => '2025-02-25',
                'partner_name' => 'Universite Hassan II',
                'project_title' => 'IoT securise pour laboratoires connectes',
                'member_email' => 'nadia.elfassi@univ.test',
            ],
            [
                'title' => 'Prototype de tableau de bord recherche',
                'description' => 'Transfert interne d un prototype BI aux services de pilotage de la faculte.',
                'type' => 'transfert_technologique',
                'date' => '2024-06-20',
                'partner_name' => 'Service pilotage universitaire',
                'project_title' => 'Entrepot de donnees pour le pilotage universitaire',
                'member_email' => 'rachid.qasmi@univ.test',
            ],
        ];

        foreach ($valorisations as $valorisation) {
            $projectTitle = $valorisation['project_title'];
            $memberEmail = $valorisation['member_email'];
            unset($valorisation['project_title'], $valorisation['member_email']);

            Valorisation::updateOrCreate(
                ['title' => $valorisation['title']],
                [
                    ...$valorisation,
                    'research_project_id' => $projectTitle ? $projects->get($projectTitle)?->id : null,
                    'member_id' => $memberEmail ? $members->get($memberEmail)?->id : null,
                ],
            );
        }
    }
}
