"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const nextTheme = theme === "light" ? "dark" : "light";

  return (
    <DropdownMenuItem
      className="cursor-pointer"
      onClick={() => setTheme(nextTheme)}
    >
      {nextTheme === "dark" ? <Moon className="mr-2 h-4 w-4" /> : <Sun className="mr-2 h-4 w-4" />}
      <span>{`Switch to ${nextTheme} mode`}</span>
    </DropdownMenuItem>
  );
};
