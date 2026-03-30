---
title: Data Mining
date: March 16, 2026
tags: [cmpt, notes, database, design]
cover: "/blog/star.png"
--- 
## Introduce -- Why are we here? 
Instead of just storing data or running simple queries we are now looking at how to use algorithms to automatically discover hidden patterns and predict future outcomes.

## KDD 
Before we even start discussing **Data Mining**, we need to talk about the larger process it lives inside **KDD**. Knowledge Discovery Databases is the overall, step-by-step process of extracting useful information from large datasets. 

To be considered **KDD** ("Gold Standard"), the knowledge you find must meet three strict rules:

1. **Valid:** It has to be statistically true, not just a random coincidence.
2. **Previously Unknown:** It can't be common sense or a simple fact already explicitly written in the database.
3. **Potentially Useful:** It has to actually help the business or application.

It's an iterative and interactive pipeline. You take raw data, clean it up, transform it, *run data mining algorithms* on it, and then evalue the pattern you find to see if they represent knowledge. The "cleaned up" data typically comes from the Data Warehouses we learnt previously.

## Data Mining & Its Three Main Jobs 
**Data Mining** is the application of efficient algorithms to automatically uncover patterns hiding in the database. It has three main jobs: 
1. **Clustering:** Grouping similar things together without knowing what the groups are beforehand. *Example: Customer segmentation or grouping similar web documents*
2. **Classification:** Training a system to assign new data to pre-defined categories. *Example: Automatically checking if a credit card transaction is fraudulent or legitimate based on your data*
3. **Association Rules:** Finding "If This, Then That" relationships between items. *Example: Recommender systems on websites or optimizing supermarket layouts*

## Frequent Pattern Mining
For businesses or applications, we often want to find out important information like what products shoppers frequently buy together. Here we learn about **Association Rules** through the classic example "Market Basket Analysis".

Before we dive in, here are some terminology you should be familiar with: 
- **Itemset:** Just a group of items (like `{butter, bread, milk}`).
- **Transaction:** A single purchase event containing an itemset.

### Metric 1: Support (How Popular is it?)
This is the percentage of all transactions in the entire database that contain a specific itemset.
    - The math: $sup(X,D) = \frac{|\{T \in D | [cite_start]X \subseteq T\}|}{|D|}$
    - If an itemset hits a specific minimum support threshold (`minsup`), we officially call it a **frequent itemset**.


### Metric 2: Confidence (How Reliable is the Rule?):
When we make an association rule like $X => Y$ (if they buy $X$, they will buy $Y$), we need to know how reliable it is.
- The math: $c = \frac{|\{T \in D | X \cup Y \subseteq T\}|}{|\{T \in D | [cite_start]X \subseteq T\}|}$ 
- Confidence is the percentage of times $Y$ is bought specifically within the group of people who already bought $X$.

### The Ultimate Goal
The algorithm's job is to scan the database and find every single association rule that meets both our minimum support requirement and our minimum confidence requirement.

## Problem with Confidence 
We previously established that we want rules with high **Confidence**. However, confidence caan be incredibly misleading.

Imagine a school where 75% of all students eat candy bars. Now, let's look at just the soccer players: it turns out only 67% of soccer players eat candy bars. See the problem? The rule "if you play soccer $=>$ you eat candy bars" has a 67% confidence. So playing soccer decreases your chance of eating candy compared to the general population in the example. They are negatively correlated.

## Lift
To fix the **Confidence Problem**, we introduce a metric called Lift. **Lift** measures how much more likely $X$ and $Y$ are to happen together compared to if they were completely independent.
- The math: $Lift = \frac{P(A \cup B)}{P(A) \cdot P(B)}$$
  - If $Lift = 1 => A$ and $B$ are totally independent.
  - If $Lift >> 1 => A$ and $B$ are positively correlated.
  - If $Lift < 1 => A$ and B are negatively correlated.

## Anti-Monotonicity & The Magic Trick
Suppose a supermarket has 10,000 items, checking every single possible combination (itemsets) would take computers years. We need a shortcut to filter the garbage. 

The **Anti-Monotonicity** property states that if an itemset is frequent (`{Bread, Butter, Milk}`), then every single subset inside it (`{Bread, Butter}`) MUST also be frequent.

### The Shortcut 
We use the reverse of this rule to save time. If we know that a single item like `{Caviar}` is infrequent, then any larger set containing it (like `{Caviar, Bread}` or `{Caviar, Bread, Milk}`) is mathematically guaranteed to be infrequent too. Magic right? Now we can instantly cross millions of combinations off our search list without even scanning the database.

## The Apriori Algorithm (Level-by-Level Searching)
This algorithm uses the Anti-Monotonicity shortcut to systematically and efficiently find frequent itemsets. It uses a loop, building up from small sets to large sets. Here are the following steps:

