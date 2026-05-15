import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ProjectForm, defaultData } from './Create';

export default function Edit({ project, members, statuses, selectedMembers }) {
    const { data, setData, put, processing, errors } = useForm(defaultData({
        title: project.title || '',
        description: project.description || '',
        start_date: project.start_date?.slice(0, 10) || '',
        end_date: project.end_date?.slice(0, 10) || '',
        status: project.status || 'en_cours',
        funding_source: project.funding_source || '',
        budget: project.budget || '',
        responsable_id: project.responsable_id || '',
        members: selectedMembers || [],
    }));

    const submit = (event) => {
        event.preventDefault();
        put(route('research-projects.update', project.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h1 className="text-2xl font-semibold text-slate-950">Modifier le projet</h1>
                    <Link href={route('research-projects.show', project.id)} className="mt-2 inline-block text-sm font-medium text-indigo-700">
                        Retour aux details
                    </Link>
                </div>
            }
        >
            <Head title="Modifier un projet" />
            <ProjectForm
                data={data}
                setData={setData}
                errors={errors}
                members={members}
                statuses={statuses}
                submit={submit}
                processing={processing}
                submitLabel="Mettre a jour"
            />
        </AuthenticatedLayout>
    );
}
