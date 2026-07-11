SET SERVEROUTPUT ON;

CREATE OR REPLACE PROCEDURE ProcessMonthlyInterest IS
BEGIN
    UPDATE Accounts SET Balance = Balance * 1.01 WHERE AccountType = 'Savings';
    DBMS_OUTPUT.PUT_LINE(SQL%ROWCOUNT || ' Savings accounts updated');
    COMMIT;
END;
/

CREATE OR REPLACE PROCEDURE UpdateEmployeeBonus(p_departmentID IN NUMBER, p_bonusPercent IN NUMBER) IS
BEGIN
    UPDATE Employees SET Salary = Salary + (Salary * p_bonusPercent / 100) WHERE DepartmentID = p_departmentID;
    DBMS_OUTPUT.PUT_LINE(SQL%ROWCOUNT || ' Employees got bonus');
    COMMIT;
END;
/

CREATE OR REPLACE PROCEDURE TransferFunds(p_fromAccount IN NUMBER, p_toAccount IN NUMBER, p_amount IN NUMBER) IS
    v_balance Accounts.Balance%TYPE;
BEGIN
    SELECT Balance INTO v_balance FROM Accounts WHERE AccountID = p_fromAccount;
    IF v_balance >= p_amount THEN
        UPDATE Accounts SET Balance = Balance - p_amount WHERE AccountID = p_fromAccount;
        UPDATE Accounts SET Balance = Balance + p_amount WHERE AccountID = p_toAccount;
        DBMS_OUTPUT.PUT_LINE('Transfer Success');
    ELSE
        DBMS_OUTPUT.PUT_LINE('Insufficient balance');
    END IF;
    COMMIT;
END;
/