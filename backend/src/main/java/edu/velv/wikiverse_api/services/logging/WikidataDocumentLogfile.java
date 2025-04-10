package edu.velv.wikiverse_api.services.logging;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.wikidata.wdtk.datamodel.implementation.ItemDocumentImpl;

import org.wikidata.wdtk.datamodel.implementation.ValueSnakImpl;
import org.wikidata.wdtk.datamodel.interfaces.EntityDocument;
import org.wikidata.wdtk.datamodel.interfaces.Snak;
import org.wikidata.wdtk.datamodel.interfaces.Statement;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

/**
 * A specialized logger for Wikidata entity documents that writes both regular logs and JSON-formatted entity details.
 * Uses LogfileWriter for file operations and SLF4J for error logging.
 */
public class WikidataDocumentLogfile implements Mappable {
  private final LogfileWriter processLogfile;
  private final List<String> excludedDatatype = java.util.Arrays.asList("external-id", "globe-coordinate", "geo-shape");
  private final int maxFileSize;

  /**
   * Creates a new WikidataDocumentLogfile instance.
   * 
   * @param regularLogFile Path to regular logfile
   * @param jsonLogFile    Path to JSON log file
   * @param maxFileSize    Maximum size of each log file in bytes
   */
  public WikidataDocumentLogfile(String regularLogFile, int maxFileSize) {
    this.maxFileSize = maxFileSize;
    this.processLogfile = new LogfileWriter(regularLogFile, maxFileSize);
    objectMapper.setSerializationInclusion(com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL);
    objectMapper.enable(com.fasterxml.jackson.databind.SerializationFeature.INDENT_OUTPUT);
  }

  /**
   * Logs an EntityDocument with detailed information to both regular log and JSON file.
   */
  public void logEntity(EntityDocument entity) {
    String logMessage = createLogMessage("Wikidata Entity: " + entity.getEntityId().getId() + "details being logged");
    LogfileWriter logfile = new LogfileWriter("wikidata-" + entity.getEntityId().getId() + "-entity-data.log",
        maxFileSize);
    try {
      // Write to regular log
      processLogfile.write(logMessage);

      // Wrtie claims to logfile for exams, stage one of filtering
      logItemClaimsWithFilter(entity);

      // Write entity to .log (completely)
      String json = objectMapper.writeValueAsString(entity);
      logfile.write(json);

    } catch (Exception e) {
      e.printStackTrace();
      processLogfile.write(e.getStackTrace().toString());
      processLogfile.write(logMessage + " - FAILED: " + e.getMessage());
      // throw e;
    }
  }

  /**
   * Logs a message to the process logfile.
   * 
   * @param message The message to log.
   */
  public void log(String message) {
    String logMessage = createLogMessage(message);
    try {
      processLogfile.write(message);
    } catch (Exception e) {
      e.printStackTrace();
      processLogfile.write(e.getStackTrace().toString());
      processLogfile.write(logMessage + " - FAILED: " + e.getMessage());
      // throw e;
    }
  }

  private String createLogMessage(String message) {
    return String.format("[%s] %s",
        LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME),
        message);
  }

  /**
   * 1 - filter out any 'claim' where the mainSnak is an 'external-id' or 'geo' related data of any kind
   * 2 -
   */
  private void logItemClaimsWithFilter(EntityDocument doc) throws Exception {
    String QID = doc.getEntityId().getId();
    LogfileWriter logfile = new LogfileWriter("wikidata-" + QID + "-claims.log", maxFileSize);

    if (doc instanceof ItemDocumentImpl) {
      ItemDocumentImpl iDoc = (ItemDocumentImpl) doc;
      Map<String, List<Statement>> claims = iDoc.getJsonClaims();

      for (Entry<String, List<Statement>> claim : claims.entrySet()) {
        List<Statement> statements = claim.getValue();

        // just filters continues past the uneeded, try it see what happens
        if (statements.size() == 1) {
          Snak ms = statements.get(0).getMainSnak();
          if (ms instanceof ValueSnakImpl) {
            ValueSnakImpl vs = (ValueSnakImpl) ms;
            // ignore some irrelevant datatype
            if (excludedDatatype.contains(vs.getDatatype())) {
              continue;
            }
          }
        }
        String json = objectMapper.writeValueAsString(claim);
        logfile.write(json);
      }
    }
    ;
  }
}