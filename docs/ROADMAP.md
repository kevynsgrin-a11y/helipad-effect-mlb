# Roadmap

This document outlines planned improvements for the Helipad Effect MLB
project. The current codebase is a proof‑of‑concept demonstrating how
environmental factors can be translated into a simple run environment
score. To deliver a production‑ready analytics platform, we intend to
develop the following capabilities.

## Short Term

1. **Weather Ingestion** – Integrate a service to pull real‑time weather
   forecasts and historical observations from authoritative sources such as
   NWS/NWS API or commercial providers. Replace the random sample
   generator in `app.js` with actual schedule‑driven conditions.

2. **Schedule and Team Context** – Ingest MLB game schedules and
   probable pitchers to pair environmental scores with matchups. Add
   pitcher and lineup context (e.g., strikeout rates, barrel rates).

3. **Extended Ballpark Profiles** – Expand `parks.json` to include all
   30 MLB parks with orientation, elevation, baseline factors and wind
   sensitivities derived from research.

4. **UI/UX Enhancements** – Improve the presentation layer with
   interactive charts, filters and accessibility improvements. Allow
   users to drill down into individual games and factors.

## Medium Term

5. **Statistical Model Training** – Construct the integrated dataset
   described in the model notes (Retrosheet + Statcast + weather) and
   train count models (e.g., negative binomial) with park‑specific
   random effects. Validate with out‑of‑sample testing using rolling
   seasons.

6. **Humidor Era Adjustments** – Introduce variables capturing changes in
   ball liveliness and humidor deployment post‑2022. Estimate
   interactions between weather, park and humidor status.

7. **Injury and Player Factors** – Incorporate player status updates
   (injuries, recent performance) and advanced metrics (barrel rate,
   fly‑ball rate, pitcher ERA estimators) into the stress component.

8. **Automation and Deployment** – Set up CI/CD pipelines to deploy
   updates automatically. Schedule daily report generation and
   publication with minimal manual intervention.

## Long Term

9. **Advanced Simulation** – Implement Monte Carlo or physics‑based
    ball‑flight simulations using detailed weather inputs to predict
    distributions of home runs and runs per game.

10. **User Accounts and Personalisation** – Allow users to create
    accounts, save favourite teams/parks and receive personalised
    notifications when conditions align with their interests.

11. **Integration with Additional Leagues** – Extend the model to minor
    leagues or other professional leagues where ballpark data is
    available.

12. **Open API** – Provide a documented API for developers to access
    environment scores programmatically, enabling integration into other
    analytics platforms and fantasy tools.

These steps will transform the current static demonstration into a
comprehensive, data‑driven resource for baseball fans and analysts.
