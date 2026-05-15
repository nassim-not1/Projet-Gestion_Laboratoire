import Pagination from '@/Components/Pagination';
import SelectInput from '@/Components/SelectInput';
import TableActions from '@/Components/TableActions';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';

export default function Index({ valorisations, filters, types }) {
    const user = usePage().props.auth.user;
    const canManage = ['admin', 'responsable'].includes(user.role);
    const { data, setData } = useForm({
        search: filters.search || '',
        type: filters.type || '',
    });

    const submit = (event) => {
        event.preventDefault();
        router.get(route('valorisations.index'), data, { preserveState: true, replace: true });
    };

    return (
        <AuthenticatedLayout header={<Header canManage={canManage} />}>
            <Head title="Valorisation" />

            <form onSubmit={submit} className="mb-6 grid gap-4 rounded-md border border-slate-200 bg-white p-4 md:grid-cols-3">
                <div>
                    <label className="text-sm font-medium text-slate-700">Recherche</label>
                    <TextInput
                        value={data.search}
                        onChange={(event) => setData('search', event.target.value)}
                        className="mt-1 block w-full"
                        placeholder="Titre ou partenaire"
                    />
                </div>
                <SelectInput label="Type" name="type" value={data.type} onChange={setData} options={types} placeholder="Tous les types" />
                <div className="flex items-end gap-2">
                    <button className="rounded-md bg-indigo-700 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-800">Filtrer</button>
                    <Link href={route('valorisations.index')} className="rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700">
                        Reinitialiser
                    </Link>
                </div>
            </form>

            <div className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Activite</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Type</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Date</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Partenaire</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {valorisations.data.map((valorisation) => (
                            <tr key={valorisation.id}>
                                <td className="px-4 py-3">
                                    <p className="font-medium text-slate-950">{valorisation.title}</p>
                                    <p className="text-sm text-slate-500">{valorisation.research_project?.title || 'Sans projet'}</p>
                                </td>
                                <td className="px-4 py-3 text-sm text-slate-700">{valorisation.type}</td>
                                <td className="px-4 py-3 text-sm text-slate-700">{valorisation.date?.slice(0, 10)}</td>
                                <td className="px-4 py-3 text-sm text-slate-700">{valorisation.partner_name || '-'}</td>
                                <td className="px-4 py-3">
                                    <TableActions
                                        showHref={route('valorisations.show', valorisation.id)}
                                        editHref={route('valorisations.edit', valorisation.id)}
                                        deleteHref={route('valorisations.destroy', valorisation.id)}
                                        canEdit={canManage}
                                        canDelete={canManage}
                                    />
                                </td>
                            </tr>
                        ))}
                        {valorisations.data.length === 0 && (
                            <tr>
                                <td colSpan="5" className="px-4 py-8 text-center text-sm text-slate-500">Aucune activite trouvee.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <Pagination links={valorisations.links} />
        </AuthenticatedLayout>
    );
}

function Header({ canManage }) {
    return (
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
                <h1 className="text-2xl font-semibold text-slate-950">Valorisation scientifique</h1>
                <p className="mt-1 text-sm text-slate-500">Brevets, partenariats, evenements, prix et transferts.</p>
            </div>
            {canManage && (
                <Link href={route('valorisations.create')} className="rounded-md bg-indigo-700 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-800">
                    Ajouter une activite
                </Link>
            )}
        </div>
    );
}
