# Building QuantumLoop at Hack the Nest

## Open on the replay

- Van 1 reaches the charger at 8:01 a.m. Its slot starts at 8:30. Those 29 minutes of waiting cost $12.08 in the model. [Recorded run](https://github.com/Integer-Conversion-Error/hack-the-nest/blob/main/example-backend-final-result/20261115-071610-ev-fleet-dispatch-optimization-6252/test.json)

## The hackathon build

- Hack the Nest 2026 at Eastern Michigan University. I built QuantumLoop with Chenkai Mu, Ehan Hassan, and Maegen Hill. [Event](https://hackthenest.tech/) · [Team submission](https://devpost.com/software/quantumloop)
- Goal was to take an optimization problem in plain English, generate and check a runnable solver, and let people inspect the result in the QuantumLoop dashboard.
- My part was the Gemini planning loop and the dashboard integration. The plan specified constraints and adjustable inputs. The dashboard could rerun the solver and update the replay after the new schedule passed its checks. [Planning loop](https://github.com/Integer-Conversion-Error/hack-the-nest/commit/f61ecf3) · [Dashboard integration](https://github.com/Integer-Conversion-Error/hack-the-nest/commit/b667bd4)
- Add one moment from the weekend here, such as the decision that made the first demo click or a run we had to debug together.

## The two-van walkthrough

- The first dispatch prompt had four vans, eight deliveries, and two chargers. We made a smaller walkthrough with two vans, two deliveries, and one plug. It’s easy to follow both routes and see who gets the charger. [Prompt revision](https://github.com/Integer-Conversion-Error/hack-the-nest/commit/39b2da3)
- Classical code calculated the routes and removed infeasible options. A simulated quantum circuit picked among the feasible charging assignments.
- At 35% starting charge, Van 2 went straight to its delivery and Van 1 took the 8:30 slot. Total cost was $15.78. At 20%, Van 2 needed the first slot and Van 1 moved to 9:00. Total cost rose to $58.37. Both runs matched exact classical enumeration of the same options. [Saved results](https://github.com/Integer-Conversion-Error/hack-the-nest/blob/main/example-backend-final-result/20261115-071610-ev-fleet-dispatch-optimization-6252/test.json)
- Show the map here. Point out which van is at the charger and where to look for the extra wait in the replay. [QuantumLoop map screenshot](../public/images/hack-the-nest-fleet-map.webp)

## The more complicated examples we got working

- We got more complicated examples running during the hackathon too.
- Match the working runs to their prompts. The repo includes a four-van scenario with two chargers and 17 adjustable settings, and a six-van scenario with three chargers and six adjustable settings. [Four-van prompt](https://github.com/Integer-Conversion-Error/hack-the-nest/blob/main/example-user-prompts/ev-fleet-dispatch-full-scenario.md) · [Six-van prompt](https://github.com/Integer-Conversion-Error/hack-the-nest/blob/main/example-user-prompts/ev-six-van-six-controls.md)
- Add the inputs from one successful run, what made that problem harder, and the result we checked. Use the saved output or a replay screenshot if available.

## Close on the weekend

- Pick one thing I’d do differently next time. Tie it to a real build or demo decision from the weekend.
- Credit the team and link to the [demo](https://devpost.com/software/quantumloop) and [source code](https://github.com/Integer-Conversion-Error/hack-the-nest).
