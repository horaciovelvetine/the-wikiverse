import "./search-form.css";
import { createRef, FormEvent } from "react";

import { useComponentID } from "../../../../hooks";
import { Search, SearchDngr } from "../../../../assets/icons";

export function SearchForm() {
  const { ID } = useComponentID("search");
  const inputRef = createRef<HTMLInputElement>();
  // todo => request routine? tan-stackify?
  const isErrored = false;

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputValue = inputRef.current?.value;
    console.log("search for: " + inputValue);
  };

  return (
    <form id={ID("form")} onSubmit={handleSearchSubmit}>
      <input
        id={ID("input")}
        type="text"
        placeholder="Search..."
        autoFocus={true}
        ref={inputRef}
        className={isErrored ? "error-animated" : ""}
      />
      <button
        id={ID("submit")}
        type="submit"
        className={isErrored ? "error-animated" : ""}
      >
        <img
          id={ID("danger-icon")}
          src={SearchDngr}
          className={isErrored ? "error-animated" : ""}
        />
        <img
          id={ID("search-icon")}
          src={Search}
          className={isErrored ? "error-animated" : ""}
        />
      </button>
    </form>
  );
}
