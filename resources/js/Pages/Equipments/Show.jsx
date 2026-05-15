import ConfirmDeleteButton from '@/Components/ConfirmDeleteButton';
import FormInput from '@/Components/FormInput';
import SelectInput from '@/Components/SelectInput';
import TextAreaInput from '@/Components/TextAreaInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function Show({ equipment, members, statuses }) {
    const user = usePage().props.auth.user;
    const canManage = ['admin', 'responsable'].includes(user.role);
    const statusForm = useForm({ status: equipment.status });
    const reservationForm = useForm({
        member_id: '',
        reservation_date: '',
        start_time: '',
        end_time: '',
        purpose: '',
    });

    const updateStatus = (event) => {
        event.preventDefault();
        statusForm.patch(route('equipments.status', equipment.id), { preserveScroll: true });
    };

    const reserve = (event) => {
        event.preventDefault();
        reservationForm.post(route('equipments.reservations.store', equipment.id), {
            preserveScroll: true,
            onSuccess: () => reservationForm.reset(),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-2xl font-semibold text-slate-950">{equipment.name}</h1>
                        <p className="text-sm text-slate-500">{equipment.inventory_code} · {equipment.status}</p>
                    </div>
                    <div className="flex gap-2">
                        <Link href={route('equipments.index')} className="rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700">Liste</Link>
                        {canManage && (
                            <>
                                <Link href={route('equipments.edit', equipment.id)} className="rounded-md bg-indigo-700 px-4 py-2 text-sm font-semibold text-white">Modifier</Link>
                                <ConfirmDeleteButton href={route('equipments.destroy', equipment.id)} />
                            </>
                        )}
                    </div>
                </div>
            }
        >
            <Head title={equipment.name} />

            <div className="grid gap-6 lg:grid-cols-3">
                <section className="rounded-md border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
                    <h2 className="text-lg font-semibold text-slate-950">Details</h2>
                    <dl className="mt-4 grid gap-4 md:grid-cols-2">
                        <Info label="Type" value={equipment.type} />
                        <Info label="Localisation" value={equipment.location || '-'} />
                        <Info label="Responsable" value={equipment.responsible_member ? `${equipment.responsible_member.first_name} ${equipment.responsible_member.last_name}` : '-'} />
                        <Info label="Statut" value={equipment.status} />
                    </dl>
                    {equipment.description && <p className="mt-5 text-sm leading-6 text-slate-700">{equipment.description}</p>}
                </section>

                <section className="rounded-md border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-slate-950">Statut</h2>
                    {canManage ? (
                        <form onSubmit={updateStatus} className="mt-4 space-y-4">
                            <SelectInput label="Changer statut" name="status" value={statusForm.data.status} onChange={statusForm.setData} error={statusForm.errors.status} options={statuses} />
                            <button disabled={statusForm.processing} className="rounded-md bg-indigo-700 px-4 py-2 text-sm font-semibold text-white">
                                Mettre a jour
                            </button>
                        </form>
                    ) : (
                        <p className="mt-4 text-sm text-slate-600">Consultation uniquement.</p>
                    )}
                </section>

                <section className="rounded-md border border-slate-200 bg-white p-6 shadow-sm lg:col-span-3">
                    <h2 className="text-lg font-semibold text-slate-950">Reservation</h2>
                    <form onSubmit={reserve} className="mt-4 grid gap-4 md:grid-cols-5">
                        <SelectInput label="Membre" name="member_id" value={reservationForm.data.member_id} onChange={reservationForm.setData} error={reservationForm.errors.member_id} options={members} required />
                        <FormInput label="Date" name="reservation_date" type="date" value={reservationForm.data.reservation_date} onChange={reservationForm.setData} error={reservationForm.errors.reservation_date} required />
                        <FormInput label="Debut" name="start_time" type="time" value={reservationForm.data.start_time} onChange={reservationForm.setData} error={reservationForm.errors.start_time} required />
                        <FormInput label="Fin" name="end_time" type="time" value={reservationForm.data.end_time} onChange={reservationForm.setData} error={reservationForm.errors.end_time} required />
                        <div className="flex items-end">
                            <button disabled={reservationForm.processing} className="w-full rounded-md bg-indigo-700 px-4 py-2 text-sm font-semibold text-white">
                                Reserver
                            </button>
                        </div>
                        <div className="md:col-span-5">
                            <TextAreaInput label="Objet" name="purpose" value={reservationForm.data.purpose} onChange={reservationForm.setData} error={reservationForm.errors.purpose} rows={2} />
                        </div>
                    </form>

                    <div className="mt-6 overflow-hidden rounded-md border border-slate-200">
                        <table className="min-w-full divide-y divide-slate-200">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Membre</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Date</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Horaire</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Statut</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 bg-white">
                                {equipment.reservations.map((reservation) => (
                                    <tr key={reservation.id}>
                                        <td className="px-4 py-3 text-sm text-slate-700">{reservation.member?.first_name} {reservation.member?.last_name}</td>
                                        <td className="px-4 py-3 text-sm text-slate-700">{reservation.reservation_date?.slice(0, 10)}</td>
                                        <td className="px-4 py-3 text-sm text-slate-700">{reservation.start_time} - {reservation.end_time}</td>
                                        <td className="px-4 py-3 text-sm text-slate-700">{reservation.status}</td>
                                    </tr>
                                ))}
                                {equipment.reservations.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="px-4 py-6 text-center text-sm text-slate-500">Aucune reservation.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
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
