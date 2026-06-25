import Pagination from '@/Components/Pagination';
import SelectInput from '@/Components/SelectInput';
import TableActions from '@/Components/TableActions';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';

export default function Index({ equipments, filters, statuses }) {
    const user = usePage().props.auth.user;
    const canManage = ['admin', 'responsable'].includes(user.role);
    const { data, setData } = useForm({
        search: filters.search || '',
        status: filters.status || '',
    });

    const submit = (event) => {
        event.preventDefault();
        router.get(route('equipments.index'), data, { preserveState: true, replace: true });
    };

    return (
        <AuthenticatedLayout header={<Header canManage={canManage} />}>
            <Head title="Equipements" />

            <form onSubmit={submit} className="filter-panel mb-6 grid gap-4 md:grid-cols-[minmax(0,1fr)_220px_auto] md:items-end">
                <div>
                    <label className="text-sm font-semibold text-slate-700">Recherche</label>
                    <TextInput
                        value={data.search}
                        onChange={(event) => setData('search', event.target.value)}
                        className="mt-1 block w-full"
                        placeholder="Nom, type ou code"
                    />
                </div>
                <SelectInput label="Statut" name="status" value={data.status} onChange={setData} options={statuses} placeholder="Tous les statuts" />
                <div className="flex flex-wrap items-end gap-2">
                    <button type="submit" className="btn-primary">Filtrer</button>
                    <Link href={route('equipments.index')} className="btn-secondary">
                        Reinitialiser
                    </Link>
                </div>
            </form>

            <div className="table-shell">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Equipement</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Code</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Statut</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Responsable</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {equipments.data.map((equipment) => (
                            <tr key={equipment.id} className="transition hover:bg-slate-50/80 dark:hover:bg-slate-800/60">
                                <td className="px-4 py-3">
                                    <p className="font-medium text-slate-950">{equipment.name}</p>
                                    <p className="text-sm text-slate-500">{equipment.type} - {equipment.location || 'Sans localisation'}</p>
                                </td>
                                <td className="px-4 py-3 text-sm text-slate-700">{equipment.inventory_code}</td>
                                <td className="px-4 py-3 text-sm text-slate-700">{equipment.status}</td>
                                <td className="px-4 py-3 text-sm text-slate-700">
                                    {equipment.responsible_member ? `${equipment.responsible_member.first_name} ${equipment.responsible_member.last_name}` : '-'}
                                </td>
                                <td className="px-4 py-3">
                                    <TableActions
                                        showHref={route('equipments.show', equipment.id)}
                                        editHref={route('equipments.edit', equipment.id)}
                                        deleteHref={route('equipments.destroy', equipment.id)}
                                        canEdit={canManage}
                                        canDelete={canManage}
                                    />
                                </td>
                            </tr>
                        ))}
                        {equipments.data.length === 0 && (
                            <tr>
                                <td colSpan="5" className="px-4 py-8 text-center text-sm text-slate-500">Aucun equipement trouve.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <Pagination links={equipments.links} />
        </AuthenticatedLayout>
    );
}

function Header({ canManage }) {
    return (
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
                <p className="page-kicker">Inventaire</p>
                <h1 className="page-title">Equipements scientifiques</h1>
                <p className="page-subtitle">Inventaire, disponibilite et reservations.</p>
            </div>
            {canManage && (
                <Link href={route('equipments.create')} className="btn-primary">
                    Ajouter un equipement
                </Link>
            )}
        </div>
    );
}
