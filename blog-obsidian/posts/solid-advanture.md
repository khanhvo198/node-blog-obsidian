---
title: Learning solid in the hard way
public: true
date: 2025-03-21
tags:
  - SOLID
description:
---
Hi, me again, through this series, I will share my knowledge about SOLID and how we apply it. Thank for Chat-GPT to help me write this blog =)))

## What is solid ?
Well, SOLID is a set of five principles in object-oriented programing which aimed at writing clean, maintainable and scalable code. Each letter is stand for:

### S - Single Responsibility Principle (SRP)
Definition: A class should have only one reason to change.  
➡️ It should do one thing and do it well.  

Example: Don't make a `User` class handle both user data and email sending — separate those responsibilities.

### O - Open/Closed Principle (OCP)
Definition: A software module (class, function, or module) should be **open for extension** but **closed for modification**.
- **Open for extension**: You should be able to add new behavior or features without touching existing, stable code.
- **Closed for modification**: The core logic or tested code shouldn’t have to be changed every time a new requirement comes in.

We will take a look at two example below to clarify the difference
Without OCP
``` java showLineNumbers
	public class PaymentProcessor {
	    public void processPayment(String paymentType) {
	        if (paymentType.equals("creditcard")) {
	            // process credit card
	        } else if (paymentType.equals("paypal")) {
	            // process PayPal
	        } else if (paymentType.equals("bitcoin")) {
	            // oops, add another if here
	        }
	    }
	}
```
As you can see, every times you want to add another payment method, you need to modify a class PaymentProcessor, it violates OCP principle. What if you make a mistake through changing? Boooom, everywhere using this class can be broken.

With OCP
```java showLineNumbers
interface PaymentMethod {
    void pay(double amount);
}

class CreditCardPayment implements PaymentMethod {
    public void pay(double amount) {
        System.out.println("Paid with credit card: " + amount);
    }
}

class PayPalPayment implements PaymentMethod {
    public void pay(double amount) {
        System.out.println("Paid with PayPal: " + amount);
    }
}

class PaymentProcessor {
    public void process(PaymentMethod paymentMethod, double amount) {
        paymentMethod.pay(amount);
    }
}
```

With this implement, whenever you need to add a payment method, you can create another class and implement an Interface PaymentMethod.

### L - Liskov Substitution Principle (LSP)
Definition: Subtypes must be substitutable for their base types without breaking the program.
➡️ A subclass should behave like its parent class.

In simpler words:
- If `Class B` is a subclass of `Class A`, then wherever you use `Class A`, you should also be able to use `Class B` without unexpected behavior or errors.
- The derived class must **honor the contract** of the base class.

```java showLineNumbers
class Rectangle {
    protected int width;
    protected int height;

    public void setWidth(int width) { this.width = width; }
    public void setHeight(int height) { this.height = height; }

    public int getArea() { return width * height; }
}

class Square extends Rectangle {
    @Override
    public void setWidth(int width) {
        this.width = width;
        this.height = width;  // forces height = width
    }

    @Override
    public void setHeight(int height) {
        this.width = height;
        this.height = height; // forces width = height
    }
}
```

What is the problem here?. Imagine you have a declare like below, what will happen ?
```java showLineNumbers
Rectangle r = new Square();
r.setWidth(5);
r.setHeight(4);
System.out.println(r.getArea()); // You’d expect 20 (5x4), but you get 16 or 25 unexpectedly.
```

### I - Interface Segregation Principle (ISP)
Definition: No client should be forced to depend on interfaces they do not use.  
➡️ Make smaller, more specific interfaces instead of one large general-purpose interface.

Example of violating this rule:
```java showLineNumbers
public interface MultiFunctionDevice {
    void print();
    void scan();
    void fax();
}
```

```java showLineNumbers
public class SimplePrinter implements MultiFunctionDevice {
    public void print() {
        System.out.println("Printing...");
    }

    public void scan() {
        // I don't know how to scan... but forced to implement
        throw new UnsupportedOperationException("Scan not supported.");
    }

    public void fax() {
        // I don't fax either
        throw new UnsupportedOperationException("Fax not supported.");
    }
}
```

As you can see, a SimplePrinter class has 2 function scan and fax which not use, so we should separate this interface into smaller class, here is an example
```java showLineNumbers
public interface Printer {
    void print();
}

public interface Scanner {
    void scan();
}

public interface FaxMachine {
    void fax();
}
```

And only implement what we need
```java showLineNumbers
public class SimplePrinter implements Printer {
    public void print() {
        System.out.println("Printing...");
    }
}

public class MultiFunctionMachine implements Printer, Scanner, FaxMachine {
    public void print() { System.out.println("Print"); }
    public void scan() { System.out.println("Scan"); }
    public void fax()  { System.out.println("Fax"); }
}
```


### D - Dependency Inversion Principle (DIP)
Definition: High-level modules should not depend on low-level modules. Both should depend on abstractions.
And abstractions should not depend on details — details should depend on abstractions.

Common violation of DIP:

```java showLineNumbers
@Service
public class OrderService {
    private final PaymentGateway paymentGateway = new StripePaymentGateway(); // ❌ direct dependency

    public void processOrder(double amount) {
        paymentGateway.pay(amount);
    }
}
```

Problem: `OrderService` is tightly coupled to `StripePaymentGateway`

Here is the correct way to follow DIP in Spring Boot
Step 1: Create an abstraction (interface)

```java showLineNumbers
public interface PaymentGateway {
    void pay(double amount);
}
```

Step 2: Create concrete implementations
```java showLineNumbers
@Service
public class StripePaymentGateway implements PaymentGateway {
    public void pay(double amount) {
        System.out.println("Paid with Stripe: " + amount);
    }
}

@Service
public class PaypalPaymentGateway implements PaymentGateway {
    public void pay(double amount) {
        System.out.println("Paid with PayPal: " + amount);
    }
}
```

Step 3: Depend on the abstraction
```java showLineNumbers
@Service
public class OrderService {
    private final PaymentGateway paymentGateway;

    @Autowired
    public OrderService(PaymentGateway paymentGateway) {
        this.paymentGateway = paymentGateway;
    }

    public void processOrder(double amount) {
        paymentGateway.pay(amount);
    }
}
```


