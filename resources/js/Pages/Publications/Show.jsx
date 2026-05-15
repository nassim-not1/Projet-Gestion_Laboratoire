import ConfirmDeleteButton from '@/Components/ConfirmDeleteButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Show({ publication }) {
    const extractKeywords = () => {
        router.post(route('publications.extract-keywords', publication.id), {}, { preserveScroll: true });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-2xl font-semibold text-slate-950">{publication.title}</h1>
                        <p className="text-sm text-slate-500">{publication.publication_type} · {publication.publication_year}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Link href={route('publications.index')} className="rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700">Liste</Link>
                        <button onClick={extractKeywords} className="rounded-md border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50">
                            Extraire mots-cles IA
                        </button>
                        <Link href={route('publications.edit', publication.id)} className="rounded-md bg-indigo-700 px-4 py-2 text-sm font-semibold text-white">Modifier</Link>
                        <ConfirmDeleteButton href={route('publications.destroy', publication.id)} />
                    </div>
                </div>
            }
        >
            <Head title={publication.title} />

            <div className="grid gap-6 lg:grid-cols-3">
                <section className="rounded-md border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
                    <h2 className="text-lg font-semibold text-slate-950">Resume</h2>
                    <p className="mt-3 text-sm leading-6 text-slate-700">{publication.abstract || 'Aucun resume.'}</p>
                    <dl className="mt-6 grid gap-4 md:grid-cols-2">
                        <Info label="Revue / conference" value={publication.journal_or_conference || '-'} />
                        <Info label="DOI" value={publication.doi || '-'} />
                        <Info label="Lien" value={publication.link || '-'} />
                        <Info label="Projet" value={publication.research_project?.title || '-'} />
                    </dl>
                    <div className="mt-6">
                        <h3 className="text-sm font-semibold text-slate-700">Mots-cles</h3>
                        <p className="mt-2 text-sm text-slate-700">{publication.keywords || 'Aucun mot-cle.'}</p>
                    </div>
                </section>

                <section className="rounded-md border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-slate-950">Auteurs</h2>
                    <div className="mt-4 space-y-3">
                        {publication.authors.map((author) => (
                            <Link key={author.id} href={route('members.show', author.id)} className="block rounded-md border border-slate-200 p-3 text-sm hover:bg-slate-50">
                                <span className="font-medium text-slate-950">{author.first_name} {author.last_name}</span>
                                <span className="block text-slate-500">Ordre : {author.pivot?.author_order || '-'}</span>
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
        </AuthenticatedLayout>
    );
}

function Info({ label, value }) {
    return (
        <div>
            <dt className="text-sm font-medium text-slate-500">{label}</dt>
            <dd className="mt-1 break-words text-sm text-slate-900">{value}</dd>
        </div>
    );
}
