import ApplicationLogo from '@/Components/ApplicationLogo';
import ThemeToggle from '@/Components/ThemeToggle';
import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    const modules = [
        {
            title: 'Membres',
            description: 'Chercheurs, doctorants, responsables et domaines de recherche.',
            metric: '50+',
        },
        {
            title: 'Projets',
            description: 'Suivi des projets, statuts, equipes, budgets et livrables.',
            metric: '20+',
        },
        {
            title: 'Equipements',
            description: 'Inventaire, disponibilites, responsables et reservations.',
            metric: '8',
        },
        {
            title: 'Publications',
            description: 'Articles, conferences, DOI, auteurs et mots-cles.',
            metric: '100+',
        },
        {
            title: 'Valorisation',
            description: 'Partenariats, brevets, evenements, prix et transferts.',
            metric: '12',
        },
        {
            title: 'IA / NLP',
            description: 'Extraction de mots-cles et recommandations de collaboration.',
            metric: 'IA',
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

            <div className="min-h-screen bg-slate-50 text-slate-900">
                <section className="flex min-h-[66vh] flex-col border-b border-slate-200 bg-white">
                    <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5">
                        <Link href="/" className="flex items-center gap-3">
                            <ApplicationLogo className="h-11 w-11" />
                            <span className="text-lg font-semibold text-slate-950">Plateforme Laboratoire</span>
                        </Link>

                        <nav className="flex items-center gap-3">
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
                                        className="btn-secondary"
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

                    <main className="mx-auto flex w-full max-w-7xl flex-1 items-center px-6 pb-16 pt-10">
                        <div className="max-w-3xl">
                            <p className="text-sm font-semibold text-teal-700">Recherche universitaire</p>
                            <h1 className="mt-4 text-4xl font-semibold leading-tight text-slate-950 md:text-6xl">
                                Plateforme intelligente de laboratoire
                            </h1>
                            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
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
                    </main>
                </section>

                <section className="mx-auto mt-6 grid w-[calc(100%-3rem)] max-w-7xl gap-3 md:grid-cols-3">
                    {stats.map((stat) => (
                        <div key={stat.label} className="relative z-10 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                            <p className="text-3xl font-semibold text-teal-700">{stat.value}</p>
                            <p className="mt-1 text-sm font-medium text-slate-500">{stat.label}</p>
                        </div>
                    ))}
                </section>

                <section className="mx-auto max-w-7xl px-6 py-14">
                    <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                        <div>
                            <p className="page-kicker">Modules principaux</p>
                            <h2 className="mt-2 text-3xl font-semibold text-slate-950">
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
                                        <h3 className="text-lg font-semibold text-slate-950">{module.title}</h3>
                                        <p className="mt-2 text-sm leading-6 text-slate-600">{module.description}</p>
                                    </div>
                                    <span className="rounded-md bg-teal-50 px-3 py-1 text-sm font-semibold text-teal-800">
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
