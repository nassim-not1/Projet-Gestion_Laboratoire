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
                        <h1 className="text-2xl font-semibold text-slate-950">{project.title}</h1>
                        <p className="text-sm text-slate-500">{project.status} · Responsable : {project.responsable?.first_name} {project.responsable?.last_name}</p>
                    </div>
                    <div className="flex gap-2">
                        <Link href={route('research-projects.index')} className="rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700">Liste</Link>
                        {canManage && (
                            <>
                                <Link href={route('research-projects.edit', project.id)} className="rounded-md bg-indigo-700 px-4 py-2 text-sm font-semibold text-white">Modifier</Link>
                                <ConfirmDeleteButton href={route('research-projects.destroy', project.id)} />
                            </>
                        )}
                    </div>
                </div>
            }
        >
            <Head title={project.title} />

            <div className="grid gap-6 lg:grid-cols-3">
                <section className="rounded-md border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
                    <h2 className="text-lg font-semibold text-slate-950">Description</h2>
                    <p className="mt-3 text-sm leading-6 text-slate-700">{project.description}</p>
                    <dl className="mt-6 grid gap-4 md:grid-cols-2">
                        <Info label="Date debut" value={project.start_date?.slice(0, 10)} />
                        <Info label="Date fin" value={project.end_date?.slice(0, 10) || 'Non definie'} />
                        <Info label="Financement" value={project.funding_source || '-'} />
                        <Info label="Budget" value={project.budget ? `${project.budget} DH` : '-'} />
                    </dl>
                </section>

                <section className="rounded-md border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-slate-950">Equipe</h2>
                    <div className="mt-4 space-y-3">
                        {project.members.map((member) => (
                            <Link key={member.id} href={route('members.show', member.id)} className="block rounded-md border border-slate-200 p-3 text-sm hover:bg-slate-50">
                                <span className="font-medium text-slate-950">{member.first_name} {member.last_name}</span>
                                <span className="block text-slate-500">{member.grade}</span>
                            </Link>
                        ))}
                    </div>
                </section>

                <section className="rounded-md border border-slate-200 bg-white p-6 shadow-sm lg:col-span-3">
                    <h2 className="text-lg font-semibold text-slate-950">Productions liees</h2>
                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                        <div>
                            <h3 className="font-medium text-slate-800">Publications</h3>
                            <div className="mt-3 space-y-2">
                                {project.publications.map((publication) => (
                                    <Link key={publication.id} href={route('publications.show', publication.id)} className="block text-sm text-indigo-700 hover:underline">
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
                                    <Link key={valorisation.id} href={route('valorisations.show', valorisation.id)} className="block text-sm text-indigo-700 hover:underline">
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
