import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { MemberForm } from './Create';

export default function Edit({ member, grades }) {
    const { data, setData, put, processing, errors } = useForm({
        first_name: member.first_name || '',
        last_name: member.last_name || '',
        email: member.email || '',
        phone: member.phone || '',
        grade: member.grade || '',
        research_domain: member.research_domain || '',
        bio: member.bio || '',
    });

    const submit = (event) => {
        event.preventDefault();
        put(route('members.update', member.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <p className="page-kicker">Membres</p>
                    <h1 className="page-title">Modifier le membre</h1>
                    <Link href={route('members.show', member.id)} className="mt-2 inline-block text-sm font-semibold text-teal-700 hover:text-teal-900">
                        Retour aux details
                    </Link>
                </div>
            }
        >
            <Head title="Modifier un membre" />
            <MemberForm
                data={data}
                setData={setData}
                errors={errors}
                grades={grades}
                submit={submit}
                processing={processing}
                submitLabel="Mettre a jour"
            />
        </AuthenticatedLayout>
    );
}
