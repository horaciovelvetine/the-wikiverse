import { Menu, MenuButton, MenuItems, Transition } from "@headlessui/react";

import { MenuBarsIcon, IconSizing } from "../../../assets";
import { SiteNavigation } from "../../../config/site-navigation";
import { DropDownMenuItem } from "./drop-down-menu-item";

/**
 * NavbarDropDownMenu
 *
 * A dropdown menu component for the navigation bar.
 * Utilizes Headless UI's Menu for accessibility and transitions.
 * Renders a menu button (hamburger icon) that, when clicked, displays a list of navigation items.
 * Each item is rendered using the DropDownMenuItem component and navigates to the corresponding route.
 */

export function NavbarDropDownMenu() {
  return (
    <Menu>
      <MenuButton className="outline-none glass-subtle transition-all duration-300 focus-glass my-4 px-2">
        <MenuBarsIcon styles={`${IconSizing} text-gray-900`} />
      </MenuButton>
      <Transition
        key={""}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <MenuItems
          anchor="bottom end"
          className="text-gray-900 rounded-md mt-3 outline-none min-w-[140px] glass-subtle flex flex-col py-1"
        >
          {SiteNavigation.map(navItem => (
            <DropDownMenuItem key={navItem.id} {...navItem} />
          ))}
        </MenuItems>
      </Transition>
    </Menu>
  );
}
