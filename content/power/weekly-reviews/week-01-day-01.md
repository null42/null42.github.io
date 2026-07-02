---
date: 2026-06-20
category: 电源控制
source: power
visibility: public
title: "Week 01 Day 01: Boost Converter First Pass"
tags:
  - power-electronics
status: learning
summary: Boost converter.
---

# Week 01 Day 01: Boost Converter First Pass

## Concept

Boost converter.

## What I Learned

- The inductor stores energy during switch on-time.
- The inductor releases energy to the output during switch off-time.
- In ideal CCM steady state, output voltage follows `Vout = Vin / (1 - D)`.
- The first open-loop switching simulation does not settle exactly at the ideal formula. With the default parameters, it printed `Final output voltage: 244.77 V`, `Ideal CCM output voltage: 200.00 V`, and `Final inductor current: 0.00 A`. This is a useful warning: the formula has assumptions, and open-loop simulation can enter DCM or non-steady behavior.

## Simulation Evidence

- Script: `simulations/python/boost_open_loop.py`
- Default run output image: `simulations/results/boost_open_loop.png`
- Test command: `python -m pytest tests\test_boost_open_loop.py -v`
- Test result: 2 passed.

## Questions To Answer

1. Why does inductor current rise during switch on-time?
2. Why can output voltage become higher than input voltage?
3. Why does the ideal formula fail when duty cycle is too high or the converter is not in ideal CCM steady state?

## Mentor Question

In real UPS products, where does a Boost-like stage appear most often: PFC front end, battery discharge path, or another module?
