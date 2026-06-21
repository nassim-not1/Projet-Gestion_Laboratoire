import FormInput from '@/Components/FormInput';
import SelectInput from '@/Components/SelectInput';
import TextAreaInput from '@/Components/TextAreaInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ members, statuses }) {
    const { data, setData, post, processing, errors } = useForm(defaultData());

    const submit = (event) => {
        event.preventDefault();
        post(route('equipments.store'));
    };

    return (
        <AuthenticatedLayout header={<Header title="Ajouter un equipement" />}>
            <Head title="Ajouter un equipement" />
            <EquipmentForm
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
        name: '',
        type: '',
        description: '',
        inventory_code: '',
        status: 'disponible',
        location: '',
        responsible_member_id: '',
        ...overrides,
    };
}

function Header({ title }) {
    return (
        <div>
            <p className="page-kicker">Inventaire</p>
            <h1 className="page-title">{title}</h1>
            <Link href={route('equipments.index')} className="mt-2 inline-block text-sm font-semibold text-teal-700 hover:text-teal-900">
                Retour a la liste
            </Link>
        </div>
    );
}

export function EquipmentForm({ data, setData, errors, members, statuses, submit, processing, submitLabel }) {
    return (
        <form onSubmit={submit} className="app-surface p-6">
            <div className="grid gap-5 md:grid-cols-2">
                <FormInput label="Nom" name="name" value={data.name} onChange={setData} error={errors.name} required />
                <FormInput label="Type" name="type" value={data.type} onChange={setData} error={errors.type} required />
                <FormInput label="Code inventaire" name="inventory_code" value={data.inventory_code} onChange={setData} error={errors.inventory_code} required />
                <SelectInput label="Statut" name="status" value={data.status} onChange={setData} error={errors.status} options={statuses} required />
                <FormInput label="Localisation" name="location" value={data.location} onChange={setData} error={errors.location} />
                <SelectInput label="Responsable" name="responsible_member_id" value={data.responsible_member_id} onChange={setData} error={errors.responsible_member_id} options={members} placeholder="Aucun responsable" />
                <div className="md:col-span-2">
                    <TextAreaInput label="Description" name="description" value={data.description} onChange={setData} error={errors.description} />
                </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
                <Link href={route('equipments.index')} className="btn-secondary">
                    Annuler
                </Link>
                <button disabled={processing} className="btn-primary">
                    {submitLabel}
                </button>
            </div>
        </form>
    );
}
