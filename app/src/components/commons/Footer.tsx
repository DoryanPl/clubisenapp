'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import Image from 'next/image';
import logo from '@/../public/logo.svg';
import { Button, Link, Divider } from '@heroui/react';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Navigation',
      links: [
        { label: 'Accueil', href: '/' },
        { label: 'Clubs', href: '/clubs' },
        { label: 'Membres', href: '/membres' },
        { label: 'Budget', href: '/budget' },
      ],
    },
    {
      title: 'Ressources',
      links: [
        { label: 'À propos', href: '#' },
        { label: 'Contact', href: '#' },
        { label: 'FAQ', href: '#' },
        { label: 'Support', href: '#' },
      ],
    },
    {
      title: 'Légal',
      links: [
        { label: 'Conditions d\'utilisation', href: '#' },
        { label: 'Politique de confidentialité', href: '#' },
        { label: 'Cookies', href: '#' },
        { label: 'Accessibilité', href: '#' },
      ],
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <motion.footer
      className="bg-primary border-t border-default-200 mt-12 sm:mt-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      {/* Main Footer Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <motion.div className="lg:col-span-1" variants={itemVariants}>
            <div className="flex items-center gap-3 mb-4">
              <Image src={logo} alt="ClubIsen" width={40} height={40} />
              <h3 className="text-xl font-bold text-foreground">ClubIsen</h3>
            </div>
            <p className="text-foreground/60 text-sm mb-4">
              Gestion des clubs étudiants de l'ISEN Yncréa Ouest
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-foreground/60">
                <MapPin size={16} />
                <span className="text-sm">Brest, France</span>
              </div>
              <div className="flex items-center gap-2 text-foreground/60">
                <Mail size={16} />
                <span className="text-sm">contact@clubisen.fr</span>
              </div>
              <div className="flex items-center gap-2 text-foreground/60">
                <Phone size={16} />
                <span className="text-sm">+33 2 98 00 00 00</span>
              </div>
            </div>
          </motion.div>

          {/* Footer Links Sections */}
          {footerLinks.map((section, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <h4 className="text-sm font-bold text-foreground uppercase mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link
                      href={link.href}
                      className="text-foreground/60 hover:text-secondary text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Social Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-sm font-bold text-foreground uppercase mb-4">
              Nous suivre
            </h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social, idx) => {
                const IconComponent = social.icon;
                return (
                  <Button
                    key={idx}
                    isIconOnly
                    as="a"
                    href={social.href}
                    className="bg-default-200/50 hover:bg-secondary hover:text-background text-foreground transition-colors"
                    aria-label={social.label}
                  >
                    <IconComponent size={18} />
                  </Button>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <Divider className="bg-default-300 my-8" />

        {/* Bottom Section */}
        <motion.div
          className="flex flex-col sm:flex-row justify-between items-center gap-4"
          variants={itemVariants}
        >
          <p className="text-foreground/60 text-sm">
            © {currentYear} ClubIsen. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4 text-foreground/60 text-sm">
            <Link href="#" className="text-secondary transition-colors">
              Sitemap
            </Link>
            <div className="w-1 h-1 bg-default-300 rounded-full" />
            <Link href="#" className="text-secondary transition-colors">
              Signaler un bug
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Floating Action - Back to Top */}
      <motion.div
        className="px-4 sm:px-6 lg:px-8 py-4 max-w-7xl mx-auto flex justify-end"
        variants={itemVariants}
      >
        <Button
          isIconOnly
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-secondary hover:bg-secondary/90 text-background"
          aria-label="Retour en haut"
        >
          ↑
        </Button>
      </motion.div>
    </motion.footer>
  );
}
