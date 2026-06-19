export function evaluateSafetyState(riskAnalysis) {
  const { crime, battery, rawBatteryLevel, temporal, deviation, immobility, movement } = riskAnalysis;

  // Weight contributions
  const crimeContribution = crime.score * 1.0;
  const batteryContribution = battery * 0.8;
  const temporalContribution = temporal * 0.5;
  const deviationContribution = deviation * 0.6;
  const immobilityContribution = (immobility || 0) * 1.0;

  const totalThreat = Math.min(
    100,
    Math.round(
      crimeContribution +
        batteryContribution +
        temporalContribution +
        deviationContribution +
        immobilityContribution,
    ),
  );

  let status = 'NORMAL';
  let actionRequired = false;
  const triggers = [];

  if (crime.score > 50) triggers.push('High crime-risk area proximity');
  if (battery > 50) triggers.push('Critically low battery (< 15%)');
  if (temporal > 0) triggers.push('Late-night travel hour');
  if (deviation > 0) triggers.push('Route navigation deviation');
  if (immobility > 0) {
    triggers.push(`Prolonged immobility (${Math.round(movement?.stationaryDurationSeconds)}s) inside crime zone`);
  }

  if (totalThreat >= 75) {
    status = 'CRITICAL';
    actionRequired = true;
  } else if (totalThreat >= 45) {
    status = 'WARNING';
    actionRequired = true;
  } else if (totalThreat >= 20) {
    status = 'ADVISORY';
    actionRequired = true;
  }

  let reason = 'All travel indicators appear normal.';
  if (triggers.length > 0) {
    reason = `Travel threats identified: ${triggers.join(', ')}.`;
  }

  // Phase 4: Autonomous Decisions Selection Rules
  const autoActions = [];

  if (totalThreat > 70) {
    autoActions.push('GENERATE_SAFE_ROUTE');
  }

  if (totalThreat > 85) {
    autoActions.push('NOTIFY_GUARDIAN');
  }

  const isLowBattery = rawBatteryLevel !== null && rawBatteryLevel !== undefined && rawBatteryLevel < 0.10;
  if (isLowBattery) {
    autoActions.push('SEND_BATTERY_WARNING');
  }

  const isStationaryCrime =
    movement.status === 'STATIONARY' &&
    crime.score > 0 &&
    movement.stationaryDurationSeconds >= 30;
  if (isStationaryCrime) {
    autoActions.push('TRIGGER_SAFETY_CHECK');
  }

  if (status === 'CRITICAL') {
    autoActions.push('START_EMERGENCY_PROTOCOL');
  }

  return {
    status,
    threatScore: totalThreat,
    reason,
    actionRequired,
    autoActions,
    riskAnalysis,
  };
}

