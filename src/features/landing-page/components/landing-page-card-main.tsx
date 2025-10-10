import { Link } from "@tanstack/react-router";
import { H1TextSizing, H5TextSizing } from "../../../assets";
import { LandingPageSearchInput } from "./landing-page-search-input";
import { ToggleSwitch } from "./toggle-switch";

import { useState } from "react";
import { WikidataLanguageCodes } from "../../../types";

export function LandingPageCardMain() {
  const [wikiLangTarget, setWikiLangTarget] =
    useState<WikidataLanguageCodes>("en");
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [isToggleOn, setIsToggleOn] = useState(true);
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
          showResults={showResults}
          setShowResults={setShowResults}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          wikiLangTarget={wikiLangTarget}
          setWikiLangTarget={setWikiLangTarget}
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

          {/* Right-justified toggle switch */}
          <div className="absolute bottom-1 right-0">
            <ToggleSwitch
              isOn={isToggleOn}
              onToggle={() => setIsToggleOn(!isToggleOn)}
              label="3D?"
              variant="primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
