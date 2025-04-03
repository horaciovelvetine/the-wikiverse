package edu.velv.wikiverse_api.services.logging;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.wikidata.wdtk.datamodel.interfaces.EntityDocument;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * A specialized logger for Wikidata entity documents that writes both regular logs and JSON-formatted entity details.
 * Uses LogfileWriter for file operations and SLF4J for error logging.
 */
public class WikidataDocumentLogfile {
  private final LogfileWriter logfile;
  private final LogfileWriter datafile;
  private final ObjectMapper objectMapper;

  /**
   * Creates a new WikidataDocumentLogfile instance.
   * 
   * @param regularLogFile Path to regular logfile
   * @param jsonLogFile    Path to JSON log file
   * @param maxFileSize    Maximum size of each log file in bytes
   */
  public WikidataDocumentLogfile(String regularLogFile, String jsonLogFile, int maxFileSize) {
    this.logfile = new LogfileWriter(regularLogFile, maxFileSize);
    this.datafile = new LogfileWriter(jsonLogFile, maxFileSize);
    this.objectMapper = new ObjectMapper();
    this.objectMapper.setSerializationInclusion(com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL);
    this.objectMapper.enable(com.fasterxml.jackson.databind.SerializationFeature.INDENT_OUTPUT);
  }

  /**
   * Logs an EntityDocument with detailed information to both regular log and JSON file.
   */
  public void logEntity(EntityDocument entity) {
    String logMessage = createLogMessage("Wikidata Entity: " + entity.getEntityId().getId() + " Log");

    try {
      // Write to regular log
      logfile.write(logMessage);

      // Write JSON representation
      String json = objectMapper.writeValueAsString(entity);
      datafile.write(json);
    } catch (Exception e) {
      e.printStackTrace();
      logfile.write(e.getStackTrace().toString());
      logfile.write(logMessage + " - FAILED: " + e.getMessage());
      // throw e;
    }
  }

  private String createLogMessage(String message) {
    return String.format("[%s] %s",
        LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME),
        message);
  }
}