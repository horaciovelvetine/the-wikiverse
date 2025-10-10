import { Link } from "@tanstack/react-router";
import { OutlineCubeIcon, SolidCubeIcon } from "../../../assets";

/**
 * SiteCubeLogo
 *
 * A clickable logo component for the site, featuring a cube icon with animated transitions.
 * When hovered, the outline cube fades out and the solid cube fades in and scales up.
 * Clicking the logo navigates to the home page ("/").
 */

export function SiteLogo() {
  const SiteIconSize = "size-8 sm:size-10 md:size-12 lg:size-14";
  return (
    <Link to="/">
      <div className="relative group inline-block p-3 transition-all duration-300 hover:scale-105">
        <OutlineCubeIcon
          styles={`${SiteIconSize} text-gray-400 transition-opacity duration-300 group-hover:opacity-0`}
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <SolidCubeIcon
            styles={`${SiteIconSize} text-gray-100 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110`}
          />
        </div>
      </div>
    </Link>
  );
}
