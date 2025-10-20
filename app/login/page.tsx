import { redirect } from 'next/navigation';
import LoginForm from './LoginForm';

export default function LoginPage({ searchParams }: { searchParams: { key?: string } }) {
  const key = searchParams.key;

  if (key !== process.env.LOGIN_KEY) {
    redirect('/');
  }

  return <LoginForm />;
}
