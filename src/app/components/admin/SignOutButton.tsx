// /components/admin/SignOutButton.tsx
'use client';

import { useRouter } from 'next/navigation';
import { signOut } from '@/app/lib/cognitoAuth';

export default function SignOutButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        signOut();
        router.push('/admin');
      }}
      className="mt-4 text-sm text-red-600 underline"
    >
      Sign Out
    </button>
  );
}
