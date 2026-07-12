package week1.mockito;

public class MyService {
    private ExternalApi api;
    
    public MyService(ExternalApi api) {
        this.api = api;
    }
    
    public String fetchData() {
        return api.getData();
    }
}