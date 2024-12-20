"use client";

import { Check } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import React, {
  PropsWithChildren,
  useEffect,
  useState,
  useTransition,
} from "react";

import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "../../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";

import { Locale, routing, usePathname, useRouter } from "@/i18n/routing";
import { useHapticFeedback } from "@/shared/hooks";
import { cn } from "@/shared/lib";

export const LangSettings: React.FC<PropsWithChildren> = ({ children }) => {
  const t = useTranslations("Settings.language");
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const params = useParams();
  const triggerFeedback = useHapticFeedback();

  const [isPending, startTransition] = useTransition();

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const labeledLangs = routing.locales.map((lang) => ({
    value: lang,
    label: t(`type.${lang}`),
  }));

  const handleChange = async (event: string) => {
    triggerFeedback("selection");

    const nextLocale = event as Locale;

    setValue(nextLocale === value ? "" : nextLocale);
    setOpen(false);

    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale },
      );
    });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {labeledLangs.map((lang) => (
                <CommandItem
                  disabled={isPending}
                  key={lang.value}
                  value={lang.value}
                  onSelect={handleChange}
                  className="flex cursor-pointer items-center justify-between py-3 data-[selected='true']:bg-transparent"
                >
                  {lang.label}
                  <Check
                    strokeWidth={3}
                    className={cn(
                      "mr-2 h-4 w-4 text-primary/80",
                      locale === lang.value ? "opacity-100" : "opacity-0",
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
