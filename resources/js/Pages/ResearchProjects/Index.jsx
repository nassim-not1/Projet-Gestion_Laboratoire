import Pagination from '@/Components/Pagination';
import SelectInput from '@/Components/SelectInput';
import TableActions from '@/Components/TableActions';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';

export default function Index({ projects, filters, statuses }) {
    const user = usePage().props.auth.user;
    const canManage = ['admin', 'responsable'].includes(user.role);
    const { data, setData } = useForm({
        search: filters.search || '',
        status: filters.status || '',
    });

    const submit = (event) => {
        event.preventDefault();
        router.get(route('research-projects.index'), data, { preserveState: true, replace: true });
    };

    return (
        <AuthenticatedLayout header={<Header canManage={canManage} />}>
            <Head title="Projets de recherche" />

            <form onSubmit={submit} className="filter-panel mb-6 grid gap-4 md:grid-cols-[minmax(0,1fr)_220px_auto] md:items-end">
                <div>
                    <label className="text-sm font-semibold text-slate-700">Recherche</label>
                    <TextInput
                        value={data.search}
                        onChange={(event) => setData('search', event.target.value)}
                        className="mt-1 block w-full"
                        placeholder="Titre du projet"
                    />
                </div>
                <SelectInput label="Statut" name="status" value={data.status} onChange={setData} options={statuses} placeholder="Tous les statuts" />
                <div className="flex flex-wrap items-end gap-2">
                    <button type="submit" className="btn-primary">Filtrer</button>
                    <Link href={route('research-projects.index')} className="btn-secondary">
                        Reinitialiser
                    </Link>
                </div>
            </form>

            <div className="table-shell">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Projet</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Responsable</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Statut</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Equipe</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.data.map((project) => (
                            <tr key={project.id} className="transition hover:bg-slate-50/80 dark:hover:bg-slate-800/60">
                                <td className="px-4 py-3">
                                    <p className="font-medium text-slate-950">{project.title}</p>
                                    <p className="text-sm text-slate-500">{project.start_date?.slice(0, 10)} - {project.end_date?.slice(0, 10) || 'en cours'}</p>
                                </td>
                                <td className="px-4 py-3 text-sm text-slate-700">
                                    {project.responsable?.first_name} {project.responsable?.last_name}
                                </td>
                                <td className="px-4 py-3 text-sm text-slate-700">{project.status}</td>
                                <td className="px-4 py-3 text-sm text-slate-600">
                                    {project.members_count} membres, {project.publications_count} publications
                                </td>
                                <td className="px-4 py-3">
                                    <TableActions
                                        showHref={route('research-projects.show', project.id)}
                                        editHref={route('research-projects.edit', project.id)}
                                        deleteHref={route('research-projects.destroy', project.id)}
                                        canEdit={canManage}
                                        canDelete={canManage}
                                    />
                                </td>
                            </tr>
                        ))}
                        {projects.data.length === 0 && (
                            <tr>
                                <td colSpan="5" className="px-4 py-8 text-center text-sm text-slate-500">Aucun projet trouve.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <Pagination links={projects.links} />
        </AuthenticatedLayout>
    );
}

function Header({ canManage }) {
    return (
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
                <p className="page-kicker">Recherche</p>
                <h1 className="page-title">Projets de recherche</h1>
                <p className="page-subtitle">Suivi des projets, responsables et equipes.</p>
            </div>
            {canManage && (
                <Link href={route('research-projects.create')} className="btn-primary">
                    Ajouter un projet
                </Link>
            )}
        </div>
    );
}
