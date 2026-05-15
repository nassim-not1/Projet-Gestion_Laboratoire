<?php

namespace Database\Seeders;

use App\Models\Member;
use App\Models\Publication;
use App\Models\ResearchProject;
use Illuminate\Database\Seeder;

class PublicationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $members = Member::query()->get()->keyBy('email');
        $projects = ResearchProject::query()->get()->keyBy('title');

        $publications = [
            [
                'title' => 'Extraction automatique de mots-cles pour la veille scientifique universitaire',
                'abstract' => 'Cet article presente une approche TF-IDF pour assister les laboratoires dans l indexation des productions scientifiques.',
                'publication_type' => 'article',
                'journal_or_conference' => 'Revue Marocaine d Informatique Appliquee',
                'publication_year' => 2025,
                'doi' => '10.5555/lab.2025.001',
                'link' => 'https://example.org/publications/lab-2025-001',
                'keywords' => 'TF-IDF, NLP, veille scientifique, mots-cles',
                'project_title' => 'Plateforme intelligente de veille scientifique',
                'authors' => ['salma.benali@univ.test', 'imane.rami@univ.test', 'yassine.idrissi@univ.test'],
            ],
            [
                'title' => 'Similarite semantique pour la recommandation de collaborations de recherche',
                'abstract' => 'Nous proposons une methode legere de recommandation basee sur la similarite des domaines et publications.',
                'publication_type' => 'conference',
                'journal_or_conference' => 'Conference Nationale IA et Donnees',
                'publication_year' => 2025,
                'doi' => '10.5555/lab.2025.002',
                'link' => null,
                'keywords' => 'collaboration, cosine similarity, recherche universitaire',
                'project_title' => 'Plateforme intelligente de veille scientifique',
                'authors' => ['yassine.idrissi@univ.test', 'salma.benali@univ.test'],
            ],
            [
                'title' => 'Architecture IoT securisee pour le suivi des equipements scientifiques',
                'abstract' => 'L article decrit une architecture IoT pour surveiller l etat des equipements de laboratoire.',
                'publication_type' => 'article',
                'journal_or_conference' => 'Journal of Smart Laboratories',
                'publication_year' => 2024,
                'doi' => '10.5555/lab.2024.003',
                'link' => null,
                'keywords' => 'IoT, securite, equipements, capteurs',
                'project_title' => 'IoT securise pour laboratoires connectes',
                'authors' => ['nadia.elfassi@univ.test', 'mehdi.aitlahcen@univ.test'],
            ],
            [
                'title' => 'Detection d anomalies dans les images medicales par deep learning',
                'abstract' => 'Cette publication compare des architectures CNN pour la detection d anomalies visuelles.',
                'publication_type' => 'conference',
                'journal_or_conference' => 'International Workshop on Medical Imaging AI',
                'publication_year' => 2024,
                'doi' => '10.5555/lab.2024.004',
                'link' => 'https://example.org/publications/lab-2024-004',
                'keywords' => 'deep learning, CNN, imagerie medicale, detection',
                'project_title' => 'Vision par ordinateur pour imagerie medicale',
                'authors' => ['omar.mansouri@univ.test', 'khadija.berrada@univ.test'],
            ],
            [
                'title' => 'Tableaux de bord decisionnels pour le pilotage de la recherche',
                'abstract' => 'Une demarche de construction d indicateurs BI pour mesurer les activites de recherche universitaire.',
                'publication_type' => 'article',
                'journal_or_conference' => 'Maghreb Data Review',
                'publication_year' => 2023,
                'doi' => '10.5555/lab.2023.005',
                'link' => null,
                'keywords' => 'business intelligence, dashboard, indicateurs, recherche',
                'project_title' => 'Entrepot de donnees pour le pilotage universitaire',
                'authors' => ['khadija.berrada@univ.test', 'rachid.qasmi@univ.test', 'hajar.slaoui@univ.test'],
            ],
            [
                'title' => 'Optimisation des plannings de reservation en contexte universitaire',
                'abstract' => 'Nous etudions des heuristiques simples pour limiter les conflits de reservation d equipements.',
                'publication_type' => 'conference',
                'journal_or_conference' => 'Journees Marocaines d Optimisation',
                'publication_year' => 2024,
                'doi' => null,
                'link' => null,
                'keywords' => 'optimisation, planning, reservation, laboratoire',
                'project_title' => 'Optimisation des reservations d equipements scientifiques',
                'authors' => ['anas.tazi@univ.test', 'mehdi.aitlahcen@univ.test'],
            ],
            [
                'title' => 'Analyse de sentiments pour l arabe dialectal marocain',
                'abstract' => 'La contribution propose un pipeline NLP pour classifier des commentaires en arabe dialectal.',
                'publication_type' => 'article',
                'journal_or_conference' => 'ArabNLP Applied Journal',
                'publication_year' => 2025,
                'doi' => '10.5555/lab.2025.006',
                'link' => null,
                'keywords' => 'NLP, analyse de sentiments, arabe dialectal',
                'project_title' => 'Plateforme intelligente de veille scientifique',
                'authors' => ['imane.rami@univ.test', 'salma.benali@univ.test'],
            ],
            [
                'title' => 'Deploiement cloud d applications scientifiques pour laboratoires universitaires',
                'abstract' => 'Cet article presente une architecture DevOps simple pour heberger des applications de recherche.',
                'publication_type' => 'chapitre',
                'journal_or_conference' => 'Ouvrage collectif sur la transformation digitale universitaire',
                'publication_year' => 2023,
                'doi' => null,
                'link' => null,
                'keywords' => 'cloud, DevOps, microservices, laboratoire',
                'project_title' => 'Entrepot de donnees pour le pilotage universitaire',
                'authors' => ['rachid.qasmi@univ.test', 'khadija.berrada@univ.test'],
            ],
            [
                'title' => 'Prototypage rapide de dispositifs experimentaux avec impression 3D',
                'abstract' => 'Retour d experience sur l usage de l impression 3D pour accelerer les experimentations.',
                'publication_type' => 'autre',
                'journal_or_conference' => 'Bulletin Innovation Universitaire',
                'publication_year' => 2022,
                'doi' => null,
                'link' => null,
                'keywords' => 'prototypage, impression 3D, innovation',
                'project_title' => null,
                'authors' => ['mehdi.aitlahcen@univ.test', 'hajar.slaoui@univ.test'],
            ],
            [
                'title' => 'Securisation des communications entre capteurs dans un campus intelligent',
                'abstract' => 'Etude des mecanismes de securite pour les donnees issues de capteurs deployes sur campus.',
                'publication_type' => 'conference',
                'journal_or_conference' => 'Smart Campus Security Symposium',
                'publication_year' => 2025,
                'doi' => '10.5555/lab.2025.010',
                'link' => null,
                'keywords' => 'securite, capteurs, IoT, campus intelligent',
                'project_title' => 'IoT securise pour laboratoires connectes',
                'authors' => ['nadia.elfassi@univ.test', 'mehdi.aitlahcen@univ.test', 'anas.tazi@univ.test'],
            ],
        ];

        foreach ($publications as $publicationData) {
            $authors = $publicationData['authors'];
            $projectTitle = $publicationData['project_title'];
            unset($publicationData['authors'], $publicationData['project_title']);

            $publication = Publication::updateOrCreate(
                ['title' => $publicationData['title']],
                [
                    ...$publicationData,
                    'research_project_id' => $projectTitle ? $projects->get($projectTitle)?->id : null,
                ],
            );

            $syncData = [];
            foreach (array_values($authors) as $index => $email) {
                $syncData[$members->get($email)->id] = ['author_order' => $index + 1];
            }

            $publication->authors()->sync($syncData);
        }
    }
}
