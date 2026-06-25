import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Sidebar({ open = false, onClose = () => {} }) {
    const links = [
        { label: 'Dashboard', description: 'Synthese du laboratoire', badge: 'DB', href: route('dashboard'), active: route().current('dashboard') },
        { label: 'Membres', description: 'Chercheurs et doctorants', badge: 'MB', href: route('members.index'), active: route().current('members.*') },
        { label: 'Projets', description: 'Suivi scientifique', badge: 'PR', href: route('research-projects.index'), active: route().current('research-projects.*') },
        { label: 'Equipements', description: 'Inventaire et reserves', badge: 'EQ', href: route('equipments.index'), active: route().current('equipments.*') },
        { label: 'Publications', description: 'Articles et conferences', badge: 'PB', href: route('publications.index'), active: route().current('publications.*') },
        { label: 'Valorisation', description: 'Brevets et partenariats', badge: 'VA', href: route('valorisations.index'), active: route().current('valorisations.*') },
        { label: 'Recommandations IA', description: 'Collaborations proposees', badge: 'IA', href: route('ai.recommendations'), active: route().current('ai.*') },
    ];

    const content = (
        <aside className="flex h-full w-72 flex-col border-r border-slate-200 bg-white text-slate-900 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100">
            <div className="shrink-0 border-b border-slate-200 px-5 py-4 dark:border-slate-800">
                <div className="flex items-center gap-3">
                    <ApplicationLogo className="h-10 w-10" />
                    <div>
                        <p className="text-sm font-semibold text-teal-700 dark:text-teal-300">Laboratoire</p>
                        <p className="mt-0.5 text-base font-semibold text-slate-950 dark:text-white">Plateforme recherche</p>
                    </div>
                </div>
                <p className="mt-4 rounded-md border border-teal-100 bg-teal-50 px-3 py-2 text-xs leading-5 text-teal-900 dark:border-teal-900/70 dark:bg-teal-950/60 dark:text-teal-100">
                    Pilotage des membres, projets, equipements et productions scientifiques.
                </p>
            </div>
            <nav className="min-h-0 flex-1 space-y-1.5 overflow-y-auto px-3 py-4">
                {links.map((link) => (
                    <Link
                        key={link.label}
                        href={link.href}
                        onClick={onClose}
                        className={`group flex items-center gap-3 rounded-lg border px-3 py-2.5 text-sm transition ${
                            link.active
                                ? 'border-teal-200 bg-teal-50 text-teal-900 shadow-sm shadow-teal-900/5 dark:border-teal-700/70 dark:bg-teal-950/70 dark:text-teal-100'
                                : 'border-transparent text-slate-700 hover:border-slate-200 hover:bg-slate-50 hover:text-slate-950 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-800 dark:hover:text-white'
                        }`}
                    >
                        <span
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-xs font-bold ${
                                link.active
                                    ? 'bg-teal-700 text-white dark:bg-teal-400 dark:text-slate-950'
                                    : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200 group-hover:text-slate-900 dark:bg-slate-800 dark:text-slate-300 dark:group-hover:bg-slate-700 dark:group-hover:text-white'
                            }`}
                        >
                            {link.badge}
                        </span>
                        <span className="min-w-0">
                            <span className="block truncate font-semibold">{link.label}</span>
                            <span className="mt-0.5 block truncate text-xs text-slate-500 dark:text-slate-400">{link.description}</span>
                        </span>
                    </Link>
                ))}
            </nav>
            <div className="shrink-0 border-t border-slate-200 bg-slate-50 px-5 py-3 text-xs leading-5 text-slate-500 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-400">
                MVP academique, pret pour demonstration.
            </div>
        </aside>
    );

    return (
        <>
            <div className="hidden lg:fixed lg:inset-y-0 lg:flex">{content}</div>
            {open && (
                <div className="fixed inset-0 z-40 lg:hidden">
                    <button
                        type="button"
                        className="absolute inset-0 bg-slate-900/35"
                        onClick={onClose}
                        aria-label="Fermer le menu"
                    />
                    <div className="relative h-full">{content}</div>
                </div>
            )}
        </>
    );
}
