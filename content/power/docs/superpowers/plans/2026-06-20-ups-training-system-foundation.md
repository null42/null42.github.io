---
date: 2026-06-20
category: 电源控制
source: power
visibility: public
title: UPS Training System Foundation Implementation Plan
tags:
  - power-electronics
status: learning
summary: "> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan t"
---

# UPS Training System Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the new UPS 30-day training system foundation and the first teachable Boost converter module.

**Architecture:** Archive the old generated HTML lessons, then rebuild the learning system around small Markdown concept files, project directories, simulation scripts, mentor notes, and weekly reviews. The first module teaches Boost converter fundamentals through concept explanation and a Python waveform simulation.

**Tech Stack:** Markdown, Python 3, NumPy, Matplotlib, MATLAB/Simulink as later optional tooling.

---

## File Structure

- Create `archive/old-lessons/`: holds old generated HTML lessons.
- Create `archive/old-learning-records/`: holds old generated learning records.
- Create `roadmap/30-day-plan.md`: defines the four-week training rhythm.
- Create `roadmap/lesson-priority-map.md`: maps new modules to concepts, simulations, projects, and mentor questions.
- Create `concepts/template.md`: concept explanation template.
- Create `concepts/power-electronics/boost-converter.md`: first core concept document.
- Create `simulations/README.md`: simulation workflow rules.
- Create `simulations/python/boost_open_loop.py`: simple open-loop Boost simulation.
- Create `simulations/results/.gitkeep`: keeps result folder present.
- Create `projects/01-boost-basics/README.md`: first project instructions and acceptance criteria.
- Create `debug-records/template.md`: technical debugging record template.
- Create `mentor-notes/template.md`: mentor question and feedback template.
- Create `weekly-reviews/template.md`: weekly review template.
- Modify `MISSION.md`: update from interview preparation to 30-day onboarding training.

## Task 1: Archive Old Generated Lessons

**Files:**
- Move: `lessons/` -> `archive/old-lessons/`
- Move: `learning-records/` -> `archive/old-learning-records/`
- Create: `archive/README.md`

- [ ] **Step 1: Create archive folders**

Run:

```powershell
New-Item -ItemType Directory -Force -Path 'archive' | Out-Null
New-Item -ItemType Directory -Force -Path 'archive\old-lessons' | Out-Null
New-Item -ItemType Directory -Force -Path 'archive\old-learning-records' | Out-Null
```

Expected: commands exit 0.

- [ ] **Step 2: Move old content**

Run:

```powershell
Get-ChildItem -LiteralPath 'lessons' -Force | Move-Item -Destination 'archive\old-lessons'
Get-ChildItem -LiteralPath 'learning-records' -Force | Move-Item -Destination 'archive\old-learning-records'
Remove-Item -LiteralPath 'lessons' -Force
Remove-Item -LiteralPath 'learning-records' -Force
```

Expected: `lessons/` and `learning-records/` no longer exist; archived files exist under `archive/`.

- [ ] **Step 3: Create archive README**

Create `archive/README.md`:

```markdown
# Archive

This directory contains the previous interview-oriented generated course material.

The archived HTML lessons and old learning records are not the main learning path anymore. They may be used only as rough source material after their content is checked against reliable references and verified through simulation.

Do not copy archived explanations directly into the new training system.
```

- [ ] **Step 4: Verify archive**

Run:

```powershell
Test-Path 'archive\old-lessons'
Test-Path 'archive\old-learning-records'
Test-Path 'lessons'
Test-Path 'learning-records'
```

Expected:

```text
True
True
False
False
```

- [ ] **Step 5: Commit archive move**

Run:

```powershell
git add -- '学习/电源/archive' '学习/电源/lessons' '学习/电源/learning-records'
git commit -m "chore: archive old generated UPS lessons"
```

Expected: commit succeeds.

## Task 2: Create Core Training Templates

