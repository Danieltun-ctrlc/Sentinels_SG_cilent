import { CREATURES } from './creatures';
import { TYPE_CHART } from './typeChart';
import { getTypeDisplayName } from './typePersonality';

/**
 * Generate defeat hints based on the enemy boss type.
 * Tells the player which creatures are super effective, which deal no damage, and strategy tips.
 */
export function getDefeatHints(enemyCreatureId) {
  const enemy = CREATURES[enemyCreatureId];
  if (!enemy) return null;

  const enemyType = enemy.type;
  const defenderTypes = ['logic', 'forensic', 'network', 'armor'];

  // Find which defender types are super effective (2x) against this enemy
  const superEffective = defenderTypes.filter(dt => (TYPE_CHART[dt]?.[enemyType] || 1) >= 2);
  // Find which defender types deal no damage (0x)
  const noEffect = defenderTypes.filter(dt => (TYPE_CHART[dt]?.[enemyType] || 1) === 0);
  // Find which defender types deal normal damage
  const normalEffect = defenderTypes.filter(dt => (TYPE_CHART[dt]?.[enemyType] || 1) === 1);

  // Find which creatures match the super effective types
  const recommendedCreatures = Object.values(CREATURES)
    .filter(c => c.role === 'defender' && superEffective.includes(c.type));

  // Find which creatures to avoid
  const avoidCreatures = Object.values(CREATURES)
    .filter(c => c.role === 'defender' && noEffect.includes(c.type));

  // Strategy tips per enemy type
  const strategyTips = {
    phantom: [
      'Phantom-type scammers use impersonation and fake identities.',
      'Use The Investigator (Forensic) moves to verify and expose them!',
      'Avoid The Guardian (Armor) — technical defenses cannot stop social engineering.',
    ],
    illusion: [
      'Illusion-type enemies use deepfakes and voice cloning.',
      'The Investigator (Forensic) sees through all illusions with metadata inspection.',
      'Verify everything through official channels, not through what you see or hear.',
    ],
    toxic: [
      'Toxic-type enemies exploit emotions and install malware.',
      'Use The Guardian (Armor) — 2FA, Money Lock, and updates block toxic attacks completely!',
      'Avoid The Analyst (Logic) — logic alone cannot counter emotional manipulation.',
    ],
    coercion: [
      'Coercion-type enemies use fear, threats, and pressure to isolate you.',
      'Use The Sentinel (Network) — community support and reporting breaks coercion!',
      'Avoid The Analyst (Logic) — critical thinking fails under extreme fear.',
    ],
  };

  return {
    enemyName: enemy.name,
    enemyType,
    superEffective: superEffective.map(t => ({
      type: t,
      displayName: getTypeDisplayName(t),
      creatures: Object.values(CREATURES).filter(c => c.role === 'defender' && c.type === t).map(c => c.name),
    })),
    noEffect: noEffect.map(t => ({
      type: t,
      displayName: getTypeDisplayName(t),
      creatures: Object.values(CREATURES).filter(c => c.role === 'defender' && c.type === t).map(c => c.name),
    })),
    recommendedCreatures: recommendedCreatures.map(c => c.name),
    avoidCreatures: avoidCreatures.map(c => c.name),
    tips: strategyTips[enemyType] || ['Study the type chart to find this enemy\'s weakness!'],
  };
}
