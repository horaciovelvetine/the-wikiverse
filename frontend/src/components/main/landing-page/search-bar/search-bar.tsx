import "./search-bar.css";
import { SearchDngr, Search } from "../../../../assets/icons";
import { useComponentID } from "../../../../hooks";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  showError: boolean;
}

/**
 * Located directly under the header text inside the landing-page component,
 * this is a simple search form with a single input and submit button.
 * Form elements are animated with the `showError` state which shakes relevant
 * elements back and forth and colors them red when there is an error response
 * from the Wikiverse API.
 *
 * @param {SearchBarProps} props - The properties for the SearchBar component.
 * @param {string} props.value - The current value of the search input.
 * @param {function} props.onChange - Callback function to handle changes to the search input value.
 * @param {boolean} props.showError - Flag to indicate if there is an error, triggering error animations.
 * @param {function} props.onError - Callback function to handle error state changes.
 */
export const SearchBar = ({ value, onChange, showError }: SearchBarProps) => {
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
        />
      </button>
    </form>
  );
};
