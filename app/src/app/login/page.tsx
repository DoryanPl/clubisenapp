'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import LoginHeader from '@/components/login/LoginHeader';
import LoginSection from '@/components/login/LoginSection';
import RegisterSection from '@/components/login/RegisterSection';
import { useAuth } from '@/hooks/useAuth';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showRegister, setShowRegister] = useState(false);

  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isRegisterPasswordVisible, setIsRegisterPasswordVisible] = useState(false);
  const [isRegisterConfirmVisible, setIsRegisterConfirmVisible] = useState(false);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [registerError, setRegisterError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await login(email, password);
      router.push('/');
    } catch (err) {
      setError('Erreur de connexion. Veuillez réessayer.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterChange = (field: keyof typeof registerData, value: string) => {
    setRegisterData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError('');

    if (registerData.password !== registerData.confirmPassword) {
      setRegisterError('Les mots de passe ne correspondent pas.');
      return;
    }

    console.log('Register data:', registerData);

    setIsRegisterLoading(true);
    try {
      // Simuler une inscription
      await new Promise((resolve) => setTimeout(resolve, 800));
      setShowRegister(false);
    } catch (err) {
      setRegisterError("Erreur d'inscription. Veuillez réessayer.");
    } finally {
      setIsRegisterLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-background">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <LoginHeader />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {showRegister ? (
            <RegisterSection
              registerData={registerData}
              isPasswordVisible={isRegisterPasswordVisible}
              isConfirmVisible={isRegisterConfirmVisible}
              isLoading={isRegisterLoading}
              error={registerError}
              onFirstNameChange={(value) => handleRegisterChange('firstName', value)}
              onLastNameChange={(value) => handleRegisterChange('lastName', value)}
              onEmailChange={(value) => handleRegisterChange('email', value)}
              onPasswordChange={(value) => handleRegisterChange('password', value)}
              onConfirmPasswordChange={(value) => handleRegisterChange('confirmPassword', value)}
              onTogglePasswordVisible={() => setIsRegisterPasswordVisible(!isRegisterPasswordVisible)}
              onToggleConfirmVisible={() => setIsRegisterConfirmVisible(!isRegisterConfirmVisible)}
              onSubmit={handleRegister}
              onShowLogin={() => setShowRegister(false)}
            />
          ) : (
            <LoginSection
              email={email}
              password={password}
              isVisible={isVisible}
              rememberMe={rememberMe}
              isLoading={isLoading}
              error={error}
              onEmailChange={setEmail}
              onPasswordChange={setPassword}
              onToggleVisible={() => setIsVisible(!isVisible)}
              onRememberChange={setRememberMe}
              onSubmit={handleLogin}
              onShowRegister={() => setShowRegister(true)}
            />
          )}
        </motion.div>

        {/* Footer */}
        <motion.p
          className="text-center text-xs text-foreground/40 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          © 2024 ClubIsen. Tous droits réservés.
        </motion.p>
      </motion.div>
    </div>
  );
}
