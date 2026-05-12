"use client";

import * as React from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const cycle = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 print:hidden"
        disabled
        type="button"
        aria-label="Cargando preferencia de tema"
      >
        <Sun className="h-4 w-4 opacity-50" />
      </Button>
    );
  }

  const label =
    theme === "light"
      ? "Tema claro. Cambiar a oscuro."
      : theme === "dark"
        ? "Tema oscuro. Usar tema del sistema."
        : "Tema del sistema. Cambiar a claro.";

  return (
    <Button
      variant="outline"
      size="icon"
      className="h-8 w-8 print:hidden"
      onClick={cycle}
      type="button"
      aria-label={label}
      title={label}
    >
      {theme === "light" ? (
        <Sun className="h-4 w-4" />
      ) : theme === "dark" ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Monitor className="h-4 w-4" />
      )}
    </Button>
  );
}
