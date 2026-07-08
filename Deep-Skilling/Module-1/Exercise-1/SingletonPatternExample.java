class Logger {

    private static Logger instance;

    private Logger() {
        System.out.println("Logger instance created");
    }

    public static Logger getInstance() {

        if (instance == null) {
            instance = new Logger();
        }

        return instance;
    }

    public void logMessage(String message) {
        System.out.println("LOG: " + message);
    }
}


public class SingletonPatternExample {

    public static void main(String[] args) {

        Logger logger1 = Logger.getInstance();
        Logger logger2 = Logger.getInstance();

        logger1.logMessage("Application started");
        logger2.logMessage("User logged in");

        if (logger1 == logger2) {
            System.out.println("Both logger objects are the same instance");
        } else {
            System.out.println("Different logger instances created");
        }
    }
}