1. **Start Small:** Scan the database to find all the frequent 1-item sets (e.g., just `{milk}`, just `{bread}`). Throw away any items that don't meet the minimum support. Let's call the winners $F_1$.
2. **Candidate Generation - The Join:** Take the winners from the previous step and combine them to make the next level of candidates.The Join Rule: To prevent building the exact same set twice, you only join two sets together if they perfectly match in all but their very last item.
3. **The Prune:** This is where the magic trick happens. Look at your new, larger candidate sets. If any subset inside that new candidate was a "loser" in a previous round, you immediately delete the whole candidate.
4. **Count & Repeat**: Now that you've pruned the garbage, scan the database to count the support for the surviving candidates. Keep the winners for this round, and loop back to Step 2 to build even bigger sets. You stop when you can't make any more frequent sets.

## Classification 
In **classification**, we aren't just grouping things; we are actively trying to label them. We want to build an algorithm (a classifier) that can look at historical data, learn the patterns, and then accurately predict the labels for completely unseen, future data.

### The Exam Protocol 
You can never test a classifier on the same data it learned from (that's just memorization). You must split your data into two separate sets:
- **Training Data:** The data you feed the algorithm so it can build its predictive model.
- **Test Data:** The hidden data you use to grade the classifier and calculate its "Classification Accuracy" (the percentage it guessed correctly).
  
## Decision Trees 
A Decision Tree is one of the most popular ways to build a classifier because it's highly visual and easy for humans to understand.

### The Structure 
- **Inner Nodes:** These represent the attributes or questions you are asking (e.g., "What is the weather like?").
- **Edges:** These represent the test or the answer to the question (e.g., "Sunny" or "Rainy").
- **Leaves:** These are the final predicted classes or labels (e.g., "Yes, play tennis" or "No, don't play").

### Paths as Rules
If you trace a line from the root at the very top all the way down to a leaf, you have created a single "decision rule" (e.g. `IF Outlook=Sunny AND Humidity=High THEN PlayTennis=No).

### Training vs. Testing
You train the model by building the tree top-down using historical data. You test the model by dropping a new data object a the root and seeing which leaf it lands in.

## Tree Construction & The Math of "Entropy"
When constructing a tree, how does the computer know which question to ask first? Concisely, it uses math to find the question that splits the data into clean, organized piles.

### The Termination Rule 
The algorithm keeps picking and splitting the data until either it runs out of attributes, or all the data objects in a node belong to the exact same class. 

### Entropy
Entropy is a mathematical measure ("messiness" score) of how mixed up a set of data is. If a node is 100% "Yes", its entropy is 0 (perfectly pure). If a node is a perfect 50/50 split of "Yes" and "No", its entropy is 1 (maximum messiness). The math for a dataset T with classes k is: 

$entropy(T) = -\sum_{i=1}^{k} p_i \cdot \log_2 p_i$.

### How it all ties in together
To sum it up , the way we pick the best question is by calculating the entropy before the split, and subtracting the weighted entropy after the split. Whichever attribute gives us the biggest drop in entropy (the highest **Information Gain**) is the best question, and becomes our next node.

## Evaliatopm & The Confusion Matrix
Once the tree is built, we still have to prove it actually works. 

### Cross-Validation 
Instead of splitting your data into just one Training set and one Test set, you slice it into $m$ pieces. You train the model on $m-1$ pieces, test it on the leftover piece, and the rotate and do it again, average the results at the end. 

### The Imbalanced Data Problem 
A pure classification error is useless is our data is skewed. Suppose a disease only affects 1% of a population, a broken model that just guesses "Healthy" 100% of the time will technically have a 99% accuracy rate, even though it's totally useless. 

### The Confusion Matrix (The Solution)
We break our predictions down into four categories: 
- **True Positive (TP):** We guessed sick, they were actually sick.
- **False Positive (FP):** We guessed sick, they were actually healthy (False Alarm).
- **True Negative (TN):** We guessed healthy, they were actually healthy.
- **False Negative (FN):** We guessed healthy, they were actually sick (The worst outcome in medicine!).
### Precision vs. Recall
These are the two ultimate grading metrics:
- **Precision:** Out of all the people we predicted were sick, how many actually were? ($Precision = \frac{|TP|}{|TP| + |FP|}$).
- **Recall:** Out of all the truly sick people out there, how many did we successfully find? ($Recall = \frac{|TP|}{|TP| + |FN|}$) .
- **F-Measure:** A combined score of both Precision and Recall.

## Overfitting
Overfitting, the largest danger in Machine Learning, happens when your decision tree grows too deep and starts memorizing the training data perfectly (including the random noise, errors, and outliers). The easiest way to tell if you're overfitted is when your tree has an incredibly low error rate on the *training data*, but completely fails and has a terrible error rate on the *test data*. 

### The Solution 
**Set strict rules** by forcing the tree to stop growing early. Set a *minimum support* (e.g., a leaf must have at least 10 people in it, not just 1) or a *minimum confidence* (a leaf doesn't need to be 100% pure to stop). Additionally we need to apply **pruning** when the tree grows massive. Once in that state, we systematically chop off the bottom branches (subtrees) if removing them actually improves the accuracy on a validation dataset. 