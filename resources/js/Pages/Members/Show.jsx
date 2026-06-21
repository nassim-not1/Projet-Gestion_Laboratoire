import ConfirmDeleteButton from '@/Components/ConfirmDeleteButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Show({ member }) {
    const user = usePage().props.auth.user;
    const canManage = ['admin', 'responsable'].includes(user.role);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <p className="page-kicker">Membre</p>
                        <h1 className="page-title">{member.first_name} {member.last_name}</h1>
                        <p className="page-subtitle">{member.grade} - {member.research_domain}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Link href={route('members.index')} className="btn-secondary">
                            Liste
                        </Link>
                        {canManage && (
                            <>
                                <Link href={route('members.edit', member.id)} className="btn-primary">
                                    Modifier
                                </Link>
                                <ConfirmDeleteButton href={route('members.destroy', member.id)} />
                            </>
                        )}
                    </div>
                </div>
            }
        >
            <Head title={`${member.first_name} ${member.last_name}`} />

            <div className="grid gap-6 lg:grid-cols-3">
                <section className="app-surface p-6 lg:col-span-1">
                    <h2 className="text-lg font-semibold text-slate-950">Informations</h2>
                    <dl className="mt-4 space-y-3 text-sm">
                        <Info label="Email" value={member.email} />
                        <Info label="Telephone" value={member.phone || '-'} />
                        <Info label="Grade" value={member.grade} />
                        <Info label="Compte associe" value={member.user?.name || 'Non associe'} />
                    </dl>
                    {member.bio && <p className="mt-5 text-sm leading-6 text-slate-700">{member.bio}</p>}
                </section>

                <section className="app-surface p-6 lg:col-span-2">
                    <h2 className="text-lg font-semibold text-slate-950">Projets</h2>
                    <div className="mt-4 space-y-3">
                        {member.projects.map((project) => (
                            <Link key={project.id} href={route('research-projects.show', project.id)} className="block rounded-lg border border-slate-200 p-4 transition hover:border-teal-200 hover:bg-teal-50/40">
                                <p className="font-medium text-slate-950">{project.title}</p>
                                <p className="text-sm text-slate-500">{project.status}</p>
                            </Link>
                        ))}
                        {member.projects.length === 0 && <p className="text-sm text-slate-500">Aucun projet associe.</p>}
                    </div>

                    <h2 className="mt-8 text-lg font-semibold text-slate-950">Publications</h2>
                    <div className="mt-4 space-y-3">
                        {member.publications.map((publication) => (
                            <Link key={publication.id} href={route('publications.show', publication.id)} className="block rounded-lg border border-slate-200 p-4 transition hover:border-teal-200 hover:bg-teal-50/40">
                                <p className="font-medium text-slate-950">{publication.title}</p>
                                <p className="text-sm text-slate-500">{publication.publication_year} - {publication.publication_type}</p>
                            </Link>
                        ))}
                        {member.publications.length === 0 && <p className="text-sm text-slate-500">Aucune publication associee.</p>}
                    </div>
                </section>
            </div>
        </AuthenticatedLayout>
    );
}

function Info({ label, value }) {
    return (
        <div>
            <dt className="font-medium text-slate-500">{label}</dt>
            <dd className="mt-1 text-slate-900">{value}</dd>
        </div>
    );
}
