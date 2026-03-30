---
title: Database Application Development
date: March 16, 2026
tags: [cmpt, notes, database, design]
cover: "/blog/star.png"
--- 
## Introduction - Why are we here? 
Up until now, we've just been typing SQL queries directly into a database interface. In the real world, people don't sit around manually typing queries. Queries are usually written into a program once and then triggered automatically over and over. 

Point is, SQL is **great** for *finding* data, but it's **bad** at complex calculations and it is incapable of building a Graphical User Interface (GUI). We need general-purpose programming languages like Python or C to handle that stuff, making SQL just one cogwheel of a software system. 

We'll discuss the paradigm of how these languages interact and how modern database applications are built.

## The Three-Tier Architecture
Modern database applications are broken down into three layers: Web-Server, Application, Database. For the explanations of each tier, we'll be using Amazon. 

### Tier 1: Web-Server Tier (The Front Door)
Connects the user (client) to the system over the internet. 
- For example, you type in *www.amazon.com*, the web server gives you the homepage and a search bar to type in a book title.

### Tier 2: Application Tier (The Brains)
This is the middleman that handles the "business logic". The application tier *takes* requests from the web server, figures out what data is needed, and translates it for the user. 
- For example, it takes your book search $\to$ writes the actual SQL query for it $\to$ sends it down to the database $\to$ gets the raw data back $\to$ formats it into a pretty HTML webpage to show you the client.

### Tier 3: Database Tier (The Vault)
This is the actual database server. It receives SQL queries from the app server, executes them, and returns the requested data (tuples).

### A Sidenote
In a tiny project, you could run all tiers on a single computer. But for massive systems that operate on large scales, you will have dozens, hundreds, if not thousands of different processors dedicated to each specific tier. 

## The Impedence Mismatch Problem 
Database and programming languages don't naturally speak the same language or organize data the same way. SQL databases return data as multi-sets of records (a whole table of results at once with no set limit on size). Traditional programming languages process things one record at a time and don't have built-in data structures to handle massive, unbounded SQL sets with ease. Additionally, SQL has data types that might not exist in your programming language.

### The Three Solutions
To bridge this gap between the language barrier, we have three main options:
1. **Embedded SQL / Dynamic SQL:** Shoving SQL directly into your host programming language.
2. **Stored Procedures:** Writing program code and storing it inside the database itself.
3. **APIs (Call Level Interfaces):** Using specialized libraries (like pyodbc for Python) to send SQL commands back and forth.

We'll look into each approach with more detail.

## Embedded SQL 
Embedded SQL allows you to place SQL statements directly within a host programming language such as Python or C. However, standard compilers do not understand SQL syntax. To handle this, a special preprocessor runs before compilation, scanning the code for SQL statements and translating them into function calls that the host language can execute. We can tell the preprocessor, "Hey, this is SQL, not C!" if you start the SQL command with `EXEC SQL`.

### Shared Variables (The Bridge)
In order to pass data between the C program and the database . You do this by declaring **Shared Variables** inside a special `EXEC SQL BEGIN DECLARE SECTION` block: 
```
EXEC SQL BEGIN DECLARE SECTION
    char c_sname[30];
    long c_sid;
    short c_rating;
    float c_age; 
    long SQLCODE;
    char SQLSTATE[6];
EXEC SQL END DECLARE SECTION
```
There are two special *error* variables. The first, `SQLCODE`, indicates execution status: $0$ for success, $< 0$ for an error, $> 0$ for a warning or sometimes *no data found*. The second, `SQLSTATE`, gives you a specific error code, like $02000$ for *no tuple found* to let your program know if a query failed.

When using a shared variable, its name must be preceeded by a colon: 
```
EXEC SQL 
INSERT INTO Sailors (sid, sname, rating, age)
VALUES (:c_sid, :c_sname, :c_rating, :c_age);
```

### Cursors
A database query returns a giant set of rows all at once (discussed in **The Impendence Mismatch Problem**). Therefore, we use a cursor which is basically a pointer that lets your language grab and process those results **one row at a time**. Here is how you typically use a **cursor:**

1. **Declare:** You define the cursor and attatch it to a specific SQL `SELECT` query. 
2. **Open:** You run `EXEC SQL OPEN`. This executes the query and readies the pointer.
3. **Fetch:** You write a loop in your host language that repeatedly calls `FETCH`. This grabs the current row, dumpts the data into your shared variables, and moves the pointer down one line. 
4. **Close:** Once you hit an error state (like `SQLSTATE = '02000'`), you close the cursor to free up memory.

By default, a cursor only moves forward. But if you declare a **Scrollable Cursor**, you can go backwawrds (`PRIOR`), jump to the beginning (`FIRST`), or jump to a specific random row (`ABSOLUTE`). 

### Example 
```
char SQLSTATE[6];
EXEC SQL BEGIN DECLARE SECTION
    char c_sname[20]; short c_minrating; float c_age;
EXEC SQL END DECLARE SECTION
    c_minrating = random();
EXEC SQL DECLARE sinfo CURSOR FOR
    SELECT S.sname, S.age FROM Sailors S
    WHERE S.rating > :c_minrating
    ORDER BY S.sname;
EXEC SQL OPEN sinfo;
do {
    EXEC SQL FETCH sinfo INTO :c_sname, :c_age;
    printf(“%s is %d years old\n”, c_sname, c_age);
} while (SQLSTATE != ‘02000’);
EXEC SQL CLOSE sinfo;
```

