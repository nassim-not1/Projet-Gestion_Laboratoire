import Dropdown from '@/Components/Dropdown';
import { Link, usePage } from '@inertiajs/react';

export default function Navbar({ onMenuClick }) {
    const user = usePage().props.auth.user;

    return (
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
            <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={onMenuClick}
                        className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 lg:hidden"
                    >
                        Menu
                    </button>
                    <div>
                        <p className="text-sm font-semibold text-slate-950">Digitalisation des activites de recherche</p>
                        <p className="text-xs text-slate-500">MVP academique</p>
                    </div>
                </div>

                <Dropdown>
                    <Dropdown.Trigger>
                        <button
                            type="button"
                            className="rounded-md border border-slate-200 bg-white px-3 py-2 text-left text-sm transition hover:bg-slate-50"
                        >
                            <span className="block font-medium text-slate-900">{user.name}</span>
                            <span className="block text-xs text-slate-500">{user.role}</span>
                        </button>
                    </Dropdown.Trigger>
                    <Dropdown.Content align="right">
                        <Dropdown.Link href={route('profile.edit')}>Profil</Dropdown.Link>
                        <Dropdown.Link href={route('logout')} method="post" as="button">
                            Deconnexion
                        </Dropdown.Link>
                    </Dropdown.Content>
                </Dropdown>
            </div>
        </header>
    );
}
