CREATE TABLE Customers (
    CustomerID NUMBER PRIMARY KEY,
    Name VARCHAR2(50),
    Age NUMBER,
    Balance NUMBER(10,2),
    IsVIP VARCHAR2(5)
);
CREATE TABLE Loans (
    LoanID NUMBER PRIMARY KEY,
    CustomerID NUMBER,
    InterestRate NUMBER(5,2),
    DueDate DATE,
    CONSTRAINT fk_customer
    FOREIGN KEY (CustomerID)
    REFERENCES Customers(CustomerID)
);
INSERT INTO Customers VALUES (101,'Rahul',65,15000,'FALSE');
INSERT INTO Customers VALUES (102,'Priya',45,12000,'FALSE');
INSERT INTO Customers VALUES (103,'Amit',70,8000,'FALSE');
INSERT INTO Customers VALUES (104,'Sneha',30,5000,'FALSE');
INSERT INTO Customers VALUES (105,'Kiran',62,20000,'FALSE');

INSERT INTO Loans VALUES (201,101,10.50,TO_DATE('10-07-2026','DD-MM-YYYY'));
INSERT INTO Loans VALUES (202,102,11.00,TO_DATE('15-09-2026','DD-MM-YYYY'));
INSERT INTO Loans VALUES (203,103,9.75,TO_DATE('20-07-2026','DD-MM-YYYY'));
INSERT INTO Loans VALUES (204,104,12.00,TO_DATE('25-08-2026','DD-MM-YYYY'));
INSERT INTO Loans VALUES (205,105,10.25,TO_DATE('05-07-2026','DD-MM-YYYY'));

COMMIT;
SET SERVEROUTPUT ON;

BEGIN

   -- Scenario 1: 1% Interest Discount for Customers Above 60

   FOR c IN (
      SELECT CustomerID
      FROM Customers
      WHERE Age > 60
   )
   LOOP
      UPDATE Loans
      SET InterestRate = InterestRate - 1
      WHERE CustomerID = c.CustomerID;

      DBMS_OUTPUT.PUT_LINE('Discount applied for Customer ID: ' || c.CustomerID);
   END LOOP;


   -- Scenario 2: Promote Customers to VIP

   FOR c IN (
      SELECT CustomerID
      FROM Customers
      WHERE Balance > 10000
   )
   LOOP
      UPDATE Customers
      SET IsVIP = 'TRUE'
      WHERE CustomerID = c.CustomerID;

      DBMS_OUTPUT.PUT_LINE('Customer ' || c.CustomerID || ' promoted to VIP');
   END LOOP;


   -- Scenario 3: Loan Reminder

   FOR l IN (
      SELECT c.Name,
             l.LoanID,
             l.DueDate
      FROM Customers c
      JOIN Loans l
      ON c.CustomerID = l.CustomerID
      WHERE l.DueDate BETWEEN SYSDATE AND SYSDATE + 30
   )
   LOOP
      DBMS_OUTPUT.PUT_LINE(
         'Reminder: ' || l.Name ||
         ', Loan ID: ' || l.LoanID ||
         ', Due Date: ' || TO_CHAR(l.DueDate,'DD-MON-YYYY')
      );
   END LOOP;

   COMMIT;

END;
/
SELECT * FROM Customers;

SELECT * FROM Loans;