**Files:**
- Create: `concepts/template.md`
- Create: `debug-records/template.md`
- Create: `mentor-notes/template.md`
- Create: `weekly-reviews/template.md`

- [ ] **Step 1: Create directories**

Run:

```powershell
New-Item -ItemType Directory -Force -Path 'concepts','debug-records','mentor-notes','weekly-reviews' | Out-Null
```

Expected: command exits 0.

- [ ] **Step 2: Create concept template**

Create `concepts/template.md`:

```markdown
# Concept: <name>

## 1. What It Is

Define the concept in one plain sentence.

## 2. Why UPS Needs It

Explain the concrete UPS or power-control problem this concept solves.

## 3. Physical Intuition

Explain using voltage, current, energy, phase, switching state, sampling timing, or control flow.

## 4. Mathematical Form

List the equations, variables, units, sign conventions, and assumptions.

## 5. Simulation Observation

State which Python or Simulink model demonstrates the concept and what waveform or metric should be observed.

## 6. Firmware Landing

Explain where the concept appears in embedded software: ISR, task, state machine, parameter table, protection logic, ADC, PWM, or communication.

## 7. Common Misunderstandings

List incorrect interpretations and the correct way to judge them.

## 8. Mentor Questions

List specific questions to confirm with the company mentor.
```

- [ ] **Step 3: Create debug record template**

Create `debug-records/template.md`:

```markdown
# Debug Record: <topic>

## Context

- Project:
- Date:
- Tool:
- Model or script:

## Expected Behavior

Describe the expected waveform, metric, state transition, or code behavior.

## Actual Behavior

Describe the observed result with parameter values.

## Hypotheses

1. 
2. 
3. 

## Tests Performed

| Test | Change | Result | Conclusion |
|---|---|---|---|
| 1 |  |  |  |

## Root Cause

State the most likely cause after testing.

## Fix or Next Experiment

Describe the next concrete action.
```

- [ ] **Step 4: Create mentor notes template**

Create `mentor-notes/template.md`:

```markdown
# Mentor Note: <topic>

## Question Prepared

- Background:
- What I simulated or checked:
- Specific confusion:
- What I want the mentor to confirm:

## Mentor Feedback

Record only non-confidential engineering advice.

## Follow-Up Action

State the simulation, reading, or code experiment to do next.

## Confidentiality Check

- [ ] No internal source code recorded.
- [ ] No unreleased product details recorded.
- [ ] No customer project parameters recorded.
- [ ] No internal test data recorded.
```

- [ ] **Step 5: Create weekly review template**

Create `weekly-reviews/template.md`:

```markdown
# Weekly Review: Week <n>

## Completed

- Concepts:
- Simulations:
- Projects:
- Mentor questions:

## Concepts I Can Explain Clearly

List concepts and explain the strongest evidence that they are understood.

## Concepts Still Weak

List weak concepts and the next verification task.

## Simulation Evidence

List scripts, models, result files, and observed metrics.

## Engineering Questions

List questions to bring to the mentor or to verify through references.

## Next Week Focus

State no more than three priorities.
```

- [ ] **Step 6: Verify templates**

Run:

```powershell
Test-Path 'concepts\template.md'
Test-Path 'debug-records\template.md'
Test-Path 'mentor-notes\template.md'
Test-Path 'weekly-reviews\template.md'
```

Expected: four `True` lines.

- [ ] **Step 7: Commit templates**

Run:

```powershell
git add -- '学习/电源/concepts/template.md' '学习/电源/debug-records/template.md' '学习/电源/mentor-notes/template.md' '学习/电源/weekly-reviews/template.md'
git commit -m "docs: add UPS training record templates"
```

Expected: commit succeeds.

## Task 3: Create Roadmap Documents

**Files:**
- Create: `roadmap/30-day-plan.md`
- Create: `roadmap/lesson-priority-map.md`
- Modify: `MISSION.md`

- [ ] **Step 1: Create roadmap directory**

Run:

