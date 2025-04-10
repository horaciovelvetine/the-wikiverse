package edu.velv.wikiverse_api.services.wikidata;

/**
 * Record representing a filtered Wikidata {@link org.wikidata.wdtk.datamodel.interfaces.Entity} that is excluded from a 
 * {@link edu.velv.wikiverse_api.models.core.Graphset}. Contains the essential identifying information (ID, label, description)
 * from the original entity while omitting other details that are not needed for filtering purposes.
 *
 * @see org.wikidata.wdtk.datamodel.interfaces.Entity
 * @see edu.velv.wikiverse_api.models.core.Graphset
 */

public record FilteredEntityDetails(String id, String label, String reason) {
}
