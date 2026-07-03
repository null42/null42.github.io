---
date: 2026-06-11
section: 电机控制
category: 电机控制
source: motor
visibility: public
title: Hardware User Test Protocol
tags:
  - motor-control
status: learning
summary: The original project does not contain calibrated hardware traces. This is recorded in `hardware-evidence-status.json` as `pending_user_test`.
---

# Hardware User Test Protocol

The original project does not contain calibrated hardware traces. This is
recorded in `hardware-evidence-status.json` as `pending_user_test`.

This repository can ship a reviewed 70% release with hardware evidence deferred
to user testing. It must not claim to be a hardware-verified release until the
user captures, archives, reviews, and promotes a real dataset.

## Minimum Bench

| Item | Requirement |
|---|---|
| DC supply | Current-limited SELV supply, 12 V to 60 V |
| Inverter | Low-voltage three-phase bridge with working over-current protection |
| Motor | Small PMSM/BLDC with known pole pairs |
| Current measurement | Calibrated phase shunt/probe, gain and offset recorded |
| Voltage measurement | Calibrated DC-bus divider/probe, gain and offset recorded |
| Angle reference | Encoder preferred for current-loop and observer baseline tests |
| Capture path | lxfoc telemetry CSV, USB CDC/serial/CAN bridge, or oscilloscope CSV |

## Required ALG-03 Current Step Capture

1. Export the lxfoc config package from the motor-control knowledge tooling for
   `algorithm/ALG-03-PI-Current-Regulator`.
2. Build lxfoc from a known commit and record that commit in
   `experiment_manifest.json.artifacts.firmware_revision`.
3. Set current limits in both the supply and firmware before enabling PWM.
4. Run a q-axis current step, for example `iq_ref_A: 0 -> 1 A`, at low speed.
   Use locked-rotor testing only when the bench is mechanically safe.
5. Capture this minimum standard trace header:

   ```csv
   time_s,ia_A,ib_A,ic_A,id_A,iq_A,id_ref_A,iq_ref_A,ud_V,uq_V,duty_a,duty_b,duty_c,vbus_V,angle_elec_pu,speed_hz,fault_flags
   ```

6. Save the original unmodified capture under `raw/`.
7. Convert the capture with `scripts/convert-raw-trace.py`. Do not hand-edit the
   standard trace except to fix documented unit conversion errors.
8. Add the matching `simulation_trace.csv` generated from the same knowledge
   module and parameter set.
9. Generate and validate reports:

   ```powershell
   python scripts\generate-dataset-reports.py --dataset motor-control-knowledge-base\datasets\ALG03-current-step-hw-001
   python scripts\check-datasets.py
   ```

10. Promote only after the dataset passes and a reviewer has checked calibration:

   ```powershell
   python scripts\attach-verified-dataset-to-proof.py `
     --proof motor-control-knowledge-base\_proofs\algorithm\ALG-03-PI-Current-Regulator.module-proof.yaml `
     --dataset ALG03-current-step-hw-001 `
     --promote
   python scripts\check-verified-evidence.py
   python scripts\check-module-proofs.py
   ```

## Default Acceptance Thresholds

| Metric | Default threshold | Where configured |
|---|---:|---|
| Current-loop overshoot | `< 15%` | `experiment_manifest.json.thresholds.overshoot_pct_max` |
| Settling time | `< 5 ms` | `experiment_manifest.json.thresholds.settling_time_s_max` |
| Steady-state error | `< 3%` | `experiment_manifest.json.thresholds.steady_state_error_pct_max` |
| Bus sag limit | `vbus >= 0.9 * initial_vbus` | `experiment_manifest.json.thresholds.vbus_min_ratio` |
| Duty legality | all duty values in `[0, 1]` | fixed analyzer check |
| Fault flags | no active fault | fixed analyzer check |

Thresholds may be changed for a specific motor or bench only in
`experiment_manifest.json`. The generated report stores the actual limits used,
so reviewers can reproduce the pass/fail decision.

## Required Evidence Before `verified`

The dataset manifest must include:

- `dataset_status: verified`
- `source: hardware`
- `hardware.platform`
- `hardware.calibration.current_probe`
- `hardware.calibration.voltage_probe`
- `artifacts.raw_capture`
- `review.reviewer`
- `review.reviewed_at`

The referenced raw capture file must exist. Screenshots alone are not accepted
as verified evidence.
