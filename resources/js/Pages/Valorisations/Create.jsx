import FormInput from '@/Components/FormInput';
import SelectInput from '@/Components/SelectInput';
import TextAreaInput from '@/Components/TextAreaInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ members, projects, types }) {
    const { data, setData, post, processing, errors } = useForm(defaultData());

    const submit = (event) => {
        event.preventDefault();
        post(route('valorisations.store'));
    };

    return (
        <AuthenticatedLayout header={<Header title="Ajouter une activite" />}>
            <Head title="Ajouter une activite" />
            <ValorisationForm
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
        description: '',
        type: 'partenariat',
        date: '',
        partner_name: '',
        research_project_id: '',
        member_id: '',
        ...overrides,
    };
}

function Header({ title }) {
    return (
        <div>
            <p className="page-kicker">Impact</p>
            <h1 className="page-title">{title}</h1>
            <Link href={route('valorisations.index')} className="mt-2 inline-block text-sm font-semibold text-teal-700 hover:text-teal-900">
                Retour a la liste
            </Link>
        </div>
    );
}

export function ValorisationForm({ data, setData, errors, members, projects, types, submit, processing, submitLabel }) {
    return (
        <form onSubmit={submit} className="app-surface p-6">
            <div className="grid gap-5 md:grid-cols-2">
                <FormInput label="Titre" name="title" value={data.title} onChange={setData} error={errors.title} required />
                <SelectInput label="Type" name="type" value={data.type} onChange={setData} error={errors.type} options={types} required />
                <FormInput label="Date" name="date" type="date" value={data.date} onChange={setData} error={errors.date} required />
                <FormInput label="Partenaire" name="partner_name" value={data.partner_name} onChange={setData} error={errors.partner_name} />
                <SelectInput label="Projet associe" name="research_project_id" value={data.research_project_id} onChange={setData} error={errors.research_project_id} options={projects} placeholder="Aucun projet" />
                <SelectInput label="Membre associe" name="member_id" value={data.member_id} onChange={setData} error={errors.member_id} options={members} placeholder="Aucun membre" />
                <div className="md:col-span-2">
                    <TextAreaInput label="Description" name="description" value={data.description} onChange={setData} error={errors.description} required />
                </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
                <Link href={route('valorisations.index')} className="btn-secondary">
                    Annuler
                </Link>
                <button disabled={processing} className="btn-primary">
                    {submitLabel}
                </button>
            </div>
        </form>
    );
}
