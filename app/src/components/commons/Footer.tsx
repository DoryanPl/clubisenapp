'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';
import logo from '@/../public/logo.svg';
import { Link, Divider, Button } from '@heroui/react';
import BackToTop from './BackToTop';

export function Footer() {
  const router = useRouter();
  const currentYear = new Date().getFullYear();

  const ContactInfo = [
    { icon: MapPin, text: 'Brest, France', key: 'location' },
    { icon: Mail, text: 'contact@clubisen.fr', key: 'email' },
    { icon: Phone, text: '+33 2 98 00 00 00', key: 'phone' },
  ];

  const QuickLinks = [
    { href: '/', label: 'Accueil', key: 'home' },
    { href: '/clubs', label: 'Clubs', key: 'clubs' },
    { href: '/membres', label: 'Membres', key: 'members' },
    { href: '/budget', label: 'Budget', key: 'budget' },
  ];

  return (
    <footer className="bg-primary border-t border-default-200 mt-12 sm:mt-16">
      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl mx-auto">
          
        {/* Mobile Brand Section */}
        <div className="block sm:hidden">
          <div className="mb-6 pb-6 border-b border-default-200">
            <div className="flex items-center gap-2 mb-3">
              <Image src={logo} alt="ClubIsen" width={32} height={32} />
              <h3 className="text-base font-bold text-foreground">ClubIsen</h3>
            </div>
            <p className="text-foreground/60 text-xs">
              Gestion des clubs étudiants de l'ISEN Yncréa Ouest
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            {/* Contact Info */}
            <div className="col-span-1">
              <h4 className="text-xs font-semibold text-foreground mb-3">Contact</h4>
              <div className="space-y-2">
                {ContactInfo.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <div key={item.key} className="flex items-center gap-2 text-foreground/60">
                      <IconComponent size={14} />
                      <span className="text-xs">{item.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-span-1">
              <h4 className="text-xs font-semibold text-foreground mb-3">Navigation</h4>
              <div className="flex flex-col space-y-2">
                {QuickLinks.map((link) => (
                  <span
                    key={link.key}
                    onClick={() => router.push(link.href)}
                    className="text-foreground/60 hover:text-secondary text-xs transition-colors cursor-pointer w-fit"
                  >
                    {link.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout*/}
        <div className="hidden sm:grid sm:grid-cols-3 sm:gap-8 mb-6">

          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Image src={logo} alt="ClubIsen" width={32} height={32} />
              <h3 className="text-lg font-bold text-foreground">ClubIsen</h3>
            </div>
            <p className="text-foreground/60 text-sm">
              Gestion des clubs étudiants de l'ISEN Yncréa Ouest
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Contact</h4>
            <div className="space-y-2">
              {ContactInfo.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div key={item.key} className="flex items-center gap-2 text-foreground/60">
                    <IconComponent size={14} />
                    <span className="text-sm">{item.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Navigation</h4>
            <div className="flex flex-col space-y-2">
              {QuickLinks.map((link) => (
                <span
                  key={link.key}
                  onClick={() => router.push(link.href)}
                  className="text-foreground/60 hover:text-secondary text-sm transition-colors cursor-pointer w-fit"
                >
                  {link.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <Divider className="bg-default-300 my-6" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <p className="text-foreground/60 text-xs sm:text-sm">
            © {currentYear} ClubIsen. Tous droits réservés.
          </p>
          <Link href="#" className="text-secondary hover:text-secondary/80 text-xs sm:text-sm transition-colors">
            Signaler un bug
          </Link>
        </div>
      </div>

      {/* Back to Top Component */}
      <BackToTop />
    </footer>
  );
}
