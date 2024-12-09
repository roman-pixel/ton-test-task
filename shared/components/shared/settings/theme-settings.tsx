import { Check } from "lucide-react";
import { useTheme } from "next-themes";
import React, { PropsWithChildren } from "react";

import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "../../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";

import { cn } from "@/shared/lib";

export const themeLabels: Record<string, string> = {
  light: "Светлая",
  dark: "Темная",
  system: "Системная",
};

export const ThemeSettings: React.FC<PropsWithChildren> = ({ children }) => {
  const { theme: currentTheme, themes, setTheme } = useTheme();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const labeledThemes = themes.map((theme) => ({
    value: theme,
    label: themeLabels[theme] || theme,
  }));

  const handleChange = (selectedValue: string) => {
    setValue(selectedValue === value ? "" : selectedValue);
    setOpen(false);
    setTheme(selectedValue);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {labeledThemes.map((theme) => (
                <CommandItem
                  key={theme.value}
                  value={theme.value}
                  onSelect={(e) => handleChange(e)}
                  className="flex items-center justify-between data-[selected='true']:bg-transparent"
                >
                  {theme.label}
                  <Check
                    strokeWidth={3}
                    className={cn(
                      "mr-2 h-4 w-4 text-primary/80",
                      currentTheme === theme.value
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
