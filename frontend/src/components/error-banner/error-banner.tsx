import "./error-banner.css";
import { useEffect, useState } from "react";
import { Close } from "../../assets/icons";
import { useComponentID } from "../../hooks";

interface ErrorBannerProps {
  message?: string;
  onClose?: (val: string) => void;
}

export function ErrorBanner({ message = "", onClose }: ErrorBannerProps) {
  const [isVisible, setIsVisible] = useState<boolean>();
  const { ID } = useComponentID("error-banner");

  useEffect(() => {
    if (message !== "") setIsVisible(true);
    if (message === "") setIsVisible(false);
  }, [message]);

  return (
    <div id={ID("container")} className={isVisible ? "show" : "hide"}>
      <div id={ID("content")}>
        <p id={ID("message-text")}>{message}</p>
        <button
          id={ID("dismiss-button")}
          onClick={() => {
            setIsVisible(false);
            // clear the error message state in the provider...
            setTimeout(() => {
              // delays the message dissapearing until after the animation finishes removing from visibility...
              onClose?.("");
            }, 1000);
          }}
          aria-label="Dismiss error message"
        >
          <img id={ID("close-icon")} src={Close} />
        </button>
      </div>
    </div>
  );
}
