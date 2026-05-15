import Pagination from '@/Components/Pagination';
import SelectInput from '@/Components/SelectInput';
import TableActions from '@/Components/TableActions';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';

export default function Index({ publications, filters, types }) {
    const { data, setData } = useForm({
        search: filters.search || '',
        publication_type: filters.publication_type || '',
    });

    const submit = (event) => {
        event.preventDefault();
        router.get(route('publications.index'), data, { preserveState: true, replace: true });
    };

    return (
        <AuthenticatedLayout header={<Header />}>
            <Head title="Publications" />

            <form onSubmit={submit} className="mb-6 grid gap-4 rounded-md border border-slate-200 bg-white p-4 md:grid-cols-3">
                <div>
                    <label className="text-sm font-medium text-slate-700">Recherche</label>
                    <TextInput
                        value={data.search}
                        onChange={(event) => setData('search', event.target.value)}
                        className="mt-1 block w-full"
                        placeholder="Titre, mots-cles ou annee"
                    />
                </div>
                <SelectInput label="Type" name="publication_type" value={data.publication_type} onChange={setData} options={types} placeholder="Tous les types" />
                <div className="flex items-end gap-2">
                    <button className="rounded-md bg-indigo-700 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-800">Filtrer</button>
                    <Link href={route('publications.index')} className="rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700">
                        Reinitialiser
                    </Link>
                </div>
            </form>

            <div className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Publication</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Type</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Annee</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Auteurs</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {publications.data.map((publication) => (
                            <tr key={publication.id}>
                                <td className="px-4 py-3">
                                    <p className="font-medium text-slate-950">{publication.title}</p>
                                    <p className="text-sm text-slate-500">{publication.keywords || 'Sans mots-cles'}</p>
                                </td>
                                <td className="px-4 py-3 text-sm text-slate-700">{publication.publication_type}</td>
                                <td className="px-4 py-3 text-sm text-slate-700">{publication.publication_year}</td>
                                <td className="px-4 py-3 text-sm text-slate-700">{publication.authors.length}</td>
                                <td className="px-4 py-3">
                                    <TableActions
                                        showHref={route('publications.show', publication.id)}
                                        editHref={route('publications.edit', publication.id)}
                                        deleteHref={route('publications.destroy', publication.id)}
                                    />
                                </td>
                            </tr>
                        ))}
                        {publications.data.length === 0 && (
                            <tr>
                                <td colSpan="5" className="px-4 py-8 text-center text-sm text-slate-500">Aucune publication trouvee.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <Pagination links={publications.links} />
        </AuthenticatedLayout>
    );
}

function Header() {
    return (
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
                <h1 className="text-2xl font-semibold text-slate-950">Publications scientifiques</h1>
                <p className="mt-1 text-sm text-slate-500">Production scientifique, auteurs et mots-cles.</p>
            </div>
            <Link href={route('publications.create')} className="rounded-md bg-indigo-700 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-800">
                Ajouter une publication
            </Link>
        </div>
    );
}
