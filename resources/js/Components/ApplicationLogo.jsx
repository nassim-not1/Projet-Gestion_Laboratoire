export default function ApplicationLogo({ className = '', ...props }) {
    return (
        <div
            {...props}
            className={`flex items-center justify-center rounded-lg border border-teal-500/20 bg-teal-700 text-sm font-bold text-white shadow-sm shadow-teal-900/20 dark:bg-teal-500 dark:text-slate-950 ${className}`}
        >
            LAB
        </div>
    );
}
