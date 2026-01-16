// src/components/ThemeSwitcher.jsx
import React from "react";
import { Button } from "@heroui/react";
import useDarkMode from "../assets/useDarkMode";
import DarkModeIcon from "../assets/darkmode.svg";
import Image from "next/image";

export default function SwitchDarkMode() {
  const [theme, setTheme] = useDarkMode();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      isIconOnly
      variant="light"
      onPress={toggleTheme}
      aria-label="Toggle dark mode"
    >
      <Image
        id="SwitchDarkMode"
        src={DarkModeIcon}
        alt="Dark mode toggle"
        width={24}
        height={24}
      />
    </Button>
  );
}