```powershell
New-Item -ItemType Directory -Force -Path 'roadmap' | Out-Null
```

Expected: command exits 0.

- [ ] **Step 2: Create 30-day plan**

Create `roadmap/30-day-plan.md`:

```markdown
# UPS 30-Day Training Plan

## Training Rule

Every day must produce at least one of these:

- A concept explanation written in the seven-part concept format.
- A Python or Simulink simulation artifact.
- A debug record explaining a failed or surprising result.
- A mentor question prepared from a concrete artifact.

## Week 1: Foundation and Boost

Goal: rebuild the minimum electrical and control foundation needed for UPS control work.

Topics:

- KCL, KVL, capacitor current, inductor voltage.
- Buck and Boost switching states.
- CCM, DCM, duty cycle, ripple.
- PWM, sampling, discrete PI.

Artifacts:

- `concepts/power-electronics/boost-converter.md`
- `simulations/python/boost_open_loop.py`
- `projects/01-boost-basics/README.md`

## Week 2: Control Core

Goal: connect motor-control experience to UPS control.

Topics:

- Single-phase PFC.
- PLL and grid synchronization.
- Single-phase inverter and LC filter.
- PI, PR, feedforward, sampling delay.

Artifacts:

- PFC concept documents.
- PLL simulation.
- Single-phase inverter project outline.

## Week 3: UPS System

Goal: understand energy flow, state transitions, protection, battery path, and bypass.

Topics:

- Online UPS double conversion.
- DC bus coordination.
- Battery and bidirectional DC-DC.
- Bypass and fault state machine.

Artifacts:

- UPS state machine Python script.
- Fault handling debug records.

## Week 4: Embedded Engineering

Goal: connect algorithms to firmware architecture.

Topics:

- Control ISR.
- ADC/PWM synchronization.
- RTOS task split.
- Parameter storage.
- Communication and logs.

Artifacts:

- Firmware control skeleton.
- Mentor-confirmed module reading plan.
```

- [ ] **Step 3: Create module priority map**

Create `roadmap/lesson-priority-map.md`:

```markdown
# New Module Priority Map

The old HTML lesson numbers are not the learning path. This map defines the new modules.

| Priority | Module | Concepts | Simulation | Project | Mentor Question |
|---|---|---|---|---|---|
| 1 | Boost Basics | inductor energy, duty cycle, CCM/DCM | Python open-loop Boost | `projects/01-boost-basics` | In real UPS products, which DC-DC or PFC stages behave most like this simplified Boost model? |
| 2 | PWM and Sampling | carrier, update event, ADC trigger, delay | Python timing sketch | later | How are PWM update and ADC sampling aligned on the company platform? |
| 3 | Discrete PI | integrator, saturation, anti-windup | Python PI test | later | Which PI form is common in company code: positional or incremental? |
| 4 | Single-Phase PFC | current reference, voltage loop, feedforward | Simulink average PFC | later | What PFC control structure does the company mainly use? |
| 5 | PLL | phase error, bandwidth, dq sync | Python or Simulink PLL | later | What PLL variant is used for bypass or grid sync? |
| 6 | Inverter | LC filter, PR control, RMS voltage | Simulink inverter model | later | Which output voltage control strategy is common in company UPS firmware? |
```

- [ ] **Step 4: Replace mission**

Replace `MISSION.md` with:

