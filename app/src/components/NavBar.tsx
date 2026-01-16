"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, 
  Link, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { LayoutGrid, GraduationCap, Users, Wallet, UserCircle, UserRound } from "lucide-react";
import SwitchDarkMode from "./SwitchDarkMode";
import Image from "next/image";
import logo from "../../public/logo.svg";

const navItems = [
  { path: "/", label: "Accueil", icon: LayoutGrid },
  { path: "/clubs", label: "Clubs", icon: GraduationCap },
  { path: "/membres", label: "Membres", icon: Users },
  { path: "/budget", label: "Budget", icon: Wallet },
  { path: "/profil", label: "Mon Profil", icon: UserCircle },
];

const profileMenuItems = [
  { label: "Mon Profil", key: "profile" },
  { label: "Modifier le Profil", key: "edit" },
  { label: "Paramètres", key: "settings" },
  { label: "Se Déconnecter", key: "logout", color: "danger" },
];

export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const pathname = usePathname();

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} maxWidth="full" className="px-4 py-2 shadow-sm dark:shadow-xl bg-primary">
      <NavbarBrand>
        <Image src={logo} alt="ClubIsen Logo" className="h-8 w-auto" />
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = pathname === item.path;
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
                className="flex items-center gap-2 px-2 py-1 text-sm"
              >
                <IconComponent size={20} />
                {item.label}
              </Link>

              <motion.div
                className="absolute -bottom-2 left-0 h-[3px] bg-foreground rounded-full"
                initial={{ width: isActive ? "100%" : "0%" }}
                animate={{ width: isActive || isHovered ? "100%" : "0%" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{ originX: 0 }} 
              />
            </NavbarItem>
          );
        })}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="flex items-center gap-3">
          <SwitchDarkMode />
          <ProfileMenu />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        className="sm:hidden"
      />

      <NavbarMenu>
        {navItems.map((item) => (
          <NavbarMenuItem key={item.path}>
            <Link
              color="foreground"
              href={item.path}
              className="w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

function ProfileMenu() {
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
        {profileMenuItems.map((item) => (
          <DropdownItem
            key={item.key}
            color={item.key === "logout" ? "danger" : "default"}
            className={item.key === "logout" ? "text-danger" : ""}
          >
            {item.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}