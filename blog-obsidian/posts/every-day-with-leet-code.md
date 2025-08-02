---
title: "Every day with leet code: Day 1"
description: Through this series, I will solve any leetcode problem which have easy or medium level
public: true
date: 2025-03-18
tags:
  - Leetcode
  - Algorithm
---
## Day 1: Best Time to Buy and Sell stock
![best-time-to-buy-and-sell-stock.png](best-time-to-buy-and-sell-stock.png)

In this challenge, we need to find the maximum profit of the transaction. The easiest way is buy at the day which has price lowest and sell when the price highest. Base on the ideal, we can loop through prices list, keep an minimum price, calculate and compare the profit in order to find the maximum value.  

Here is the solution using javascript.      

```js showLineNumbers
/**
* @param {number[]} prices
* @return {number}
*/

var maxProfit = function(prices) {
	let minPrice  = prices[0];
	let maxProfit = 0;
	for (const price of prices) {
		if (price < minPrice) {
			minPrice = price;
		}
		const profit = price - minPrice;
		if (profit > maxProfit) {
			maxProfit = profit
		}
	}
	return maxProfit;
}; 
```


## Day 2: Merge Two Sorted Lists


![merge-two-sorted-list](merge-two-sorted-list.png)


We have 2 pointer, each pointer point to different LinkedList, your mission is merge two of them into one, and return the pointer point to head of this LinkedList.

```java showLineNumbers

/**
* Definition for singly-linked list.
* public class ListNode {
* int val;
* ListNode next;
* ListNode() {}
* ListNode(int val) { this.val = val; }
* ListNode(int val, ListNode next) { this.val = val; this.next = next; }
* }
*/

class Solution {

	public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
		ListNode head = new ListNode(); // create pointer
		ListNode current = head; // another pointer, point to head

		while(list1 != null && list2 != null) {	
			if (list1.val < list2.val) {		
				current.next = list1;
				list1 = list1.next;
			} else {
				current.next = list2;
				list2 = list2.next;
			}
			current = current.next;
		}
		
		current.next = (list1 != null) ? list1 : list2;
		return head.next;
	}
}
```

You can imagine like that: head -> dummy; current = head which mean current -> dummy;

In while statement, current.next will be equal to list1 or list2; but at this time, current pointer is currently point to dummy node, we need make current pointer point to next node for the next loop, so we need to put add this statement: current = current.next;

when list1 or list2 pointer to null, which mean we have already loop all of them, the rest task is just pointer current to the rest of list1 or list2 and return head for final result













