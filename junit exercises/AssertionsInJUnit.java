import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class AssertionsInJUnit {

    @Test
    public void testAssertions() {
        // assertEquals
        assertEquals(5, 2 + 3);
        
        // assertTrue
        assertTrue(10 > 5);
        
        // assertFalse
        assertFalse(5 > 10);
        
        // assertNull
        String str = null;
        assertNull(str);
        
        // assertNotNull
        String name = "JUnit";
        assertNotNull(name);
    }
}