import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    const modules = [
        {
            title: 'Membres',
            description: 'Gestion des chercheurs, doctorants et responsables du laboratoire.',
            icon: '1',
        },
        {
            title: 'Projets',
            description: 'Suivi des projets de recherche, statuts, responsables et équipes.',
            icon: '2',
        },
        {
            title: 'Équipements',
            description: 'Inventaire, disponibilité et gestion du matériel scientifique.',
            icon: '3',
        },
        {
            title: 'Publications',
            description: 'Centralisation des articles, conférences, DOI et mots-clés.',
            icon: '4',
        },
        {
            title: 'Valorisation',
            description: 'Partenariats, brevets, événements et impact scientifique.',
            icon: '5',
        },
        {
            title: 'IA / NLP',
            description: 'Extraction de mots-clés et recommandations de collaborations.',
            icon: '6',
        },
    ];

    const stats = [
        { value: '+50', label: 'Membres' },
        { value: '+20', label: 'Projets' },
        { value: '+100', label: 'Publications' },
    ];

    return (
        <>
            <Head title="Accueil" />

            <style>
                {`
                    @keyframes float3d {
                        0%, 100% {
                            transform: translateY(0px) rotateX(0deg) rotateY(0deg);
                        }
                        50% {
                            transform: translateY(-18px) rotateX(6deg) rotateY(-6deg);
                        }
                    }

                    @keyframes softPulse {
                        0%, 100% {
                            transform: scale(1);
                            opacity: 0.7;
                        }
                        50% {
                            transform: scale(1.12);
                            opacity: 1;
                        }
                    }

                    @keyframes slideUp {
                        from {
                            opacity: 0;
                            transform: translateY(30px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }

                    .float-3d {
                        animation: float3d 5s ease-in-out infinite;
                        transform-style: preserve-3d;
                    }

                    .soft-pulse {
                        animation: softPulse 4s ease-in-out infinite;
                    }

                    .slide-up {
                        animation: slideUp 0.8s ease-out both;
                    }

                    .perspective-box {
                        perspective: 1200px;
                    }

                    .card-3d {
                        transform-style: preserve-3d;
                        transition: transform 0.35s ease, box-shadow 0.35s ease;
                    }

                    .card-3d:hover {
                        transform: translateY(-8px) rotateX(6deg) rotateY(-6deg);
                        box-shadow: 0 25px 60px rgba(79, 70, 229, 0.22);
                    }
                `}
            </style>

            <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-cyan-50 text-slate-900">
                {/* Background decorations */}
                <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-indigo-300/30 blur-3xl soft-pulse" />
                <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-cyan-300/30 blur-3xl soft-pulse" />
                <div className="absolute bottom-0 left-1/2 h-80 w-80 rounded-full bg-violet-300/20 blur-3xl soft-pulse" />

                {/* Header */}
                <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-2xl text-white shadow-lg shadow-indigo-500/30">
                            🔬
                        </div>

                        <div>
                            <h1 className="text-xl font-extrabold tracking-tight text-slate-950">
                                Plateforme Laboratoire
                            </h1>
                            <p className="text-sm font-medium text-slate-500">
                                Gestion intelligente des activités de recherche
                            </p>
                        </div>
                    </div>

                    <nav className="flex items-center gap-3">
                        {auth?.user ? (
                            <Link
                                href={route('dashboard')}
                                className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition hover:-translate-y-0.5 hover:bg-indigo-500"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-white hover:text-indigo-700 hover:shadow"
                                >
                                    Connexion
                                </Link>

                                <Link
                                    href={route('register')}
                                    className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition hover:-translate-y-0.5 hover:bg-indigo-500"
                                >
                                    Créer un compte
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                {/* Hero */}
                <main className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 pb-20 pt-12 lg:grid-cols-2 lg:pt-20">
                    <section className="slide-up">
                        

                        <h2 className="max-w-3xl text-4xl font-black leading-tight tracking-tight text-slate-950 md:text-6xl">
                            Digitalisation des{' '}
                            <span className="bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                                laboratoires
                            </span>{' '}
                            de recherche universitaires
                        </h2>

                        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                            Une plateforme web moderne pour centraliser les membres,
                            projets, équipements, publications, activités de valorisation
                            et recommandations IA.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <Link
                                href={auth?.user ? route('dashboard') : route('login')}
                                className="group rounded-2xl bg-indigo-600 px-7 py-4 font-bold text-white shadow-xl shadow-indigo-500/25 transition hover:-translate-y-1 hover:bg-indigo-500"
                            >
                                Accéder à la plateforme
                                <span className="ml-2 inline-block transition group-hover:translate-x-1">
                                    →
                                </span>
                            </Link>

                            <Link
                                href={route('register')}
                                className="rounded-2xl border border-slate-200 bg-white px-7 py-4 font-bold text-slate-800 shadow-sm transition hover:-translate-y-1 hover:border-indigo-300 hover:text-indigo-700 hover:shadow-lg"
                            >
                                Créer un compte
                            </Link>
                        </div>

                        <div className="mt-10 grid max-w-lg grid-cols-3 gap-4">
                            {stats.map((stat) => (
                                <div
                                    key={stat.label}
                                    className="rounded-2xl border border-white bg-white/75 p-4 text-center shadow-sm backdrop-blur"
                                >
                                    <p className="text-2xl font-black text-indigo-600">
                                        {stat.value}
                                    </p>
                                    <p className="mt-1 text-sm font-semibold text-slate-500">
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* 3D visual card */}
                    <section className="perspective-box slide-up">
                        <div className="float-3d rounded-[2rem] border border-white bg-white/80 p-6 shadow-2xl shadow-indigo-500/20 backdrop-blur-xl">
                            <div className="rounded-[1.5rem] bg-gradient-to-br from-indigo-600 to-cyan-500 p-1">
                                <div className="rounded-[1.4rem] bg-white p-6">
                                    <div className="mb-6 flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-bold text-slate-400">
                                                Tableau de bord
                                            </p>
                                            <h3 className="text-2xl font-black text-slate-950">
                                                Laboratoire intelligent
                                            </h3>
                                        </div>

                                        <div className="rounded-2xl bg-indigo-50 px-4 py-2 text-sm font-bold text-indigo-700">
                                            IA active
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="rounded-2xl bg-indigo-50 p-4">
                                            <p className="text-sm font-bold text-slate-500">
                                                Projets actifs
                                            </p>
                                            <p className="mt-2 text-3xl font-black text-indigo-700">
                                                12
                                            </p>
                                        </div>

                                        <div className="rounded-2xl bg-cyan-50 p-4">
                                            <p className="text-sm font-bold text-slate-500">
                                                Publications
                                            </p>
                                            <p className="mt-2 text-3xl font-black text-cyan-700">
                                                86
                                            </p>
                                        </div>

                                        <div className="rounded-2xl bg-violet-50 p-4">
                                            <p className="text-sm font-bold text-slate-500">
                                                Équipements
                                            </p>
                                            <p className="mt-2 text-3xl font-black text-violet-700">
                                                24
                                            </p>
                                        </div>

                                        <div className="rounded-2xl bg-emerald-50 p-4">
                                            <p className="text-sm font-bold text-slate-500">
                                                Collaborations
                                            </p>
                                            <p className="mt-2 text-3xl font-black text-emerald-700">
                                                31
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-6 rounded-2xl bg-slate-50 p-4">
                                        <div className="mb-3 flex items-center justify-between">
                                            <p className="font-bold text-slate-700">
                                                Recommandation IA
                                            </p>
                                            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                                                92%
                                            </span>
                                        </div>

                                        <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                                            <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>

                {/* Modules */}
                <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24">
                    <div className="mb-10 text-center">
                        <p className="font-bold text-indigo-600">
                            Modules principaux
                        </p>
                        <h3 className="mt-2 text-3xl font-black text-slate-950 md:text-4xl">
                            Tout le laboratoire dans une seule plateforme
                        </h3>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {modules.map((module, index) => (
                            <div
                                key={module.title}
                                className="card-3d rounded-3xl border border-slate-100 bg-white/85 p-6 shadow-lg shadow-slate-200/70 backdrop-blur"
                                style={{
                                    animationDelay: `${index * 0.08}s`,
                                }}
                            >
                                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-100 to-cyan-100 text-3xl">
                                    {module.icon}
                                </div>

                                <h4 className="text-xl font-black text-slate-950">
                                    {module.title}
                                </h4>

                                <p className="mt-3 leading-7 text-slate-600">
                                    {module.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
}