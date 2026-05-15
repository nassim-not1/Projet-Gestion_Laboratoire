import SelectInput from '@/Components/SelectInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Recommendations({ members, selectedMemberId, recommendations }) {
    const { data, setData, post, processing, errors } = useForm({
        member_id: selectedMemberId || '',
    });

    const submit = (event) => {
        event.preventDefault();
        post(route('ai.recommendations.generate'));
    };

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h1 className="text-2xl font-semibold text-slate-950">Recommandations IA</h1>
                    <p className="mt-1 text-sm text-slate-500">Identifier des collaborations potentielles a partir des domaines et mots-cles.</p>
                </div>
            }
        >
            <Head title="Recommandations IA" />

            <section className="rounded-md border border-slate-200 bg-white p-6 shadow-sm">
                <form onSubmit={submit} className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
                    <SelectInput
                        label="Membre cible"
                        name="member_id"
                        value={data.member_id}
                        onChange={setData}
                        error={errors.member_id}
                        options={members}
                        required
                    />
                    <button disabled={processing} className="rounded-md bg-indigo-700 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-800 disabled:opacity-60">
                        Generer recommandations
                    </button>
                </form>
            </section>

            <section className="mt-6 rounded-md border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-950">Resultats</h2>
                <div className="mt-4 space-y-3">
                    {recommendations.map((recommendation) => (
                        <div key={recommendation.member_id} className="rounded-md border border-slate-200 p-4">
                            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                                <div>
                                    <p className="font-medium text-slate-950">{recommendation.name}</p>
                                    <p className="mt-1 text-sm text-slate-600">{recommendation.reason}</p>
                                </div>
                                <span className="rounded-md bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
                                    Score {(Number(recommendation.score || 0) * 100).toFixed(0)}%
                                </span>
                            </div>
                        </div>
                    ))}
                    {recommendations.length === 0 && (
                        <p className="text-sm text-slate-500">Selectionner un membre puis generer les recommandations.</p>
                    )}
                </div>
            </section>
        </AuthenticatedLayout>
    );
}
