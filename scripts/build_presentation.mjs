import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export async function buildDeck(tool) {
  const {
    Presentation,
    PresentationFile,
    row,
    column,
    grid,
    layers,
    panel,
    text,
    shape,
    rule,
    fill,
    hug,
    fixed,
    grow,
    fr,
    auto,
    wrap,
  } = tool;

  const W = 1920;
  const H = 1080;
  const OUT = "presentation_plateforme_laboratoire_gestion_projet.pptx";
  const PREVIEW_DIR = "presentation_previews";
  const LAYOUT_DIR = "presentation_layouts";

  const C = {
    ink: "#0F172A",
    slate: "#334155",
    muted: "#64748B",
    line: "#E2E8F0",
    bg: "#F8FAFC",
    white: "#FFFFFF",
    blue: "#2563EB",
    blueDark: "#1E40AF",
    violet: "#7C3AED",
    violetSoft: "#EDE9FE",
    blueSoft: "#DBEAFE",
    green: "#059669",
    greenSoft: "#D1FAE5",
    amber: "#D97706",
    amberSoft: "#FEF3C7",
    red: "#DC2626",
    redSoft: "#FEE2E2",
    dark: "#111827",
  };

  const presentation = Presentation.create({
    slideSize: { width: W, height: H },
  });

  const notes = [];

  function p(value, opts = {}) {
    return text(value, {
      name: opts.name,
      width: opts.width ?? fill,
      height: opts.height ?? hug,
      columnSpan: opts.columnSpan,
      rowSpan: opts.rowSpan,
      style: {
        fontSize: opts.size ?? 28,
        bold: opts.bold ?? false,
        color: opts.color ?? C.slate,
        italic: opts.italic ?? false,
      },
    });
  }

  function bg(fillColor = C.bg) {
    return shape({
      name: "slide-background",
      width: fill,
      height: fill,
      fill: fillColor,
      geometry: "rect",
    });
  }

  function footer(index) {
    return row(
      {
        name: "footer",
        width: fill,
        height: hug,
        align: "center",
        justify: "between",
      },
      [
        p("Gestion de projets informatiques • Plateforme laboratoire", {
          name: "footer-left",
          size: 16,
          color: C.muted,
        }),
        p(String(index).padStart(2, "0") + " / 22", {
          name: "footer-number",
          width: fixed(90),
          size: 16,
          color: C.muted,
        }),
      ],
    );
  }

  function titleBlock(kicker, title, subtitle) {
    return column(
      { name: "title-block", width: fill, height: hug, gap: 14 },
      [
        p(kicker, {
          name: "slide-kicker",
          width: fill,
          size: 18,
          bold: true,
          color: C.blue,
        }),
        p(title, {
          name: "slide-title",
          width: fill,
          size: 54,
          bold: true,
          color: C.ink,
        }),
        subtitle
          ? p(subtitle, {
              name: "slide-subtitle",
              width: wrap(1320),
              size: 24,
              color: C.muted,
            })
          : null,
      ].filter(Boolean),
    );
  }

  function slideShell(index, kicker, title, subtitle, body, note, opts = {}) {
    const slide = presentation.slides.add();
    slide.speakerNotes.setText(note);
    notes.push(note);
    slide.compose(
      layers(
        { name: "root-layers", width: fill, height: fill },
        [
          bg(opts.background ?? C.bg),
          column(
            {
              name: "root",
              width: fill,
              height: fill,
              padding: { x: 84, y: 58 },
              gap: 32,
            },
            [
              titleBlock(kicker, title, subtitle),
              panel(
                { name: "content-region", width: fill, height: grow(1), padding: 0 },
                body,
              ),
              footer(index),
            ],
          ),
        ],
      ),
      { frame: { left: 0, top: 0, width: W, height: H }, baseUnit: 8 },
    );
  }

  function card(title, body, color = C.blue, fillColor = C.white) {
    return panel(
      {
        name: "card",
        width: fill,
        height: fill,
        fill: fillColor,
        borderRadius: 24,
        padding: { x: 30, y: 26 },
        shadow: "shadow-sm",
      },
      column(
        { width: fill, height: fill, gap: 16 },
        [
          row(
            { width: fill, height: hug, gap: 14, align: "center" },
            [
              shape({
                name: "card-dot",
                width: fixed(18),
                height: fixed(18),
                fill: color,
                geometry: "ellipse",
              }),
              p(title, { name: "card-title", size: 29, bold: true, color: C.ink }),
            ],
          ),
          Array.isArray(body)
            ? bulletList(body, { size: 23, color: C.slate })
            : p(body, { name: "card-body", size: 24, color: C.slate }),
        ],
      ),
    );
  }

  function compactCard(title, body, color = C.blue, fillColor = C.white) {
    return panel(
      {
        width: fill,
        height: fill,
        fill: fillColor,
        borderRadius: 20,
        padding: { x: 24, y: 14 },
        shadow: "shadow-sm",
      },
      column(
        { width: fill, height: fill, gap: 8 },
        [
          row(
            { width: fill, height: hug, gap: 12, align: "center" },
            [
              shape({ width: fixed(14), height: fixed(14), fill: color, geometry: "ellipse" }),
              p(title, { size: 24, bold: true, color: C.ink }),
            ],
          ),
          bulletList(body, { size: 17, color: C.slate, gap: 4 }),
        ],
      ),
    );
  }

  function architectureLayer(title, body, color) {
    return panel(
      {
        width: grow(1),
        height: fixed(124),
        fill: C.white,
        borderRadius: 22,
        padding: { x: 28, y: 22 },
        shadow: "shadow-sm",
      },
      column(
        { width: fill, height: fill, gap: 8, justify: "center" },
        [
          row(
            { width: fill, height: hug, gap: 12, align: "center" },
            [
              shape({ width: fixed(14), height: fixed(14), fill: color, geometry: "ellipse" }),
              p(title, { width: fill, size: 25, bold: true, color: C.ink }),
            ],
          ),
          p(body, { width: fill, size: 22, color: C.slate }),
        ],
      ),
    );
  }

  function bulletList(items, opts = {}) {
    return column(
      { name: "bullet-list", width: fill, height: hug, gap: opts.gap ?? 12 },
      items.map((item, i) =>
        row(
          { name: `bullet-${i}`, width: fill, height: hug, gap: 12, align: "start" },
          [
            shape({
              width: fixed(10),
              height: fixed(10),
              fill: opts.dot ?? C.blue,
              geometry: "ellipse",
            }),
            p(item, {
              width: fill,
              size: opts.size ?? 25,
              color: opts.color ?? C.slate,
            }),
          ],
        ),
      ),
    );
  }

  function metric(value, label, color) {
    return column(
      { width: fill, height: hug, gap: 6 },
      [
        p(value, { width: fill, size: 52, bold: true, color }),
        p(label, { width: fill, size: 21, color: C.muted }),
      ],
    );
  }

  function smallPill(label, color = C.blue, fillColor = C.blueSoft) {
    const pillWidth = Math.max(112, label.length * 16 + 38);
    return panel(
      { width: fixed(pillWidth), height: hug, fill: fillColor, borderRadius: 18, padding: { x: 18, y: 8 } },
      p(label, { width: fill, size: 18, bold: true, color }),
    );
  }

  function lineItem(title, desc, color = C.blue) {
    return row(
      { width: fill, height: hug, gap: 18, align: "start" },
      [
        shape({ width: fixed(16), height: fixed(16), fill: color, geometry: "ellipse" }),
        column(
          { width: fill, height: hug, gap: 4 },
          [
            p(title, { width: fill, size: 25, bold: true, color: C.ink }),
            p(desc, { width: fill, size: 21, color: C.muted }),
          ],
        ),
      ],
    );
  }

  function addCover() {
    const slide = presentation.slides.add();
    const note =
      "Présenter le titre, l équipe et le contexte pédagogique. Insister sur le fait que la présentation porte autant sur la gestion du projet que sur la solution technique.";
    slide.speakerNotes.setText(note);
    notes.push(note);

    slide.compose(
      layers(
        { width: fill, height: fill },
        [
          bg(C.dark),
          row(
            {
              width: fill,
              height: fill,
              padding: { x: 92, y: 70 },
              gap: 68,
              align: "stretch",
            },
            [
              column(
                { width: grow(1.3), height: fill, gap: 30, justify: "between" },
                [
                  column(
                    { width: fill, height: hug, gap: 22 },
                    [
                      p("Gestion de projets informatiques", {
                        width: fill,
                        size: 24,
                        bold: true,
                        color: "#93C5FD",
                      }),
                      p("Plateforme intelligente de digitalisation des laboratoires de recherche universitaires", {
                        name: "cover-title",
                        width: fill,
                        size: 68,
                        bold: true,
                        color: C.white,
                      }),
                      p("Gestion des activités de recherche, publications, équipements et valorisation scientifique", {
                        width: wrap(1080),
                        size: 29,
                        color: "#CBD5E1",
                      }),
                    ],
                  ),
                  column(
                    { width: fill, height: hug, gap: 10 },
                    [
                      p("Réalisé par : Ayoub El Youbi Ben Ameur • Akkouh Iliass • El Gourari Nassim", {
                        width: fill,
                        size: 23,
                        color: C.white,
                      }),
                      p("Encadré par : Pr. R. Abakouy • Année universitaire : 2025-2026 • Module : Gestion de projets informatiques", {
                        width: fill,
                        size: 21,
                        color: "#CBD5E1",
                      }),
                    ],
                  ),
                ],
              ),
              column(
                { width: fixed(420), height: fill, gap: 18, justify: "center" },
                [
                  p("MVP", { width: fill, size: 88, bold: true, color: "#93C5FD" }),
                  rule({ width: fixed(180), stroke: C.violet, weight: 8 }),
                  p("QCD", { width: fill, size: 74, bold: true, color: C.white }),
                  p("Cadrage • Roadmap • Backlog • Risques • Tests • Livrables", {
                    width: fill,
                    size: 27,
                    color: "#CBD5E1",
                  }),
                ],
              ),
            ],
          ),
        ],
      ),
      { frame: { left: 0, top: 0, width: W, height: H }, baseUnit: 8 },
    );
  }

  addCover();

  slideShell(
    2,
    "Introduction",
    "Un projet web académique, géré comme un vrai projet informatique",
    "La plateforme centralise les activités du laboratoire et ajoute une couche IA simple pour améliorer l organisation et la collaboration.",
    grid(
      { width: fill, height: fill, columns: [fr(1), fr(1)], columnGap: 34, rowGap: 26 },
      [
        card("Digitaliser", "Remplacer les suivis dispersés par un espace web unique.", C.blue),
        card("Centraliser", "Regrouper membres, projets, équipements, publications et valorisation.", C.green),
        card("Piloter", "Mettre à disposition un dashboard pour les responsables du laboratoire.", C.violet),
        card("Assister par IA", "Extraire des mots-clés et recommander des collaborations scientifiques.", C.amber),
      ],
    ),
    "Introduire le projet en une minute : une application utile au laboratoire et une occasion d appliquer les méthodes de gestion de projets informatiques.",
  );

  slideShell(
    3,
    "Contexte",
    "Des informations scientifiques dispersées",
    "Dans beaucoup de laboratoires, les données existent déjà, mais elles sont stockées dans des supports séparés.",
    row(
      { width: fill, height: fill, gap: 42, align: "center" },
      [
        column(
          { width: grow(1), height: fill, gap: 20, justify: "center" },
          [
            lineItem("Fichiers Excel", "Listes de membres, projets et équipements maintenues manuellement.", C.green),
            lineItem("Documents Word", "Rapports, conventions et bilans scientifiques difficiles à consolider.", C.blue),
            lineItem("Emails et échanges", "Décisions, validations et informations dispersées entre acteurs.", C.violet),
            lineItem("Absence de système unique", "Le suivi devient lent, incomplet et peu visible.", C.amber),
          ],
        ),
        panel(
          { width: fixed(540), height: fill, fill: C.ink, borderRadius: 28, padding: { x: 38, y: 42 } },
          column(
            { width: fill, height: fill, gap: 28, justify: "center" },
            [
              p("Conséquence", { size: 26, bold: true, color: "#93C5FD" }),
              p("Le laboratoire possède beaucoup d informations, mais manque d une vision consolidée pour les exploiter efficacement.", {
                size: 40,
                bold: true,
                color: C.white,
              }),
            ],
          ),
        ),
      ],
    ),
    "Montrer que le besoin ne vient pas d une absence de données, mais d une absence de centralisation et de méthode de suivi.",
  );

  slideShell(
    4,
    "Problématique",
    "Comment centraliser, suivre et valoriser les activités du laboratoire ?",
    "La problématique relie la digitalisation, le suivi opérationnel, la collaboration et la valorisation scientifique.",
    column(
      { width: fill, height: fill, gap: 34, justify: "center" },
      [
        p("« Comment digitaliser et centraliser la gestion des activités d’un laboratoire de recherche universitaire tout en améliorant le suivi, la collaboration et la valorisation scientifique ? »", {
          width: fill,
          size: 43,
          bold: true,
          color: C.ink,
        }),
        grid(
          { width: fill, height: hug, columns: [fr(1), fr(1), fr(1)], columnGap: 22, rowGap: 22 },
          [
            card("Visibilité faible", "Les indicateurs sont difficiles à obtenir rapidement.", C.red, C.redSoft),
            card("Suivi projet limité", "Les responsables n ont pas une vue claire de l avancement.", C.amber, C.amberSoft),
            card("Collaboration peu exploitée", "Les domaines et publications ne sont pas utilisés pour recommander des liens.", C.violet, C.violetSoft),
          ],
        ),
      ],
    ),
    "Lire la problématique, puis la traduire en problèmes concrets : visibilité, suivi, gestion des équipements, organisation des publications et collaboration.",
  );

  slideShell(
    5,
    "Objectifs",
    "Un objectif général, plusieurs objectifs opérationnels",
    "Le périmètre fonctionnel a été construit pour aboutir à un MVP complet mais réaliste.",
    row(
      { width: fill, height: fill, gap: 34 },
      [
        panel(
          { width: grow(0.9), height: fill, fill: C.ink, borderRadius: 28, padding: { x: 38, y: 40 } },
          column(
            { width: fill, height: fill, gap: 24, justify: "center" },
            [
              p("Objectif général", { size: 27, bold: true, color: "#93C5FD" }),
              p("Développer une plateforme web intelligente pour gérer les activités d’un laboratoire de recherche.", {
                size: 41,
                bold: true,
                color: C.white,
              }),
            ],
          ),
        ),
        panel(
          { width: grow(1.1), height: fill, fill: C.white, borderRadius: 28, padding: { x: 38, y: 38 } },
          bulletList(
            [
              "Gérer les membres et leurs domaines",
              "Suivre les projets et leurs équipes",
              "Inventorier les équipements scientifiques",
              "Structurer les publications et auteurs",
              "Valoriser partenariats, prix et événements",
              "Afficher un dashboard statistique",
              "Intégrer IA/NLP pour mots-clés et recommandations",
            ],
            { size: 25, gap: 14 },
          ),
        ),
      ],
    ),
    "Insister sur la différence entre objectif général et objectifs spécifiques. Les objectifs spécifiques deviennent ensuite les modules du backlog.",
  );

  slideShell(
    6,
    "Périmètre",
    "Un MVP volontairement maîtrisé",
    "Le périmètre a permis de protéger la qualité et le délai en limitant les fonctionnalités non essentielles.",
    grid(
      { width: fill, height: fill, columns: [fr(1), fr(1)], columnGap: 36 },
      [
        card("Inclus", [
          "Authentification et rôles",
          "CRUD membres, projets, équipements",
          "CRUD publications et valorisation",
          "Dashboard statistique",
          "IA/NLP simple",
          "Documentation et tests principaux",
        ], C.green, C.greenSoft),
        card("Exclus", [
          "Application mobile",
          "Intégration Google Scholar / Scopus réelle",
          "Gestion financière avancée",
          "IA avancée ou payante",
          "Workflow administratif complexe",
        ], C.red, C.redSoft),
      ],
    ),
    "Expliquer que la gestion de projet consiste aussi à dire ce qui ne sera pas fait. Le périmètre évite la dérive fonctionnelle.",
  );

  slideShell(
    7,
    "Triangle QCD",
    "Qualité, coût et délai : trois contraintes liées",
    "Modifier l’une de ces contraintes impacte directement les autres.",
    row(
      { width: fill, height: fill, gap: 36, align: "center" },
      [
        layers(
          { width: fixed(560), height: fixed(520), alignItems: "center", justifyItems: "center" },
          [
            shape({ width: fixed(500), height: fixed(430), geometry: "triangle", fill: C.blueSoft }),
            column(
              { width: fixed(390), height: fixed(330), gap: 8, align: "center", justify: "center" },
              [
                p("QCD", { width: fill, size: 70, bold: true, color: C.blueDark }),
                p("Qualité", { width: fill, size: 28, bold: true, color: C.ink }),
                p("Coût", { width: fill, size: 28, bold: true, color: C.ink }),
                p("Délai", { width: fill, size: 28, bold: true, color: C.ink }),
              ],
            ),
          ],
        ),
        grid(
          { width: grow(1), height: fill, columns: [fr(1)], rows: [fr(1), fr(1), fr(1)], rowGap: 12 },
          [
            compactCard("Qualité", ["Application fonctionnelle", "Données cohérentes", "Interface claire", "Sécurité minimale", "Tests CRUD"], C.blue),
            compactCard("Coût", ["Outils open-source", "Laravel, React, MySQL, FastAPI", "Aucun service payant", "Développement étudiant"], C.green),
            compactCard("Délai", ["Durée limitée", "Livraison progressive", "Priorisation du MVP"], C.amber),
          ],
        ),
      ],
    ),
    "Faire le lien avec le cours : si nous ajoutons trop de fonctions, le délai augmente ou la qualité baisse. Le MVP est donc un choix de gestion QCD.",
  );

  slideShell(
    8,
    "Acteurs et rôles",
    "Une lecture projet et une lecture application",
    "Les acteurs ont été identifiés pour cadrer les responsabilités et les droits d accès.",
    grid(
      { width: fill, height: fill, columns: [fr(1), fr(1)], columnGap: 36 },
      [
        card("Acteurs projet", [
          "MOA : laboratoire universitaire et utilisateurs finaux",
          "MOE : équipe de développement",
          "Chef de projet : coordination, planning, suivi",
          "Utilisateurs finaux : admin, responsable, chercheur",
        ], C.blue),
        card("Rôles application", [
          "Admin : gère toute la plateforme",
          "Responsable : gère les activités du laboratoire",
          "Chercheur : consulte et ajoute ses contributions",
        ], C.violet, C.violetSoft),
      ],
    ),
    "Présenter les rôles selon le vocabulaire du cours : MOA, MOE, chef de projet, utilisateurs. Puis montrer leur traduction dans l application.",
  );

  slideShell(
    9,
    "Fonctionnalités",
    "Sept modules pour couvrir le cycle d activité du laboratoire",
    "Chaque module correspond à un besoin fonctionnel identifié dans le cadrage.",
    grid(
      { width: fill, height: fill, columns: [fr(1), fr(1), fr(1), fr(1)], rows: [fr(1), fr(1)], columnGap: 20, rowGap: 20 },
      [
        card("Membres", "Profils, grades et domaines de recherche.", C.blue),
        card("Projets", "Responsable, équipe, statut et budget.", C.green),
        card("Équipements", "Inventaire, statut et réservation simple.", C.amber),
        card("Publications", "Auteurs, projet lié, DOI et mots-clés.", C.violet),
        card("Valorisation", "Brevets, partenariats, événements et prix.", C.blueDark),
        card("Dashboard", "Cartes statistiques et graphiques.", C.green),
        card("IA/NLP", "Extraction de mots-clés et recommandations.", C.violet),
        card("Documentation", "README, conception, risques et tests.", C.slate),
      ],
    ),
    "Cette slide sert de carte fonctionnelle avant de passer à l architecture technique.",
  );

  slideShell(
    10,
    "Architecture technique",
    "Une architecture en couches claire et évolutive",
    "Chaque couche a une responsabilité distincte, ce qui rend le MVP maintenable.",
    column(
      { width: fill, height: fill, gap: 18, justify: "center" },
      [
        row(
          { width: fill, height: fixed(124), gap: 16, align: "center" },
          [
            architectureLayer("Présentation", "React + Inertia.js + Tailwind CSS", C.blue),
            shape({ width: fixed(64), height: fixed(34), geometry: "rightArrow", fill: C.line }),
            architectureLayer("Métier", "Laravel Controllers + Services + Requests", C.violet),
          ],
        ),
        row(
          { width: fill, height: fixed(124), gap: 16, align: "center" },
          [
            architectureLayer("Données", "MySQL + migrations + seeders", C.green),
            shape({ width: fixed(64), height: fixed(34), geometry: "rightArrow", fill: C.line }),
            architectureLayer("IA", "Python + FastAPI + NLP simple", C.amber),
          ],
        ),
        row(
          { width: fill, height: fixed(124), gap: 16, align: "center" },
          [
            architectureLayer("Versioning", "Git/GitHub pour suivre les changements", C.blueDark),
            shape({ width: fixed(64), height: fixed(34), geometry: "rightArrow", fill: C.line }),
            architectureLayer("Qualité", "Tests PHPUnit + validation serveur", C.red),
          ],
        ),
      ],
    ),
    "Expliquer que l architecture sépare l interface, la logique métier, la base de données, l IA et le versioning. C est une application concrète de la conception.",
  );

  slideShell(
    11,
    "Modèle de données",
    "Les entités reflètent les activités réelles du laboratoire",
    "Le modèle relie membres, projets, publications, équipements et valorisation.",
    row(
      { width: fill, height: fill, gap: 36 },
      [
        panel(
          { width: grow(1), height: fill, fill: C.white, borderRadius: 28, padding: { x: 34, y: 34 } },
          grid(
            { width: fill, height: fill, columns: [fr(1), fr(1)], columnGap: 18, rowGap: 18 },
            ["User", "Member", "ResearchProject", "Equipment", "Publication", "Valorisation", "EquipmentReservation"].map((item, i) =>
              panel(
                { fill: i % 2 === 0 ? C.blueSoft : C.violetSoft, borderRadius: 18, padding: { x: 22, y: 18 } },
                p(item, { width: fill, size: 24, bold: true, color: C.ink }),
              ),
            ),
          ),
        ),
        panel(
          { width: grow(1), height: fill, fill: C.ink, borderRadius: 28, padding: { x: 38, y: 38 } },
          bulletList(
            [
              "Un membre participe à plusieurs projets",
              "Un projet possède un responsable",
              "Une publication a plusieurs auteurs",
              "Un équipement peut être réservé",
              "Une valorisation peut être liée à un projet ou un membre",
            ],
            { size: 27, color: C.white, dot: "#93C5FD", gap: 20 },
          ),
        ),
      ],
    ),
    "Mettre en avant les relations principales plutôt que les colonnes. Le modèle de données matérialise le périmètre fonctionnel.",
  );

  slideShell(
    12,
    "Méthodes appliquées",
    "Du cadrage à la livraison : la démarche du cours appliquée au projet",
    "Chaque étape de gestion de projet a produit un livrable ou une décision concrète.",
    column(
      { width: fill, height: fill, gap: 18 },
      [
        lineItem("Avant-projet", "Étude d opportunité, faisabilité, besoins, périmètre, risques initiaux.", C.blue),
        lineItem("Conception", "Architecture technique, modèle de données, choix Laravel/React/MySQL/FastAPI.", C.violet),
        lineItem("Réalisation", "Développement modulaire, Git/GitHub, itérations, CRUD par module.", C.green),
        lineItem("Validation", "Tests fonctionnels, rôles, CRUD, dashboard et service IA avec mock.", C.amber),
        lineItem("Livraison", "README, documentation finale, démonstration et présentation.", C.red),
      ],
    ),
    "C est une slide centrale. Pour chaque méthode vue en cours, donner l exemple concret produit dans le projet.",
  );

  slideShell(
    13,
    "Approche hybride",
    "Un cadrage structuré, une réalisation itérative",
    "Le projet avait des besoins connus au départ, mais l interface et l IA demandaient des ajustements progressifs.",
    row(
      { width: fill, height: fill, gap: 34 },
      [
        panel(
          { width: grow(1), height: fill, fill: C.blueSoft, borderRadius: 28, padding: { x: 38, y: 38 } },
          column(
            { width: fill, height: fill, gap: 18, justify: "center" },
            [
              p("Cycle classique", { size: 34, bold: true, color: C.blueDark }),
              bulletList(["Cadrage initial", "Périmètre", "Conception", "Planification"], { size: 26, dot: C.blueDark }),
            ],
          ),
        ),
        panel(
          { width: grow(1), height: fill, fill: C.violetSoft, borderRadius: 28, padding: { x: 38, y: 38 } },
          column(
            { width: fill, height: fill, gap: 18, justify: "center" },
            [
              p("Agile / Kanban", { size: 34, bold: true, color: C.violet }),
              bulletList(["Backlog", "Sprints", "Livraison incrémentale", "Amélioration continue"], { size: 26, dot: C.violet }),
            ],
          ),
        ),
      ],
    ),
    "Expliquer que l approche hybride convient car les besoins principaux sont stables, mais certaines parties évoluent en réalisation.",
  );

  slideShell(
    14,
    "Roadmap",
    "Quatre sprints pour livrer un MVP complet",
    "La roadmap transforme les objectifs en étapes maîtrisables.",
    row(
      { width: fill, height: fill, gap: 20, align: "stretch" },
      [
        card("Sprint 1 — Cadrage", ["Cahier des charges", "Périmètre", "Rôles", "Architecture", "Base de données"], C.blue),
        card("Sprint 2 — Backend", ["Migrations", "Models", "Controllers", "Authentification", "Rôles"], C.violet),
        card("Sprint 3 — Frontend", ["Pages React", "Dashboard", "Formulaires", "Navigation"], C.green),
        card("Sprint 4 — Livraison", ["FastAPI", "Intégration IA", "Tests", "Documentation", "Présentation"], C.amber),
      ],
    ),
    "Présenter la roadmap comme un outil de suivi du délai. Chaque sprint correspond à un résultat vérifiable.",
  );

  slideShell(
    15,
    "Backlog / Kanban",
    "Un suivi visuel pour contrôler l avancement",
    "Le Kanban permet de voir ce qui reste, ce qui avance et ce qui est livré.",
    grid(
      { width: fill, height: fill, columns: [fr(1), fr(1), fr(1)], columnGap: 26 },
      [
        card("À faire", ["Gestion utilisateurs avancée", "IA avancée", "Export PDF"], C.amber, C.amberSoft),
        card("En cours", ["Amélioration interface", "Tests complémentaires", "Préparation soutenance"], C.blue, C.blueSoft),
        card("Terminé", ["Authentification", "CRUD principaux", "Dashboard", "Valorisation", "Service IA simple"], C.green, C.greenSoft),
      ],
    ),
    "Relier le Kanban à la maîtrise de l avancement. Il évite les tâches invisibles et aide à prioriser.",
  );

  slideShell(
    16,
    "Planning",
    "Un mini-Gantt pour maîtriser le délai",
    "Le planning a permis de prioriser le MVP et d organiser le travail sur quatre semaines.",
    column(
      { width: fill, height: fill, gap: 18 },
      [
        ganttRow("Analyse et cadrage", [1], C.blue),
        ganttRow("Conception BD et architecture", [1], C.violet),
        ganttRow("Backend Laravel", [2], C.green),
        ganttRow("Frontend React", [2, 3], C.blueDark),
        ganttRow("IA / FastAPI", [3], C.amber),
        ganttRow("Tests et corrections", [4], C.red),
        ganttRow("Documentation et présentation", [4], C.slate),
      ],
    ),
    "Le planning montre la séquence logique : cadrage, conception, réalisation, IA, tests et livraison.",
  );

  function ganttRow(label, weeks, color) {
    return grid(
      { width: fill, height: fixed(76), columns: [fixed(430), fr(1), fr(1), fr(1), fr(1)], columnGap: 12, alignItems: "center" },
      [
        p(label, { size: 24, bold: true, color: C.ink }),
        ...[1, 2, 3, 4].map((week) =>
          panel(
            { fill: weeks.includes(week) ? color : C.white, borderRadius: 14, padding: { x: 14, y: 16 } },
            p(weeks.includes(week) ? `Semaine ${week}` : "", {
              width: fill,
              size: 19,
              bold: true,
              color: weeks.includes(week) ? C.white : C.muted,
            }),
          ),
        ),
      ],
    );
  }

  slideShell(
    17,
    "Risques et solutions",
    "Anticiper les problèmes pour sécuriser le MVP",
    "La gestion des risques a été appliquée aux dimensions organisationnelles, techniques, qualité et fonctionnelles.",
    riskTable(),
    "Présenter les risques non pas comme une liste théorique, mais comme des décisions concrètes : priorisation, tests, migrations, fallback IA.",
  );

  function riskTable() {
    const rows = [
      ["Retard de développement", "Organisationnel", "Élevé", "Priorisation MVP + tâches réparties"],
      ["Problèmes Git/GitHub", "Technique", "Moyen", "Pull régulier + commits clairs"],
      ["Service IA indisponible", "Technique", "Moyen", "Message propre + fallback"],
      ["Bugs CRUD", "Qualité", "Élevé", "Tests fonctionnels réguliers"],
      ["Mauvaise compréhension", "Fonctionnel", "Élevé", "Cadrage + périmètre clair"],
      ["Problème base de données", "Technique", "Moyen", "Migrations + seeders"],
      ["Interface peu claire", "Ergonomie", "Moyen", "UI Tailwind + amélioration continue"],
    ];
    return column(
      { width: fill, height: fill, gap: 10 },
      [
        grid(
          { width: fill, height: fixed(54), columns: [fr(1.2), fr(0.8), fr(0.55), fr(1.55)], columnGap: 10 },
          ["Risque", "Type", "Impact", "Solution"].map((h) =>
            panel({ fill: C.ink, borderRadius: 12, padding: { x: 16, y: 12 } }, p(h, { size: 20, bold: true, color: C.white })),
          ),
        ),
        ...rows.map((r, i) =>
          grid(
            { width: fill, height: fixed(72), columns: [fr(1.2), fr(0.8), fr(0.55), fr(1.55)], columnGap: 10 },
            r.map((cell, j) =>
              panel(
                { fill: i % 2 === 0 ? C.white : "#F1F5F9", borderRadius: 10, padding: { x: 16, y: 13 } },
                p(cell, {
                  size: j === 2 ? 19 : 18,
                  bold: j === 2,
                  color: j === 2 && cell === "Élevé" ? C.red : C.slate,
                }),
              ),
            ),
          ),
        ),
      ],
    );
  }

  slideShell(
    18,
    "Tests et validation",
    "Prouver que le MVP fonctionne",
    "La validation combine tests fonctionnels, validation des données et tests du service IA.",
    row(
      { width: fill, height: fill, gap: 34 },
      [
        panel(
          { width: grow(1.1), height: fill, fill: C.white, borderRadius: 28, padding: { x: 34, y: 34 } },
          grid(
            { width: fill, height: fill, columns: [fr(1), fr(1)], columnGap: 18, rowGap: 18 },
            [
              "Connexion",
              "Création membre",
              "Modification membre",
              "Création projet",
              "Ajout équipement",
              "Ajout publication",
              "Extraction IA",
              "Accès dashboard",
              "Vérification rôles",
            ].map((item) => smallPill(item, C.blueDark, C.blueSoft)),
          ),
        ),
        card("Critères de validation", [
          "Aucune erreur bloquante",
          "CRUD fonctionnels",
          "Base de données cohérente",
          "Interface accessible",
          "Service IA testé",
        ], C.green, C.greenSoft),
      ],
    ),
    "Insister sur les tests comme étape de validation projet. Le code n est livré qu après vérification des scénarios critiques.",
  );

  slideShell(
    19,
    "Livrables",
    "Des livrables de gestion, conception, réalisation et validation",
    "Le projet ne se limite pas au code : il produit aussi des documents de pilotage et de preuve.",
    grid(
      { width: fill, height: fill, columns: [fr(1), fr(1)], rowGap: 24, columnGap: 24 },
      [
        card("Gestion de projet", ["Note de cadrage", "Cahier des charges", "Planning", "Registre des risques"], C.blue),
        card("Conception", ["Architecture technique", "Modèle de données", "Maquettes / interfaces"], C.violet),
        card("Réalisation", ["Code Laravel/React", "Base MySQL", "Service IA FastAPI", "Dashboard"], C.green),
        card("Validation / Livraison", ["Tests", "README", "Présentation", "Démonstration"], C.amber),
      ],
    ),
    "Montrer que chaque phase a un livrable associé : c est une preuve de méthode et de traçabilité.",
  );

  slideShell(
    20,
    "Démonstration",
    "Un scénario simple pour prouver la solution",
    "La démonstration montre le passage de la conception à une solution fonctionnelle.",
    grid(
      { width: fill, height: fill, columns: [fr(1), fr(1), fr(1), fr(1), fr(1)], rowGap: 22, columnGap: 18 },
      [
        "1. Accueil",
        "2. Connexion admin",
        "3. Dashboard",
        "4. Ajouter membre",
        "5. Ajouter projet",
        "6. Ajouter équipement",
        "7. Ajouter publication",
        "8. Mots-clés IA",
        "9. Recommandations IA",
        "10. Déconnexion",
      ].map((step, i) =>
        panel(
          { fill: i < 5 ? C.blueSoft : C.violetSoft, borderRadius: 20, padding: { x: 20, y: 28 } },
          p(step, { width: fill, size: 25, bold: true, color: C.ink }),
        ),
      ),
    ),
    "Utiliser cette slide comme guide lors de la démonstration finale. Elle structure le parcours devant le professeur.",
  );

  slideShell(
    21,
    "Résultats",
    "Un MVP fonctionnel et présentable",
    "Les résultats couvrent la solution technique, la gestion du projet et les livrables académiques.",
    grid(
      { width: fill, height: fill, columns: [fr(1), fr(1), fr(1)], columnGap: 24, rowGap: 24 },
      [
        metric("5", "CRUD principaux réalisés", C.blue),
        metric("40", "tests Laravel passés", C.green),
        metric("1", "service IA FastAPI intégré", C.violet),
        metric("3", "rôles utilisateurs", C.amber),
        metric("4", "documents projet", C.blueDark),
        metric("1", "dashboard statistique", C.red),
      ].map((m) => panel({ fill: C.white, borderRadius: 28, padding: { x: 30, y: 30 } }, m)),
    ),
    "Mettre en avant les résultats concrets : application, dashboard, IA, rôles, documentation et tests.",
  );

  slideShell(
    22,
    "Conclusion",
    "Développer une solution, mais surtout piloter un projet",
    "Le projet combine développement web, base de données, intelligence artificielle et gestion de projet informatique.",
    column(
      { width: fill, height: fill, gap: 34, justify: "center" },
      [
        p("« Nous avons appliqué une démarche structurée allant du cadrage jusqu’à la validation, en tenant compte des contraintes QCD, des risques, du planning, des rôles et des livrables. »", {
          width: fill,
          size: 48,
          bold: true,
          color: C.ink,
        }),
        row(
          { width: fill, height: hug, gap: 16 },
          [
            smallPill("Cadrage", C.blueDark, C.blueSoft),
            smallPill("QCD", C.violet, C.violetSoft),
            smallPill("Roadmap", C.green, C.greenSoft),
            smallPill("Risques", C.amber, C.amberSoft),
            smallPill("Tests", C.red, C.redSoft),
            smallPill("Livraison", C.blueDark, C.blueSoft),
          ],
        ),
      ],
    ),
    "Conclure fortement : le projet montre la capacité à transformer un besoin en solution grâce à une démarche de gestion de projet.",
  );

  await mkdir(PREVIEW_DIR, { recursive: true });
  await mkdir(LAYOUT_DIR, { recursive: true });

  async function saveBlob(blob, filePath) {
    if (typeof blob.arrayBuffer === "function") {
      await writeFile(filePath, Buffer.from(await blob.arrayBuffer()));
      return;
    }

    if (blob.data) {
      await writeFile(filePath, Buffer.from(blob.data));
      return;
    }

    if (typeof blob.save === "function") {
      await blob.save(filePath);
      return;
    }

    throw new Error(`Impossible d'enregistrer le fichier ${filePath}`);
  }

  const pptxBlob = await PresentationFile.exportPptx(presentation);
  await saveBlob(pptxBlob, OUT);

  for (let i = 0; i < presentation.slides.count; i += 1) {
    const slide = presentation.slides.getItem(i);
    const png = await slide.export({ format: "png" });
    await saveBlob(png, path.join(PREVIEW_DIR, `source_slide_${String(i + 1).padStart(2, "0")}.png`));
    const layout = await slide.export({ format: "layout" });
    await writeFile(path.join(LAYOUT_DIR, `slide_${String(i + 1).padStart(2, "0")}.json`), JSON.stringify(layout, null, 2), "utf8");
  }

  const savedBytes = await readFile(OUT);
  const imported = await PresentationFile.importPptx(savedBytes);
  for (let i = 0; i < imported.slides.count; i += 1) {
    const slide = imported.slides.getItem(i);
    const png = await slide.export({ format: "png" });
    await saveBlob(png, path.join(PREVIEW_DIR, `pptx_slide_${String(i + 1).padStart(2, "0")}.png`));
  }

  return {
    pptx: path.resolve(OUT),
    previewDir: path.resolve(PREVIEW_DIR),
    layoutDir: path.resolve(LAYOUT_DIR),
    slideCount: presentation.slides.count,
    notesCount: notes.length,
  };
}
