import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "../../../assets";
import { WikiverseLanguageCodes } from "../../../types";
import { Dispatch, SetStateAction } from "react";
import { WikiverseLanguageCodesMap } from "../../../config/wikiverse-language-codes-map";

interface WikiLangSelectMenuProps {
  wikiLangTarget: WikiverseLanguageCodes;
  setWikiLangTarget: Dispatch<SetStateAction<WikiverseLanguageCodes>>;
}

/**
 * WikiLangSelectMenu component renders a dropdown menu for selecting the target Wikipedia language.
 *
 * - Displays the currently selected language code.
 * - Provides a list of all available Wikidata language codes for selection.
 * - When a language is selected, updates the wikiLangTarget state using setWikiLangTarget.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {WikiverseLanguageCodes} props.wikiLangTarget - The currently selected Wikipedia language code.
 * @param {Dispatch<SetStateAction<>>} props.setWikiLangTarget - Callback to update the selected language code.
 */

export function WikiLangSelectMenu({
  wikiLangTarget,
  setWikiLangTarget,
}: WikiLangSelectMenuProps) {
  return (
    <div className="flex items-center text-gray-800 isolate group">
      <Menu>
        <MenuButton
          className={({
            open,
            active,
            focus,
          }: {
            open: boolean;
            active: boolean;
            focus: boolean;
          }) =>
            [
              "flex items-center gap-1 rounded-sm mx-2 px-1 transition-colors outline-none",
              open || active || focus ? "bg-gray-300/50" : "",
              "hover:bg-gray-300/50 group-focus:hover:bg-gray-300/50",
            ].join(" ")
          }
        >
          <p className="font-semibold text-lg">{wikiLangTarget}</p>
          <ChevronDownIcon styles="size-5" />
        </MenuButton>
        <MenuItems
          anchor="bottom"
          className="search-results-dropdown rounded-md drop-shadow-2xl outline-none menu-no-animation"
          style={{
            transform: "none !important",
            animation: "none !important",
            transition: "opacity 200ms ease !important",
            opacity: 0,
          }}
        >
          {WikiverseLanguageCodesMap.map(lang => (
            <MenuItem
              key={`wiki-lang-target-${lang.code}`}
              as="button"
              onClick={() => setWikiLangTarget(lang.code)}
              className={"flex w-full"}
            >
              <span
                className={`block w-full text-left px-4 py-2 text-white hover:bg-white/10 transition-colors ${
                  lang.code === wikiLangTarget ? "font-bold text-blue-400" : ""
                }`}
              >
                {lang.name}
              </span>
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  );
}
