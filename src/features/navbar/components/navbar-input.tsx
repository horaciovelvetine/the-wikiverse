import { Input } from "@headlessui/react";
import { H3TextSizing, IconSizing, SearchIcon } from "../../../assets";

export function NavbarInput() {
  return (
    <div className="flex items-center glass-subtle px-4 py-3">
      <Input
        type="text"
        placeholder="Search..."
        className={`${H3TextSizing} outline-none border-none`}
      />
      <SearchIcon styles={`${IconSizing} text-gray-500 ml-3`} />
    </div>
  );
}
