'use client';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Button } from '@/components/UI/Button';
import { useRouter } from 'next/navigation';

export function LogoutButton() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-600">
      Logout
    </Button>
  );
}
