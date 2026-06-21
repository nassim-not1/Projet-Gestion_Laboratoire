import ConfirmDeleteButton from '@/Components/ConfirmDeleteButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Show({ valorisation }) {
    const user = usePage().props.auth.user;
    const canManage = ['admin', 'responsable'].includes(user.role);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <p className="page-kicker">Valorisation</p>
                        <h1 className="page-title">{valorisation.title}</h1>
                        <p className="page-subtitle">{valorisation.type} - {valorisation.date?.slice(0, 10)}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Link href={route('valorisations.index')} className="btn-secondary">Liste</Link>
                        {canManage && (
                            <>
                                <Link href={route('valorisations.edit', valorisation.id)} className="btn-primary">Modifier</Link>
                                <ConfirmDeleteButton href={route('valorisations.destroy', valorisation.id)} />
                            </>
                        )}
                    </div>
                </div>
            }
        >
            <Head title={valorisation.title} />
            <section className="app-surface p-6">
                <h2 className="text-lg font-semibold text-slate-950">Description</h2>
                <p className="mt-3 text-sm leading-6 text-slate-700">{valorisation.description}</p>
                <dl className="mt-6 grid gap-4 md:grid-cols-2">
                    <Info label="Partenaire" value={valorisation.partner_name || '-'} />
                    <Info label="Projet" value={valorisation.research_project?.title || '-'} />
                    <Info label="Membre" value={valorisation.member ? `${valorisation.member.first_name} ${valorisation.member.last_name}` : '-'} />
                    <Info label="Type" value={valorisation.type} />
                </dl>
            </section>
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
