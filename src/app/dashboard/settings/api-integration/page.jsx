'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
    const router = useRouter();

    useEffect(() => {
        router.push('/dashboard/settings/api-integration/services');
    }, [router]);

    return null;
}
