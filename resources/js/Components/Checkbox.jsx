export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-slate-300 text-teal-700 shadow-sm focus:ring-teal-600 dark:border-slate-700 dark:bg-slate-950 dark:focus:ring-teal-500 ' +
                className
            }
        />
    );
}
