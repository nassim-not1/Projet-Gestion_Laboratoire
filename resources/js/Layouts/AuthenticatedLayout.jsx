import FlashMessage from '@/Components/FlashMessage';
import Navbar from '@/Components/Navbar';
import Sidebar from '@/Components/Sidebar';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#f0fdfa_42%,#f8fafc_100%)] text-slate-800 dark:bg-[linear-gradient(180deg,#111827_0%,#0f172a_48%,#111827_100%)] dark:text-slate-200">
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <div className="lg:pl-72">
                <Navbar onMenuClick={() => setSidebarOpen(true)} />

                <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
                    {header && <div className="mb-6">{header}</div>}
                    <FlashMessage />
                    {children}
                </main>
            </div>
        </div>
    );
}
