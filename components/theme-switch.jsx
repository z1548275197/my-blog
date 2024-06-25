'use client'; // uncomment this line if you're using Next.js App Directory Setup

import { Switch } from '@nextui-org/switch'
import useDarkMode from "use-dark-mode";
import { MoonFilledIcon, SunFilledIcon } from '@/components/icons';

export const ThemeSwitcher = () => {
  const darkMode = useDarkMode(false);

  return (
    <div>
      <Switch
        defaultSelected
        size="lg"
        color="secondary"
        onValueChange={(boolean) => {
          if (boolean) {
            darkMode.disable()
          } else {
            darkMode.enable()
          }
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