```markdown
# Mission: UPS Control-Oriented Onboarding Training

## Learner Profile

- Electrical engineering background.
- Has learned the relevant professional courses before, but many fundamentals are rusty.
- Has motor-control experience and wants to transfer it into UPS power-control work.
- Likely to work on control-related UPS software, while still needing enough hardware, embedded, protection, and system knowledge to collaborate effectively.

## One-Month Goal

Build enough foundation in the first month after onboarding to read UPS control code, understand control diagrams, run simulations, ask precise mentor questions, and contribute to non-critical engineering tasks.

## Training Principles

1. Every concept must be explained through definition, purpose, physical intuition, math, simulation, firmware landing, and common misunderstandings.
2. Theory must be paired with Python or Simulink simulation.
3. Old generated lessons are archived material, not the main learning path.
4. Mentor questions must be prepared from concrete artifacts.
5. Company confidential information must not be copied into this learning repository.

## Success Criteria

- Explain Boost/PFC/PLL/inverter control from physical intuition to firmware implementation.
- Build and interpret basic Python or Simulink models.
- Distinguish control loop problems, sampling problems, protection problems, and state-machine problems.
- Prepare precise mentor questions backed by simulation or code evidence.
```

- [ ] **Step 5: Verify roadmap files**

Run:

```powershell
Test-Path 'roadmap\30-day-plan.md'
Test-Path 'roadmap\lesson-priority-map.md'
Select-String -Path 'MISSION.md' -Pattern 'UPS Control-Oriented Onboarding Training'
```

Expected: two `True` lines and one match in `MISSION.md`.

- [ ] **Step 6: Commit roadmap**

Run:

```powershell
git add -- '学习/电源/roadmap' '学习/电源/MISSION.md'
git commit -m "docs: add UPS onboarding roadmap"
```

Expected: commit succeeds.

## Task 4: Create Boost Concept and Project

**Files:**
- Create: `concepts/power-electronics/boost-converter.md`
- Create: `projects/01-boost-basics/README.md`

- [ ] **Step 1: Create directories**

Run:

```powershell
New-Item -ItemType Directory -Force -Path 'concepts\power-electronics','projects\01-boost-basics' | Out-Null
```

Expected: command exits 0.

- [ ] **Step 2: Create Boost concept document**

Create `concepts/power-electronics/boost-converter.md`:

```markdown
# Concept: Boost Converter

## 1. What It Is

A Boost converter is a switching power circuit that raises a lower DC input voltage to a higher DC output voltage by repeatedly storing energy in an inductor and releasing it to the output.

## 2. Why UPS Needs It

UPS systems often need a stable high-voltage DC bus before the inverter can generate AC output. A Boost-type stage appears in single-phase PFC, some battery discharge paths, and many front-end power conversion stages because it can raise an input voltage and regulate the DC bus.

## 3. Physical Intuition

The inductor is the key. It resists sudden current change.

When the switch turns on, the input source applies voltage across the inductor. The inductor current rises, so magnetic energy increases:

```text
source -> inductor -> switch -> ground
```

During this interval, the diode is reverse-biased and the output capacitor supplies the load.

When the switch turns off, the inductor current cannot stop instantly. The inductor voltage flips polarity and adds to the input source, forcing current through the diode into the output:

```text
source + inductor -> diode -> output capacitor and load
```

The output can become higher than the input because the off-time output path receives energy from both the source and the inductor.

## 4. Mathematical Form

For an ideal Boost converter in continuous conduction mode:

```text
Vout = Vin / (1 - D)
```

Where:

- `Vin` is the input voltage in volts.
- `Vout` is the output voltage in volts.
- `D` is the duty cycle, from 0 to less than 1.

This comes from inductor volt-second balance:

```text
on-time:  VL = Vin
off-time: VL = Vin - Vout
average VL over one switching period = 0
Vin * D + (Vin - Vout) * (1 - D) = 0
```

Solving gives:

```text
Vout = Vin / (1 - D)
```

The formula assumes ideal parts, steady state, CCM, no diode drop, no switch loss, no ESR, and stable control.

## 5. Simulation Observation

Use `simulations/python/boost_open_loop.py`.

Observe:

- Higher duty cycle produces higher output voltage.
- Inductor current rises during switch on-time.
- Inductor current falls during switch off-time.
- Larger inductance reduces current ripple.
- Larger capacitance reduces output voltage ripple.

The first target is not a perfect commercial model. The target is to see the two switching states and the energy transfer.

## 6. Firmware Landing

In firmware, the Boost converter appears as:

- PWM duty command: controls switch on-time.
- ADC input voltage, output voltage, and inductor current samples.
- Control ISR: calculates the next duty cycle.
- Protection logic: overcurrent, overvoltage, undervoltage, and abnormal sampling.
- State machine: soft start, normal run, fault, recovery.

In PFC, the Boost stage is not controlled only to make `Vout` stable. It must also shape input current to follow the input voltage waveform.

## 7. Common Misunderstandings

- Wrong: A Boost converter creates extra energy.
  Correct: It trades current for voltage. Higher output voltage means input current must be higher than output current, ignoring losses.

- Wrong: Duty cycle can approach 1 to get any voltage.
  Correct: Real switches, inductors, diode recovery, losses, current limits, and control stability limit duty cycle.

- Wrong: The output is higher because the capacitor magically charges higher.
  Correct: The inductor changes polarity during off-time and adds its voltage to the source.

- Wrong: The formula is always accurate.
  Correct: `Vout = Vin / (1 - D)` is an ideal CCM steady-state formula. DCM and real losses change the result.

## 8. Mentor Questions

- Which UPS modules in the company most closely resemble a Boost converter?
- Does the company use average models when teaching or debugging PFC, or mainly switching-level simulation?
- What current and voltage protections are considered mandatory for Boost-like stages?
```

