<?php

namespace Database\Seeders;

use App\Models\Member;
use App\Models\User;
use Illuminate\Database\Seeder;

class MemberSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::query()->whereIn('email', [
            'responsable@example.com',
            'chercheur@example.com',
        ])->get()->keyBy('email');

        $members = [
            [
                'user_email' => 'responsable@example.com',
                'first_name' => 'Salma',
                'last_name' => 'Benali',
                'email' => 'salma.benali@univ.test',
                'phone' => '0600000101',
                'grade' => 'professeur',
                'research_domain' => 'Intelligence artificielle, NLP, systemes intelligents',
                'bio' => 'Responsable du laboratoire et encadrante des axes IA appliquee.',
            ],
            [
                'user_email' => 'chercheur@example.com',
                'first_name' => 'Yassine',
                'last_name' => 'Idrissi',
                'email' => 'yassine.idrissi@univ.test',
                'phone' => '0600000102',
                'grade' => 'chercheur',
                'research_domain' => 'Machine learning, data mining, classification',
                'bio' => 'Chercheur specialise dans les modeles predictifs.',
            ],
            [
                'first_name' => 'Nadia',
                'last_name' => 'El Fassi',
                'email' => 'nadia.elfassi@univ.test',
                'phone' => '0600000103',
                'grade' => 'professeur',
                'research_domain' => 'Reseaux, securite informatique, IoT',
                'bio' => 'Travaille sur la securite des objets connectes.',
            ],
            [
                'first_name' => 'Omar',
                'last_name' => 'Mansouri',
                'email' => 'omar.mansouri@univ.test',
                'phone' => '0600000104',
                'grade' => 'doctorant',
                'research_domain' => 'Deep learning, vision par ordinateur',
                'bio' => 'Doctorant sur la detection automatique dans les images medicales.',
            ],
            [
                'first_name' => 'Imane',
                'last_name' => 'Rami',
                'email' => 'imane.rami@univ.test',
                'phone' => '0600000105',
                'grade' => 'doctorant',
                'research_domain' => 'NLP, analyse de sentiments, arabe dialectal',
                'bio' => 'Prepare une these sur le traitement automatique des avis et commentaires.',
            ],
            [
                'first_name' => 'Mehdi',
                'last_name' => 'Ait Lahcen',
                'email' => 'mehdi.aitlahcen@univ.test',
                'phone' => '0600000106',
                'grade' => 'chercheur',
                'research_domain' => 'Systemes embarques, capteurs, energie',
                'bio' => 'Developpe des prototypes embarques pour la collecte de donnees terrain.',
            ],
            [
                'first_name' => 'Khadija',
                'last_name' => 'Berrada',
                'email' => 'khadija.berrada@univ.test',
                'phone' => '0600000107',
                'grade' => 'professeur',
                'research_domain' => 'Big data, entrepots de donnees, aide a la decision',
                'bio' => 'Coordonne les travaux autour des plateformes decisionnelles.',
            ],
            [
                'first_name' => 'Anas',
                'last_name' => 'Tazi',
                'email' => 'anas.tazi@univ.test',
                'phone' => '0600000108',
                'grade' => 'doctorant',
                'research_domain' => 'Optimisation, metaheuristiques, planification',
                'bio' => 'Travaille sur les algorithmes d optimisation pour les ressources universitaires.',
            ],
            [
                'first_name' => 'Hajar',
                'last_name' => 'Slaoui',
                'email' => 'hajar.slaoui@univ.test',
                'phone' => '0600000109',
                'grade' => 'administratif',
                'research_domain' => 'Gestion administrative, valorisation, partenariats',
                'bio' => 'Assure le suivi administratif des conventions et evenements.',
            ],
            [
                'first_name' => 'Rachid',
                'last_name' => 'Qasmi',
                'email' => 'rachid.qasmi@univ.test',
                'phone' => '0600000110',
                'grade' => 'chercheur',
                'research_domain' => 'Cloud computing, DevOps, architectures distribuees',
                'bio' => 'Contribue aux plateformes cloud pour les applications scientifiques.',
            ],
        ];

        foreach ($members as $member) {
            $userEmail = $member['user_email'] ?? null;
            unset($member['user_email']);

            Member::updateOrCreate(
                ['email' => $member['email']],
                [
                    ...$member,
                    'user_id' => $userEmail ? $users->get($userEmail)?->id : null,
                ],
            );
        }
    }
}
