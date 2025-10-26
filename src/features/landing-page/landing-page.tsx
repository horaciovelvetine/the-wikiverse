import { Link } from "@tanstack/react-router";

import { Dispatch, SetStateAction, useCallback } from "react";
import { SearchResult, WikidataLanguageCodes } from "../../types";
import { H1TextSizing, H5TextSizing } from "../../assets";
import { LandingPageSearchInput } from "./components/landing-page-search-input";
import { ToggleSwitch } from "./components/toggle-switch";
import { useWikiverseService } from "../../hooks";

interface LandingPageProps {
  setSketchQuery: Dispatch<SetStateAction<string>>;
  wikiLangTarget: WikidataLanguageCodes;
  setWikiLangTarget: Dispatch<SetStateAction<WikidataLanguageCodes>>;
  prefers3D: boolean;
  setPrefers3D: Dispatch<SetStateAction<boolean>>;
}

/**
 * LandingPage component renders the main entry page for Wikiverse.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Dispatch<SetStateAction<string>>} props.setSketchQuery - Function to set the sketch query.
 * @param {WikidataLanguageCodes} props.wikiLangTarget - Currently selected Wikipedia language code.
 * @param {Dispatch<SetStateAction<WikidataLanguageCodes>>} props.setWikiLangTarget - Function to update the selected Wikipedia language code.
 * @param {boolean} props.prefers3D - Whether the user prefers a 3D view.
 * @param {Dispatch<SetStateAction<boolean>>} props.setPrefers3D - Function to toggle 3D view preference.
 */
export function LandingPage({
  wikiLangTarget,
  setWikiLangTarget,
  prefers3D,
  setPrefers3D,
}: LandingPageProps) {
  const { fetchInitialGraphsetData } = useWikiverseService();
  /**
   * Takes in the user selected result, and should send a request and get everything rolling
   */
  const handleSelectSearchResultSubmit = useCallback(
    async (searchResult: SearchResult) => {
      const results = await fetchInitialGraphsetData(
        searchResult.entityID,
        wikiLangTarget,
        prefers3D
      );
    },
    [fetchInitialGraphsetData, prefers3D, wikiLangTarget]
  );

  return (
    <div className="">
      <div className="glass-card glass-padding-lg mx-auto text-gray-900">
        <h1
          className={`${H1TextSizing} font-black mb-4 sm:text-6xl gradient-text`}
        >
          the Wikiverse
        </h1>
        <p className="text-xl font-semibold sm:text-2xl leading-relaxed max-w-2xl mx-auto">
          Explore the interconnected world of Wikipedia in 3D.
        </p>
        <LandingPageSearchInput
          wikiLangTarget={wikiLangTarget}
          setWikiLangTarget={setWikiLangTarget}
          handleSelectSearchResultSubmit={handleSelectSearchResultSubmit}
        />
        <div className="relative mt-6 w-full">
          {/* Centered button container */}
          <div className="flex items-center justify-center gap-3">
            <h3 className={`${H5TextSizing} font-semibold select-none italic`}>
              New Here?
            </h3>
            <Link
              to="/about"
              className="btn-modern btn-glass-ghost px-2 py-1 rounded-md"
            >
              About Wikiverse
            </Link>
            <Link
              to="/contact"
              className="btn-modern btn-glass-ghost px-2 py-1 rounded-md"
            >
              Contact
            </Link>
          </div>

          {/* Prefers 3D Toggle Switch */}
          <div className="absolute bottom-1 right-0">
            <ToggleSwitch
              isOn={prefers3D}
              onToggle={() => setPrefers3D(prev => !prev)}
              label="3D?"
              variant="primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
