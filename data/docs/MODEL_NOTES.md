# Model Notes

This document provides context for the initial Helipad Effect model
implemented in this repository. It distills key insights from the deep
research project focused on how weather and ballpark conditions influence
run and long‑ball production in Major League Baseball.

## Data Foundations

The original research highlighted the importance of building an integrated
dataset combining multiple sources:

* **Retrosheet game logs** – to anchor each game with a unique
  identifier and outcome statistics.
* **Baseball Savant / Statcast event data** – to capture batted‑ball
  characteristics, launch angles, velocities and barrel classifications.
* **NOAA/NCEI weather observations** – to obtain hourly weather
  conditions (temperature, humidity, wind, pressure) at or near the
  ballpark.
* **Park profiles** – including orientation, altitude, baseline park
  factors, roof status and humidor usage.

Without such a dataset it is impossible to learn reliable per‑park
coefficients for weather sensitivity. This repository begins with a
simple heuristic model and sample data to demonstrate the architecture
needed to support future statistical training.

## Physics and Environmental Factors

The Helipad Index is designed to reflect how physical conditions affect
the travel of the baseball through the air. Key variables include:

* **Air Density** – derived from temperature, humidity and pressure.
  Lower density (hotter, drier, lower pressure air) reduces drag and
  enhances carry distance.
* **Wind Components** – the strength of the wind blowing out toward
  centre field (tailwind) versus across the field. Tailwinds increase
  carry while crosswinds add uncertainty.
* **Dew Point / Wet Bulb Temperature** – reflect the moisture content of
  the air. High moisture raises air density and can dampen carry but
  also stresses pitchers.
* **Park Orientation and Dimensions** – dictate how wind direction
  translates into on‑field effects and how base fence distances impact
  home‑run likelihood.
* **Roof Status and Humidor Era** – closed roofs isolate games from
  weather influences while humidors installed across MLB in 2022 dampen
  the extremes of ball liveliness.

## Heuristic Scoring

The current implementation does **not** use learned coefficients.
Instead we compute sub‑scores:

* **Carry Physics Score** – based on normalised air density,
  tailwind magnitude and crosswind penalty.
* **Park Sensitivity Score** – derived from a park’s baseline run
  factor (0.8 to 1.4) and its relative sensitivity to wind.
* **Pitcher Stress Score** – a simplistic estimate of how heat and
  humidity tax pitchers, increasing the likelihood of mistakes.

These values are combined with fixed weights to produce a 0–100
Helipad Index and a corresponding letter grade. The weights are
placeholders; future versions should be replaced with empirically
estimated values from the integrated dataset described above.

## Limitations and Future Work

This model is an illustrative demonstration. It does not account for:

* The interaction of weather with humidor‑era changes since 2022.
* Pitcher and lineup specific tendencies, such as barrel rates or
  ground ball versus fly ball profiles.
* Temporal validation. Real models must use rolling‑season training
  windows to avoid look‑ahead bias.
* Real‑time ingestion of schedule and weather forecasts.

The accompanying roadmap provides guidance on how to evolve this proof
of concept into a robust production system.
