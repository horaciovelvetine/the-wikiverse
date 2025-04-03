package edu.velv.wikiverse_api.services.logging;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.concurrent.Callable;
import java.util.function.Supplier;
import static java.lang.String.format;

import java.lang.StackWalker.StackFrame;

/**
 * The ProcessLogfile class is responsible for logging the execution of methods.
 * It implements the Loggable interface and provides methods to log messages
 * before and after the execution of a given function or runnable.
 * 
 * <p>This class uses a LogfileWriter to write log messages to a specified log file.
 * It logs the start, completion, and failure of method executions along with
 * timestamps and the method name that initiated the logging.
 * 
 *  Credit to Roman Glushach for the writeup/code for this process logger which was adapted to work here
 * <a href="https://romanglushach.medium.com/java-rest-api-logging-best-practices-and-guidelines-bf5982ee4180"/>
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
 * @see LogfileWriter
 * 
 */
public class ProcessLogfile {
  private final LogfileWriter logfile;

  public ProcessLogfile(String logFile, int maxFileSize) {
    this.logfile = new LogfileWriter(logFile, maxFileSize);
  }

  private <R> R execute(String message, Callable<R> fn) {
    StackFrame stack = StackWalker.getInstance().walk(frames -> frames.skip(2).findFirst().orElse(null));
    String executedBy = stack != null
        ? format("%s.%s", stack.getClassName(), stack.getMethodName())
        : "NO_METHOD";

    String logMessage = String.format("[%s] %s - %s",
        LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME),
        executedBy,
        message);

    try {
      logfile.write(logMessage + " - START");
      R result = fn.call();

      logfile.write(logMessage + " - COMPLETED");
      return result;
    } catch (Exception e) {

      logfile.write(logMessage + " - FAILED: " + e.getMessage());
      // throw e;
      return null;
    }
  }

  public void log(String message, Runnable fn) {
    execute(message, () -> {
      fn.run();
      return null;
    });
  }

  public <R> R log(String message, Supplier<R> fn) {
    return execute(message, fn::get);
  }
}
