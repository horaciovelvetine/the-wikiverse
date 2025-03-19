package edu.velv.wikiverse_api.services.logging;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * The LogfileWriter class is responsible for writing log messages to a specified log file.
 * It supports log file rotation when the file size exceeds a specified maximum size.
 * 
 * <p>Usage example:
 * <pre>
 * {@code
 * LogfileWriter logfileWriter = new LogfileWriter("application.log", 10 * 1024 * 1024);
 * logfileWriter.write("This is a log message.");
 * }
 * </pre>
 * </p>
 * 
 * <p>Features:
 * <ul>
 *   <li>Writes log messages to a specified log file.</li>
 *   <li>Automatically rotates the log file when it exceeds the maximum file size.</li>
 * </ul>
 * </p>
 * 
 * <p>Constructor parameters:
 * <ul>
 *   <li>{@code logFile} - The path to the log file.</li>
 *   <li>{@code maxFileSize} - The maximum size of the log file in bytes before rotation.</li>
 * </ul>
 * </p>
 * 
 * <p>Methods:
 * <ul>
 *   <li>{@code write(String message)} - Writes a log message to the log file. If the file size exceeds the maximum size, it rotates the log file.</li>
 *   <li>{@code rotateLogFile()} - Rotates the log file by renaming the current log file with a timestamp suffix.</li>
 * </ul>
 * </p>
 * 
 * <p>Exceptions:
 * <ul>
 *   <li>{@code IOException} - If an I/O error occurs while writing to or rotating the log file.</li>
 * </ul>
 * </p>
 * 
 * <p>Logging:
 * <ul>
 *   <li>Uses SLF4J for logging errors that occur during file operations.</li>
 * </ul>
 * </p>
 */
public class LogfileWriter {
  private static final String DEFAULT_LOG_FILE = "/Users/james/Documents/code/the-wikiverse/backend/logs/application.log";
  private static final int MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  private static final Logger logger = LoggerFactory.getLogger(FileWriter.class);

  private final String logFile;
  private final int maxFileSize;

  public LogfileWriter(String logFile, int maxFileSize) {
    String logDirectory = new File(DEFAULT_LOG_FILE).getParent();
    String logFileName = (logFile != null && !logFile.isEmpty()) ? logFile : new File(DEFAULT_LOG_FILE).getName();
    this.logFile = Paths.get(logDirectory, logFileName).toString();
    this.maxFileSize = (maxFileSize > 0) ? maxFileSize : MAX_FILE_SIZE;
  }

  public synchronized void write(String message) {
    try (BufferedWriter writer = new BufferedWriter(new FileWriter(logFile, true))) {
      writer.write(message);
      writer.newLine();

      if (new File(logFile).length() > maxFileSize) {
        rotateLogFile();
      }
    } catch (IOException e) {
      logger.error("Failed to write to log file: " + e.getMessage(), e);
    }
  }

  private synchronized void rotateLogFile() {
    String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss"));
    String backupFile = logFile + "." + timestamp;

    try {
      Files.move(Paths.get(logFile), Paths.get(backupFile));
    } catch (IOException e) {
      logger.error("Failed to rotate log file: " + e.getMessage(), e);
    }
  }
}
