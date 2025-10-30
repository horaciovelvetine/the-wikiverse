import { NavigationItem } from "../types";

/**
 * Defines the Pages managed by Tanstack Router
 */
export const SiteNavigation: NavigationItem[] = [
  { id: "home-page", to: "/", text: "Home" },
  { id: "about-page", to: "/about", text: "About" },
  { id: "contact-page", to: "/contact", text: "Contact" },
];
