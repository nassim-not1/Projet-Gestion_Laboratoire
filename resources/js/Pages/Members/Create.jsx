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
            <h1 className="text-2xl font-semibold text-slate-950">{title}</h1>
            <Link href={route('members.index')} className="mt-2 inline-block text-sm font-medium text-indigo-700">
                Retour a la liste
            </Link>
        </div>
    );
}

export function MemberForm({ data, setData, errors, grades, submit, processing, submitLabel }) {
    return (
        <form onSubmit={submit} className="rounded-md border border-slate-200 bg-white p-6 shadow-sm">
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
                <Link href={route('members.index')} className="rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700">
                    Annuler
                </Link>
                <button disabled={processing} className="rounded-md bg-indigo-700 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-800 disabled:opacity-60">
                    {submitLabel}
                </button>
            </div>
        </form>
    );
}
