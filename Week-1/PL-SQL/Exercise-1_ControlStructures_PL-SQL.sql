SET SERVEROUTPUT ON;

BEGIN
    -- Scenario 1: Age > 60 ki 1% discount
    FOR rec IN (SELECT CustomerID, Age FROM Customers) LOOP
        IF rec.Age > 60 THEN
            UPDATE Customers SET LoanInterestRate = LoanInterestRate - 1 WHERE CustomerID = rec.CustomerID;
            DBMS_OUTPUT.PUT_LINE('Customer ' || rec.CustomerID || ': 1% discount applied');
        END IF;
    END LOOP;
    
    -- Scenario 2: Balance > 10000 ki VIP
    FOR rec IN (SELECT CustomerID, Balance FROM Customers) LOOP
        IF rec.Balance > 10000 THEN
            UPDATE Customers SET IsVIP = 'TRUE' WHERE CustomerID = rec.CustomerID;
            DBMS_OUTPUT.PUT_LINE('Customer ' || rec.CustomerID || ': Promoted to VIP');
        END IF;
    END LOOP;
    
    -- Scenario 3: 30 days lo due unna loans
    FOR rec IN (SELECT LoanID, CustomerID, DueDate FROM Loans WHERE DueDate BETWEEN SYSDATE AND SYSDATE + 30) LOOP
        DBMS_OUTPUT.PUT_LINE('Reminder: Loan ' || rec.LoanID || ' for Customer ' || rec.CustomerID || ' is due on ' || TO_CHAR(rec.DueDate, 'DD-MON-YYYY'));
    END LOOP;
    
    COMMIT;
END;
/