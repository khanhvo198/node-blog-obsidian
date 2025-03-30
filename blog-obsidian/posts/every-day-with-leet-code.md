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

