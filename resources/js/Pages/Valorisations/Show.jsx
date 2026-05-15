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
                        <h1 className="text-2xl font-semibold text-slate-950">{valorisation.title}</h1>
                        <p className="text-sm text-slate-500">{valorisation.type} · {valorisation.date?.slice(0, 10)}</p>
                    </div>
                    <div className="flex gap-2">
                        <Link href={route('valorisations.index')} className="rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700">Liste</Link>
                        {canManage && (
                            <>
                                <Link href={route('valorisations.edit', valorisation.id)} className="rounded-md bg-indigo-700 px-4 py-2 text-sm font-semibold text-white">Modifier</Link>
                                <ConfirmDeleteButton href={route('valorisations.destroy', valorisation.id)} />
                            </>
                        )}
                    </div>
                </div>
            }
        >
            <Head title={valorisation.title} />
            <section className="rounded-md border border-slate-200 bg-white p-6 shadow-sm">
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
