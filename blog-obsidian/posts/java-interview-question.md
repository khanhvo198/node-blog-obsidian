---
title: Java interview question
description: Some java interview question i prepare for interview of junior/middle level
public: false
date: 2025-08-02
tags:
  - Interview
  - Java
---
### ✅ Core Java & OOP Basics
**1. What are the main features of Java?*
- Platform Independent (via JVM)
- Object-Oriented
- Robust and Secure
- Multithreaded
- High Performance (via JIT compiler)
- Automatic Garbage Collection
- Dynamic and Distributed

**2. What is the difference between JDK, JRE, and JVM?**
- **JDK (Java Development Kit):** Tools to develop and run Java programs (compiler, debugger, etc.).
- **JRE (Java Runtime Environment):** Environment to run Java applications, includes JVM and libraries.
- **JVM (Java Virtual Machine):** Executes bytecode, provides platform independence.

**3. Explain the four pillars of OOP.**
- **Encapsulation:** Wrapping data and behavior in a class.
- **Abstraction:** Hiding internal implementation and showing only functionality.
- **Inheritance:** Acquiring properties from a parent class.
- **Polymorphism:** One method behaves differently based on the object (overloading & overriding).

**4. What is the difference between `==` and `.equals()` in Java?**
- `==` checks for **reference equality** (same memory).
- `.equals()` checks for **logical equality** (same content). You should override `.equals()` in custom classes.

**5. What is method overloading vs. method overriding?**
- **Overloading:** Same method name, different parameters (within same class).
- **Overriding:** Subclass provides a specific implementation of a method declared in the parent class.

### ✅ Classes & Objects###

**6. What is a constructor? Can a constructor be private?**
- A constructor initializes objects.
- Yes, it can be private (commonly used in Singleton patterns).

**7. What is the difference between `abstract class` and `interface`?**
- **Abstract class:** Can have both abstract and non-abstract methods.
- **Interface:** Only abstract methods (until Java 8), now can have default and static methods.
- A class can **implement multiple interfaces** but **only extend one class**.

**8. What is the purpose of the `final` keyword in Java?**
- **final class:** Cannot be extended.
- **final method:** Cannot be overridden.
- **final variable:** Cannot be reassigned.

**9. What is the difference between static and non-static methods?**
- **Static method:** Belongs to the class, can be called without creating an object.
- **Non-static method:** Belongs to an object, needs an instance to call.

### ✅ Collections Framework###

**10. What is the difference between `ArrayList` and `LinkedList`?**

- **ArrayList:** Fast random access, slower insertion/deletion.
- **LinkedList:** Slower access, faster insertion/deletion (especially in middle).


**11. What is the difference between `HashMap`, `TreeMap`, and `LinkedHashMap`?**
- **HashMap:** Unordered, fast access (O(1)).
- **TreeMap:** Sorted by keys, slower (O(log n)).
- **LinkedHashMap:** Maintains insertion order.

**12. Why is `HashMap` not thread-safe? How can you make it thread-safe?**
- Multiple threads can corrupt internal structure.
- Use `Collections.synchronizedMap()` or `ConcurrentHashMap`.

**13. What is the difference between `Set` and `List` in Java?**
- **List:** Allows duplicates, maintains insertion order.
- **Set:** No duplicates, unordered (or ordered based on implementation).

**14. What is the difference between `Iterator` and `ListIterator`?**
- **Iterator:** Works with all collections, forward-only traversal.
- **ListIterator:** Works only with List, supports bidirectional traversal and element modification.