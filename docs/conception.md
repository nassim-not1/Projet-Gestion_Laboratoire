# Conception

## Architecture generale

La plateforme suit une architecture web classique :

- Laravel gere la logique backend, les routes, la validation et les acces base de donnees.
- React avec Inertia.js gere les pages utilisateur sans API frontend separee.
- MySQL stocke les donnees metier.
- FastAPI expose les endpoints IA locaux.
- Laravel communique avec FastAPI par requetes HTTP.

## Architecture en couches

- Models : relations Eloquent et acces aux donnees.
- Form Requests : validation des entrees.
- Controllers : orchestration des actions utilisateur.
- Services : logique externe, notamment `AiService`.
- Pages React : affichage et formulaires.
- Components React : elements reutilisables UI.

## Modules

- Authentification et roles.
- Membres.
- Projets de recherche.
- Equipements et reservations.
- Publications.
- Valorisation.
- Dashboard.
- IA/NLP.

## Modele de donnees

Entites principales :

- users
- members
- research_projects
- member_project
- equipments
- equipment_reservations
- publications
- member_publication
- valorisations

## Relations principales

- User hasOne Member.
- Member belongsToMany ResearchProject.
- ResearchProject belongsTo Member as responsable.
- Publication belongsToMany Member as authors.
- Publication belongsTo ResearchProject.
- Equipment belongsTo Member as responsibleMember.
- Equipment hasMany EquipmentReservation.
- Valorisation belongsTo ResearchProject.
- Valorisation belongsTo Member.

## Flux utilisateur

1. L utilisateur se connecte.
2. Il accede au dashboard.
3. Il consulte ou gere les modules selon son role.
4. Il peut ajouter une publication et demander l extraction IA des mots-cles.
5. Il peut selectionner un membre et generer des recommandations IA.

## Choix techniques

- Laravel Breeze reduit le temps de mise en place de l authentification.
- Inertia evite de construire une API REST complete pour le frontend.
- Tailwind CSS permet une interface rapide et coherente.
- FastAPI est leger pour exposer une brique IA independante.
- TF-IDF est suffisant pour une demonstration academique locale.
