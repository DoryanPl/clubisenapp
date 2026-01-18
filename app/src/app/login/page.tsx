'use client';  
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = false;
    if (isLoggedIn) {
      router.push("/");
    }
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <p className="text-gray-600">Ajoutez ici votre formulaire de connexion.</p>
    </div>
  );
}
