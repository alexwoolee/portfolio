---
title: Data Warehousing
date: March 16, 2026
tags: [cmpt, notes, database, design]
cover: "/blog/star.png"
--- 
## Introduction -- The Big Picture
Often more than not, organizations want to analyze huge amounts of recorded data to identify trends and guide business strategy which requires us to shift our focus from standard databases to **Data Warehouses**. It is a massive, consolidated repository that integrates data from several different operational **OLTP** (more on OLTP later) databases. 

### Key Characteristics
It is subject-oriented, integrated, time-variant (keeps a history rather than just the most current state), and non-volatile (the data doesn't change constantly). Generally, it views data at a summarized, aggregate level rather than individual records.

### OLTP vs OLAP
- **On-line Transaction Processing (OLTP):** Commonly found in traditional simple databases. Lots of short, quick updates (like a cashier scanning a single item).
- **On-line Analytic Processing (OLAP):** Used in data warehouses. Complex, exploratory queries that analyze massive, static datasets (like a CEO asking "What were our total sales by region over the last 5 years?").

## Architecture and Challenges 
How are these **Data Warehouses** built and what challenges does it present? We cover this here.
### The Pipeline (ETL)
Data is extracted from various external sources, integrated and transformed. Then, it's loaded into the data warehouse.
### Size vs. Speed
Warehouses are often built with gigabytes or terabytes in size because it keeps historical data. Despite the size, it's still expected for users to have an interactive and fast response time when they run complex queries.
### The Challenges 
- **Semantic Integration:** Fixing data mismatches, like combining tables where one uses US dollars and the other uses Canadian Dollars.
- **Heterogeneous Sources:** Pulling data from widly different source formats and systems. 
- **Metadata Management:** Keeping strict records of exactly where every piece of data came from and where it was loaded.

## Data Integration 
When you combine multiple databases into one, it's going to be messy. Thus, you have to integrate the data using two ways.
### Method 1: Schema Integration (The Structure)
**Merge** the actual table structures (metadata). This methodology however, does face the "attribute identification problem", where different databases use different attribute names for the exact same thing. Thus, we use attribute names as synonyms if applicable.
### Method 2: Instance Integration (The Data Rows)
You must **merge** the actual data itself or **remove** duplicate records of data (Data Deduplication). For the same real world entity, attribute values from different sources may be different (errors, differing conventions, differing scales, etc.).
### Data Deduplication
**Data Deduplication** is the process of finding and removing duplicate records. It does this by utilizing a mathematical "similarity function" to compare attributes, defining a total similarity score between two rows. If the score is higher than some similarity threshold $t$, the system declares them duplicates.

Comparing every single record to every other record takes too long for our liking $O(n^2)$. To optimize the deduplication process, we partition the dataset into smaller chunks and only search for duplicates within those chunks.

## The Multidimensional Data Model
Instead of looking at flat tables, data warehouses consists of dimensions (independent variables) and numeric measures (dependent variables). Dimensions describe the context of the data (e.g., Product, Location, Time). Measures are the actual numbers or facts you want to analyze (e.g., total sales).
### Concept Hierarchies 
Dimensions are naturally organized into levels of detail. For example, a *Time dimension* can be rolled up from Date $\to$ Week $\to$ Month $\to$ Quarter $\to$ Year. 
### MOLAP vs. ROLAP 
There are two ways to physically store this data:
1. **MOLAP (Multidimensional OLAP):** The data is physically stored on a disk as actual multi-dimensional arrays.
2. **MOLAP (Relational OLAP):** The data is stored in standard relational tables. It uses a massive, central **Fact Table** (which holds the numerical measures and keys) linked to smaller Dimension Tables (which hold the descriptive attributes). 

## OLAP Queries
In multi-dimmensional data warehouses, you analyze it using specialized spreadsheet-style operations rather than standard SQL commands.  
- **Roll-up (Zooming Out):** You aggregate the data by moving up the concept hierarchy. For example, if you have daily sales, a roll-up gives you the total monthly sales.
- **Drill-down (Zooming In):** The opposite of a roll-up. Break a high-level summary down into finer details. For example, taking total state sales and drilling down to see the sales for individual cities within that state.
- **Slicing and Dicing:** Filtering the warehouse to a very specific chunk using equality or range selections. For example, only looking at data where the location is "California".

### Comparison with SQL Queries
Doing a simple pivot in standard SQL is annoying. It requires writing multiple complex `GROUP BY` queries and manually stitching the results together.

## The CUBE Operator
Because writing dozens of `GROUP BY` queries to analyze a cube is horribly inefficient, SQL introduced a powerful shortcut.
### The Math Problem
If your database has $d$ dimensions, there are $2^d$ possible $GROUP BY$ combinations you could run to fully analyze it. 
### What it does
The `CUBE` operator computes the measures for *all possible* cells and evaluates all of those `GROUP BY` combinations at the exact same time.
### Why is it so fast
`CUBE` uses a smart cascading strategy by calculating the most detailed, specialized queries first. Then, it uses those small intermediate results to calculate the broader, generalized summaries. This drastically reduces the $I/O$ cost because it avoids scanning the massive original fact table over and over.
### The Syntax 
You simply add it to your query as an extension of the group by clause: 
```
GROUP BY CUBE(timeid, locid)
```

## Implementation & The Star Schema
When building a ROLAP warehouse, we organize the tables in a very specific way to priortize query speed over saving disk space.
### The Star Schema
This is the standard layout for a data warehouse.
### The Fact Table
This sits in the middle and contains the numerical measures (like `sales`) and the compound foreign keys. It is heavily normalized (redundancy-free!) because it is massive.
### The Dimensions Tables 
These surroudn the fact table and hold the descriptive data (like `City`, `Name`, `Product Name`). Intentionally left un-normalized (has redundancy). Because `UPDATES` / `DELETES` are rare in a warehouse, we don't care about anomalies here: we just want the data structure so it can be read as fast as possible. 
### The Star Join 
When you write a query that connects to the fact table to all of its surrounding dimension tables, it is referred to as a *star join*.

## Speeding Things Up (Indexes)
Standard database indexes are too slow for the complex, multi-dimensional queries of a data warehouse. We use two specialized alternatives: 

1. **Bitmap Indexes:** Used when you have a static column with only a few possible values (like gender or a 1-5 rating).
- Instead of a complex tree structure, it just creates a **bit-vector** (a string of 0s and 1s) for each possible value. For example, a male customer might have a $10$ in the gender index, and a female customer a $01$. It's fast because if you want to find for example a "Male customer with a Rating 3", the database simply takes the bit-vector for "Male" and the bit-vector for "Rating 3" and performs a lightning-fast, low-level bitwise `AND` operation on them.
2. **Join Indexes:** Joins are computationally expensive. A join index essentially does the math for a massive join *ahead of time* and just saves a list of pointers telling the database exactly which rows connect to each other. 

To prevent the number of join indexes from growing out of control, we combine the two concepts. We build bitmap indexes (**Bitmapped Join Indexes**) that point directly across a join to the central fact table, allowing us to find intersecting records instantly. 

## The SQL WINDOW Clause (Time Travel)
Standard SQL-92 is terrible at analyzing sequences, making it nearly impossible to calculate things like a "trailing 3-day moving average". SQL-99 introduced the `WINDOW` clause to fix this.

The `WINDOW` operation allows you to group a specific set of tuples aroud every single row in your table to perform calculations. 

It is composed of three steps: 
1. **Partition:** It splits your data into chunks (like grouping by `State`).
2. **Order:** It sorts the data inside that chunk chronologically (like ordering by `Month`).
3. **Frame:** It defines how far backward and forward to loop. For example, `RANGE BETWEEN '1' MONTH PRECEDING AND INTERVAL '1' MONTH FOLLOWING` creates a rolling 3-month window.

### Execution 
The aggregate function (like `AVG()`) calculates the math for just the rows currently inside that sliding window, then moves down to the next row and does it again.

## Smart Querying Tricks
Users wants answers immediately. Databases use two ways to avoid making the user wait while it scans terabytes of data.
### Top N Queries (Guessing the Cut-off)
If a user searches for "Top 10 cheapest cars", sorting every single car takes too long (`O(n)`). 
- **The Trick:** The query optimizer looks at its statistics and mathematically guesses a "cut-off value" $c$. For example, it basically says "I bet the 10 cheapest cars all cost less than $5000", It filters out everything over $5000, saving massive amounts of time (if it guesses wrong, it just resets and tries again).
### Online Aggregation (Good Enough)
If a CEO asks for the exact average sales across the entire coutry, scanning the whole fact table could take 10 minutes. 
- **The Trick:** The database starts spitting out a "running average" on the screen instantly so the user has a general idea of the answer right away. It can also use statistical sampling to give a highly accurate estimate (e.g., "2000 +/- 102 with 95% probability") without actually checking every row.
