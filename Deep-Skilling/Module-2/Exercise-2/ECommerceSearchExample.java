import java.util.Arrays;

// Product class
class Product {

    int productId;
    String productName;
    String category;

    Product(int productId, String productName, String category) {
        this.productId = productId;
        this.productName = productName;
        this.category = category;
    }

    public void display() {
        System.out.println(
            "ID: " + productId +
            ", Name: " + productName +
            ", Category: " + category
        );
    }
}


// Main class
public class ECommerceSearchExample {


    // Linear Search - O(n)
    public static Product linearSearch(Product[] products, int id) {

        for (Product product : products) {

            if (product.productId == id) {
                return product;
            }
        }

        return null;
    }


    // Binary Search - O(log n)
    public static Product binarySearch(Product[] products, int id) {

        int low = 0;
        int high = products.length - 1;


        while (low <= high) {

            int mid = (low + high) / 2;


            if (products[mid].productId == id) {
                return products[mid];
            }


            else if (products[mid].productId < id) {
                low = mid + 1;
            }


            else {
                high = mid - 1;
            }
        }


        return null;
    }



    public static void main(String[] args) {


        // Product array
        Product[] products = {

            new Product(101, "Laptop", "Electronics"),
            new Product(205, "Mobile", "Electronics"),
            new Product(309, "Shoes", "Fashion"),
            new Product(412, "Watch", "Accessories"),
            new Product(520, "Bag", "Fashion")
        };


        // Linear search
        System.out.println("Linear Search Result:");

        Product result1 = linearSearch(products, 309);


        if (result1 != null) {
            result1.display();
        }
        else {
            System.out.println("Product not found");
        }



        // Sorting array for binary search

        Arrays.sort(products, (a, b) ->
                a.productId - b.productId
        );



        // Binary search
        System.out.println("\nBinary Search Result:");

        Product result2 = binarySearch(products, 412);


        if (result2 != null) {
            result2.display();
        }
        else {
            System.out.println("Product not found");
        }



        // Complexity Analysis

        System.out.println("\nTime Complexity Analysis:");

        System.out.println("Linear Search:");
        System.out.println("Best Case: O(1)");
        System.out.println("Average Case: O(n)");
        System.out.println("Worst Case: O(n)");


        System.out.println("\nBinary Search:");
        System.out.println("Best Case: O(1)");
        System.out.println("Average Case: O(log n)");
        System.out.println("Worst Case: O(log n)");


        System.out.println(
            "\nBinary Search is better for large e-commerce platforms because it searches faster in sorted product data."
        );

    }
}
