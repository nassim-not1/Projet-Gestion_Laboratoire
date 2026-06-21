import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Verification email" />

            <div className="mb-6">
                <p className="page-kicker">Verification</p>
                <h1 className="mt-2 text-2xl font-semibold text-slate-950">Verifier votre adresse email</h1>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                    Cliquez sur le lien envoye par email pour activer votre compte. Vous pouvez demander un nouvel envoi.
                </p>
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
                    Un nouveau lien de verification a ete envoye a votre adresse email.
                </div>
            )}

            <form onSubmit={submit}>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <PrimaryButton disabled={processing}>
                        Renvoyer le lien
                    </PrimaryButton>

                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="rounded-md text-sm font-medium text-slate-600 underline hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2"
                    >
                        Deconnexion
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
