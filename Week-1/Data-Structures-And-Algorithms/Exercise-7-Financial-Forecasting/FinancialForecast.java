public class FinancialForecast {

    // Recursive method to calculate future value
    public static double futureValue(double presentValue, double growthRate, int periods) {
        if (periods == 0) {
            return presentValue;
        }
        return futureValue(presentValue * (1 + growthRate), growthRate, periods - 1);
    }

    public static void main(String[] args) {
        double presentValue = 10000;  // Rs. 10,000
        double growthRate = 0.10;     // 10% growth
        int periods = 5;              // 5 years

        double futureVal = futureValue(presentValue, growthRate, periods);
        System.out.printf("Future Value after %d years: Rs. %.2f", periods, futureVal);
    }
}