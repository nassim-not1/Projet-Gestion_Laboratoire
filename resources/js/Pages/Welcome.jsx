import { Head, Link } from "@inertiajs/react";

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Accueil - Plateforme Laboratoire" />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800">
                <nav className="bg-white dark:bg-slate-800 shadow">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center space-x-2">
                                <svg className="w-8 h-8 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM15.657 14.243a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM11 17a1 1 0 102 0v-1a1 1 0 10-2 0v1zM5.757 15.657a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM5 10a1 1 0 01-1-1V8a1 1 0 012 0v1a1 1 0 01-1 1zM5.757 5.757a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414-1.414l-.707-.707zM10 2.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" />
                                </svg>
                                <span className="text-xl font-bold text-slate-900 dark:text-white">Plateforme Laboratoire</span>
                            </div>
                            <div className="space-x-4">
                                {auth.user ? (
                                    <Link href={route("dashboard")} className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">Dashboard</Link>
                                ) : (
                                    <>
                                        <Link href={route("login")} className="inline-flex items-center px-4 py-2 text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 font-medium transition">Se connecter</Link>
                                        <Link href={route("register")} className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">S'inscrire</Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-4">Bienvenue sur la Plateforme de Gestion Laboratoire</h1>
                        <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">Solution complète pour digitaliser les activités de recherche scientifique</p>
                        {!auth.user && (
                            <div className="space-x-4">
                                <Link href={route("login")} className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium">Se connecter</Link>
                                <Link href={route("register")} className="inline-flex items-center px-6 py-3 bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 rounded-lg border-2 border-indigo-600 dark:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-600 transition font-medium">Créer un compte</Link>
                            </div>
                        )}
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
                        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 hover:shadow-xl transition">
                            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.856-1.487M15 10a3 3 0 11-6 0 3 3 0 016 0zM6 20h12a6 6 0 00-6-6 6 6 0 00-6 6z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Gestion des Membres</h3>
                            <p className="text-slate-600 dark:text-slate-400">Gérez facilement vos membres et leurs profils de recherche</p>
                        </div>

                        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 hover:shadow-xl transition">
                            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Projets de Recherche</h3>
                            <p className="text-slate-600 dark:text-slate-400">Suivez vos projets de recherche et leurs avancées</p>
                        </div>

                        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 hover:shadow-xl transition">
                            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Équipements Scientifiques</h3>
                            <p className="text-slate-600 dark:text-slate-400">Gérez l'inventaire et les réservations d'équipements</p>
                        </div>

                        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 hover:shadow-xl transition">
                            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17s4.5 10.747 10 10.747c5.5 0 10-4.998 10-10.747S17.5 6.253 12 6.253z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Publications</h3>
                            <p className="text-slate-600 dark:text-slate-400">Cataloguez et organisez vos publications scientifiques</p>
                        </div>

                        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 hover:shadow-xl transition">
                            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Valorisation</h3>
                            <p className="text-slate-600 dark:text-slate-400">Enregistrez brevets, partenariats et transferts technologiques</p>
                        </div>

                        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 hover:shadow-xl transition">
                            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10a1 1 0 11-2 0 1 1 0 012 0zM6 10a1 1 0 11-2 0 1 1 0 012 0zM18 10a1 1 0 11-2 0 1 1 0 012 0zM9 16a1 1 0 11-2 0 1 1 0 012 0zM15 16a1 1 0 11-2 0 1 1 0 012 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Recommandations IA</h3>
                            <p className="text-slate-600 dark:text-slate-400">Exploitez l'IA pour découvrir collaborations et opportunités</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8 mt-16">
                        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 text-center">
                            <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">10+</p>
                            <p className="text-slate-600 dark:text-slate-400 mt-2">Membres actifs</p>
                        </div>
                        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 text-center">
                            <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">5+</p>
                            <p className="text-slate-600 dark:text-slate-400 mt-2">Projets en cours</p>
                        </div>
                        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 text-center">
                            <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">50+</p>
                            <p className="text-slate-600 dark:text-slate-400 mt-2">Publications</p>
                        </div>
                        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 text-center">
                            <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">15+</p>
                            <p className="text-slate-600 dark:text-slate-400 mt-2">Équipements</p>
                        </div>
                    </div>
                </section>

                <footer className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 mt-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-slate-600 dark:text-slate-400">
                        <p>&copy; 2026 Plateforme de Gestion Laboratoire. Tous droits réservés.</p>
                    </div>
                </footer>
            </div>
        </>
    );
}
