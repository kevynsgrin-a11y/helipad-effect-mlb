/*
 * Simple client script to generate a demonstration daily barrel report.
 * This script loads park profiles and uses the HelipadModel functions
 * to compute environment scores for each park based on sample weather
 * conditions. The results are inserted into a table on the page.
 */

async function loadParks() {
  const response = await fetch('data/parks.json');
  return await response.json();
}

// Define sample environmental conditions for demonstration. In a real
// implementation these would come from live weather data and game
// schedules.
function getSampleConditions(parkId) {
  // You could customise conditions per park; here we provide basic
  // examples to illustrate computation.
  const baseTemp = 72;
  const baseHumidity = 55;
  const basePressure = 1015; // hPa
  const baseWindSpeed = 8; // mph
  const baseWindDirection = 270; // wind blowing from west to east
  return {
    temperature: baseTemp + (Math.random() * 8 - 4),
    humidity: baseHumidity + (Math.random() * 10 - 5),
    pressure: basePressure + (Math.random() * 6 - 3),
    windSpeed: baseWindSpeed + (Math.random() * 6 - 3),
    windDirection: baseWindDirection + (Math.random() * 60 - 30),
  };
}

function buildTableRow(park, conditions, scores) {
  const tr = document.createElement('tr');
  function td(text) {
    const cell = document.createElement('td');
    cell.textContent = text;
    return cell;
  }
  tr.appendChild(td(park.name));
  tr.appendChild(td(conditions.temperature.toFixed(1)));
  tr.appendChild(td(conditions.humidity.toFixed(0)));
  tr.appendChild(td(conditions.pressure.toFixed(0)));
  tr.appendChild(td(conditions.windSpeed.toFixed(1)));
  tr.appendChild(td(((conditions.windDirection % 360 + 360) % 360).toFixed(0)));
  tr.appendChild(td(scores.index));
  tr.appendChild(td(scores.grade));
  return tr;
}

async function generateReport() {
  const parks = await loadParks();
  const tbody = document.getElementById('report-table-body');
  if (!tbody) return;
  parks.forEach((park) => {
    const conditions = getSampleConditions(park.id);
    // Compute physics
    const airDensity = HelipadModel.computeAirDensity(
      conditions.temperature,
      conditions.humidity,
      conditions.pressure
    );
    const windComponents = HelipadModel.computeWindComponents(
      conditions.windSpeed,
      conditions.windDirection,
      park.orientation || 0
    );
    const carryScore = HelipadModel.calculateCarryPhysicsScore({
      airDensity: airDensity,
      windOut: windComponents.outComponent,
      windCross: windComponents.crossComponent,
    });
    const parkScore = HelipadModel.calculateParkSensitivityScore(park, {
      windOut: windComponents.outComponent,
    });
    const stressScore = HelipadModel.calculatePitcherStressScore(
      conditions.temperature,
      conditions.humidity
    );
    const index = HelipadModel.calculateHelipadIndex({
      carry: carryScore,
      park: parkScore,
      stress: stressScore,
      roofMultiplier: park.roof === 'open' ? 1.0 : 0.6,
      confidence: 0.9,
    });
    const grade = HelipadModel.gradeFromIndex(index);
    const scores = { index, grade };
    tbody.appendChild(buildTableRow(park, conditions, scores));
  });
}

document.addEventListener('DOMContentLoaded', generateReport);
