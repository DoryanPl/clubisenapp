"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, 
  Link, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import NextLink from "next/link";
import { LayoutGrid, Users, Wallet, UserRound, ClipboardList, Drama } from "lucide-react";
import SwitchDarkMode from "./SwitchDarkMode";
import Image from "next/image";
import logo from "@/../public/logo.svg";

const navItems = [
  { path: "/", label: "Accueil", icon: LayoutGrid },
  { path: "/clubs", label: "Clubs", icon: Drama },
  { path: "/membres", label: "Membres", icon: Users },
  { path: "/budget", label: "Budget", icon: Wallet },
  { path: "/monclub", label: "Mon Club", icon: ClipboardList },
];

const profilMenuItems = [
  { path: "/profil", label: "Mon Profil", key: "profile" },
  { path: "/profil/edit", label: "Modifier le Profil", key: "edit" },
  { path: "/profil/settings", label: "Paramètres", key: "settings" },
  { path: "/logout", label: "Se Déconnecter", key: "logout", color: "danger" },
];

export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const pathname = usePathname();

  return (
    <>
      {/* Navbar mobile */}
      <Navbar maxWidth="full" className="px-4 sm:px-4 py-2 shadow-sm dark:shadow-xl bg-primary border-b" style={{ borderBottomColor: '#444444' }}>
        <NavbarContent justify="start" className="sm:hidden flex-1">
          <NavbarItem>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground p-2 hover:bg-secondary/10 rounded-lg transition-colors relative w-10 h-10 flex flex-col items-center justify-center gap-1.5"
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
            </button>
          </NavbarItem>
        </NavbarContent>

        {/* Logo */}
        <NavbarBrand className="flex-1 justify-center sm:justify-start">
          <NextLink href="/" className="inline-flex items-center" aria-label="Aller à l'accueil">
            <Image src={logo} alt="ClubIsen Logo" width={128} height={32} />
          </NextLink>
        </NavbarBrand>

        {/* Navbar desktop */}
        <NavbarContent className="hidden sm:flex gap-4 flex-1" justify="center">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = item.path === "/" ? pathname === "/" : pathname.startsWith(item.path);
            const isHovered = hoveredPath === item.path;

            return (
              <NavbarItem
                key={item.path}
                isActive={isActive}
                onMouseEnter={() => setHoveredPath(item.path)}
                onMouseLeave={() => setHoveredPath(null)}
                className="relative"
              >
                <Link
                  color={"foreground"}
                  href={item.path}
                  className={`flex items-center gap-2 px-2 py-1 text-sm transition-colors ${
                    isActive ? 'text-secondary' : isHovered ? 'text-foreground' : 'text-foreground/70'
                  }`}
                >
                  <IconComponent size={20} />
                  {item.label}
                </Link>

                <motion.div
                  className="absolute -bottom-2 left-0 h-[3px] bg-secondary rounded-full"
                  initial={{ width: isActive ? "100%" : "0%" }}
                  animate={{ width: isActive || isHovered ? "100%" : "0%" }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{ originX: 0 }} 
                />
              </NavbarItem>
            );
          })}
        </NavbarContent>
        
        {/* Switch and Profil Menu mobile */}
        <NavbarContent justify="end" className="flex-1 sm:flex-none">
          <NavbarItem className="hidden sm:flex items-center gap-3">
            <SwitchDarkMode />
            <ProfilMenu />
          </NavbarItem>

          {/* Switch and Profile Menu desktop */}
          <NavbarItem className="sm:hidden flex items-center gap-2">
            <SwitchDarkMode />
            <ProfilMenu />
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
                    <Link
                      key={item.path}
                      href={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                        isActive
                          ? "bg-secondary/10 text-secondary"
                          : "text-foreground hover:bg-secondary/10"
                      }`}
                    >
                      <IconComponent size={20} />
                      <span className="text-base">{item.label}</span>
                    </Link>
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
  const handleAction = (key: any) => {
    if (key === "logout") console.log("Logging out...");
  };

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <button className="cursor-pointer transition-transform hover:scale-110 p-1 rounded-full border-2 border-foreground">
          <UserRound size={20} />
        </button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat" onAction={handleAction}>
        {profilMenuItems.map((item) => (
          <DropdownItem
            key={item.key}
            color={item.key === "logout" ? "danger" : "default"}
            className={item.key === "logout" ? "text-danger" : ""}
            href={item.path}
          >
            {item.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}