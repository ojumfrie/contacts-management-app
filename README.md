# ContactsManagement


## SQL SERVER INSTALLATIONS (only if these softwares have not been installed yet)

- [ ] Install SQL Server Express
- [ ] Install SQL Server Management Studio (SSMS)

## DATABASE CREATION; TABLE CREATION; AND, RECORDS INSERTIONS

Open SQL Server Management Studio (SSMS):
- [ ] Login to SSMS using an existing account (just in case it is necessary, use "sa" account)

Create the database:
- [ ] Execute this SQL command
    ```
    CREATE DATABASE ContactsManagementDB;
    ```

Create the table:
- [ ] Execute this SQL command
    ```
    USE [ContactsManagementDB]
    GO
    SET ANSI_NULLS ON
    GO
    SET QUOTED_IDENTIFIER ON
    GO

    CREATE TABLE [dbo].[Contacts](
        [Id] [int] IDENTITY(1,1) NOT NULL,
        [Firstname] [nvarchar](max) NOT NULL,
        [Lastname] [nvarchar](max) NOT NULL,
        [BillingAddress] [nvarchar](max) NOT NULL,
        [DeliveryAddress] [nvarchar](max) NOT NULL,
        [Email] [nvarchar](max) NOT NULL,
        [Password] [nvarchar](max) NOT NULL,
        [CreatedDate] [datetime2](7) NOT NULL,
    CONSTRAINT [PK_Contacts] PRIMARY KEY CLUSTERED 
    (
        [Id] ASC
    )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
    ) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
    GO
    ```

Change the active database:
- this is to ensure that the newly created database is the one active for the insertion of records that comes next

- [ ] Click on the dropdown (i.e., the Available Databases)
    - located above the Object Explorer window
- [ ] Select ContactsManagementDB database from the list

Insert the records into the Contacts table:
- [ ] Execute these SQL commands
    ```
    INSERT INTO [dbo].[Contacts] (Firstname,Lastname,BillingAddress,DeliveryAddress,Email,Password,CreatedDate)
        VALUES ('Bob','Smith','Panacan Highway, Kilometer 14, Davao City, Davao del Sur','Panacan Highway, Kilometer 14, Davao City, Davao del Sur','bob.smith@mail.com','?an3P@ssW0rd',GETDATE());

    INSERT INTO [dbo].[Contacts] (Firstname,Lastname,BillingAddress,DeliveryAddress,Email,Password,CreatedDate)
        VALUES ('Juan','Carlos','1635 Quezon Avenue, Quezon City, Metro Manila','1635 Quezon Avenue, Quezon City, Metro Manila','juan.carlos@mail.com','?an3P@ssW0rd',GETDATE());

    INSERT INTO [dbo].[Contacts] (Firstname,Lastname,BillingAddress,DeliveryAddress,Email,Password,CreatedDate)
        VALUES ('Mike','Jones','Nono Libaga Drive, near Public Market, Tanjay, Negros Oriental','Nono Libaga Drive, near Public Market, Tanjay, Negros Oriental','mike.jones@mail.com','?an3P@ssW0rd',GETDATE());

    INSERT INTO [dbo].[Contacts] (Firstname,Lastname,BillingAddress,DeliveryAddress,Email,Password,CreatedDate)
        VALUES ('Olive','Yew','147 Santo Domingo Street 1100, Quezon City, Quezon City','147 Santo Domingo Street 1100, Quezon City, Quezon City','olive.yew@mail.com','?an3P@ssW0rd',GETDATE());

    INSERT INTO [dbo].[Contacts] (Firstname,Lastname,BillingAddress,DeliveryAddress,Email,Password,CreatedDate)
        VALUES ('Aida','Bugg','2/F Sycamore Arcade Building, Alabang-Zapote Road, Muntinlupa City, Metro Manila','2/F Sycamore Arcade Building, Alabang-Zapote Road, Muntinlupa City, Metro Manila','aida.bugg@mail.com','?an3P@ssW0rd',GETDATE());
    ```

## SQL LOGIN ACCOUNT CREATION

- UserID: jane.doe
- Password: ?an3P@ssW0rd

Object Explorer window:
- [ ] Expand "Security" folder
- [ ] Right-click on "Logins" folder
- [ ] Select "New Login..."

    - General tab
        - [ ] Type "jane.doe" in the Login name field
        - [ ] Select "SQL server authentication"
        - [ ] Type in your password
        - [ ] Type in your confirm password
    - Server Roles tab
        - [ ] Tick the "sysadmin" checkbox
    - User Mapping tab
        - [ ] Tick the "ContactsManagementDB" database checkbox
        - [ ] Tick the "db_owner" checkbox
    - Status tab
        - Permission to connect to database engine:
            - [ ] Be sure that "Grant" radiobutton is selected
        - Login:
            - [ ] Be sure that "Enabled" radiobutton is selected

- [ ] Click the OK button to save the account
- [ ] Restart SQL Server service
    - [ ] Run services.msc
    - [ ] Find SQL Server service (e.g.: SQL Server (SQLEXPRESS))
    - [ ] Right-click on the service, and select Restart
- [ ] Login the newly created account into SSMS
- [ ] Ensure that the newly created account is able to login successfully
- [ ] <b>Note:</b> After testing the application and, all is good, remove this newly created account

## RESTORE REACTJS DEPENDENCIES (i.e., node_modules)

- [ ] Open command-prompt
- [ ] Change directory to the code solution folder - i.e.: ContactsManagement
    E.g.:
    ```
    cd\
    cd C:\[your path to the contactsmanagement.client folder]
    ```
- [ ] Execute NPM command:
    ```
    npm install
    ```

## RUN THE ContactsManagement SOLUTION

- [ ] Open the ContactsManagement solution in Visual Studio
- [ ] Update "Data Source" value in the SqlServer connection string that is found inside the "appsettings.json" file
- [ ] For the Web API:
    - [ ] Press CTRL+F5
- [ ] For the ReactJS:
    - [ ] Open command-prompt
    - [ ] Execute command: cd\
    - [ ] Execute command: cd C:\[your path to the ContactsManagement folder]
    - [ ] Execute command: cd contactsmanagement.client
    - [ ] Execute NPM command: npm start

## CONDUCT THE TESTING

- [ ] Create a new contact
    - by clicking on "Add New" button on the landing page
- [ ] Edit an existing record
    - by clicking on the "Edit" button associated on each row on the landing page
- [ ] Delete an existing record
    - by clicking on the "Delete" button associated on each row on the landing page
    - prior to the actual deletion of a record, there will be a prompt window displays asking you if would proceed so

Helpful info on the pages:
- [ ] Landing page
    - contains all the data from the database
    - it has a table display with header "Users Contact Information"
- [ ] Edit page
    - displays the certain user contact details that you selected from the landing page to edit
    - it has a table display with header "Edit Contact"
    - it has user input validations
- [ ] Register page
    - displays the certain user contact details that you selected from the landing page to edit
    - it has a table display with header "New Contact"
    - it has user input validations