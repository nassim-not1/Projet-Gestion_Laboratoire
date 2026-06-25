import ApplicationLogo from '@/Components/ApplicationLogo';
import ThemeToggle from '@/Components/ThemeToggle';
import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    const modules = [
        {
            title: 'Membres',
            description: 'Chercheurs, doctorants, responsables et domaines de recherche.',
            metric: '50+',
            tone: 'bg-teal-50 text-teal-800',
        },
        {
            title: 'Projets',
            description: 'Suivi des projets, statuts, equipes, budgets et livrables.',
            metric: '20+',
            tone: 'bg-sky-50 text-sky-800',
        },
        {
            title: 'Equipements',
            description: 'Inventaire, disponibilites, responsables et reservations.',
            metric: '8',
            tone: 'bg-amber-50 text-amber-800',
        },
        {
            title: 'Publications',
            description: 'Articles, conferences, DOI, auteurs et mots-cles.',
            metric: '100+',
            tone: 'bg-emerald-50 text-emerald-800',
        },
        {
            title: 'Valorisation',
            description: 'Partenariats, brevets, evenements, prix et transferts.',
            metric: '12',
            tone: 'bg-slate-100 text-slate-700',
        },
        {
            title: 'IA / NLP',
            description: 'Extraction de mots-cles et recommandations de collaboration.',
            metric: 'IA',
            tone: 'bg-teal-50 text-teal-800',
        },
    ];

    const stats = [
        { value: '6', label: 'modules metier' },
        { value: '1', label: 'tableau de bord central' },
        { value: 'IA', label: 'recommandations integrees' },
    ];

    return (
        <>
            <Head title="Accueil" />

            <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
                <section className="flex min-h-[72vh] flex-col border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
                    <header className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-5">
                        <Link href="/" className="flex items-center gap-3">
                            <ApplicationLogo className="h-11 w-11" />
                            <span className="text-lg font-semibold text-slate-950 dark:text-white">Plateforme Laboratoire</span>
                        </Link>

                        <nav className="flex items-center gap-2 sm:gap-3">
                            <ThemeToggle />

                            {auth?.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="btn-primary"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="btn-secondary hidden sm:inline-flex"
                                    >
                                        Connexion
                                    </Link>

                                    <Link
                                        href={route('register')}
                                        className="btn-primary"
                                    >
                                        Creer un compte
                                    </Link>
                                </>
                            )}
                        </nav>
                    </header>

                    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 pb-10 pt-8">
                        <div className="max-w-4xl">
                            <p className="page-kicker">Recherche universitaire</p>
                            <h1 className="mt-4 text-4xl font-semibold leading-tight text-slate-950 dark:text-white md:text-6xl">
                                Plateforme intelligente de laboratoire
                            </h1>
                            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                                Centralisez les membres, projets, equipements, publications, activites de valorisation et recommandations IA dans un espace clair et operationnel.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-3">
                                <Link
                                    href={auth?.user ? route('dashboard') : route('login')}
                                    className="btn-primary"
                                >
                                    Acceder a la plateforme
                                </Link>
                                {!auth?.user && (
                                    <Link
                                        href={route('register')}
                                        className="btn-secondary"
                                    >
                                        Demarrer
                                    </Link>
                                )}
                            </div>
                        </div>

                        <div className="mt-10 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/60">
                                <div className="flex items-center justify-between gap-3">
                                    <p className="text-sm font-semibold text-slate-950 dark:text-white">Activite recherche</p>
                                    <span className="status-pill">Actif</span>
                                </div>
                                <div className="mt-4 space-y-3">
                                    <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800">
                                        <div className="h-2 w-4/5 rounded-full bg-teal-600 dark:bg-teal-400" />
                                    </div>
                                    <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800">
                                        <div className="h-2 w-3/5 rounded-full bg-sky-600 dark:bg-sky-400" />
                                    </div>
                                </div>
                            </div>
                            {stats.map((stat) => (
                                <div key={stat.label} className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/60">
                                    <p className="text-2xl font-semibold text-teal-700 dark:text-teal-300">{stat.value}</p>
                                    <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </main>
                </section>

                <section className="mx-auto max-w-7xl px-6 py-14">
                    <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                        <div>
                            <p className="page-kicker">Modules principaux</p>
                            <h2 className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">
                                Tout le laboratoire dans un seul espace
                            </h2>
                        </div>
                        <Link
                            href={auth?.user ? route('dashboard') : route('login')}
                            className="btn-secondary"
                        >
                            Ouvrir l'application
                        </Link>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {modules.map((module) => (
                            <article key={module.title} className="app-surface p-5">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <h3 className="text-lg font-semibold text-slate-950 dark:text-white">{module.title}</h3>
                                        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{module.description}</p>
                                    </div>
                                    <span className={`rounded-md px-3 py-1 text-sm font-semibold ${module.tone}`}>
                                        {module.metric}
                                    </span>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
}
