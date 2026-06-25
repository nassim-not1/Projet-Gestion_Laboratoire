# Plateforme intelligente de digitalisation des activites des laboratoires de recherche universitaires

## Description

Application web academique pour centraliser les activites d un laboratoire universitaire : membres, projets, equipements scientifiques, publications, valorisation et statistiques. Le MVP ajoute aussi une fonctionnalite IA locale avec FastAPI pour extraire des mots-cles et recommander des collaborations.

## Contexte

Les informations d un laboratoire sont souvent dispersees dans des fichiers Excel, documents Word et echanges manuels. Cette plateforme propose un espace unique pour organiser, suivre et valoriser les productions scientifiques du laboratoire.

## Objectifs

- Digitaliser la gestion des activites du laboratoire.
- Faciliter le suivi des membres, projets, equipements et publications.
- Produire un tableau de bord clair pour les responsables.
- Ajouter une petite brique IA/NLP realiste et locale.

## Technologies

- Backend : Laravel 12
- Frontend : React, Inertia.js, Tailwind CSS
- Base de donnees : MySQL
- Authentification : Laravel Breeze React/Inertia
- IA/NLP : Python, FastAPI, scikit-learn
- Tests : PHPUnit
- Graphiques : Recharts

## Fonctionnalites principales

- Authentification, inscription et deconnexion.
- Roles : `admin`, `responsable`, `chercheur`.
- CRUD membres avec recherche et filtre par grade.
- CRUD projets avec responsable et membres associes.
- CRUD equipements avec statut et reservation simple.
- CRUD publications avec auteurs, projet associe et extraction IA de mots-cles.
- CRUD activites de valorisation.
- Dashboard avec statistiques et graphiques.
- Recommandations IA de collaborations.

## Installation Laravel

```powershell
composer install
copy .env.example .env
php artisan key:generate
npm.cmd install
```

## Configuration MySQL

Creer une base MySQL :

```sql
CREATE DATABASE lab_research_platform CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Configurer `.env` :

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=lab_research_platform
DB_USERNAME=root
DB_PASSWORD=
AI_SERVICE_URL=http://127.0.0.1:8001
```

Puis lancer :

```powershell
php artisan migrate:fresh --seed
```

## Lancement

Terminal Laravel :

```powershell
php artisan serve
```

Terminal frontend :

```powershell
npm.cmd run dev
```

## Service IA FastAPI

```powershell
cd ai-service
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8001
```

## Comptes de test

- `admin@example.com` / `password`
- `responsable@example.com` / `password`
- `chercheur@example.com` / `password`

## Commandes utiles

```powershell
php artisan migrate:fresh --seed
php artisan test
npm.cmd run build
npm.cmd run dev
```

## Structure du projet

```text
app/
  Http/Controllers
  Http/Middleware
  Http/Requests
  Models
  Services
database/
  migrations
  seeders
  factories
resources/js/
  Components
  Layouts
  Pages
ai-service/
  main.py
  requirements.txt
  README.md
docs/
  cahier_des_charges.md
  conception.md
  plan_tests.md
  risques.md
```

## Repartition des roles

- Ayoub El Youbi Ben Ameur : gestion de projet, backend Laravel, documentation
- Akkouh Iliass : frontend React/Inertia, UI, dashboard
- El Gourari Nassim : base de donnees, IA Python/FastAPI, tests


