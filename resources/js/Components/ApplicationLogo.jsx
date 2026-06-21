export default function ApplicationLogo({ className = '', ...props }) {
    return (
        <div
            {...props}
            className={`flex items-center justify-center rounded-lg bg-teal-700 text-sm font-bold text-white shadow-sm ${className}`}
        >
            LAB
        </div>
    );
}
