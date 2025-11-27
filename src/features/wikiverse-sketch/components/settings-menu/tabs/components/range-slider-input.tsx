import { Description, Field, Input, Label } from "@headlessui/react";
import { NumberRangeSetting } from "../../../../../../types";

/**
 * RangeSliderInput
 *
 * A reusable range slider input component for numerical settings in the settings menu.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {NumberRangeSetting} props.setting - The range setting configuration object that includes label, description, min, max, step, value, and React state setter.
 */
export function RangeSliderInput({ setting }: { setting: NumberRangeSetting }) {
  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setting.setter(Number(e.target.value));
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

      <div className="flex flex-col items-center w-full gap-1">
        <span className="text-sm font-semibold text-white w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl text-right">
          {setting.value}
        </span>
        <Input
          type="range"
          min={setting.min}
          max={setting.max}
          step={setting.step}
          value={setting.value}
          onChange={handleOnchange}
          className="range-glass range-modern w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
          aria-label={setting.label}
        />
      </div>
    </Field>
  );
}
