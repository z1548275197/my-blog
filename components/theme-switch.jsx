'use client';

import { Switch } from '@nextui-org/switch'
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MoonFilledIcon, SunFilledIcon } from '@/components/icons';

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      <Switch
        isSelected={theme === 'light'}
        size="lg"
        color="secondary"
        onValueChange={(isSelected) => {
          setTheme(isSelected ? 'light' : 'dark');
        }}
        thumbIcon={({ isSelected, className }) =>
          isSelected ? (
            <SunFilledIcon className={className} />
          ) : (
            <MoonFilledIcon className={className} />
          )
        }
      >
      </Switch>
    </div>
  )
};