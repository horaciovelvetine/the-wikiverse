import { MenuItem } from "@headlessui/react";
import { Link } from "@tanstack/react-router";
import { NavigationItem } from "../../../types";
import { H3TextSizing } from "../../../assets";

/**
 * DropDownMenuItem
 *
 * A single item component for use within a dropdown menu in the navigation bar.
 * Renders a styled link that navigates to the specified route when clicked.
 *
 * @param {NavigationItem} props - The navigation item properties.
 * @param {string} props.to - The route path to navigate to.
 * @param {string} props.text - The display text for the menu item.
 */
export function DropDownMenuItem({ to, text }: NavigationItem) {
  return (
    <MenuItem>
      <Link
        to={to}
        className={`block py-1 text-end mx-1 pl-16 pr-2 ${H3TextSizing} font-semibold hover:bg-gray-500 rounded-md`}
      >
        {text}
      </Link>
    </MenuItem>
  );
}
