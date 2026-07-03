---
date: 2026-06-11
section: 电机控制
category: 电机控制
source: motor
visibility: public
title: Remaining 30% Roadmap
tags:
  - motor-control
status: learning
summary: "This roadmap starts after the 70% reviewed release is stable. It must not weaken the correctness gate: experimental algorithms and high-voltage power topics sta"
---

# Remaining 30% Roadmap

This roadmap starts after the 70% reviewed release is stable. It must not weaken
the correctness gate: experimental algorithms and high-voltage power topics stay
outside the recommended path until they have source evidence, simulation,
bench/selftest records, hardware traces where applicable, and documented limits.

## Front-End Algorithm Track

| Direction | Integration Rule | Acceptance Standard | Stage |
|---|---|---|---|
| New sensorless observers | Add proof, offline simulation, and lxfoc `experimental` implementation before recommendation | Encoder comparison with angle error, valid speed range, and start success rate | R1 |
| Flux observer refinement | Extend existing flux/SMO/PLL material and lxfoc observer interfaces | Full-speed error curve and low-speed boundary are documented | R1 |
| HFI fusion | Combine HFI with flux/SMO/PLL by weighted handover | Low-speed HFI and medium/high-speed back-EMF observer switch without angle discontinuity | R2 |
| MPC | Compare finite-control-set and continuous-control-set current MPC offline first | Offline bench, low-power hardware trace, CPU-time budget, and voltage limit record | R2 |
| ADRC/LADRC | Keep as experimental until model, bandwidth, and saturation limits are explicit | Disturbance rejection report, output limit proof, and instability boundary notes | R2 |
| LQR/LQI/LQG | Use as teaching and comparison controllers | Step and disturbance comparison against PI on the same plant | R3 |

## Advanced Power Track

| Topic | Scope | Acceptance Standard | Stage |
|---|---|---|---|
| Three-level hardware engineering | NPC/T-type gate drive, dead-time, neutral sampling, thermal split, and failure modes | Complete bring-up checklist and fault-mode table | R1 |
| Three-level modulation extension | DPWM, overmodulation, and neutral-point balancing optimization | Results are comparable with PP-09 simulation outputs | R1 |
| Vienna rectifier engineering | PLL, current sampling, PFC loops, neutral balance, and protection | PF, THD, bus ripple, and fault records from a safe bench | R2 |
| LLC advanced design | Synchronous rectification, wide input range, burst mode, and magnetic loss | Reproducible design case with simulation and measured waveforms | R2 |
| Bidirectional DC/DC | CLLC, DAB, phase-shift control, and storage interface | Bidirectional power-flow report and soft-switching boundary | R3 |
| SiC/GaN | Gate drive, parasitics, dv/dt, EMI, protection, and PCB layout | Device-selection and layout-review checklist | R3 |

## Community And Maintenance

| Task | Acceptance Standard | Stage |
|---|---|---|
| Dataset catalog | Public traces are archived with calibration, manifest, report, and comparison files | R1 |
| Hardware adapters | Minimum sampling, serial/CAN, and safety requirements are documented per platform | R1 |
| Versioned protocols | `lxfoc_config` and trace schemas use semantic versions with migration notes | R1 |
| Issue labels | `good-first-proof`, `needs-simulation`, `needs-hardware-test`, and `experimental-algorithm` are documented | R2 |
| Release reports | Each release lists newly reviewed/verified modules, hardware platforms, and known wrong or incomplete content | R2 |
| Community review | Every community proof PR receives formula, simulation, and experiment checklist review | R3 |

## Promotion Rule

No R1/R2/R3 item may move from `experimental` or `reviewed` to `verified` unless:

1. The proof file passes schema and semantic checks.
2. The source references are explicit and traceable.
3. Simulation artifacts are reproducible.
4. lxfoc code, when present, has bench or selftest coverage.
5. Hardware-dependent claims include calibrated raw traces and generated reports.
6. The known-limitations section states the safe operating boundary.
