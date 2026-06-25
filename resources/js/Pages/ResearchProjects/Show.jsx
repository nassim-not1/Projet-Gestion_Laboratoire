import ConfirmDeleteButton from '@/Components/ConfirmDeleteButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Show({ project }) {
    const user = usePage().props.auth.user;
    const canManage = ['admin', 'responsable'].includes(user.role);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <p className="page-kicker">Projet de recherche</p>
                        <h1 className="page-title">{project.title}</h1>
                        <p className="page-subtitle">{project.status} - Responsable : {project.responsable?.first_name} {project.responsable?.last_name}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Link href={route('research-projects.index')} className="btn-secondary">Liste</Link>
                        {canManage && (
                            <>
                                <Link href={route('research-projects.edit', project.id)} className="btn-primary">Modifier</Link>
                                <ConfirmDeleteButton href={route('research-projects.destroy', project.id)} />
                            </>
                        )}
                    </div>
                </div>
            }
        >
            <Head title={project.title} />

            <div className="grid gap-6 lg:grid-cols-3">
                <section className="app-surface p-6 lg:col-span-2">
                    <h2 className="text-lg font-semibold text-slate-950">Description</h2>
                    <p className="mt-3 text-sm leading-6 text-slate-700">{project.description}</p>
                    <dl className="mt-6 grid gap-4 md:grid-cols-2">
                        <Info label="Date debut" value={project.start_date?.slice(0, 10)} />
                        <Info label="Date fin" value={project.end_date?.slice(0, 10) || 'Non definie'} />
                        <Info label="Financement" value={project.funding_source || '-'} />
                        <Info label="Budget" value={project.budget ? `${project.budget} DH` : '-'} />
                    </dl>
                </section>

                <section className="app-surface p-6">
                    <h2 className="text-lg font-semibold text-slate-950">Equipe</h2>
                    <div className="mt-4 space-y-3">
                        {project.members.map((member) => (
                            <Link key={member.id} href={route('members.show', member.id)} className="block rounded-lg border border-slate-200 p-3 text-sm transition hover:border-teal-200 hover:bg-teal-50/40 dark:border-slate-800 dark:hover:border-teal-800 dark:hover:bg-teal-950/30">
                                <span className="font-medium text-slate-950">{member.first_name} {member.last_name}</span>
                                <span className="block text-slate-500">{member.grade}</span>
                            </Link>
                        ))}
                    </div>
                </section>

                <section className="app-surface p-6 lg:col-span-3">
                    <h2 className="text-lg font-semibold text-slate-950">Productions liees</h2>
                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                        <div>
                            <h3 className="font-medium text-slate-800">Publications</h3>
                            <div className="mt-3 space-y-2">
                                {project.publications.map((publication) => (
                                    <Link key={publication.id} href={route('publications.show', publication.id)} className="block text-sm font-medium text-teal-700 hover:text-teal-900 hover:underline">
                                        {publication.title}
                                    </Link>
                                ))}
                                {project.publications.length === 0 && <p className="text-sm text-slate-500">Aucune publication.</p>}
                            </div>
                        </div>
                        <div>
                            <h3 className="font-medium text-slate-800">Valorisations</h3>
                            <div className="mt-3 space-y-2">
                                {project.valorisations.map((valorisation) => (
                                    <Link key={valorisation.id} href={route('valorisations.show', valorisation.id)} className="block text-sm font-medium text-teal-700 hover:text-teal-900 hover:underline">
                                        {valorisation.title}
                                    </Link>
                                ))}
                                {project.valorisations.length === 0 && <p className="text-sm text-slate-500">Aucune activite.</p>}
                            </div>
                        </div>
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
            <dd className="mt-1 text-sm text-slate-900">{value}</dd>
        </div>
    );
}
