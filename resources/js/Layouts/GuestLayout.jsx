import ApplicationLogo from '@/Components/ApplicationLogo';
import ThemeToggle from '@/Components/ThemeToggle';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-slate-50 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(420px,520px)]">
            <div className="relative hidden overflow-hidden bg-slate-950 lg:block">
                <img
                    src="/images/lab-hero.png"
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover opacity-55"
                />
                <div className="absolute inset-0 bg-slate-950/60" />
                <div className="relative flex h-full flex-col justify-between p-10 text-white">
                    <div className="flex items-center justify-between gap-4">
                        <Link href="/" className="flex items-center gap-3">
                            <ApplicationLogo className="h-11 w-11" />
                            <span className="text-lg font-semibold">Plateforme Laboratoire</span>
                        </Link>
                        <ThemeToggle className="border-white/20 bg-white/10 text-white hover:bg-white/15" />
                    </div>
                    <div className="max-w-xl">
                        <p className="page-kicker text-teal-200">Recherche universitaire</p>
                        <h1 className="mt-3 text-4xl font-semibold leading-tight">
                            Un espace centralise pour piloter les activites du laboratoire.
                        </h1>
                        <p className="mt-4 text-sm leading-6 text-slate-200">
                            Membres, projets, equipements, publications et recommandations IA dans une interface unifiee.
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex min-h-screen flex-col justify-center px-6 py-10 sm:px-10">
                <div className="mx-auto w-full max-w-md">
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
