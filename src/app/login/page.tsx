import { useEffect } from 'react';
import { useRouter } from 'next/router';

const LoginPage = () => {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = false;
    if (isLoggedIn) {
      router.push('/main');
    }
  }, [router]);

  return (
    <div>
      <h1>Login Page</h1>
      {/* Add your login form here */}
    </div>
  );
};

export default LoginPage;