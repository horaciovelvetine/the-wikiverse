package edu.velv.wikiverse_api.services.wikidata;

import java.util.ArrayList;
import java.util.List;

import org.springframework.core.io.ClassPathResource;

import com.fasterxml.jackson.databind.JsonNode;

import edu.velv.wikiverse_api.services.logging.Mappable;
import edu.velv.wikiverse_api.services.logging.ProcessLogfile;

public class WikidataEntityFilter implements Mappable {
  /**
   * The list of filtered entities.
   */
  public List<FilteredEntityRecord> records;

  /**
   * The label for the filter, e.g. "Default Filtered Entities".
   */
  public final String label;

  /**
   * The constructor for the WikidataEntityFilter.
   * 
   * @param fileResourcePath the path to the file containing the list of filtered entities
   * @param logger the logger for the process
   * @param label the reason for the filter
   */
  public WikidataEntityFilter(String fileResourcePath, ProcessLogfile logger, String label) {
    this.records = loadExcludedEntityDataFromFile(fileResourcePath, logger);
    this.label = label;
  }

  /**
   * Checks if an entity ID is present in the list of filtered entities.
   * 
   * @param entityId the ID of the entity to check
   * @return true if the entity ID is present in the list of filtered entities, false otherwise
   */
  public boolean isFiltered(String entityId) {
    return records.stream()
        .anyMatch(record -> record.id().equals(entityId));
  }

  /**
  * Loads the default list of Wikidata entities that should be excluded from processing.
  * This list is stored in a JSON file in the classpath.
  *
  * @return a list of {@link FilteredEntityRecord} objects representing the excluded entities
  * @throws RuntimeException if the file is not found or cannot be read, logs this and then returns an empty list
  * @apiNote a thrown exception is not rethrown, but instead logged and then swallowed.
   */
  private List<FilteredEntityRecord> loadExcludedEntityDataFromFile(String fileResourcePath,
      ProcessLogfile logger) {
    List<FilteredEntityRecord> excludedEntities = new ArrayList<>();

    try {
      JsonNode root = objectMapper.readTree(
          new ClassPathResource(fileResourcePath).getInputStream());
      JsonNode entitiesArray = root.get("default-excluded-wikidata-entities");

      for (JsonNode entity : entitiesArray) {
        String id = entity.get("id").asText();
        String label = entity.get("label").asText();
        String reason = entity.get("reason").asText();
        excludedEntities.add(new FilteredEntityRecord(id, label, reason));
      }
    } catch (Exception e) {
      String errorMessage = "Unable to load Wikidata entity filter data from " + fileResourcePath;
      // rolls this forward to the ProcessLogfile for this process...
      logger.log(errorMessage, () -> {
        throw new RuntimeException(errorMessage + " - " + e.getMessage(), e);
      });
    }

    return excludedEntities;
  }
}