## Dynamic SQL 
Embedded SQL is great, but it requires you to know exactly what the SQL query is going to be. What if the user gets to type in their own custom search parameters or even write their own query? Embedded SQL cannot compile a query if it doesn't exist yet. Therefore, we introduce **Dynamic SQL**, which builds the SQL query as a standard text string while the program is running, and then execute it. The process is composed of two steps: 
1. `PREPARE`: This takes your text string, parses it, and asks the database to compile a "query plan" for it right then and there.
2. `EXECUTE`: Runs the plan you just prepared. Because you prepared it first, you can execute that same plan multiple times in a loop without having to re-compile it.

### Example 
```
EXEC SQL BEGIN DECLARE SECTION;
    char *query;
EXEC SQL END DECLARE SECTION;
    /* prompt user for a query and let :query point to it */
EXEC SQL PREPARE SQLquery FROM :query;
while (...) {
    EXEC SQL EXECUTE SQLquery;
}
```

## Stored Procedures
Instead of taking data out of the database into your code, what if we pushed the code into the database? Here's where we introduce a **stored procedure**, a function or program written in a general-purpose language that lives and runs directly inside the database server. It gives us three main benefits: 

- **Power:** Lets you do complex math or logic that regular SQL can't handle.
- **Speed:** Instead of using a cursor to drag one row at a time across the network to your app (slow), the database does all the heavy lifting locally and sends you the final result.
- **Reusability:** You write the logic once, and any user or application can trigger it with a simple SQL command.

To use a stored procedure, you can use commands like `CREATE PROCEDURE` or `CREATE FUNCTION`. Inside them, you can use regular programming concepts like `IF/ELSE` statements, `LOOP`, and local variables. Once they're saved in the database, you can trigger them from Embedded SQL, interactive SQL interfaces, or even from *other* stored procedures. 

### Example
```
CREATE PROCEDURE UpdateSailorRating (
    IN s_id INTEGER,             -- Input: What the user provides
    IN rating_boost INTEGER,     -- Input: What the user provides
    OUT new_rating INTEGER       -- Output: What the procedure sends back
)
LANGUAGE SQL
BEGIN
    -- 1. Declare a temporary local variable
    DECLARE current_rating INTEGER;

    -- 2. Read data from the table into the local variable
    SELECT rating INTO current_rating
    FROM Sailors
    WHERE sid = s_id;

    -- 3. Control flow (IF / ELSE statement)
    IF current_rating IS NOT NULL THEN
        
        -- 4. Modify the database
        UPDATE Sailors
        SET rating = current_rating + rating_boost
        WHERE sid = s_id;

        -- 5. Set the final output value
        SET new_rating = current_rating + rating_boost;
        
    ELSE
        -- What to do if the sailor doesn't exist
        SET new_rating = -1; 
    END IF;
END;
```
  
## Call Level Interfaces 
This is third and most modern way to connect apps to databases. Instead of *placing* SQL directly into your code *(Embedded SQL)*, you just *use* standard programming libraries *(APIs)*.
 
The big advantage to using CLI is that APIs like JDBC (more on this later) are database-independent. This implies, unlike Embedded SQL, if you decide to switch from Oracle to MySQL, you don't have to rewrite your code. 

## JDBC 
To write code to talk to the database in Java there are a couple components you must take into account.

### Connections
You connect using a "JDBC URL", a web address pointing to the database.This connection acts as your session. By default, Java might treat every single query as its own transaction (autocommit), but you can turn this off to group queries and `commit()` / `rollback()` manually.

### The Three Types of Statements 
1. **Statement:** Used for basic, static SQL queries.
2. **PreparedStatement:** Used for queries you plan to run over and over. You compile the structure once, and leave "blank spots" (using ?) to plug in variables later. This is much faster.
3. **CallableStatement:** Used specifically to trigger **Stored Procedures**.

### The Java Cursor
When you run a query, Java hands you back a **ResultSet**. This is Java's version of a cursor. You use a `while` with `rs.next()` to grab the data row by row. 

### Error Handling 
In Java, database errors trigger an `SQLException`. You are forced to write `try/catch` blocks to handle these potential errors, otherwise, your code cannot be compiled.

## pyodbc 
Similar to how we use JDBC for Java, in Python, we use **pyodbc**. Once you `import pyodbc`, connect to the database, and get a connection object, you're able to create a cursor using `cursor.execute("SELECT ...")`. With your cursor, you can use a `for` loop to print out the rows. For modifying data (`INSERT` or `UPDATE`), you have to explicitly call `commit()` to save your changes to the database. 

## Security and Privileges
For the last topic, we shift gears to security and try to figure out ways to improve the blocking of unauthorized code from deleting all our tables.

### Authorization IDs
Every user (or application program) logging into the database gets an ID.

### Privileges
This is your set of **privileges**. You can be granted the right to `SELECT` (read), `INSERT`, `DELETE`, or `UPDATE` specific tables. If you create a table, you become the "schema owner" and automatically get every privilege for it.  

### GRANT Command
This command is used to **give** privileges to other people. If you give some a privilege `WITH GRANT OPTION`, it means they are allowed to further pass that privilege on to even more people. Here's an **example**: 
```
GRANT SELECT, INSERT 
ON Sailors 
TO Luke 
WITH GRANT OPTION;
```

### Views as Security 
You can use **Views** to hide data. For example, instead of giving a user access to the main `Sailors` table, you create a view called `YoungSailors` that only show sailors under 18, and only grant them access to that view.

### Revoke Command
This command is used to **take** privileges away. If you perform `REVOKE ... CASCADE` from User A, the database will also take the privilege away from anyone User A gave it to causing a chain reaction (**The Cascade Effect**). Because of this chain reaction, databases keep a "Grant Diagram" (a visual family tree) to track exactly who gave what permission to whom. This makes it easier to know what to delete during a cascade. Here's an **example**: 
```
REVOKE SELECT 
ON Sailors 
FROM Luke 
CASCADE;
```



