CREATE TABLE Customers (
    Customer_ID NUMBER PRIMARY KEY,
    Customer_Name VARCHAR2(50),
    Age NUMBER,
    Balance NUMBER,
    IsVIP VARCHAR2(10)
);


CREATE TABLE Loans (
    Loan_ID NUMBER PRIMARY KEY,
    Customer_ID NUMBER,
    Loan_Amount NUMBER,
    Interest_Rate NUMBER,
    Due_Date DATE,
    FOREIGN KEY(Customer_ID) REFERENCES Customers(Customer_ID)
);


INSERT INTO Customers VALUES (1,'Ravi',65,15000,'FALSE');
INSERT INTO Customers VALUES (2,'Anita',45,8000,'FALSE');
INSERT INTO Customers VALUES (3,'Kiran',70,20000,'FALSE');
INSERT INTO Customers VALUES (4,'Meena',30,12000,'FALSE');


INSERT INTO Loans VALUES (101,1,500000,8.5,SYSDATE+10);
INSERT INTO Loans VALUES (102,2,300000,9.0,SYSDATE+60);
INSERT INTO Loans VALUES (103,3,700000,7.5,SYSDATE+20);


COMMIT;


SET SERVEROUTPUT ON;


DECLARE

    CURSOR customer_cursor IS
    SELECT Customer_ID, Age
    FROM Customers;

BEGIN

    FOR customer_record IN customer_cursor
    LOOP

        IF customer_record.Age > 60 THEN

            UPDATE Loans
            SET Interest_Rate = Interest_Rate - 1
            WHERE Customer_ID = customer_record.Customer_ID;

        END IF;

    END LOOP;


    COMMIT;

    DBMS_OUTPUT.PUT_LINE('Senior citizen interest discount applied successfully');

END;
/



DECLARE

    CURSOR vip_cursor IS
    SELECT Customer_ID, Balance
    FROM Customers;

BEGIN

    FOR customer_record IN vip_cursor
    LOOP

        IF customer_record.Balance > 10000 THEN

            UPDATE Customers
            SET IsVIP = 'TRUE'
            WHERE Customer_ID = customer_record.Customer_ID;

        END IF;

    END LOOP;


    COMMIT;

    DBMS_OUTPUT.PUT_LINE('VIP status updated successfully');

END;
/



DECLARE

    CURSOR loan_cursor IS

    SELECT 
    C.Customer_Name,
    L.Due_Date

    FROM Customers C

    JOIN Loans L

    ON C.Customer_ID = L.Customer_ID

    WHERE L.Due_Date <= SYSDATE + 30;


BEGIN

    FOR loan_record IN loan_cursor

    LOOP

        DBMS_OUTPUT.PUT_LINE(
        'Reminder: Dear '
        || loan_record.Customer_Name
        || ', your loan payment is due on '
        || loan_record.Due_Date);

    END LOOP;


END;
/
