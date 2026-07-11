public class FactoryTest {
    public static void main(String[] args) {
        DocumentFactory factory = new DocumentFactory();
        
        Document doc1 = factory.createDocument("word");
        doc1.open();
        
        Document doc2 = factory.createDocument("pdf");
        doc2.open();
    }
}