- [ ] **Step 3: Create Boost project README**

Create `projects/01-boost-basics/README.md`:

```markdown
# Project 01: Boost Basics

## Goal

Understand how a Boost converter transfers energy and why duty cycle raises output voltage.

## Required Concept

- `concepts/power-electronics/boost-converter.md`

## Required Simulation

- `simulations/python/boost_open_loop.py`

## Tasks

1. Run the simulation with default parameters.
2. Record the final output voltage.
3. Change duty cycle from `0.40` to `0.60`.
4. Record how output voltage and inductor ripple change.
5. Change inductance from `1e-3` to `0.5e-3`.
6. Record how inductor current ripple changes.

## Acceptance Criteria

- Explain both switch states without looking at notes.
- Derive `Vout = Vin / (1 - D)` from volt-second balance.
- Point to the waveform region where inductor current rises.
- Point to the waveform region where inductor current falls.
- Explain why real duty cycle cannot be pushed close to 1.

## Review Question

If `Vin = 100 V` and `D = 0.5`, the ideal formula gives `Vout = 200 V`. What real-world effects make the actual output lower?
```

- [ ] **Step 4: Verify Boost documents**

Run:

```powershell
Test-Path 'concepts\power-electronics\boost-converter.md'
Test-Path 'projects\01-boost-basics\README.md'
Select-String -Path 'concepts\power-electronics\boost-converter.md' -Pattern 'Vout = Vin / \(1 - D\)'
```

Expected: two `True` lines and one formula match.

- [ ] **Step 5: Commit Boost docs**

Run:

```powershell
git add -- '学习/电源/concepts/power-electronics/boost-converter.md' '学习/电源/projects/01-boost-basics/README.md'
git commit -m "docs: add Boost converter training module"
```

Expected: commit succeeds.

## Task 5: Create Boost Python Simulation

**Files:**
- Create: `simulations/README.md`
- Create: `simulations/python/boost_open_loop.py`
- Create: `simulations/results/.gitkeep`

- [ ] **Step 1: Create simulation directories**

Run:

```powershell
New-Item -ItemType Directory -Force -Path 'simulations\python','simulations\results' | Out-Null
```

Expected: command exits 0.

- [ ] **Step 2: Create simulation README**

Create `simulations/README.md`:

```markdown
# Simulations

Simulations are used to make concepts visible.

Rules:

1. Each simulation must state what concept it demonstrates.
2. Each simulation must expose parameters that can be changed.
3. Each simulation must produce a plot or numeric result.
4. Each simulation result must be interpreted in a debug record or project note.

Python is used for algorithm and simplified circuit intuition.
Simulink is used for block-level and system-level control models.
```

