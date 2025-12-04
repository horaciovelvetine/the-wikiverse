import { Description, Field, Input, Label } from "@headlessui/react";
import { NumberRangeSetting } from "../../../../../../types";

interface AxisSensitivityInputProps {
  xSensitivity: NumberRangeSetting;
  ySensitivity: NumberRangeSetting;
  zSensitivity: NumberRangeSetting;
}

/**
 * AxisSensitivityInput
 *
 * A compact component for controlling X, Y, and Z axis sensitivity settings.
 * Displays all three axes in a grouped, easy-to-understand format.
 *
 * @component
 * @param {AxisSensitivityInputProps} props - The component props.
 * @param {NumberRangeSetting} props.xSensitivity - The X axis sensitivity setting.
 * @param {NumberRangeSetting} props.ySensitivity - The Y axis sensitivity setting.
 * @param {NumberRangeSetting} props.zSensitivity - The Z axis sensitivity setting.
 */
export function AxisSensitivityInput({
  xSensitivity,
  ySensitivity,
  zSensitivity,
}: AxisSensitivityInputProps) {
  const axes = [
    { label: "X", setting: xSensitivity, axis: "Horizontal" },
    { label: "Y", setting: ySensitivity, axis: "Vertical" },
    { label: "Z", setting: zSensitivity, axis: "Depth" },
  ];

  return (
    <Field as="div" className="w-full space-y-3">
      <div>
        <Label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">
          Axis Sensitivity
        </Label>
        <Description className="text-xs sm:text-sm font-light text-gray-300/65">
          Adjust mouse sensitivity for each axis
        </Description>
      </div>

      <div className="space-y-2.5">
        {axes.map(({ label, setting, axis }) => (
          <div
            key={label}
            className="flex items-center justify-center gap-3 w-full"
          >
            <div className="flex items-center gap-2 min-w-[5rem]">
              <span className="text-sm font-bold text-white">{label}:</span>
              <span className="text-sm text-gray-400">{axis}</span>
            </div>
            <Input
              type="range"
              min={setting.min}
              max={setting.max}
              step={setting.step}
              value={setting.value}
              onChange={e => setting.setter(Number(e.target.value))}
              className="range-glass range-modern w-2/3"
              aria-label={`${label} axis sensitivity`}
            />
            <span className="text-sm font-semibold text-white min-w-[2rem] text-right">
              {setting.value}
            </span>
          </div>
        ))}
      </div>
    </Field>
  );
}
