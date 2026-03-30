---
title: Design Theory for Relational Databases  
date: March 16, 2026
tags: [cmpt, notes, database, design]
cover: "/blog/star.png"
--- 
## Introduction - Why are we here? 
Databases are usually first born from sketching a high-level design like an ER diagram and translating that into a relational schema (the actual tables). Sometimes people skip the diagram phase and go straight into building the relational tables directly. 

No matter what you decide to do for the initial setup, it's usually not perfect and has a lot of **redundancy** (repeating the same data over and over). 

We don't want a lot of **redundancy** since repeating data: 
- wastes space 
- causes "update and deletion **anomalies**" 
For example, if data is repeated in five places and you only update, your database is now **broken** and **inconsistent**. 

So you might be wondering, how do we fix this? To fix this, database theory uses **normal forms**, a checklist for clean, **redundancy-free** database. There are also some algorithms we can use to auto clean up a messy schema and convert it into one of these normal forms.

## Functional Dependency 
Functional dependency (FD) is the foundational concept for building clean databases. Written algebraically as $X \to Y$, it's a rule that says "if you know the value of $X$, you know the value of $Y$". 

### Naming Conventions
In general, it's common that $X,Y,Z$ represents sets of columns of relation R, while $A,B,C$ represent single columns. Often times instead of writing ${A,B,C}$ we write simply write ${ABC}$.

### Trivial FDs
A depedency (FD), is trivial if the right side of the arrow is just a subset of the left side (e.g., $X \to Y$ where $Y \subseteq X$). Intuitively, it's like saying "if I know your first and last name, I know your first name". True, but unhelpful.

## FD Rules
The rules are ordered by importance for your understanding.

### Splitting and Comining Rule
The splitting and combining rule states that you are completely allowed to split up or combine the attributes on the right side of the arrow. For example, the rule $A \to BC$ is identical to having two separate rules $A \to B$, and $A \to C$. In general, you cannot assume that attributes on the left side of the arrow can be split. Think of it intuitively. If you know a "City" and "Street Address", together it gives you a specific "House". But knowing just the "City" or just the "Street Address" independently doesn't give you the house. So the key takeaway is that $AB \to C$ does not apply $A \to C$, and $B \to C$.

### Transitivity Rule
The transitivity rule states that if $X \to Y$, and $Y \to Z$, then logically, $X \to Z$.

### Left-Side Extension Rule 
The rule can be summed up as "adding fluff", meaning you can always add extra, unnecessary info to the left side of a valid rule, and it will still be true. In mathematical terms, if $X \to Y$ holds, $X \cup \{A\} \to Y$. For instance, if "Student ID" gives you "Name", then "Student ID + Shoe Size" also gives you "Name". Shoe size is useless, but the dependency isn't broken. 

## Superkeys and Keys
Suppose we have a table (Relation R) with a set of attributes X. 

