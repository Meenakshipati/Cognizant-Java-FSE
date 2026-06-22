public class FinancialForecastingExample {


    static double calculateFutureValue(double currentValue, double growthRate, int years) {

        if (years == 0) {
            return currentValue;
        }

        return calculateFutureValue(
                currentValue * (1 + growthRate),
                growthRate,
                years - 1
        );
    }


    public static void main(String[] args) {

        double initialInvestment = 10000;
        double growthRate = 0.10;
        int years = 5;


        double futureValue = calculateFutureValue(
                initialInvestment,
                growthRate,
                years
        );


        System.out.println("Financial Forecasting Result:");

        System.out.println("Initial Investment: " + initialInvestment);

        System.out.println("Growth Rate: " + (growthRate * 100) + "%");

        System.out.println("After " + years + " years Future Value: " + futureValue);


        System.out.println("\nAlgorithm Analysis:");

        System.out.println(
                "Recursion simplifies the problem by breaking yearly growth calculation into smaller repeated steps."
        );


        System.out.println("\nTime Complexity:");

        System.out.println("Recursive Solution: O(n)");

        System.out.println(
                "Because the function calls itself once for every year."
        );


        System.out.println("\nOptimization:");

        System.out.println(
                "Memoization can be used to store previously calculated results and avoid repeated calculations."
        );

        System.out.println(
                "An iterative approach can also reduce recursive function call overhead."
        );

    }
}
