import FormInput from '@/Components/FormInput';
import SelectInput from '@/Components/SelectInput';
import TextAreaInput from '@/Components/TextAreaInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ grades }) {
    const { data, setData, post, processing, errors } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        grade: '',
        research_domain: '',
        bio: '',
    });

    const submit = (event) => {
        event.preventDefault();
        post(route('members.store'));
    };

    return (
        <AuthenticatedLayout header={<Header title="Ajouter un membre" />}>
            <Head title="Ajouter un membre" />
            <MemberForm
                data={data}
                setData={setData}
                errors={errors}
                grades={grades}
                submit={submit}
                processing={processing}
                submitLabel="Enregistrer"
            />
        </AuthenticatedLayout>
    );
}

function Header({ title }) {
    return (
        <div>
            <p className="page-kicker">Membres</p>
            <h1 className="page-title">{title}</h1>
            <Link href={route('members.index')} className="mt-2 inline-block text-sm font-semibold text-teal-700 hover:text-teal-900">
                Retour a la liste
            </Link>
        </div>
    );
}

export function MemberForm({ data, setData, errors, grades, submit, processing, submitLabel }) {
    return (
        <form onSubmit={submit} className="app-surface p-6">
            <div className="grid gap-5 md:grid-cols-2">
                <FormInput label="Prenom" name="first_name" value={data.first_name} onChange={setData} error={errors.first_name} required />
                <FormInput label="Nom" name="last_name" value={data.last_name} onChange={setData} error={errors.last_name} required />
                <FormInput label="Email" name="email" value={data.email} onChange={setData} error={errors.email} type="email" required />
                <FormInput label="Telephone" name="phone" value={data.phone} onChange={setData} error={errors.phone} />
                <SelectInput label="Grade" name="grade" value={data.grade} onChange={setData} error={errors.grade} options={grades} required />
                <FormInput label="Domaine de recherche" name="research_domain" value={data.research_domain} onChange={setData} error={errors.research_domain} required />
                <div className="md:col-span-2">
                    <TextAreaInput label="Bio" name="bio" value={data.bio} onChange={setData} error={errors.bio} />
                </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
                <Link href={route('members.index')} className="btn-secondary">
                    Annuler
                </Link>
                <button disabled={processing} className="btn-primary">
                    {submitLabel}
                </button>
            </div>
        </form>
    );
}
