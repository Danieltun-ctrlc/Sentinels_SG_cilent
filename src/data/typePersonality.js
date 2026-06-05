/**
 * Personality archetypes for defender types.
 * Attacker types keep their mechanical labels (Phantom/Illusion/Toxic/Coercion).
 * Underlying type IDs are UNCHANGED — only display labels change.
 */

export const TYPE_PERSONALITIES = {
  logic: {
    displayName: 'THE ANALYST',
    subtitle: 'Critical Thinking',
    personality: 'Methodical · Skeptical · Evidence-driven',
    tagline: 'Asks the questions scammers don\'t want asked.',
    color: '#00D9FF',
  },
  forensic: {
    displayName: 'THE INVESTIGATOR',
    subtitle: 'Verification & Tracking',
    personality: 'Detail-oriented · Patient · Truth-seeking',
    tagline: 'Traces every link, inspects every sender.',
    color: '#10F981',
  },
  armor: {
    displayName: 'THE GUARDIAN',
    subtitle: 'Self-Protection',
    personality: 'Disciplined · Self-reliant · Vigilant',
    tagline: 'Trusts nothing by default. Verifies everything.',
    color: '#C0C8D6',
  },
  network: {
    displayName: 'THE SENTINEL',
    subtitle: 'Community Defense',
    personality: 'Collaborative · Alert · Protective of others',
    tagline: 'Strength through connection. One report protects thousands.',
    color: '#3B82F6',
  },
};

// Attacker types keep their original labels
export const ATTACKER_TYPE_LABELS = {
  phantom: 'PHANTOM',
  illusion: 'ILLUSION',
  toxic: 'TOXIC',
  coercion: 'COERCION',
};

/**
 * Get the display label for a type.
 * Defender types return personality archetype, attackers return their original name.
 */
export function getTypeDisplayName(typeId) {
  if (TYPE_PERSONALITIES[typeId]) return TYPE_PERSONALITIES[typeId].displayName;
  return (typeId || '').toUpperCase();
}

/**
 * Get the full display with subtitle for a type.
 * e.g., "The Analyst · Critical Thinking"
 */
export function getTypeFullLabel(typeId) {
  const p = TYPE_PERSONALITIES[typeId];
  if (p) return `${p.displayName} · ${p.subtitle}`;
  return (typeId || '').toUpperCase();
}

/**
 * Educational explanations for type matchups shown in the Dictionary.
 */
export const MATCHUP_EXPLANATIONS = {
  'forensic_vs_phantom': 'Verification defeats fake identities. Checking official sender registries and URLs catches the deception every time.',
  'network_vs_coercion': 'Community defense breaks isolation. Scammers need their victims alone — a strong network refuses to allow that.',
  'armor_vs_toxic': 'Hardened defenses block manipulation. Pre-secured accounts with 2FA and Money Lock close the doors scammers rely on.',
  'toxic_vs_logic': 'Emotional manipulation overwhelms logical thinking. Outrage and panic bypass rational analysis.',
  'coercion_vs_logic': 'Fear and threats shut down critical thinking. Panic overrides even the most methodical mind.',
  'phantom_vs_armor': 'Phishing bypasses technical defences by targeting the human, not the system. The victim unlocks the door voluntarily.',
  'logic_vs_phantom': 'Critical thinking exposes impersonation. Asking "how do I know this is really them?" reveals the fake.',
  'armor_vs_phantom': 'Technical defenses alone fail against social engineering — firewalls cannot block a convincing human lie.',
  'logic_vs_toxic': 'Logic alone struggles against emotional manipulation — trolls feed on rational engagement.',
  'logic_vs_coercion': 'Reasoning with a coercer is ineffective — they exploit fear, not facts.',
};
