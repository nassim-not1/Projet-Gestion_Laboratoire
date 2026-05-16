import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Accueil" />

            <div className="min-h-screen bg-slate-950 text-white">
                <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
                    <div>
                        <h1 className="text-xl font-bold">
                            Plateforme Laboratoire
                        </h1>
                        <p className="text-sm text-slate-400">
                            Gestion intelligente des activités de recherche
                        </p>
                    </div>

                    <nav className="flex gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-200 hover:text-white"
                                >
                                    Connexion
                                </Link>

                                <Link
                                    href={route('register')}
                                    className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                                >
                                    Créer un compte
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                <main className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-20 lg:grid-cols-2">
                    <section>
                        <p className="mb-4 inline-block rounded-full bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300">
                            Projet académique — Gestion de projets informatiques
                        </p>

                        <h2 className="text-4xl font-bold leading-tight md:text-5xl">
                            Digitalisation des laboratoires de recherche universitaires
                        </h2>

                        <p className="mt-6 max-w-2xl text-lg text-slate-300">
                            Une plateforme web pour centraliser les membres, projets,
                            équipements, publications, activités de valorisation et
                            recommandations IA.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <Link
                                href={auth.user ? route('dashboard') : route('login')}
                                className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-500"
                            >
                                Accéder à la plateforme
                            </Link>

                            <Link
                                href={route('register')}
                                className="rounded-xl border border-slate-700 px-6 py-3 font-semibold text-slate-200 hover:border-slate-500"
                            >
                                Créer un compte
                            </Link>
                        </div>
                    </section>

                    <section className="grid gap-4">
                        <div className="rounded-2xl bg-white/10 p-6 shadow-xl">
                            <h3 className="text-lg font-semibold">Modules principaux</h3>
                            <ul className="mt-4 space-y-3 text-slate-300">
                                <li>✅ Gestion des membres du laboratoire</li>
                                <li>✅ Gestion des projets de recherche</li>
                                <li>✅ Gestion des équipements scientifiques</li>
                                <li>✅ Gestion des publications</li>
                                <li>✅ Valorisation scientifique</li>
                                <li>✅ Dashboard statistiques</li>
                                <li>✅ Recommandations IA/NLP</li>
                            </ul>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
}