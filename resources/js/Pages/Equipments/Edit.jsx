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
                    <h1 className="text-2xl font-semibold text-slate-950">Modifier l equipement</h1>
                    <Link href={route('equipments.show', equipment.id)} className="mt-2 inline-block text-sm font-medium text-indigo-700">
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
