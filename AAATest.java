import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;

public class AAATest {

    @Before
    public void setUp() {
        System.out.println("Setup running...");
    }

    @After
    public void tearDown() {
        System.out.println("Teardown running...");
    }

    @Test
    public void testAddition() {
        // Arrange
        int a = 10;
        int b = 20;

        // Act
        int result = a + b;

        // Assert
        assertEquals(30, result);
    }
}