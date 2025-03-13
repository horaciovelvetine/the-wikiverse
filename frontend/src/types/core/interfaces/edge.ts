/**
 * Stores details explaining the relationship between two {@link Vertex} inside of a {@link Graphset}.
 * By the nature of this project edges are directional and have a source and target. This structure mimics
 * Wikimedia's {@link https://commons.wikimedia.org/wiki/Commons:Structured_data} approach and can be easily
 * concieved of as a statement, ex:  "Kevin Bacon is an Actor". Kevin Bacon is the source, Actor is the target
 * and "is an" refers to "Actor" being his profession (describing the nature of the relationship is the {@link Property}).
 */
export interface Edge {
	/**
	 * the source {@link Vertex} ID.
	 */
	sourceID: string;
	/**
	 * the target {@link Vertex} ID.
	 */
	targetID: string;
	/**
	 * the property {@link Property} ID.
	 */
	propertyID: string;
	/**
	 * alternative means of describing a relationships nature when a property doesn't make sense (used for date's).
	 */
	label: string;
}
