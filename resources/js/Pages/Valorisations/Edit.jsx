import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ValorisationForm, defaultData } from './Create';

export default function Edit({ valorisation, members, projects, types }) {
    const { data, setData, put, processing, errors } = useForm(defaultData({
        title: valorisation.title || '',
        description: valorisation.description || '',
        type: valorisation.type || 'partenariat',
        date: valorisation.date?.slice(0, 10) || '',
        partner_name: valorisation.partner_name || '',
        research_project_id: valorisation.research_project_id || '',
        member_id: valorisation.member_id || '',
    }));

    const submit = (event) => {
        event.preventDefault();
        put(route('valorisations.update', valorisation.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h1 className="text-2xl font-semibold text-slate-950">Modifier l activite</h1>
                    <Link href={route('valorisations.show', valorisation.id)} className="mt-2 inline-block text-sm font-medium text-indigo-700">
                        Retour aux details
                    </Link>
                </div>
            }
        >
            <Head title="Modifier une activite" />
            <ValorisationForm
                data={data}
                setData={setData}
                errors={errors}
                members={members}
                projects={projects}
                types={types}
                submit={submit}
                processing={processing}
                submitLabel="Mettre a jour"
            />
        </AuthenticatedLayout>
    );
}
