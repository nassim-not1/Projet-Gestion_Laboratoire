# Cahier des charges

## Contexte

Les laboratoires de recherche universitaires gerent des membres, projets, equipements, publications, collaborations et activites de valorisation. Ces donnees sont souvent dispersees dans des fichiers et documents non centralises.

## Problematique

L absence d une plateforme unique rend difficile le suivi des activites, la consultation des donnees, la production de statistiques et la valorisation scientifique du laboratoire.

## Objectifs

- Centraliser les donnees du laboratoire.
- Faciliter les operations CRUD principales.
- Fournir un dashboard de pilotage.
- Ajouter une fonctionnalite IA simple pour assister la valorisation scientifique.

## Perimetre inclus

- Authentification et roles simples.
- Gestion des membres.
- Gestion des projets de recherche.
- Gestion des equipements scientifiques.
- Gestion des publications.
- Gestion des activites de valorisation.
- Dashboard statistiques.
- Service IA local FastAPI.

## Perimetre exclu

- Gestion avancee des permissions par politique detaillee.
- Workflow complet de validation administrative.
- Notifications temps reel.
- Import Excel automatique.
- API externe payante.

## Acteurs

- Admin : gere toutes les donnees.
- Responsable laboratoire : gere les activites et consulte les statistiques.
- Chercheur : consulte les donnees et ajoute des publications.

## Besoins fonctionnels

- Connexion, inscription et deconnexion.
- Recherche et filtres par module.
- Creation, consultation, modification et suppression des entites principales.
- Association des membres aux projets.
- Association des auteurs aux publications.
- Reservation simple des equipements.
- Extraction de mots-cles depuis une publication.
- Recommandations de collaborations entre membres.

## Besoins non fonctionnels

- Interface responsive.
- Code clair et maintenable.
- Validation serveur systematique.
- Gestion propre des erreurs IA.
- Temps de reponse adapte a un MVP universitaire.

## Contraintes

- Laravel, React/Inertia, Tailwind CSS, MySQL.
- FastAPI pour la partie IA.
- Pas d API IA payante.
- MVP realisable par 3 etudiants.

## Criteres d acceptation

- Les utilisateurs peuvent se connecter.
- Les modules CRUD principaux fonctionnent.
- Les statistiques dashboard s affichent.
- Le service IA peut etre lance localement.
- Laravel ne plante pas si le service IA est indisponible.
- Les tests principaux passent.
