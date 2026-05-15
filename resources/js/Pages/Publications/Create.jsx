import FormInput from '@/Components/FormInput';
import SelectInput from '@/Components/SelectInput';
import TextAreaInput from '@/Components/TextAreaInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ members, projects, types }) {
    const { data, setData, post, processing, errors } = useForm(defaultData());

    const submit = (event) => {
        event.preventDefault();
        post(route('publications.store'));
    };

    return (
        <AuthenticatedLayout header={<Header title="Ajouter une publication" />}>
            <Head title="Ajouter une publication" />
            <PublicationForm
                data={data}
                setData={setData}
                errors={errors}
                members={members}
                projects={projects}
                types={types}
                submit={submit}
                processing={processing}
                submitLabel="Enregistrer"
            />
        </AuthenticatedLayout>
    );
}

export function defaultData(overrides = {}) {
    return {
        title: '',
        abstract: '',
        publication_type: 'article',
        journal_or_conference: '',
        publication_year: new Date().getFullYear(),
        doi: '',
        link: '',
        keywords: '',
        research_project_id: '',
        authors: [],
        ...overrides,
    };
}

function Header({ title }) {
    return (
        <div>
            <h1 className="text-2xl font-semibold text-slate-950">{title}</h1>
            <Link href={route('publications.index')} className="mt-2 inline-block text-sm font-medium text-indigo-700">
                Retour a la liste
            </Link>
        </div>
    );
}

export function PublicationForm({ data, setData, errors, members, projects, types, submit, processing, submitLabel }) {
    return (
        <form onSubmit={submit} className="rounded-md border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid gap-5 md:grid-cols-2">
                <FormInput label="Titre" name="title" value={data.title} onChange={setData} error={errors.title} required />
                <SelectInput label="Type" name="publication_type" value={data.publication_type} onChange={setData} error={errors.publication_type} options={types} required />
                <FormInput label="Revue ou conference" name="journal_or_conference" value={data.journal_or_conference} onChange={setData} error={errors.journal_or_conference} />
                <FormInput label="Annee" name="publication_year" type="number" value={data.publication_year} onChange={setData} error={errors.publication_year} required />
                <FormInput label="DOI" name="doi" value={data.doi} onChange={setData} error={errors.doi} />
                <FormInput label="Lien" name="link" value={data.link} onChange={setData} error={errors.link} />
                <SelectInput label="Projet associe" name="research_project_id" value={data.research_project_id} onChange={setData} error={errors.research_project_id} options={projects} placeholder="Aucun projet" />
                <SelectInput label="Auteurs" name="authors" value={data.authors} onChange={setData} error={errors.authors} options={members} multiple required />
                <div className="md:col-span-2">
                    <TextAreaInput label="Resume" name="abstract" value={data.abstract} onChange={setData} error={errors.abstract} />
                </div>
                <div className="md:col-span-2">
                    <TextAreaInput label="Mots-cles" name="keywords" value={data.keywords} onChange={setData} error={errors.keywords} rows={2} />
                </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
                <Link href={route('publications.index')} className="rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700">
                    Annuler
                </Link>
                <button disabled={processing} className="rounded-md bg-indigo-700 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-800 disabled:opacity-60">
                    {submitLabel}
                </button>
            </div>
        </form>
    );
}
