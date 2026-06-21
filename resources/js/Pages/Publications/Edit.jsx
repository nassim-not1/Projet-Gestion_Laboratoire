import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { PublicationForm, defaultData } from './Create';

export default function Edit({ publication, members, projects, types, selectedAuthors }) {
    const { data, setData, put, processing, errors } = useForm(defaultData({
        title: publication.title || '',
        abstract: publication.abstract || '',
        publication_type: publication.publication_type || 'article',
        journal_or_conference: publication.journal_or_conference || '',
        publication_year: publication.publication_year || new Date().getFullYear(),
        doi: publication.doi || '',
        link: publication.link || '',
        keywords: publication.keywords || '',
        research_project_id: publication.research_project_id || '',
        authors: selectedAuthors || [],
    }));

    const submit = (event) => {
        event.preventDefault();
        put(route('publications.update', publication.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <p className="page-kicker">Production</p>
                    <h1 className="page-title">Modifier la publication</h1>
                    <Link href={route('publications.show', publication.id)} className="mt-2 inline-block text-sm font-semibold text-teal-700 hover:text-teal-900">
                        Retour aux details
                    </Link>
                </div>
            }
        >
            <Head title="Modifier une publication" />
            <PublicationForm
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
