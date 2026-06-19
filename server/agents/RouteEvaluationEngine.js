import { CRIME_ZONES } from '../config/crimeZones.js';
import { getDistanceMeters } from './RiskAnalyzer.js';

function getRouteRiskPenalty(route) {
  return CRIME_ZONES.reduce((totalPenalty, zone) => {
    // route.geometry is an array of [latitude, longitude] points
    const closestDistance = route.geometry.reduce((closest, [latitude, longitude]) => {
      const distance = getDistanceMeters({ latitude, longitude }, zone);
      return Math.min(closest, distance);
    }, Number.POSITIVE_INFINITY);

    if (closestDistance > zone.radiusMeters) {
      return totalPenalty;
    }

    const proximityRatio = 1 - closestDistance / zone.radiusMeters;
    return totalPenalty + zone.weight * proximityRatio;
  }, 0);
}

function getNamedRoadRatio(route) {
  if (!route.steps || !route.steps.length) {
    return 0.5;
  }

  const namedSteps = route.steps.filter((step) => step.name?.trim()).length;
  return namedSteps / route.steps.length;
}

export function calculateRouteSafetyScore(route, shortestDistance, fastestDuration) {
  const riskPenalty = getRouteRiskPenalty(route);
  const distancePenalty = shortestDistance > 0 ? ((route.distance - shortestDistance) / shortestDistance) * 12 : 0;
  const durationPenalty = fastestDuration > 0 ? ((route.duration - fastestDuration) / fastestDuration) * 10 : 0;
  const namedRoadBonus = getNamedRoadRatio(route) * 8;
  const score = 100 - riskPenalty - distancePenalty - durationPenalty + namedRoadBonus;

  return Math.max(0, Math.min(100, Math.round(score)));
}

export function getRiskLabel(score) {
  if (score >= 85) return 'LOW';
  if (score >= 70) return 'MEDIUM';
  if (score >= 55) return 'HIGH';
  return 'CRITICAL';
}

export function evaluateRoutes(routes) {
  if (!routes || !routes.length) {
    return [];
  }

  const shortestDistance = Math.min(...routes.map((route) => route.distance));
  const fastestDuration = Math.min(...routes.map((route) => route.duration));

  return routes
    .map((route) => {
      const safetyScore = calculateRouteSafetyScore(route, shortestDistance, fastestDuration);
      return {
        ...route,
        safetyScore,
        riskLevel: getRiskLabel(safetyScore),
        isSafest: false,
      };
    })
    .sort((routeA, routeB) => routeB.safetyScore - routeA.safetyScore)
    .map((route, index) => ({
      ...route,
      rank: index + 1,
      isSafest: index === 0,
    }));
}
