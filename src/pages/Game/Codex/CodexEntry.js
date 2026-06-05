import { useParams, Link } from 'react-router-dom';
import { CREATURES } from '../../../data/creatures';
import { MOVES } from '../../../data/moves';
import { getTypeDisplayName } from '../../../data/typePersonality';
import './CodexEntry.css';

const TYPE_COLORS = {
  logic: '#00D9FF',
  forensic: '#10F981',
  network: '#3B82F6',
  armor: '#C0C8D6',
  phantom: '#FF2E63',
  illusion: '#9333EA',
  toxic: '#A3E635',
  coercion: '#F97316',
};

export default function CodexEntry() {
  const { entryId } = useParams();
  const creature = CREATURES[entryId];

  if (!creature) {
    return (
      <div className="codex-entry">
        <Link to="/game/codex" className="codex-entry__back">← CODEX</Link>
        <p style={{ color: 'var(--color-text-muted)', marginTop: '20px' }}>Creature not found.</p>
      </div>
    );
  }

  const color = TYPE_COLORS[creature.type] || '#00D9FF';
  const isDefender = creature.role === 'defender';

  return (
    <div className="codex-entry" style={{ '--creature-color': color }}>
      <Link to="/game/codex" className="codex-entry__back">← CODEX</Link>

      {/* Section 1: Hero Banner */}
      <div className="codex-entry__hero">
        <div className="codex-entry__hero-sprite">
          {creature.sprite && <img src={creature.sprite} alt={creature.name} />}
        </div>
        <div className="codex-entry__hero-info">
          <h1 className="codex-entry__name">{creature.name.toUpperCase()}</h1>
          {isDefender && creature.archetype && (
            <span className="codex-entry__archetype">{creature.archetype}</span>
          )}
          {isDefender && creature.archetypeSubtitle && (
            <span className="codex-entry__archetype-sub">{creature.archetypeSubtitle}</span>
          )}
          {!isDefender && (
            <span className="codex-entry__archetype codex-entry__archetype--attacker">{creature.type.toUpperCase()}</span>
          )}
          <p className="codex-entry__title">{creature.title}</p>
        </div>
      </div>

      {/* Section 2: Philosophy Quote */}
      {creature.philosophy && (
        <div className="codex-entry__section codex-entry__philosophy">
          <p className="codex-entry__quote">{creature.philosophy}</p>
        </div>
      )}

      {/* Section 3: Real World Equivalent */}
      {creature.realWorldEquivalent && (
        <div className="codex-entry__section">
          <h3 className="codex-entry__section-title">WHO THEY ARE IN REAL LIFE</h3>
          <p className="codex-entry__text">{creature.realWorldEquivalent}</p>
        </div>
      )}

      {/* Section 4: Personality Traits */}
      {creature.personalityTraits && creature.personalityTraits.length > 0 && (
        <div className="codex-entry__section">
          <h3 className="codex-entry__section-title">PERSONALITY TRAITS</h3>
          <ul className="codex-entry__traits">
            {creature.personalityTraits.map((trait, i) => (
              <li key={i} className="codex-entry__trait">{trait}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Section 5: Battle Quotes */}
      {(creature.battleQuote || creature.victoryQuote || creature.defeatQuote) && (
        <div className="codex-entry__section">
          <h3 className="codex-entry__section-title">VOICE IN BATTLE</h3>
          <div className="codex-entry__quotes">
            {creature.battleQuote && (
              <div className="codex-entry__quote-bubble">
                <span className="codex-entry__quote-label">OPENING</span>
                <p className="codex-entry__quote-text">{creature.battleQuote}</p>
              </div>
            )}
            {creature.victoryQuote && (
              <div className="codex-entry__quote-bubble codex-entry__quote-bubble--victory">
                <span className="codex-entry__quote-label">VICTORY</span>
                <p className="codex-entry__quote-text">{creature.victoryQuote}</p>
              </div>
            )}
            {creature.defeatQuote && (
              <div className="codex-entry__quote-bubble codex-entry__quote-bubble--defeat">
                <span className="codex-entry__quote-label">DEFEAT</span>
                <p className="codex-entry__quote-text">{creature.defeatQuote}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Section 6: Origin Story */}
      {creature.origin && (
        <div className="codex-entry__section codex-entry__section--dark">
          <h3 className="codex-entry__section-title">ORIGIN</h3>
          <p className="codex-entry__text codex-entry__text--lore">{creature.origin}</p>
        </div>
      )}

      {/* Section 7: What This Personality Defends */}
      {creature.whatThisPersonalityDefends && creature.whatThisPersonalityDefends.length > 0 && (
        <div className="codex-entry__section">
          <h3 className="codex-entry__section-title">DEFENDS SINGAPORE AGAINST</h3>
          <ul className="codex-entry__defends">
            {creature.whatThisPersonalityDefends.map((item, i) => (
              <li key={i} className="codex-entry__defend-item">⚠️ {item}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Section 8: Real-Life Lesson */}
      {creature.realLifeAdvice && (
        <div className="codex-entry__section codex-entry__lesson">
          <h3 className="codex-entry__section-title">🎓 WHAT YOU CAN DO IN REAL LIFE</h3>
          <p className="codex-entry__advice">{creature.realLifeAdvice}</p>
        </div>
      )}

      {/* Section 9: Signature Move */}
      {creature.signatureMove && (
        <div className="codex-entry__section">
          <h3 className="codex-entry__section-title">SIGNATURE MOVE</h3>
          <div className="codex-entry__sig-move">
            <span className="codex-entry__sig-name">
              {MOVES[creature.signatureMove]?.name || creature.signatureMove}
            </span>
            {creature.signatureMoveReason && (
              <p className="codex-entry__sig-reason">{creature.signatureMoveReason}</p>
            )}
          </div>
        </div>
      )}

      {/* Section 10: Stats & Move Pool */}
      <div className="codex-entry__section">
        <h3 className="codex-entry__section-title">BASE STATS</h3>
        <div className="codex-entry__stats">
          {Object.entries(creature.baseStats).map(([stat, value]) => (
            <div key={stat} className="codex-entry__stat-row">
              <span className="codex-entry__stat-label">{stat.toUpperCase()}</span>
              <div className="codex-entry__stat-bar">
                <div className="codex-entry__stat-fill" style={{ width: `${Math.min((value / 150) * 100, 100)}%` }}></div>
              </div>
              <span className="codex-entry__stat-val">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="codex-entry__section">
        <h3 className="codex-entry__section-title">MOVE POOL</h3>
        <div className="codex-entry__moves">
          {creature.movePool.core.map(moveId => {
            const move = MOVES[moveId];
            if (!move) return null;
            return (
              <div key={moveId} className="codex-entry__move-card">
                <span className="codex-entry__move-name">{move.name}</span>
                <span className="codex-entry__move-type" style={{ color: TYPE_COLORS[move.type] }}>
                  {getTypeDisplayName(move.type)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lore / Real World Mirror */}
      <div className="codex-entry__section codex-entry__section--dark">
        <h3 className="codex-entry__section-title">LORE</h3>
        <p className="codex-entry__text codex-entry__text--lore">{creature.lore}</p>
        {creature.realWorldMirror && (
          <p className="codex-entry__text" style={{ marginTop: '8px', opacity: 0.7 }}>{creature.realWorldMirror}</p>
        )}
      </div>
    </div>
  );
}
