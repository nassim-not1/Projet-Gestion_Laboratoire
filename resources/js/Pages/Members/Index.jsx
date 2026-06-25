import Pagination from '@/Components/Pagination';
import SelectInput from '@/Components/SelectInput';
import TableActions from '@/Components/TableActions';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';

export default function Index({ members, filters, grades }) {
    const user = usePage().props.auth.user;
    const canManage = ['admin', 'responsable'].includes(user.role);
    const { data, setData } = useForm({
        search: filters.search || '',
        grade: filters.grade || '',
    });

    const submit = (event) => {
        event.preventDefault();
        router.get(route('members.index'), data, { preserveState: true, replace: true });
    };

    return (
        <AuthenticatedLayout header={<PageHeader canManage={canManage} />}>
            <Head title="Membres" />

            <form onSubmit={submit} className="filter-panel mb-6 grid gap-4 md:grid-cols-[minmax(0,1fr)_220px_auto] md:items-end">
                <div>
                    <label className="text-sm font-semibold text-slate-700">Recherche</label>
                    <TextInput
                        value={data.search}
                        onChange={(event) => setData('search', event.target.value)}
                        className="mt-1 block w-full"
                        placeholder="Nom, email, domaine"
                    />
                </div>
                <SelectInput
                    label="Grade"
                    name="grade"
                    value={data.grade}
                    onChange={setData}
                    options={grades}
                    placeholder="Tous les grades"
                />
                <div className="flex flex-wrap items-end gap-2">
                    <button type="submit" className="btn-primary">
                        Filtrer
                    </button>
                    <Link href={route('members.index')} className="btn-secondary">
                        Reinitialiser
                    </Link>
                </div>
            </form>

            <div className="table-shell">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Membre</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Grade</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Domaine</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Activite</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {members.data.map((member) => (
                            <tr key={member.id} className="transition hover:bg-slate-50/80 dark:hover:bg-slate-800/60">
                                <td className="px-4 py-3">
                                    <p className="font-medium text-slate-950">{member.first_name} {member.last_name}</p>
                                    <p className="text-sm text-slate-500">{member.email}</p>
                                </td>
                                <td className="px-4 py-3 text-sm text-slate-700">{member.grade}</td>
                                <td className="px-4 py-3 text-sm text-slate-700">{member.research_domain}</td>
                                <td className="px-4 py-3 text-sm text-slate-600">
                                    {member.projects_count} projets, {member.publications_count} publications
                                </td>
                                <td className="px-4 py-3">
                                    <TableActions
                                        showHref={route('members.show', member.id)}
                                        editHref={route('members.edit', member.id)}
                                        deleteHref={route('members.destroy', member.id)}
                                        canEdit={canManage}
                                        canDelete={canManage}
                                    />
                                </td>
                            </tr>
                        ))}
                        {members.data.length === 0 && (
                            <tr>
                                <td colSpan="5" className="px-4 py-8 text-center text-sm text-slate-500">
                                    Aucun membre trouve.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <Pagination links={members.links} />
        </AuthenticatedLayout>
    );
}

function PageHeader({ canManage }) {
    return (
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
                <p className="page-kicker">Ressources humaines</p>
                <h1 className="page-title">Membres du laboratoire</h1>
                <p className="page-subtitle">Gestion des chercheurs, doctorants et responsables.</p>
            </div>
            {canManage && (
                <Link href={route('members.create')} className="btn-primary">
                    Ajouter un membre
                </Link>
            )}
        </div>
    );
}
