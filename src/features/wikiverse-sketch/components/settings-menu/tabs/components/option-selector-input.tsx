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
 */

export function OptionSelectorInput({
  setting,
  map,
}: OptionSelectorInputProps) {
  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setting.setter(e.target.value as typeof setting.value);
  };
  return (
    <Field as="div" className="w-full space-y-2">
      <div className="flex flex-col gap-1.5">
        <Label className="text-xs sm:text-sm font-medium text-gray-300">
          {setting.label}
        </Label>
        {setting.description && (
          <Description className="text-xs sm:text-sm font-light text-gray-300/65">
            {setting.description}
          </Description>
        )}
      </div>

      <div className="flex flex-col items-center w-full">
        <Select
          name="wikidata-language-target"
          aria-label={setting.label}
          value={setting.value}
          onChange={handleSelectionChange}
          className="select-glass select-modern select-sm w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
        >
          {map.map(opt => (
            <option key={opt.code} value={opt.code}>
              {opt.name}
            </option>
          ))}
        </Select>
      </div>
    </Field>
  );
}
