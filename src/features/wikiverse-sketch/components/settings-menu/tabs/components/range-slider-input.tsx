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
    <Field as="div" className="range-container">
      <Label className="inline-flex gap-1 text-sm text-gray-300">
        <span className="font-extrabold">{setting.label}: </span>{" "}
        <span className="font-semibold">{setting.value}</span>
      </Label>
      <Description className="text-sm text-gray-300">
        {setting.description}
      </Description>

      <Input
        type="range"
        min={setting.min}
        max={setting.max}
        step={setting.step}
        value={setting.value}
        onChange={handleOnchange}
        className="range-glass range-modern w-full"
      />
    </Field>
  );
}
