import { Description, Field, Label, Select } from "@headlessui/react";
import {
  WikiverseLanguageCodes,
  SelectLanguageSetting,
} from "../../../../../../types";

interface OptionSelectorInputProps {
  setting: SelectLanguageSetting;
  map: {
    code: WikiverseLanguageCodes;
    name: string;
  }[];
}
/**
 * OptionSelectorInput
 *
 * A generic option selector input component designed to render a dropdown
 * for selecting among language options, typically for selecting a Wikipedia language code.
 * It leverages the Headless UI components for accessible markup and styling.
 *
 * Props:
 * @param {SelectLanguageSetting} setting - The setting object representing the currently selected language value,
 *                                          its setter, label, and description.
 * @param {Array<{ code: WikiverseLanguageCodes, name: string }>} map - An array of language options with their codes and display names.
 *
 * Renders:
 * - A label describing the option.
 * - An optional description.
 * - A select input where users can choose their preferred language option.
 *
 * @example:
 * ```
 * <OptionSelectorInput setting={someSelectLanguageSetting} map={languagesList} />
 * ```
 */

export function OptionSelectorInput({
  setting,
  map,
}: OptionSelectorInputProps) {
  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setting.setter(e.target.value as typeof setting.value);
  };
  return (
    <Field className="w-full">
      <Label className="block text-xs sm:text-sm font-medium text-gray-300">
        {setting.label}
      </Label>
      <Description className="text-xs sm:text-sm font-light text-gray-300/65 mt-1 sm:mt-1.5">
        {setting.description}
      </Description>
      <Select
        name="wikidata-language-target"
        aria-label="Language Data Target"
        value={setting.value}
        onChange={handleSelectionChange}
        className="select-glass select-sm w-full mt-2 sm:mt-3"
      >
        {map.map(opt => (
          <option key={opt.code} value={opt.code}>
            {opt.name}
          </option>
        ))}
      </Select>
    </Field>
  );
}
