import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { EquipmentForm, defaultData } from './Create';

export default function Edit({ equipment, members, statuses }) {
    const { data, setData, put, processing, errors } = useForm(defaultData({
        name: equipment.name || '',
        type: equipment.type || '',
        description: equipment.description || '',
        inventory_code: equipment.inventory_code || '',
        status: equipment.status || 'disponible',
        location: equipment.location || '',
        responsible_member_id: equipment.responsible_member_id || '',
    }));

    const submit = (event) => {
        event.preventDefault();
        put(route('equipments.update', equipment.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <p className="page-kicker">Inventaire</p>
                    <h1 className="page-title">Modifier l equipement</h1>
                    <Link href={route('equipments.show', equipment.id)} className="mt-2 inline-block text-sm font-semibold text-teal-700 hover:text-teal-900">
                        Retour aux details
                    </Link>
                </div>
            }
        >
            <Head title="Modifier un equipement" />
            <EquipmentForm
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
