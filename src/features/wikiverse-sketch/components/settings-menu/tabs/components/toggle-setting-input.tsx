import { Button, Description, Field, Label } from "@headlessui/react";
import { ToggleItemSetting } from "../../../../../../types";

interface ToggleSettingInputProps {
  setting: ToggleItemSetting;
}

/**
 * ToggleSettingInput component renders a toggle switch UI for a boolean setting.
 *
 * @component
 * @param {ToggleSettingInputProps} props - The props for the toggle input.
 * @param {ToggleItemSetting} props.setting - The toggle setting object, containing its label, description, current value, and setter function.
 */

export function ToggleSettingInput({ setting }: ToggleSettingInputProps) {
  return (
    <Field as="div" className="flex items-center justify-between">
      <div className="w-7/8">
        <Label className="text-sm font-medium text-gray-300">
          {setting.label}
        </Label>
        <Description className="text-sm font-light text-gray-300/65">
          {setting.description}
        </Description>
      </div>
      <Button
        onClick={() => setting.setter(prev => !prev)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          setting.value ? "bg-blue-600" : "bg-gray-600"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            setting.value ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </Button>
    </Field>
  );
}
