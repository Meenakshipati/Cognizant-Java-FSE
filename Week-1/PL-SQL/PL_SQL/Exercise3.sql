CREATE TABLE Accounts (
    AccountID NUMBER PRIMARY KEY,
    CustomerName VARCHAR2(50),
    AccountType VARCHAR2(20),
    Balance NUMBER(10,2)
);

CREATE TABLE Employees (
    EmployeeID NUMBER PRIMARY KEY,
    EmployeeName VARCHAR2(50),
    Department VARCHAR2(30),
    Salary NUMBER(10,2)
);
INSERT INTO Accounts VALUES (101,'Rahul','Savings',10000);
INSERT INTO Accounts VALUES (102,'Priya','Savings',15000);
INSERT INTO Accounts VALUES (103,'Amit','Current',20000);
INSERT INTO Accounts VALUES (104,'Sneha','Savings',8000);

INSERT INTO Employees VALUES (1,'Ramesh','IT',50000);
INSERT INTO Employees VALUES (2,'Suresh','IT',60000);
INSERT INTO Employees VALUES (3,'Anitha','HR',45000);
INSERT INTO Employees VALUES (4,'Kiran','HR',40000);

COMMIT;
CREATE OR REPLACE PROCEDURE ProcessMonthlyInterest
IS
BEGIN
    UPDATE Accounts
    SET Balance = Balance + (Balance * 0.01)
    WHERE AccountType='Savings';

    DBMS_OUTPUT.PUT_LINE('Monthly interest applied successfully.');
END;
/
CREATE OR REPLACE PROCEDURE UpdateEmployeeBonus(
    p_department IN VARCHAR2,
    p_bonus IN NUMBER
)
IS
BEGIN
    UPDATE Employees
    SET Salary = Salary + (Salary * p_bonus/100)
    WHERE Department = p_department;

    DBMS_OUTPUT.PUT_LINE('Bonus updated successfully.');
END;
/
CREATE OR REPLACE PROCEDURE TransferFunds(
    p_fromAccount IN NUMBER,
    p_toAccount IN NUMBER,
    p_amount IN NUMBER
)
IS
    v_balance NUMBER;
BEGIN

    SELECT Balance
    INTO v_balance
    FROM Accounts
    WHERE AccountID = p_fromAccount;

    IF v_balance >= p_amount THEN

        UPDATE Accounts
        SET Balance = Balance - p_amount
        WHERE AccountID = p_fromAccount;

        UPDATE Accounts
        SET Balance = Balance + p_amount
        WHERE AccountID = p_toAccount;

        DBMS_OUTPUT.PUT_LINE('Funds transferred successfully.');

    ELSE
        DBMS_OUTPUT.PUT_LINE('Insufficient Balance.');
    END IF;

END;
/
BEGIN

    -- Scenario 1
    ProcessMonthlyInterest;

    -- Scenario 2
    UpdateEmployeeBonus('IT',10);

    -- Scenario 3
    TransferFunds(101,104,2000);

END;
/
SELECT * FROM Accounts;

SELECT * FROM Employees;