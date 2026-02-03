'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Button, Card, CardBody, Checkbox, Link } from '@heroui/react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import logo from '@/assets/ISEN-logo.jpg';
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-background">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Image
              src={logo}
              alt="ClubIsen Logo"
              width={80}
              height={80}
              priority
            />
          </motion.div>
        </div>

        {/* Title */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Connexion
          </h1>
          <p className="text-foreground/60">
            Accédez à votre compte ClubIsen
          </p>
        </motion.div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Card className="bg-primary/90 border border-default-200 shadow-lg dark:shadow-xl">
            <CardBody className="gap-6 p-6 sm:p-8">
              <form onSubmit={handleLogin} className="space-y-5">
                {/* Error Message */}
                {error && (
                  <div className="p-3 rounded-lg bg-danger/10 border border-danger/50 text-danger text-sm">
                    {error}
                  </div>
                )}

                {/* Email Input */}
                <div>
                  <Input
                    type="email"
                    placeholder="Adresse email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    startContent={
                      <Mail size={18} className="text-foreground/40" />
                    }
                    classNames={{
                      input: 'bg-transparent text-foreground',
                      inputWrapper: 'bg-default-200/50 border border-default-300 hover:border-default-400',
                    }}
                    required
                  />
                </div>

                {/* Password Input */}
                <div>
                  <Input
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={isVisible ? 'text' : 'password'}
                    startContent={
                      <Lock size={18} className="text-foreground/40" />
                    }
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={() => setIsVisible(!isVisible)}
                      >
                        {isVisible ? (
                          <EyeOff size={18} className="text-foreground/40" />
                        ) : (
                          <Eye size={18} className="text-foreground/40" />
                        )}
                      </button>
                    }
                    classNames={{
                      input: 'bg-transparent text-foreground',
                      inputWrapper: 'bg-default-200/50 border border-default-300 hover:border-default-400',
                    }}
                    required
                  />
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <Checkbox
                    isSelected={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    classNames={{ label: 'text-sm text-foreground' }}
                  >
                    Se souvenir de moi
                  </Checkbox>
                  <Link
                    href="#"
                    className="text-sm text-secondary hover:text-secondary/80 font-medium"
                  >
                    Mot de passe oublié?
                  </Link>
                </div>

                {/* Login Button */}
                <Button
                  type="submit"
                  className="w-full bg-secondary hover:bg-secondary/90 text-background font-semibold py-2 mt-6"
                  size="lg"
                  isLoading={isLoading}
                  disabled={isLoading}
                >
                  Se Connecter
                </Button>
              </form>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-default-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-primary/90 text-foreground/60">
                    Ou
                  </span>
                </div>
              </div>

              {/* Sign Up Link */}
              <p className="text-center text-sm text-foreground/60">
                Pas encore de compte?{' '}
                <Link
                  href="#"
                  className="text-secondary hover:text-secondary/80 font-semibold"
                >
                  Inscrivez-vous
                </Link>
              </p>
            </CardBody>
          </Card>
        </motion.div>

        {/* Demo Credentials */}
        <motion.div
          className="mt-8 p-4 bg-primary/50 border border-default-300 rounded-lg text-xs text-foreground/60 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <p className="font-semibold text-foreground/80 mb-2">Identifiants de test</p>
          <p>Email: test@isen.fr</p>
          <p>Mot de passe: password123</p>
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