- [ ] **Step 3: Create Boost simulation script**

Create `simulations/python/boost_open_loop.py`:

```python
import argparse
from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np


def simulate_boost(vin, duty, inductance, capacitance, resistance, fsw, t_end):
    dt = 1.0 / (fsw * 200.0)
    steps = int(t_end / dt)
    time = np.arange(steps) * dt

    i_l = np.zeros(steps)
    v_out = np.zeros(steps)
    switch_on = np.zeros(steps, dtype=bool)
    v_out[0] = vin

    period = 1.0 / fsw

    for k in range(1, steps):
        phase = time[k] % period
        on = phase < duty * period
        switch_on[k] = on

        if on:
            v_l = vin
            diode_current = 0.0
        else:
            v_l = vin - v_out[k - 1]
            diode_current = max(i_l[k - 1], 0.0)

        load_current = v_out[k - 1] / resistance
        di = (v_l / inductance) * dt
        dv = ((diode_current - load_current) / capacitance) * dt

        i_l[k] = max(i_l[k - 1] + di, 0.0)
        v_out[k] = max(v_out[k - 1] + dv, 0.0)

    return time, i_l, v_out, switch_on


def main():
    parser = argparse.ArgumentParser(description="Open-loop Boost converter switching simulation.")
    parser.add_argument("--vin", type=float, default=100.0)
    parser.add_argument("--duty", type=float, default=0.5)
    parser.add_argument("--inductance", type=float, default=1e-3)
    parser.add_argument("--capacitance", type=float, default=470e-6)
    parser.add_argument("--resistance", type=float, default=200.0)
    parser.add_argument("--fsw", type=float, default=20_000.0)
    parser.add_argument("--t-end", type=float, default=0.03)
    parser.add_argument("--output", type=Path, default=Path("simulations/results/boost_open_loop.png"))
    args = parser.parse_args()

    if not 0.0 < args.duty < 0.95:
        raise ValueError("Duty cycle must be between 0 and 0.95 for this simple simulation.")

    time, i_l, v_out, switch_on = simulate_boost(
        vin=args.vin,
        duty=args.duty,
        inductance=args.inductance,
        capacitance=args.capacitance,
        resistance=args.resistance,
        fsw=args.fsw,
        t_end=args.t_end,
    )

    ideal_vout = args.vin / (1.0 - args.duty)
    print(f"Final output voltage: {v_out[-1]:.2f} V")
    print(f"Ideal CCM output voltage: {ideal_vout:.2f} V")
    print(f"Final inductor current: {i_l[-1]:.2f} A")

    args.output.parent.mkdir(parents=True, exist_ok=True)

    fig, axes = plt.subplots(3, 1, figsize=(10, 8), sharex=True)
    axes[0].plot(time * 1e3, v_out)
    axes[0].axhline(ideal_vout, color="tab:red", linestyle="--", label="Ideal CCM Vout")
    axes[0].set_ylabel("Vout (V)")
    axes[0].legend()
    axes[0].grid(True)

    axes[1].plot(time * 1e3, i_l)
    axes[1].set_ylabel("Inductor current (A)")
    axes[1].grid(True)

    axes[2].plot(time * 1e3, switch_on.astype(int))
    axes[2].set_ylabel("Switch on")
    axes[2].set_xlabel("Time (ms)")
    axes[2].set_yticks([0, 1])
    axes[2].grid(True)

    fig.suptitle("Open-loop Boost converter simulation")
    fig.tight_layout()
    fig.savefig(args.output, dpi=160)
    print(f"Saved plot: {args.output}")


if __name__ == "__main__":
    main()
```

- [ ] **Step 4: Create result placeholder**

Run:

```powershell
New-Item -ItemType File -Force -Path 'simulations\results\.gitkeep' | Out-Null
```

Expected: command exits 0.

- [ ] **Step 5: Run simulation**

