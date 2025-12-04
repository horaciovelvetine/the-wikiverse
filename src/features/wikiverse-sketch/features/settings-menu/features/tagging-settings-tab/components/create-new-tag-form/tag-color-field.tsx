import { Field, Input, Label } from "@headlessui/react";
import { Dispatch, SetStateAction } from "react";

interface TagColorFieldProps {
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
}

export function TagColorField({ color, setColor }: TagColorFieldProps) {
  return (
    <Field>
      <Label className="block text-xs font-medium text-gray-300 mb-1">
        Color
      </Label>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
        <Input
          type="color"
          value={color}
          onChange={e => setColor(e.target.value)}
          className="h-8 w-full sm:w-16 sm:flex-shrink-0 cursor-pointer rounded border border-white/20"
        />
        <Input
          type="text"
          value={color}
          onChange={e => setColor(e.target.value)}
          placeholder="#3b82f6"
          className="flex-1 px-2.5 py-1.5 text-sm bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </Field>
  );
}
