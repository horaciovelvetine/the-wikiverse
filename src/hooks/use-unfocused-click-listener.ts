import { RefObject, useEffect } from 'react';

/**
 * Custom hook that adds an event listener to detect clicks outside of a specified element.
 * When a click outside the element is detected, the provided callback function is executed.
 *
 * @param ref - A React ref object pointing to the element to monitor for outside clicks.
 * @param handleClickCallback - A callback function to execute when a click outside the element is detected.
 * 
 * @example
 * const MyComponent = () => {
 *   const ref = useRef<HTMLDivElement>(null);
 *   const handleClickOutside = () => {
 *     console.log('Clicked outside the element');
 *   };
 *   useUnfocusedClickListener(ref, handleClickOutside);
 * 
 *   return <div ref={ref}>Click outside this element</div>;
 * };
 */
export function useUnfocusedClickListener(ref: RefObject<HTMLDivElement | null>, handleClickCallback: () => void) {
	useEffect(() => {
		// checks if the click is inside the provided element ref to fire callback...
		const handleFocusClickCheck = (e: MouseEvent) => {
			const tgt = e.target as Node;
			if (ref.current && !ref.current.contains(tgt)) {
				handleClickCallback();
			}
		};

		document.addEventListener('mousedown', handleFocusClickCheck);
		return () => {
			document.removeEventListener('mousedown', handleFocusClickCheck);
		};
	}, [ref, handleClickCallback]);
}
