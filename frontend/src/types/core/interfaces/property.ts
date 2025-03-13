/**
 * Represents a property used to store details to describe the relationship shared between {@link Vertex} by an {@link Edge}. Stored inside of a {@link Graphset}.
 */
export interface Property {
	/**
	 * Unique identifier for the property.
	 */
	id: string;
	/**
   Label of name of the property.
   */
	label: string;
	/**
   Short description providing additional details about the property.
   */
	description: string;
}
