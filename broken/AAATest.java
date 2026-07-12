import org.junit.Before;
import org.junit.After;
import org.junit.Test;
import static org.junit.Assert.*;

public class AAATest {

    Calculator calculator;

    // Setup method
    @Before
    public void setUp() {
        calculator = new Calculator();
        System.out.println("Setup completed");
    }


    // Teardown method
    @After
    public void tearDown() {
        calculator = null;
        System.out.println("Cleanup completed");
    }


    @Test
    public void testAdditionAAA() {

        // Arrange
        int a = 10;
        int b = 20;

        // Act
        int result = calculator.add(a, b);

        // Assert
        assertEquals(30, result);
    }
}