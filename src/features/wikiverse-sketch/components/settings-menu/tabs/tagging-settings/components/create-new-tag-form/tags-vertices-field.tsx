import { useCallback, useMemo, useState } from "react";
import { Field, Input, Label } from "@headlessui/react";
import {
  SketchDataState,
  TagState,
  VertexData,
} from "../../../../../../../../types";
import { XMarkIcon } from "../../../../../../../../assets";

type TagsVerticesFieldProps = {
  sketchDataState: SketchDataState;
} & Pick<TagState, "vertices" | "addVertex" | "addVertices" | "removeVertex">;

const MAX_SUGGESTIONS = 8;

/**
 * TagsVerticesField
 *
 * A controlled field component for selecting and managing vertices associated with a tag.
 * Provides:
 *   - An input field for searching and selecting vertices to add to the tag.
 *   - Autocomplete suggestions based on the user's query.
 *   - Display of currently selected vertices, each with a remove button.
 *
 * Props:
 * - sketchDataState: SketchDataState
 *     The global sketch state, used to access the available vertices for suggestion and lookup.
 * - vertices: string[]
 *     The list of currently selected vertex IDs for the tag.
 * - addVertex: (v: string) => void
 *     Callback to add a vertex to the tag.
 * - addVertices: (v: string[]) => void
 *     Callback to add multiple vertices to the tag.
 * - removeVertex: (v: string) => void
 *     Callback to remove a vertex from the tag.
 *
 * UI:
 *   - Shows suggestions as the user types (limited to MAX_SUGGESTIONS).
 *   - Prevents duplicate vertex selection.
 *   - Allows removing vertices from the current selection.
 *
 * Used in the create/edit tag form UI for per-tag vertex membership management.
 *
 * TODO: Refactor for clarity and to not be overwhelming
 */

export function TagsVerticesField({
  sketchDataState,
  vertices, // vertexIDs from tag...
  addVertex,
  removeVertex,
}: TagsVerticesFieldProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const normalizedQuery = query.trim().toLowerCase();
  const hasQuery = normalizedQuery.length > 0;

  const filteredVertices = useMemo(() => {
    if (!normalizedQuery) {
      return sketchDataState.vertices.slice(0, MAX_SUGGESTIONS);
    }
    return sketchDataState.vertices
      .filter(vertex => {
        const label = vertex.label?.toLowerCase() || "";
        const id = vertex.id.toLowerCase();
        return label.includes(normalizedQuery) || id.includes(normalizedQuery);
      })
      .slice(0, MAX_SUGGESTIONS);
  }, [normalizedQuery, sketchDataState.vertices]);

  const handleVertexSelect = useCallback(
    (vertexId: string) => {
      if (vertices.includes(vertexId)) {
        setQuery("");
        return;
      }
      addVertex(vertexId);
      setQuery("");
    },
    [addVertex, vertices]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== "Enter") return;
      if (!hasQuery) {
        return;
      }
      event.preventDefault();
      if (filteredVertices.length > 0) {
        handleVertexSelect(filteredVertices[0].id);
      }
    },
    [filteredVertices, handleVertexSelect, hasQuery]
  );

  const showSuggestions = isFocused && hasQuery && filteredVertices.length > 0;
  const showEmptyState = isFocused && hasQuery && !filteredVertices.length;

  return (
    <Field className="space-y-1">
      <Label className="block text-xs font-medium text-gray-300">
        Vertices
      </Label>

      <div className="relative">
        <Input
          type="text"
          value={query}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={event => setQuery(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search vertices by label or ID"
          className="w-full px-2.5 py-1.5 text-sm bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        {showSuggestions && (
          <div
            className="absolute left-0 right-0 mt-1 bg-gray-900 border border-white/10 rounded-lg shadow-xl z-50 max-h-48 overflow-y-auto text-sm"
            onMouseDown={event => event.preventDefault()}
          >
            {filteredVertices.map(vertex => {
              const alreadySelected = vertices.includes(vertex.id);
              return (
                <button
                  key={vertex.id}
                  type="button"
                  className={`w-full text-left px-3 py-2 flex flex-col gap-0.5 transition-colors ${
                    alreadySelected
                      ? "bg-blue-500/10 text-blue-200"
                      : "text-white hover:bg-white/5"
                  }`}
                  onMouseDown={event => event.preventDefault()}
                  onClick={() => handleVertexSelect(vertex.id)}
                >
                  <span className="font-medium">{vertex.label}</span>
                  <span className="text-xs text-gray-400">
                    {vertex.id}
                    {vertex.description
                      ? ` · ${vertex.description.slice(0, 60)}${
                          vertex.description.length > 60 ? "…" : ""
                        }`
                      : ""}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {showEmptyState && (
          <div className="absolute left-0 right-0 mt-1 bg-gray-900 border border-white/10 rounded-lg shadow-xl z-50 px-3 py-2 text-sm text-gray-400">
            No vertices match “{query.trim()}”
          </div>
        )}
      </div>
      {vertices.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1.5">
          {vertices.map(vertexId => {
            const vertex = sketchDataState.getVertexByID(vertexId);
            return (
              <span
                key={vertexId}
                className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full bg-blue-500/20 border border-blue-500/40 text-white font-semibold"
                title={vertex?.description || vertexId}
              >
                <span className="truncate max-w-[9rem]">
                  {vertex?.label || vertexId}
                </span>
                <button
                  type="button"
                  className="text-white hover:text-red-500 transition-all duration-150 focus:outline-none "
                  onClick={() => removeVertex(vertexId)}
                  aria-label={`Remove ${vertex?.label || vertexId}`}
                >
                  <XMarkIcon styles="size-4" />
                </button>
              </span>
            );
          })}
        </div>
      )}
    </Field>
  );
}
