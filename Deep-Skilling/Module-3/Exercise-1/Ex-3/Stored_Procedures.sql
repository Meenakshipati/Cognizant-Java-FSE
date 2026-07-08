SET SERVEROUTPUT ON;


CREATE TABLE Savings_Accounts (
    Account_ID NUMBER PRIMARY KEY,
    Customer_Name VARCHAR2(50),
    Balance NUMBER
);


CREATE TABLE Employees (
    Employee_ID NUMBER PRIMARY KEY,
    Employee_Name VARCHAR2(50),
    Department VARCHAR2(50),
    Salary NUMBER
);


CREATE TABLE Accounts (
    Account_ID NUMBER PRIMARY KEY,
    Account_Holder VARCHAR2(50),
    Balance NUMBER
);



INSERT INTO Savings_Accounts VALUES (1,'Ravi',50000);
INSERT INTO Savings_Accounts VALUES (2,'Anita',30000);


INSERT INTO Employees VALUES (101,'Kiran','IT',50000);
INSERT INTO Employees VALUES (102,'Meena','HR',40000);


INSERT INTO Accounts VALUES (1001,'Ravi',20000);
INSERT INTO Accounts VALUES (1002,'Anita',10000);


COMMIT;



CREATE OR REPLACE PROCEDURE ProcessMonthlyInterest

AS

BEGIN

UPDATE Savings_Accounts

SET Balance = Balance + (Balance * 0.01);


COMMIT;


DBMS_OUTPUT.PUT_LINE('Monthly interest processed successfully');


END;
/




CREATE OR REPLACE PROCEDURE UpdateEmployeeBonus

(
dept_name VARCHAR2,
bonus_percentage NUMBER
)

AS

BEGIN

UPDATE Employees

SET Salary = Salary + (Salary * bonus_percentage / 100)

WHERE Department = dept_name;


COMMIT;


DBMS_OUTPUT.PUT_LINE('Employee bonus updated successfully');


END;
/




CREATE OR REPLACE PROCEDURE TransferFunds

(
source_account NUMBER,
target_account NUMBER,
amount NUMBER
)

AS

source_balance NUMBER;


BEGIN


SELECT Balance

INTO source_balance

FROM Accounts

WHERE Account_ID = source_account;



IF source_balance >= amount THEN


UPDATE Accounts

SET Balance = Balance - amount

WHERE Account_ID = source_account;



UPDATE Accounts

SET Balance = Balance + amount

WHERE Account_ID = target_account;



COMMIT;


DBMS_OUTPUT.PUT_LINE('Funds transferred successfully');


ELSE


DBMS_OUTPUT.PUT_LINE('Insufficient balance');


END IF;


END;
/




BEGIN

ProcessMonthlyInterest;


UpdateEmployeeBonus('IT',10);


TransferFunds(1001,1002,5000);


END;
/
