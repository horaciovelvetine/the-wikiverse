import "./search-bar.css";
import { SearchDngr, Search } from "../../../../assets/icons";
import { useComponentID } from "../../../../hooks";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  showError: boolean;
  onError: (showError: boolean) => void;
}

export function SearchBar({ value, onChange, showError }: SearchBarProps) {
  const { ID } = useComponentID("search-bar");

  return (
    <form id={ID("form")} onSubmit={e => e.preventDefault()}>
      <input
        id={ID("input")}
        type="text"
        placeholder="Search..."
        autoFocus
        value={value}
        className={showError ? "error-animated" : ""}
        onChange={e => onChange(e.target.value)}
      />
      <button
        id={ID("search-submit")}
        type="submit"
        className={showError ? "error-animated" : ""}
      >
        <img
          id={ID("submit-icon")}
          src={showError ? SearchDngr : Search}
          alt={"Search"}
          className={showError ? "error-animated" : ""}
        />
      </button>
    </form>
  );
}
