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
                    <p className="page-kicker">Impact</p>
                    <h1 className="page-title">Modifier l activite</h1>
                    <Link href={route('valorisations.show', valorisation.id)} className="mt-2 inline-block text-sm font-semibold text-teal-700 hover:text-teal-900">
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
