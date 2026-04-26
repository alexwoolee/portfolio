---
title: The Semistructured Data Model
date: April 22, 2026
tags: [cmpt, notes, database, design]
cover: "/blog/star.png"
--- 
## Introduction -- Why are we here?
HTML, a tool used to develop websites was built for humans to read, meaning it only cares about layout, not the actual meaning or semantics of the data. As a result, applications have a terrible time trying to understand and extract data from standard websites. To fix this, the web needed a paradigm shift from documents to data, and from information retrieval to data management. The W3C created **XML** (Extensible Markup Language) as the standard data exchange format. 

## XML 
XML is a purely data, generated/consumed by applications, and provides an easy way to transport information across different platforms and organizations. 

## The Semistructured Data Model (The Graph)
Before looking at XML code, it's good to look at the mathematical model behind it, known as the **Semistructured Data Model**. We need this model because relational databases are too rigid for things like biological sequence data, 3D data, or heterogeneous web sources. This model is also self-describing, meaning the data is **"self-describing"** (description is baked right into the data itself). Additionally, unlike the **Relational Model**, the **Semistructured Model** allows (**Rule-Breaking**) for missing attributes, entirely new additional attributes, and multiple values for a single attribute (like an array).

### The Structure (Directed Graphs) 
Instead of tables, this model stores data as a massive **directed graph** made of **nodes and arcs** (directed edges). 
- **The Root Node**: Represents the entire database. Every single piece of data must be reachable from here.
- **Interior Nodes**: Represent complex objects that have children. 
- **Leaf Nodes**: Represents the actual raw data (atomic objects like strings or numbers). 
- **Arcs**: The arcs connecting the nodes. The labels on these arcs tell you the relationship between nodes (e.g., an arc labeled "author" pointing to a node with the text Smith").

## How Databases Actually Store XML
Knowing that XML doesn't use tables, how does a Database Management System (DBMS) handle it? There are two approaches: 
1. **Native XML DBMS:** Systems built from the ground up to use XML documents as their core storage unit (e.g., eXist-db, BaseX).
2. **XML-Enabled Relational DBMS:** Traditional systems (like Oracle or MS SQL Server) that added a special XMLType datatype to forcefully map XML data into their relational schemas. 

## XML Syntax Basics (Tags, Attributes, and Namespaces)
### Elements & Tags 
XML uses matching starts tags `<book>` and end tags `</books>`. Unlike HTML which has a fixed list of tags, XML allows you to define your own tags to describe specific content. Elements can be nested inside one another. 

### Attributes
You can add extra information inside a start tag using an attribute (e.g., `<book price="55">`). Attributes can only hold one single value.

### Breaking The Tree (ID & IDREF)
While XML is naturally a tree shape, you can build general graphs. You do this by giving an element an `ID` attribute (acts like a Primary Key), and letting other elements point to it using an `IDREF` or `IDREFS` attribute (acting like Foreign Keys). 

### Namespaces (Avoiding Name Collisions)
If you combine XML from two different companies, they might both use the `<table>` tag for cmopeltely different things (e.g., an HTML layout table vs. a piece of wooden furniture). You fix this by prefixing the tags (like `<h:table>` vs <`f:table>`) and defining a Universal Resource Identifier (URI) namespace to explain what the prefix means.

## Well-Formed vs. Valid XML (The Rules)
Because applications read XML automatically, it has strict rules. If a parser finds a syntax error, it must immediately stop processing (unlike web browsers, which just try their best to display broken HTML).

### Well-Formed XML (The Baseline) 
To be just considered **"well-formed"**, a document only needs to pass three basic rules: 
1. It begins with an XML declaration
2. It has exactly one single roo element enclosing everything. 
3. All elements are perfectly nested (no overlapping start/end tags)

### Valid XML (The Gold Standard) 
A document is **"valid"** if it is well-formed AND it strictly follows a **Document Type Definition (DTD)**. A **DTD** is a grammar rulebook for your XML. It specifies exactly which tags are allowed and how they must be nested. It uses symbols like `*` (zero or more occurences), and `?` (zero or one) to enforce structure. 

### A Sidenote On DTD 
Once you add a **DTD**, your XML is technically no longer **semistructured** because it now has a predefined schema.

## XML Schemas (The Modern Upgrade)
DTDs are a bit outdated and the modern way to define the rules for an XML document is to use an **XML Schema**. There are three advantages to using an **XML Schema** over DTDs: 
1. **Data Types:** DTDs basically treat everything as generic text. XML Schemas support strict data types (like `xs:integer`, `xs:data`, `xs:boolean`). This is crucial for verifying data before letting it enter a database. 
2. **Restrictions:** You can enforce strict rules, like saying an "age" element must be an integer between 0 and 120. 
3. **Written in XML:** DTDs use a weird, custom syntax. XML Schemas are written usnig standard XML tags, so you don't have to learn a new language to write one.

### Simple vs. Complex 
An XML Schema breaks things down into **Simple Elemenst** (which only contain text) and **Complex Elements** (which contain nested child elements or attributes).
