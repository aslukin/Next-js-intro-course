'use client';

import { useFormStatus } from 'react-dom';

export default function ActiveButton({ children, className }) {
    const formStatus = useFormStatus();

    return (
        <button className={className} disabled={formStatus.pending}>
            {children}
        </button>
    );
}
