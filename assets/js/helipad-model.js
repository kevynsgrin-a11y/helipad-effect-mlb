/*
 * Helipad Effect v2 Model
 *
 * This module implements a basic physics‑inspired scoring system to
 * evaluate how environmental conditions influence run environment
 * potential at Major League Baseball parks. It is designed to run
 * completely in the browser without external dependencies. The
 * functions herein should be treated as a starting point — later
 * versions can load empirically trained coefficients. For now,
 * the calculations use heuristic weightings inspired by the deep
 * research notes included with this project.
 */

// Convert a temperature in Fahrenheit to Celsius
function fahrenheitToCelsius(f) {
  return (f - 32) * (5 / 9);
}

// Compute the saturation vapor pressure (in hPa) using the Magnus formula
function computeSaturationVaporPressure(tempC) {
  // Constants for water vapor over liquid water
  const a = 6.112;
  const b = 17.62;
  const c = 243.12;
  return a * Math.exp((b * tempC) / (tempC + c));
}

// Compute the actual vapor pressure (in hPa) from temperature and relative humidity
function computeActualVaporPressure(tempC, humidity) {
  const es = computeSaturationVaporPressure(tempC);
  return (humidity / 100) * es;
}

// Compute air density in kg/m^3.  Pressure should be provided in hPa.
// Relative humidity in percent, temperature in Fahrenheit. Formula based on
// the ideal gas law for a moist mixture of air and water vapour.
function computeAirDensity(tempF, humidity, pressure) {
  const tempC = fahrenheitToCelsius(tempF);
  // convert pressure from hPa to Pa
  const P = pressure * 100;
  const ea = computeActualVaporPressure(tempC, humidity) * 100;
  const Rd = 287.05; // specific gas constant for dry air (J/kg·K)
  const Rv = 461.495; // specific gas constant for water vapour (J/kg·K)
  const T = tempC + 273.15;
  // partial pressures
  const pd = P - ea;
  const densityDry = pd / (Rd * T);
  const densityVapour = ea / (Rv * T);
  return densityDry + densityVapour;
}

// Calculate wind components relative to centre field orientation.
// windDirection is the meteorological direction (degrees from which wind is coming),
// parkOrientation is the azimuth of straightaway centre field relative to north.
// Returns an object with out‑component (toward/away from CF) and cross‑component (left/right).
function computeWindComponents(windSpeed, windDirection, parkOrientation) {
  // Convert angles to radians
  const windRad = ((windDirection - parkOrientation + 360) % 360) * (Math.PI / 180);
  const outComponent = windSpeed * Math.cos(windRad); // positive means blowing out to CF
  const crossComponent = windSpeed * Math.sin(windRad); // positive means blowing from LF toward RF
  return { outComponent, crossComponent };
}

// Compute a carry physics score between 0 and 1 based on air density and wind.
// Lower air density and strong tailwinds increase the score.
function calculateCarryPhysicsScore(params) {
  const { airDensity, windOut, windCross } = params;
  // Normalise density: typical MLB air density ranges from ~0.9 to 1.3 kg/m^3
  const densityNorm = Math.min(Math.max((1.3 - airDensity) / 0.4, 0), 1);
  // Tailwind effect: scale windOut mph to a value between 0 and 1
  const tailwindNorm = Math.min(Math.max((windOut + 20) / 40, 0), 1);
  // Crosswind adds uncertainty rather than carry
  const crossPenalty = Math.abs(windCross) / 30; // crosswinds reduce carry slightly
  const score = 0.7 * densityNorm + 0.4 * tailwindNorm - 0.2 * crossPenalty;
  return Math.min(Math.max(score, 0), 1);
}

// Compute a park sensitivity score based on baseline factors and wind sensitivities.
// park object should provide baselineFactor (mean HR factor) and windSensitivity.
function calculateParkSensitivityScore(park, components) {
  const { baselineFactor = 1.0, windSensitivity = 0.3 } = park;
  const { windOut } = components;
  // Baseline: scale baseline factor around 1 to a 0–1 range
  const baseNorm = Math.min(Math.max((baselineFactor - 0.8) / 0.8, 0), 1);
  // Wind: factor based on how much park amplifies tailwinds
  const windEffect = windSensitivity * windOut / 20;
  const score = 0.6 * baseNorm + 0.4 * Math.min(Math.max(windEffect, -0.5), 0.5) + 0.5;
  return Math.min(Math.max(score, 0), 1);
}

// Compute a simple pitcher stress score based on heat and humidity. This is a
// placeholder until pitch‑specific stats are integrated.
function calculatePitcherStressScore(tempF, humidity) {
  // Heat index style calculation: high heat and humidity raise stress
  const heatFactor = Math.min(Math.max((tempF - 60) / 40, 0), 1);
  const humidityFactor = humidity / 100;
  return Math.min(heatFactor * 0.7 + humidityFactor * 0.3, 1);
}

// Combine sub‑scores into a single Helipad Index on 0–100 scale.
function calculateHelipadIndex({ carry, park, stress, roofMultiplier = 1.0, confidence = 0.9 }) {
  // Weighted sum, weights inspired by research notes
  const raw = 0.35 * carry + 0.25 * park + 0.2 * stress + 0.1 * roofMultiplier + 0.1 * confidence;
  return Math.round(Math.min(Math.max(raw, 0), 1) * 100);
}

// Derive a letter grade from a 0–100 index
function gradeFromIndex(idx) {
  if (idx >= 90) return 'A+';
  if (idx >= 80) return 'A';
  if (idx >= 70) return 'B';
  if (idx >= 60) return 'C';
  if (idx >= 50) return 'D';
  return 'F';
}

// Expose API globally for simple usage in pages
window.HelipadModel = {
  fahrenheitToCelsius,
  computeAirDensity,
  computeWindComponents,
  calculateCarryPhysicsScore,
  calculateParkSensitivityScore,
  calculatePitcherStressScore,
  calculateHelipadIndex,
  gradeFromIndex,
};
