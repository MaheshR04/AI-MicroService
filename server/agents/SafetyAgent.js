import { memoryManager } from './MemoryManager.js';
import { analyzeAllRisks } from './RiskAnalyzer.js';
import { evaluateSafetyState } from './DecisionEngine.js';
import { executeSafetyAction } from './ActionExecutor.js';
import { getIo } from '../sockets/index.js';
import { getGuardianRoom, getUserRoom } from '../sockets/socketRooms.js';

class SafetyAgent {
  async onUserUpdate(userId, user, payload) {
    if (!userId || !user) return;

    // 1. Observe: Capture current telemetry and update memory state
    if (payload.location) {
      memoryManager.updateLocation(userId, payload.location);
    }
    if (payload.battery) {
      memoryManager.updateBattery(userId, payload.battery);
    }
    if (payload.activeRoute !== undefined) {
      memoryManager.updateRoute(userId, payload.activeRoute);
    }

    const memory = memoryManager.getMemory(userId);

    // Phase 4: Handle safety check timeout escalation
    if (memory.safetyCheckActive && memory.safetyCheckExpiresAt && new Date() > new Date(memory.safetyCheckExpiresAt)) {
      memory.safetyCheckActive = false;
      memory.stationaryDurationSeconds = 0; // reset stationary duration

      const riskAnalysis = analyzeAllRisks(memory);
      const autoEscalation = {
        status: 'CRITICAL',
        threatScore: 100,
        reason: 'User failed to respond to autonomous AI Safety Check',
        actionRequired: true,
        autoActions: ['START_EMERGENCY_PROTOCOL'],
        riskAnalysis,
      };

      await executeSafetyAction(userId, user, autoEscalation);

      memoryManager.addReasoningLog(userId, {
        observation: 'Safety check timed out without user confirmation.',
        thought: 'User is unresponsive. Safety metrics forced to maximum.',
        reasoning: 'Safety check timeout rules met. Escalating status to CRITICAL.',
        decision: 'Escalate to Emergency Protocol.',
        action: 'Trigger Twilio SMS Alerts & SOS Sockets.',
        result: 'Emergency protocol successfully activated.',
      });

      this.broadcastReasoning(userId, user);
      return;
    }

    const latestLoc = memory.locationHistory[memory.locationHistory.length - 1];
    
    const lat = latestLoc?.latitude?.toFixed(5) || 'N/A';
    const lng = latestLoc?.longitude?.toFixed(5) || 'N/A';
    const accuracy = latestLoc?.accuracy ? Math.round(latestLoc.accuracy) + 'm' : 'N/A';
    const battLevel = memory.battery?.level !== null && memory.battery?.level !== undefined
      ? Math.round(memory.battery.level * 100) + '%'
      : 'N/A';
    const routeStatus = memory.activeRoute ? 'Active destination route selected' : 'No route active';

    const observation = `User telemetry observed. Position: [${lat}, ${lng}] (accuracy: ${accuracy}), Battery: ${battLevel}, Route: ${routeStatus}.`;

    // 2. Analyze: Calculate hazard scores from raw variables
    const riskAnalysis = analyzeAllRisks(memory);
    
    const thought = `Component hazard check: Proximity crime score is ${riskAnalysis.crime.score} (nearest zone: ${riskAnalysis.crime.nearbyZones[0]?.label || 'None'}), Battery risk is ${riskAnalysis.battery}, Temporal risk is ${riskAnalysis.temporal}, Route deviation risk is ${riskAnalysis.deviation}. Movement profile is ${riskAnalysis.movement.status} at ${riskAnalysis.movement.speed.toFixed(2)} m/s, Immobility risk is ${riskAnalysis.immobility} pts.`;

    // 3. Reason & Decide: Run threat evaluation rules
    const evaluation = evaluateSafetyState(riskAnalysis);
    
    const reasoning = `Applying safety evaluation rules: Threat Score = Crime (${riskAnalysis.crime.score} * 1.0) + Battery (${riskAnalysis.battery} * 0.8) + Temporal (${riskAnalysis.temporal} * 0.5) + Deviation (${riskAnalysis.deviation} * 0.6) + Immobility (${riskAnalysis.immobility} * 1.0) = ${evaluation.threatScore}/100. Threat status classified as: ${evaluation.status}.`;
    
    let decision = `Safety state is ${evaluation.status}. Active triggers: [${evaluation.triggers.join(', ') || 'None'}]. Autonomous actions: [${evaluation.autoActions.join(', ') || 'None'}]. actionRequired flag set to: ${evaluation.actionRequired}.`;

    let action = 'No immediate action required';
    let result = 'HUD metrics updated. System remains normal.';

    // 4. Reflect & Adapt: Check history to throttle repeating alerts
    if (evaluation.actionRequired) {
      const lastAlert = memoryManager.getLastReflection(userId, evaluation.status);
      const THROTTLE_WINDOW_MS = 2 * 60 * 1000; // 2 minutes throttling

      if (lastAlert && (new Date() - new Date(lastAlert.timestamp) < THROTTLE_WINDOW_MS)) {
        action = `Throttle ${evaluation.status} safety alerts`;
        result = `Action throttled to prevent user alert fatigue. Last advisory sent ${Math.round((new Date() - new Date(lastAlert.timestamp)) / 1000)}s ago.`;
        
        // Save log & broadcast
        memoryManager.addReasoningLog(userId, {
          observation,
          thought,
          reasoning,
          decision,
          action,
          result,
        });
        this.broadcastReasoning(userId, user);
        return;
      }

      // 5. Act: Fire notifications or escalate to emergency workflows
      action = `Execute Safety Agent advisory actions for ${evaluation.status} status.`;
      await executeSafetyAction(userId, user, evaluation);
      result = `Alerts successfully executed. Websocket packages dispatched to user and guardian rooms.`;

      // Record reflection state
      memoryManager.addReflection(userId, evaluation.status, {
        threatScore: evaluation.threatScore,
        reason: evaluation.reason,
      });
    }

    memoryManager.addReasoningLog(userId, {
      observation,
      thought,
      reasoning,
      decision,
      action,
      result,
    });

    this.broadcastReasoning(userId, user);
  }

  broadcastReasoning(userId, user) {
    let io;
    try {
      io = getIo();
    } catch {
      return;
    }
    const userRoom = getUserRoom(userId);
    const guardianRoom = getGuardianRoom(userId);
    const reasoningLogs = memoryManager.getReasoningLogs(userId);

    const payload = {
      userId,
      name: user.name,
      reasoningLogs,
    };

    io.to(userRoom).emit('agent-reasoning', payload);
    io.to(guardianRoom).emit('agent-reasoning', payload);
  }

  onUserDisconnect(userId) {
    if (userId) {
      memoryManager.clearMemory(userId);
    }
  }
}

export const safetyAgent = new SafetyAgent();
