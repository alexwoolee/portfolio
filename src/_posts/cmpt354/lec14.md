---
title: Query Languages for XML (XPath & XQuery)
date: April 22, 2026
tags: [cmpt, notes, database, design]
cover: "/blog/star.png"
--- 
## Introduction -- Why are we here?
In the previous notes, we looked at how XML structures data into a giant tree of nodes and tags. However, once your data is inside that tree, you need a way to actually search through it and extract answers. That is exactly what **XPath** and **XQuery** do. 

## XPath Basics (Navigating the Tree)
XPath is the foundation. It is a simple language that uses path expressions (similar to navigating folders on your computer) to find specific items in an XML document. An XPath expression returns a sequence of items (values, XML elements, or attributes).

### Absolute vs. Relative
- **Absolute Path**: Starts at the very root of the document (e.g., `/bibliography/book`).
- **Relative Path**: Starts from whatever node you are currently looking at.

### Grabbing Attributes
If you only want the value inside a start-tag instead of the whole element, you use the `@` symbol. For example, `/bibliography/book/@bookID` returns just the ID strings (like "b100") instead of the whole `<book>` block.

## Advanced Navigation (Axes, Wildcards, and Conditions)
Typing out the exact, perfect path every time is inefficient. XPath provides shortcuts to make navigating large documents easier.

### Axes (The Shortcuts)
You don't have to just go down to the immediate child. You can use an axis like `//` (Descendant-or-self). This skips intermediate levels. For example, `/bibliography//author` will find every single `<author>` tag anywhere inside the bibliography, regardless of how deeply nested it is.

### Wildcards
- `*` means "any tag" (e.g., `/bibliography/*/author`).
- `@*` means "any attribute".

### Conditions (The Filter)
You can restrict your search using square brackets `[]`. 
- **Value Filter:** `/book[/title="Foundations"]` only returns books with that exact title.
- **Index Filter:** `/author[2]` returns only the second author in the list.

## XQuery and the FLWOR Expression (The "SQL" of XML)
XPath is great for finding things, but it can't join tables, sort data, or run complex loops. For that, we use **XQuery**. Every XPath expression is technically a valid XQuery expression, but XQuery adds superpower loops.

The core of XQuery is the **FLWOR** expression (pronounced "Flower"). It acts a lot like a SQL `SELECT...FROM...WHERE` query.

- **`for` (The Iterator)**: `for $x in expr` assigns the variable `$x` to *each item* in a sequence one by one, running a loop.
- **`let` (The Bulk Grab)**: `let $x := expr` grabs the *entire sequence* at once and dumps it into `$x` as one giant list (great for aggregations like averages).
- **`where` (The Bouncer)**: Checks a boolean condition. If true, the loop continues.
- **`order-by`**: Sorts the results (e.g., using the keyword `descending`).
- **`return` (The Output)**: Dictates what the final output looks like.

### The `{}` Rule
Because XQuery outputs actual XML tags, it needs to know the difference between plain text and code. You **must** wrap your XQuery variables in curly brackets `{}` when putting them inside XML output tags (e.g., `<result>{$b/title}</result>`).

## Ordering, Duplicates, and Joins
- **Removing Duplicates**: Use the built-in function `distinct-values()`. *Warning:* This function strips away all XML tags and just leaves the raw, primitive text values in quotes.
- **Joins**: You can join data just like in SQL. You declare two variables in your `for` clause and match them in the `where` clause.
- **The `data()` Function**: When comparing elements in a join, use `data($b1/year) = data($b2/year)`. This forces XQuery to compare the actual text inside the tags, rather than trying to see if they are the exact same physical node in the tree.

## The Weird Logic of XQuery (Comparisons & Quantifiers)
Because XQuery constantly deals with lists (sequences) instead of single variables, math works a bit differently.

### Existential vs. Strict Comparisons
- **Existential Comparisons**: Standard operators like `=` or `<` are existential. If you check if a book's author `=` "Smith", and the book has three authors, XQuery returns true if *at least one* of those authors is "Smith".
- **Strict Comparisons**: If you want to force XQuery to compare single items only, use `eq`, `ne`, `lt`, or `gt`. If you use these on a list of multiple items, the query will crash.

### Quantifiers
- **`some` (Existential):** Returns true if AT LEAST ONE item in the sequence satisfies the condition.
- **`every` (Universal):** Returns true ONLY if EVERY SINGLE item in the sequence satisfies the condition.

### Aggregations
Standard functions like `sum()`, `min()`, `count()`, and `avg()` work perfectly. You usually combine them with the `let` clause so they can process the whole sequence at once.