"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, 
  Link, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import { LayoutGrid, Users, Wallet, UserRound, ClipboardList, Drama, LogOut } from "lucide-react";
import SwitchDarkMode from "./SwitchDarkMode";
import Image from "next/image";
import logo from '@/assets/ISEN-logo.jpg';
import { useAuth } from "@/hooks/useAuth";

const allNavItems = [
  { path: "/", label: "Accueil", icon: LayoutGrid },
  { path: "/clubs", label: "Clubs", icon: Drama },
  { path: "/membres", label: "Membres", icon: Users },
  { path: "/budget", label: "Budget", icon: Wallet },
  { path: "/monclub", label: "Mon Club", icon: ClipboardList },
];

const publicNavItems = [
  { path: "/", label: "Accueil", icon: LayoutGrid },
  { path: "/clubs", label: "Clubs", icon: Drama },
];

export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn, isLoading } = useAuth();

  // Show only public nav items if not logged in
  const navItems = isLoggedIn ? allNavItems : publicNavItems;

  // Don't show navbar on login page
  if (pathname === '/login' || isLoading) {
    return null;
  }

  return (
    <>
      {/* Navbar mobile */}
      <Navbar maxWidth="full" className="px-4 sm:px-4 py-2 shadow-sm dark:shadow-xl bg-primary border-b" style={{ borderBottomColor: '#444444' }}>
        <NavbarContent justify="start" className="sm:hidden flex-1">
          <NavbarItem>
            <Button
              isIconOnly
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground hover:bg-secondary/10"
              aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              <motion.span
                animate={{
                  rotate: isMenuOpen ? 45 : 0,
                  y: isMenuOpen ? 8 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="w-6 h-0.5 bg-current"
              />
              <motion.span
                animate={{
                  opacity: isMenuOpen ? 0 : 1,
                }}
                transition={{ duration: 0.2 }}
                className="w-6 h-0.5 bg-current"
              />
              <motion.span
                animate={{
                  rotate: isMenuOpen ? -45 : 0,
                  y: isMenuOpen ? -8 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="w-6 h-0.5 bg-current"
              />
            </Button>
          </NavbarItem>
        </NavbarContent>

        {/* Logo */}
        <NavbarBrand className="flex-1 justify-center sm:justify-start">
          <Button 
            isIconOnly
            onClick={() => router.push("/")} 
            className="bg-transparent hover:bg-transparent cursor-pointer" 
            aria-label="Aller à l'accueil"
          >
            <Image src={logo} alt="ClubIsen Logo" width={128} height={32} />
          </Button>
        </NavbarBrand>

        {/* Navbar desktop */}
        <NavbarContent className="hidden sm:flex gap-4 flex-1" justify="center">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = item.path === "/" ? pathname === "/" : pathname.startsWith(item.path);
            const isHovered = hoveredPath === item.path;

            return (
              <div
                key={item.path}
                onMouseEnter={() => setHoveredPath(item.path)}
                onMouseLeave={() => setHoveredPath(null)}
                className="relative"
              >
                <Button
                  onClick={() => router.push(item.path)}
                  className={`flex items-center gap-2 px-2 py-1 text-sm transition-colors bg-transparent hover:bg-transparent ${
                    isActive ? 'text-secondary' : isHovered ? 'text-foreground' : 'text-foreground/70'
                  }`}
                >
                  <IconComponent size={20} />
                  {item.label}
                </Button>

                <motion.div
                  className="absolute -bottom-2 left-0 h-[3px] bg-secondary rounded-full"
                  initial={{ width: isActive ? "100%" : "0%" }}
                  animate={{ width: isActive || isHovered ? "100%" : "0%" }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{ originX: 0 }} 
                />
              </div>
            );
          })}
        </NavbarContent>
        
        {/* Switch and Profil Menu mobile */}
        <NavbarContent justify="end" className="flex-1 sm:flex-none">
          <NavbarItem className="hidden sm:flex items-center gap-3">
            <SwitchDarkMode />
            {isLoggedIn && <ProfilMenu />}
            {!isLoggedIn && (
              <Button
                onClick={() => router.push('/login')}
                className="bg-secondary hover:bg-secondary/90 text-background font-semibold"
              >
                Connexion
              </Button>
            )}
          </NavbarItem>

          {/* Switch and Profile Menu desktop */}
          <NavbarItem className="sm:hidden flex items-center gap-2">
            <SwitchDarkMode />
            {isLoggedIn && <ProfilMenu />}
            {!isLoggedIn && (
              <Button
                onClick={() => router.push('/login')}
                className="bg-secondary hover:bg-secondary/90 text-background font-semibold"
              >
                Connexion
              </Button>
            )}
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      {/* Menu of NavBar mobile */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed left-0 top-20 right-0 bottom-0 bg-black/30 sm:hidden z-40"
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed left-0 h-screen w-64 bg-primary shadow-sm dark:shadow-xl sm:hidden overflow-y-auto z-50"
            >
              <div className="p-4">
                {navItems.map((item) => {
                  const IconComponent = item.icon;
                  const isActive = item.path === "/" ? pathname === "/" : pathname.startsWith(item.path);

                  return (
                    <Button
                      key={item.path}
                      onClick={() => {
                        router.push(item.path);
                        setIsMenuOpen(false);
                      }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors w-full bg-transparent hover:bg-secondary/10 justify-start ${
                        isActive
                          ? "bg-secondary/10 text-secondary"
                          : "text-foreground hover:bg-secondary/10"
                      }`}
                    >
                      <IconComponent size={20} />
                      <span className="text-base">{item.label}</span>
                    </Button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

{/* Profil menu desktop */}
function ProfilMenu() {
  const router = useRouter();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Button
          isIconOnly
          className="cursor-pointer transition-transform hover:scale-110 bg-transparent hover:bg-transparent border-2 border-foreground"
        >
          <UserRound size={20} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem
          key="profile"
          className="h-14 gap-2"
          textValue={user?.firstName || 'Mon Profil'}
        >
          <p className="font-semibold">{user?.firstName} {user?.lastName}</p>
          <p className="text-xs text-foreground/60">{user?.email}</p>
        </DropdownItem>
        <DropdownItem
          key="profile-page"
          startContent={<UserRound size={16} />}
          onClick={() => router.push('/profil')}
        >
          Mon Profil
        </DropdownItem>
        <DropdownItem
          key="logout"
          color="danger"
          startContent={<LogOut size={16} />}
          onClick={handleLogout}
        >
          Se Déconnecter
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}