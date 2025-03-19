package edu.velv.wikiverse_api.services.logging;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.concurrent.Callable;
import java.util.function.Supplier;
import static java.lang.String.format;

/**
 * The ProcessLogfile class is responsible for logging the execution of methods.
 * It implements the Loggable interface and provides methods to log messages
 * before and after the execution of a given function or runnable.
 * 
 * <p>This class uses a LogfileWriter to write log messages to a specified log file.
 * It logs the start, completion, and failure of method executions along with
 * timestamps and the method name that initiated the logging.
 * 
 * <p>Example usage:
 * <pre>
 * {@code
 * ProcessLogfile logger = new ProcessLogfile("/path/to/logfile.log", 1048576);
 * 
 * // Logging a Runnable
 * logger.log("Executing task", () -> {
 *     // Task implementation
 *     System.out.println("Task executed");
 * });
 * 
 * // Logging a Supplier
 * String result = logger.log("Fetching data", () -> {
 *     // Data fetching implementation
 *     return "Data fetched";
 * });
 * }
 * </pre>
 * 
 * @param logFile The path to the log file.
 * @param maxFileSize The maximum size of the log file.
 * 
 * @see Loggable
 * @see LogfileWriter
 * 
 */
public class ProcessLogfile implements Loggable {
  private final LogfileWriter writer;

  public ProcessLogfile(String logFile, int maxFileSize) {
    this.writer = new LogfileWriter(logFile, maxFileSize);
  }

  private <R> R execute(String message, Callable<R> fn) throws Exception {
    var stack = StackWalker.getInstance().walk(frames -> frames.skip(2).findFirst().orElse(null));
    var executedBy = stack != null
        ? format("%s.%s", stack.getClassName(), stack.getMethodName())
        : "NO_METHOD";

    String logMessage = String.format("[%s] %s - %s",
        LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME),
        executedBy,
        message);

    try {
      System.out.println(logMessage + " - START");
      writer.write(logMessage + " - START");
      R result = fn.call();
      System.out.println(logMessage + " - COMPLETED");
      writer.write(logMessage + " - COMPLETED");
      return result;
    } catch (Exception e) {
      System.out.println(logMessage + " - FAILED: " + e.getMessage());
      writer.write(logMessage + " - FAILED: " + e.getMessage());
      throw e;
    }
  }

  @Override
  public void log(String message, Runnable fn) throws Exception {
    execute(message, () -> {
      fn.run();
      return null;
    });
  }

  @Override
  public <R> R log(String message, Supplier<R> fn) throws Exception {
    return execute(message, fn::get);
  }
}
