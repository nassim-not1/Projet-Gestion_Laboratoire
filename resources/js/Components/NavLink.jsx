import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-teal-500 text-slate-950 focus:border-teal-700 dark:text-white'
                    : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-800 focus:border-slate-300 focus:text-slate-800 dark:text-slate-400 dark:hover:border-slate-700 dark:hover:text-white dark:focus:text-white') +
                className
            }
        >
            {children}
        </Link>
    );
}
