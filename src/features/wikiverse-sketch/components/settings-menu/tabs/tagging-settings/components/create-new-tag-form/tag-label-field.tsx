import { Field, Input, Label } from "@headlessui/react";
import { Dispatch, SetStateAction } from "react";

interface TagLabelFieldProps {
  label: string;
  setLabel: Dispatch<SetStateAction<string>>;
}

export function TagLabelField({ label, setLabel }: TagLabelFieldProps) {
  return (
    <Field>
      <Label className="block text-xs font-medium text-gray-300 mb-1">
        Label
      </Label>
      <Input
        type="text"
        value={label}
        onChange={e => setLabel(e.target.value)}
        placeholder="Enter tag label"
        className="w-full px-2.5 py-1.5 text-sm bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </Field>
  );
}