### Superkey
A superkey is any combination of attributes (let's call it K) that uniquely identifies a specific row. If $K \to X$, then K is a superkey.

### Key (Candidate Key)
A key is a superkey on a diet (minimal). It is the absolute minimum number of columns needed to uniquely identify a row. If you remove even one attribute from this key, it becomes invalid and is no longer a superkey. 

### Takeaway
Keys are essentially a very specific, highly useful type of FD. If you have a list of all FDs in a database, you can use math to figure out the keys.

## Closure of Attributes 
If someone gives you a starting set of attributes let's say $\{A, B, C\}$, and a list of FDs, the **Closure of Attributes** refers the total list of attributes you can figure out. With your set of attributes $Y$, we denote it by $Y^+$. 

### The Algorithm 
The steps:
1. **Prep:** If any of your rules have multiple attributes on the right side (e.g., $BC \to AD$), split them up using the splitting rule.
2. **Initialize:** Create a "basket" (we'll call it X) and put your starting attributes inside. 
3. **Loop and Search**: Look at your FDs. If you have all the attributes on the left side of a rule sitting in your basket, take the attribute from the right side of that rule and throw it into your basket.
4. **Repeat:** Keep looping through your FDs, until you make a full pass without adding anything new to your basket. What's left in your basket is your *Closure*.

### Plain Language Example
Let $Y = \{A, B, C\}$ with the goal of finding $Y^+ = \{A, B, C\}^+$. And suppose our $FDs = \{AB \to D, D \to E, BC \to F, G \to H\}$. 
1. You start with $\{A, B, C\}$. 
2. Since you have $AB$ in your initial set, you get $D$.
3. From $D$, you get $E$.
4. We also have $BC$ so we get $F$. 
5. However notice we don't have $G$ which conversely means we can't get $H$.
6. Therefore our final result is: $\{A, B, C\}^+ = \{A, B, C, D, E, F\}$

### Algorithmic Example
Goal: To Find $\{A, B\}^+$ with $FDs = \{AB \to C, BC \to A, BC \to D, D \to E, CF \to B\}$
1. Start: Basket $X$ has $\{A, B\}$
2. Pass 1: We have $AB$, so rule 1 triggers. Add C. Basket is now $\{A, B, C\}$.
3. Pass 2: We now have $BC$, so rule 3 triggers. Add D. Basket is now $\{A, B, C, D\}$.
4. Pass 3: We now have $D$, so rule 4 triggers. Add $E$. Basket is now $\{A, B, C, D, E\}$.
5. End: We don't have $CF$, so the last rule never triggers. We can't add anything more. Therefore, our closure is $\{A, B, C, D, E\}$.

## Schema Design and Anomalies 
Poorly designed databases often come with a lot of **redundancy**. In databases, redundancy is defined as storing the exact same real-world data in multiple places. For examples, it's redundant to have the same exact row multiple times, or redundant columns in one table like storing "Birthdate" and "Age". If you know the birthdate, you don't need to store the age.

### Anomalies 
In terms of anomalies, we'll place our focus on two commonly recurring anomalies: 
- **Update Anomaly** happens when you need to *change* a fact, but you only update it in some places, leaving the database *contradicting* itself. For example, if you update length of movie *Nemo*  to 100 minutes for the "Andrew Stanton" row, but leave it as 95 minutes for the "Ellen DeGeneres" row, your database is now broken.
- **Delete Anomaly** happens when you deleting a row to get rid of one piece of information, accidentally **deletes** a completely different, valid fact. For example, if you delete the actor "Jack Black", you accidentally delete the entire existence of the movie *Super Mario Movie*.

## Decomposing Relations
So, how do we fix a table that suffers from these anomalies? We use a process called **decomposition**. The process involves taking a table, and splitting it into two (or more) smaller tables. Formally, if you have a relation $R$, you can decompose it into relations $S$ and $T$. The rule is that the combined columns of S and T must equal the original columns of $R$. We'll need to ensure that each of the derived tables are in **BCNF**. More on that below.

## Boyce-Codd Normal Form
BCNF is a strict rule that guarantees your table won't have the anomalies we've talked about. A table is in BCNF if, for every single non-trival FD $X \to Y$, the left side $X$ is a superkey. Intuitively, if an attritbute (or group of attribute) is powerful enough to dictate the value of another column, it must be powerful enough to identify the entire row. If it can't, the table is broken and fails the BCNF test.

## Tying Decomposition and BCNF 
To fix a table that suffers from anomalies, we need to utilize decomposition and BCNF. We can forcefully convert any messy database into perfect BCNF tables using the algorithm shown below.

Goal: Split table $R$ into smaller tables that are all in BCNF, while ensuring that you can combine them back later to get the original data.
- **Step 1 (Finding the offender):** Find a rule $X \to Y$ that violates BCNF (meaning $X$ isn't a superkey).
- **Step 2 (Find the reach):** Calculate the "closure" of $X$ ($X^+$). This tells you everything that $X$ determines.
- **Step 3 (The Split):** Cut the table into two pieces.
  -   Table 1: Gets $X$ and everything it determines $(X^+)$.
  -   Table 2: Gets $X$ and whatever columns were left over from the original table. 
- **Step 4 (Repeat):** Look at your new tables. Ask yourself are the in BCNF? If not, jeeping splitting them using the exact same method until every single table passes the test. 

## Recoverability of Information 
On a side note, you might be wondering: "If I keep splitting my tables into smaller pieces, am I losing data?" No, this concept is called a "lossless decomposition". It means zero data is lost, and no fake "ghost rows" are accidentally created when you glue things back together.