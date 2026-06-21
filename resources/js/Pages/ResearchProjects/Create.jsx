import FormInput from '@/Components/FormInput';
import SelectInput from '@/Components/SelectInput';
import TextAreaInput from '@/Components/TextAreaInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ members, statuses }) {
    const { data, setData, post, processing, errors } = useForm(defaultData());

    const submit = (event) => {
        event.preventDefault();
        post(route('research-projects.store'));
    };

    return (
        <AuthenticatedLayout header={<Header title="Ajouter un projet" />}>
            <Head title="Ajouter un projet" />
            <ProjectForm
                data={data}
                setData={setData}
                errors={errors}
                members={members}
                statuses={statuses}
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
        description: '',
        start_date: '',
        end_date: '',
        status: 'en_cours',
        funding_source: '',
        budget: '',
        responsable_id: '',
        members: [],
        ...overrides,
    };
}

function Header({ title }) {
    return (
        <div>
            <p className="page-kicker">Recherche</p>
            <h1 className="page-title">{title}</h1>
            <Link href={route('research-projects.index')} className="mt-2 inline-block text-sm font-semibold text-teal-700 hover:text-teal-900">
                Retour a la liste
            </Link>
        </div>
    );
}

export function ProjectForm({ data, setData, errors, members, statuses, submit, processing, submitLabel }) {
    return (
        <form onSubmit={submit} className="app-surface p-6">
            <div className="grid gap-5 md:grid-cols-2">
                <FormInput label="Titre" name="title" value={data.title} onChange={setData} error={errors.title} required />
                <SelectInput label="Statut" name="status" value={data.status} onChange={setData} error={errors.status} options={statuses} required />
                <FormInput label="Date de debut" name="start_date" value={data.start_date} onChange={setData} error={errors.start_date} type="date" required />
                <FormInput label="Date de fin" name="end_date" value={data.end_date} onChange={setData} error={errors.end_date} type="date" />
                <FormInput label="Source de financement" name="funding_source" value={data.funding_source} onChange={setData} error={errors.funding_source} />
                <FormInput label="Budget" name="budget" value={data.budget} onChange={setData} error={errors.budget} type="number" min="0" step="0.01" />
                <SelectInput label="Responsable" name="responsable_id" value={data.responsable_id} onChange={setData} error={errors.responsable_id} options={members} required />
                <SelectInput label="Membres associes" name="members" value={data.members} onChange={setData} error={errors.members} options={members} multiple />
                <div className="md:col-span-2">
                    <TextAreaInput label="Description" name="description" value={data.description} onChange={setData} error={errors.description} required />
                </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
                <Link href={route('research-projects.index')} className="btn-secondary">
                    Annuler
                </Link>
                <button disabled={processing} className="btn-primary">
                    {submitLabel}
                </button>
            </div>
        </form>
    );
}
