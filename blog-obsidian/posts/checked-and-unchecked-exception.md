---
title: Distinguish between checked and unchecked exception
description: 
public: true
date: 2025-03-31
tags:
  - Java
  - SpringBoot
---

## Checked Exceptions

Checked exceptions are exceptions that **must be handled** at compile-time. If a method throws a checked exception, the calling method must either:

1. Handle the exception using `try-catch`.
2. Declare it in the method signature using `throws`.


### Checked Exception Examples

- `IOException` → File handling issues
- `SQLException` → Database connection issues
- `InterruptedException` → Thread interruptions
- `ClassNotFoundException` → Class not found in the classpath

```java showLineNumbers
import java.io.*;

public class CheckedExample {
    public static void main(String[] args) {
        try {
            FileReader file = new FileReader("test.txt"); // Might throw IOException
            BufferedReader reader = new BufferedReader(file);
            System.out.println(reader.readLine());
        } catch (IOException e) {
            System.out.println("File not found or error reading file: " + e.getMessage());
        }
    }
}
```

###  **Example: Declaring Checked Exception in Method Signature**

```java showLineNumbers
import java.io.*;

public class CheckedExample {
    public static void readFile() throws IOException { // Declares exception
        FileReader file = new FileReader("test.txt"); // Might throw IOException
        BufferedReader reader = new BufferedReader(file);
        System.out.println(reader.readLine());
    }

    public static void main(String[] args) {
        try {
            readFile();
        } catch (IOException e) {
            System.out.println("Handled exception: " + e.getMessage());
        }
    }
}

```

## Unchecked Exceptions

Unchecked exceptions are **not checked at compile-time**. They occur at runtime due to logical errors in the program. Java does **not** force you to handle them.

###  **Unchecked Exception Examples**

- `NullPointerException` → Accessing a `null` object
- `ArrayIndexOutOfBoundsException` → Accessing an array out of bounds
- `ArithmeticException` → Dividing by zero
- `IllegalArgumentException` → Invalid arguments passed

###  **Example: Unchecked Exception (NullPointerException)**

```java showLineNumbers
public class UncheckedExample {
    public static void main(String[] args) {
        String str = null;
        System.out.println(str.length()); // NullPointerException at runtime
    }
}
```

❌ No compile-time error, but **crashes at runtime**.

###  **Example: Handling an Unchecked Exception**

```java showLineNumbers
public class UncheckedExample {
    public static void main(String[] args) {
        try {
            int result = 10 / 0; // ArithmeticException
            System.out.println(result);
        } catch (ArithmeticException e) {
            System.out.println("Cannot divide by zero!");
        }
    }
}
```

✔️ The program **does not crash** because the exception is caught.