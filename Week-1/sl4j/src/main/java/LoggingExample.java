import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class LoggingExample {

    private static final Logger logger = LoggerFactory.getLogger(LoggingExample.class);

    public static void main(String[] args) {

        logger.error("This is ERROR log");
        logger.warn("This is WARNING log");
        logger.info("This is INFO log");
    }
}