Run:

```powershell
python simulations\python\boost_open_loop.py --output simulations\results\boost_open_loop.png
```

Expected: command exits 0, prints final output voltage, ideal CCM output voltage, final inductor current, and saves `simulations/results/boost_open_loop.png`.

- [ ] **Step 6: Commit simulation**

Run:

```powershell
git add -- '学习/电源/simulations'
git commit -m "feat: add Boost open-loop simulation"
```

Expected: commit succeeds.

## Task 6: First Teaching Session Record

**Files:**
- Create: `weekly-reviews/week-01-day-01.md`

- [ ] **Step 1: Create first learning record**

Create `weekly-reviews/week-01-day-01.md`:

```markdown
# Week 01 Day 01: Boost Converter First Pass

## Concept

Boost converter.

## What I Learned

- The inductor stores energy during switch on-time.
- The inductor releases energy to the output during switch off-time.
- In CCM, ideal output voltage follows `Vout = Vin / (1 - D)`.

## Simulation Evidence

- Script: `simulations/python/boost_open_loop.py`
- Default run output image: `simulations/results/boost_open_loop.png`

## Questions To Answer

1. Why does inductor current rise during switch on-time?
2. Why can output voltage become higher than input voltage?
3. Why does the ideal formula fail when duty cycle is too high?

## Mentor Question

In real UPS products, where does a Boost-like stage appear most often: PFC front end, battery discharge path, or another module?
```

- [ ] **Step 2: Verify first learning record**

Run:

```powershell
Test-Path 'weekly-reviews\week-01-day-01.md'
Select-String -Path 'weekly-reviews\week-01-day-01.md' -Pattern 'Boost converter'
```

Expected: one `True` line and one match.

- [ ] **Step 3: Commit first learning record**

Run:

```powershell
git add -- '学习/电源/weekly-reviews/week-01-day-01.md'
git commit -m "docs: record first Boost learning session"
```

Expected: commit succeeds.

## Task 7: Final Verification

**Files:**
- Verify all files created by Tasks 1-6.

- [ ] **Step 1: Verify expected paths**

Run:

```powershell
$paths = @(
  'archive\old-lessons',
  'archive\old-learning-records',
  'archive\README.md',
  'roadmap\30-day-plan.md',
  'roadmap\lesson-priority-map.md',
  'concepts\template.md',
  'concepts\power-electronics\boost-converter.md',
  'simulations\README.md',
  'simulations\python\boost_open_loop.py',
  'simulations\results\.gitkeep',
  'projects\01-boost-basics\README.md',
  'debug-records\template.md',
  'mentor-notes\template.md',
  'weekly-reviews\template.md',
  'weekly-reviews\week-01-day-01.md'
)
$paths | ForEach-Object { "$_ => $(Test-Path $_)" }
```

Expected: every line ends with `True`.

- [ ] **Step 2: Run Boost simulation again**

Run:

```powershell
python simulations\python\boost_open_loop.py --duty 0.5 --output simulations\results\boost_open_loop.png
```

Expected: command exits 0 and saves the plot.

- [ ] **Step 3: Check git status for relevant files**

Run:

```powershell
git status --short -- '学习/电源'
```

Expected: no unstaged or uncommitted changes from the planned files except intentionally generated result images if they are not committed.

## Self-Review

Spec coverage:

- Old generated lessons are archived in Task 1.
- Concept explanation standard is implemented in Task 2 and Task 4.
- Roadmap and module map are implemented in Task 3.
- Simulation workflow and first Python simulation are implemented in Task 5.
- Mentor workflow is implemented in Task 2 and Task 3.
- First learning record is implemented in Task 6.

Placeholder scan:

- The plan intentionally uses `<name>`, `<topic>`, and `<n>` only inside reusable templates.
- No implementation task contains unfilled file content.

Type and command consistency:

- Paths use the new training-system structure from the approved spec.
- Python script path matches the project and concept references.
