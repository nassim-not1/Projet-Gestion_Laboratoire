# Plan de tests

## Strategie

Les tests ciblent les fonctionnalites critiques du MVP : acces authentifie, creation avec donnees valides, validation serveur et disponibilite du dashboard.

## Types de tests

- Tests Feature Laravel.
- Tests de validation des formulaires.
- Test du service IA avec mock HTTP.
- Build frontend Vite.

## Scenarios par module

### Membres

- Un utilisateur authentifie consulte la liste.
- Un admin cree un membre valide.
- Les donnees invalides sont refusees.

### Projets

- Un utilisateur authentifie consulte la liste.
- Un responsable cree un projet valide.
- Une date de fin avant la date de debut est refusee.

### Equipements

- Un utilisateur authentifie consulte la liste.
- Un admin cree un equipement valide.
- Un code inventaire duplique est refuse.

### Publications

- Un utilisateur authentifie consulte la liste.
- Un utilisateur cree une publication avec auteur.
- Un DOI duplique est refuse.

### Dashboard

- Un utilisateur authentifie accede au dashboard.

### IA

- Le service Laravel `AiService` est teste avec `Http::fake`.
- Les erreurs du service IA sont interceptees par les controleurs.

## Criteres de sortie

- `php artisan test` passe.
- `npm.cmd run build` passe.
- Les migrations et seeders s executent sans erreur.

## Gestion des anomalies

- Reproduire l anomalie.
- Identifier le module concerne.
- Corriger le test ou le code selon le comportement attendu.
- Relancer la suite de tests.
