import { Field, Label, Textarea } from "@headlessui/react";
import { Dispatch, SetStateAction } from "react";

interface TagNotesFieldProps {
  notes: string;
  setNotes: Dispatch<SetStateAction<string>>;
}

export function TagNotesField({ notes, setNotes }: TagNotesFieldProps) {
  return (
    <Field>
      <Label className="block text-xs font-medium text-gray-300 mb-1">
        Notes
      </Label>
      <Textarea
        value={notes}
        onChange={e => setNotes(e.target.value)}
        rows={3}
        placeholder="Add optional context..."
        className="w-full px-2.5 py-1.5 text-sm bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
      />
    </Field>
  );
}
