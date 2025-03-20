package edu.velv.wikiverse_api.services.logging;

import org.jetbrains.annotations.NotNull;
import java.util.concurrent.Callable;
import java.util.function.Supplier;
import javax.validation.constraints.NotBlank;
import static java.lang.String.format;
import static java.lang.System.out;
import java.lang.StackWalker;

/**
 * Provides methods for logging the execution of code blocks.
 * It includes methods to log the start, finish, and failure of the execution of 
 * Runnable and Supplier functions.
 * 
 * Credit to Roman Glushach for the writeup/code for this process logger which was adapted to work here
 * <a href="https://romanglushach.medium.com/java-rest-api-logging-best-practices-and-guidelines-bf5982ee4180"/>
 * 
 * <p>Example usage:</p>
 * <pre>
 * {@code
 * public class MyService implements Loggable {
 *     public void performTask() throws Exception {
 *         log("Performing task", () -> {
 *             // task implementation
 *         });
 *     }
 * 
 *     public String fetchData() throws Exception {
 *         return log("Fetching data", () -> {
 *             // data fetching implementation
 *             return "data";
 *         });
 *     }
 * }
 * }
 * </pre>
 */
public interface Loggable {
  private <R> R execute(String message, Callable<R> fn) {
    var stack = StackWalker.getInstance().walk(frames -> frames.skip(2).findFirst().orElse(null));
    var executedBy = stack != null
        ? format("%s.%s", stack.getClassName(), stack.getMethodName())
        : "NO_METHOD";

    try {
      out.printf("[%s] start %s%n", executedBy, message);
      var output = fn.call();
      out.printf("[%s] finished %s%n", executedBy, message);
      return output;
    } catch (Exception e) {
      out.printf("[%s] failed %s%n", executedBy, message);
      return null;
    }
  }

  default void log(@NotBlank String message, @NotNull Runnable fn) {
    execute(message, () -> {
      fn.run();
      return null;
    });
  }

  default <R> R log(@NotBlank String message, @NotNull Supplier<R> fn) {
    return execute(message, fn::get);
  }
}
