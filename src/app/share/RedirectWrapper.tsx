'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface RedirectWrapperProps {
  type: string;
  batchId: string;
  children: React.ReactNode;
}

export default function RedirectWrapper({ type, batchId, children }: RedirectWrapperProps) {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(`/${type}?batchId=${batchId}`);
    }, 500); // Small delay to ensure meta tags are processed

    return () => clearTimeout(timer);
  }, [type, batchId, router]);

  return children;
}
