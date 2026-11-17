# Building QuantumLoop at Hack the Nest

## Open on the replay

- Van 1 charger arrival at 8:01 a.m. → 8:30 slot, 29-minute wait, $12.08 waiting cost. [Recorded run](https://github.com/Integer-Conversion-Error/hack-the-nest/blob/main/example-backend-final-result/20261115-071610-ev-fleet-dispatch-optimization-6252/test.json)

## The hackathon build

- Hack the Nest 2026, Eastern Michigan University. [Event](https://hackthenest.tech/)
- Team · Chenkai Mu, Ehan Hassan, Maegen Hill, and me. [Submission](https://devpost.com/software/quantumloop)
- Plain-English problem → runnable solver → verified replay in QuantumLoop
- My work · Gemini planning loop, adjustable inputs, verified dashboard reruns. [Planning loop](https://github.com/Integer-Conversion-Error/hack-the-nest/commit/f61ecf3) · [Dashboard integration](https://github.com/Integer-Conversion-Error/hack-the-nest/commit/b667bd4)
- One demo decision or debugging moment from the weekend

## The two-van walkthrough

- Original prompt · 4 vans, 8 deliveries, 2 chargers → walkthrough · 2 vans, 2 deliveries, 1 plug. [Prompt revision](https://github.com/Integer-Conversion-Error/hack-the-nest/commit/39b2da3)
- Classical routing and feasibility checks → simulated quantum selection of charging assignments
- Van 2 at 35% · Van 1 at 8:30, Van 2 direct, $15.78
- Van 2 at 20% · Van 2 at 8:30, Van 1 at 9:00, $58.37
- Both costs matched by exact classical enumeration. [Saved results](https://github.com/Integer-Conversion-Error/hack-the-nest/blob/main/example-backend-final-result/20261115-071610-ev-fleet-dispatch-optimization-6252/test.json)
- Map screenshot · charging stop and routes. [QuantumLoop replay](../public/images/hack-the-nest-fleet-map.webp)

## The more complicated examples we got working

- Larger successful runs from the weekend
- Sample prompts to match to runs
  - 4 vans, 2 chargers, 17 adjustable settings. [Prompt](https://github.com/Integer-Conversion-Error/hack-the-nest/blob/main/example-user-prompts/ev-fleet-dispatch-full-scenario.md)
  - 6 vans, 3 chargers, 6 adjustable settings. [Prompt](https://github.com/Integer-Conversion-Error/hack-the-nest/blob/main/example-user-prompts/ev-six-van-six-controls.md)
- One successful run · inputs, harder constraints, verified result, saved output or screenshot

## Close on the weekend

- One build or demo decision I’d revisit
- [Demo](https://devpost.com/software/quantumloop) · [Source code](https://github.com/Integer-Conversion-Error/hack-the-nest)
