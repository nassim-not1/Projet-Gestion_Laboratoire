import ApplicationLogo from '@/Components/ApplicationLogo';
import ThemeToggle from '@/Components/ThemeToggle';
import { Link } from '@inertiajs/react';

const authStats = [
    { label: 'Membres', value: '10', tone: 'bg-teal-50 text-teal-700' },
    { label: 'Projets', value: '5', tone: 'bg-sky-50 text-sky-700' },
    { label: 'Equipements', value: '8', tone: 'bg-amber-50 text-amber-700' },
];

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(440px,560px)]">
            <div className="relative hidden overflow-hidden border-r border-slate-200 bg-white lg:block dark:border-slate-800 dark:bg-slate-900">
                <div className="absolute inset-x-0 top-0 h-48 bg-teal-50 dark:bg-teal-950/40" />
                <div className="relative flex h-full min-h-screen flex-col justify-between gap-8 p-8 text-slate-950 dark:text-white xl:p-10">
                    <div className="flex items-center justify-between gap-4">
                        <Link href="/" className="flex items-center gap-3">
                            <ApplicationLogo className="h-11 w-11" />
                            <span className="text-lg font-semibold">Plateforme Laboratoire</span>
                        </Link>
                        <ThemeToggle />
                    </div>

                    <div className="max-w-3xl">
                        <p className="page-kicker">Recherche universitaire</p>
                        <h1 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight text-slate-950 dark:text-white xl:text-4xl">
                            Un espace centralise pour piloter les activites du laboratoire.
                        </h1>
                        <p className="mt-4 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                            Membres, projets, equipements, publications et recommandations IA dans une interface unifiee.
                        </p>

                        <div className="mt-8 grid max-w-2xl grid-cols-3 gap-3 xl:gap-4">
                            {authStats.map((stat) => (
                                <div key={stat.label} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-950/70 dark:shadow-black/20">
                                    <span className={`inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-bold ${stat.tone}`}>
                                        {stat.value}
                                    </span>
                                    <p className="mt-3 text-sm font-semibold text-slate-700 dark:text-slate-200">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid max-w-3xl grid-cols-[minmax(0,1fr)_minmax(240px,0.75fr)] gap-4 xl:gap-5">
                        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-950/70 dark:shadow-black/20">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-sm font-semibold text-slate-950 dark:text-white">Activite scientifique</p>
                                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Synthese hebdomadaire</p>
                                </div>
                                <span className="rounded-md bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">+12%</span>
                            </div>

                            <div className="mt-5 space-y-4">
                                <div>
                                    <div className="mb-2 flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
                                        <span>Publications</span>
                                        <span>72%</span>
                                    </div>
                                    <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800">
                                        <div className="h-2 w-[72%] rounded-full bg-teal-600 dark:bg-teal-400" />
                                    </div>
                                </div>
                                <div>
                                    <div className="mb-2 flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
                                        <span>Reservations</span>
                                        <span>58%</span>
                                    </div>
                                    <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800">
                                        <div className="h-2 w-[58%] rounded-full bg-sky-600 dark:bg-sky-400" />
                                    </div>
                                </div>
                                <div>
                                    <div className="mb-2 flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
                                        <span>Projets actifs</span>
                                        <span>84%</span>
                                    </div>
                                    <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800">
                                        <div className="h-2 w-[84%] rounded-full bg-amber-500 dark:bg-amber-400" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-950/70 dark:shadow-black/20">
                            <p className="text-sm font-semibold text-slate-950 dark:text-white">Suggestions IA</p>
                            <div className="mt-5 space-y-4">
                                <div className="flex items-start gap-3">
                                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-teal-600" />
                                    <div>
                                        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">NLP + Machine learning</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">Score 82%</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-sky-600" />
                                    <div>
                                        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Capteurs + IA</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">Score 74%</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex min-h-screen flex-col justify-center bg-slate-50 px-6 py-10 dark:bg-slate-950 sm:px-10">
                <div className="mx-auto w-full max-w-lg">
                    <div className="mb-8 flex items-center justify-between gap-4 lg:hidden">
                        <Link href="/" className="flex items-center gap-3">
                            <ApplicationLogo className="h-11 w-11" />
                            <span className="text-lg font-semibold text-slate-950">Plateforme Laboratoire</span>
                        </Link>
                        <ThemeToggle />
                    </div>

                    <div className="app-surface p-6 sm:p-8">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
