import { Edge } from './edge';
import { GraphsetMetadata } from './graphset-metadata';
import { Property } from './property';
import { Vertex } from './vertex';

/**
 * Central data store structure for vertices {@link Vertex}, properties {@link Property}, and edges{@link Edge}.
 * Provides a variety of utilities for handling and accessing data throughout the application. Configuration values,
 * and additional details about the Graphset itself can be found in the {@link GraphsetMetadata} attached.
 */
export interface Graphset {
	/**
	 * data about the graphset itself including origin, and values used to calculate the overall layout.
	 */
	metadata: GraphsetMetadata;

	/**
	 * object storage
	 */
	vertices: Vertex[];
	properties: Property[];
	edges: Edge[];
}
