import { Link } from '@inertiajs/react';

export default function Sidebar({ open = false, onClose = () => {} }) {
    const links = [
        { label: 'Dashboard', href: route('dashboard'), active: route().current('dashboard') },
        { label: 'Membres', href: route('members.index'), active: route().current('members.*') },
        { label: 'Projets', href: route('research-projects.index'), active: route().current('research-projects.*') },
        { label: 'Equipements', href: route('equipments.index'), active: route().current('equipments.*') },
        { label: 'Publications', href: route('publications.index'), active: route().current('publications.*') },
        { label: 'Valorisation', href: route('valorisations.index'), active: route().current('valorisations.*') },
        { label: 'Recommandations IA', href: route('ai.recommendations'), active: route().current('ai.*') },
    ];

    const content = (
        <aside className="flex h-full w-72 flex-col border-r border-slate-200 bg-white">
            <div className="border-b border-slate-200 px-6 py-5">
                <p className="text-sm font-semibold uppercase tracking-normal text-indigo-700">Laboratoire</p>
                <p className="mt-1 text-lg font-semibold text-slate-950">Plateforme recherche</p>
            </div>
            <nav className="flex-1 space-y-1 px-3 py-4">
                {links.map((link) => (
                    <Link
                        key={link.label}
                        href={link.href}
                        onClick={onClose}
                        className={`block rounded-md px-4 py-2.5 text-sm font-medium transition ${
                            link.active
                                ? 'bg-indigo-50 text-indigo-800'
                                : 'text-slate-700 hover:bg-slate-50 hover:text-slate-950'
                        }`}
                    >
                        {link.label}
                    </Link>
                ))}
            </nav>
        </aside>
    );

    return (
        <>
            <div className="hidden lg:fixed lg:inset-y-0 lg:flex">{content}</div>
            {open && (
                <div className="fixed inset-0 z-40 lg:hidden">
                    <button
                        type="button"
                        className="absolute inset-0 bg-slate-900/40"
                        onClick={onClose}
                        aria-label="Fermer le menu"
                    />
                    <div className="relative h-full">{content}</div>
                </div>
            )}
        </>
    );
}
