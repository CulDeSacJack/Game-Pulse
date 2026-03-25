import { useEffect, useState } from "react";

function KeywordList({ keywords, emptyLabel, onRemove }) {
  if (!keywords.length) return <div className="settings-empty">{emptyLabel}</div>;

  return (
    <div className="settings-chips">
      {keywords.map((keyword) => (
        <span key={keyword} className="settings-chip">
          <span>{keyword}</span>
          <button type="button" className="settings-chip-remove" onClick={() => onRemove(keyword)} aria-label={`Remove ${keyword}`}>
            x
          </button>
        </span>
      ))}
    </div>
  );
}

function MutedList({ items, emptyLabel, onRemove, getLabel }) {
  if (!items.length) return <div className="settings-empty">{emptyLabel}</div>;

  return (
    <div className="settings-list">
      {items.map((item) => (
        <button key={item} type="button" className="settings-list-item" onClick={() => onRemove(item)}>
          <span>{getLabel(item)}</span>
          <span>Remove</span>
        </button>
      ))}
    </div>
  );
}

function FailureList({ items, emptyLabel }) {
  if (!items.length) return <div className="settings-empty">{emptyLabel}</div>;

  return (
    <div className="settings-list">
      {items.map((item) => (
        <div key={item.handle || item.name} className="settings-list-card">
          <div className="settings-list-heading">{item.name}</div>
          <div className="settings-list-copy">{item.reason}</div>
          <div className="settings-mini-badges">
            {item.attempts > 1 && <span className="settings-mini-badge">Retried once</span>}
            <span className={`settings-mini-badge ${item.retryable ? "info" : ""}`}>
              {item.retryable ? "Transient" : "Needs review"}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function SettingsDrawer({
  isOpen,
  onClose,
  gamingOnly,
  strictRelevance,
  dealsOnly,
  onToggleGamingOnly,
  onToggleStrictRelevance,
  onToggleDealsOnly,
  customIncludeKeywords,
  customExcludeKeywords,
  onAddIncludeKeyword,
  onRemoveIncludeKeyword,
  onAddExcludeKeyword,
  onRemoveExcludeKeyword,
  mutedSources,
  mutedAccounts,
  onRemoveMutedSource,
  onRemoveMutedAccount,
  socialLoaded,
  socialFailures,
  socialRecoveredCount,
  onRetrySocialFailures,
  hiddenStoriesCount,
  onResetHiddenStories,
  savedArticlesCount,
  onClearSavedArticles,
  onRestoreFilterDefaults,
}) {
  const [includeInput, setIncludeInput] = useState("");
  const [excludeInput, setExcludeInput] = useState("");

  useEffect(() => {
    if (!isOpen) return undefined;

    const originalOverflow = document.body.style.overflow;
    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  function submitIncludeKeyword() {
    if (!includeInput.trim()) return;
    onAddIncludeKeyword(includeInput);
    setIncludeInput("");
  }

  function submitExcludeKeyword() {
    if (!excludeInput.trim()) return;
    onAddExcludeKeyword(excludeInput);
    setExcludeInput("");
  }

  return (
    <div className="settings-backdrop" onClick={onClose}>
      <aside className="settings-drawer" onClick={(event) => event.stopPropagation()}>
        <div className="settings-header">
          <div>
            <div className="settings-title">Settings</div>
            <div className="settings-subtitle">Tune filtering and manage what the feed hides.</div>
          </div>
          <button type="button" className="settings-close" onClick={onClose} aria-label="Close settings">
            x
          </button>
        </div>

        <div className="settings-body">
          <section className="settings-section">
            <div className="settings-section-title">Filters</div>
            <button type="button" className={`settings-toggle ${gamingOnly ? "on" : ""}`} onClick={onToggleGamingOnly}>
              <div>
                <div className="settings-toggle-label">Gaming Only</div>
                <div className="settings-toggle-copy">Hide obvious non-game posts from mixed feeds.</div>
              </div>
              <span>{gamingOnly ? "On" : "Off"}</span>
            </button>
            <button type="button" className={`settings-toggle ${strictRelevance ? "on" : ""}`} onClick={onToggleStrictRelevance}>
              <div>
                <div className="settings-toggle-label">Strict Relevance</div>
                <div className="settings-toggle-copy">Require stronger gaming signals before a post stays visible.</div>
              </div>
              <span>{strictRelevance ? "On" : "Off"}</span>
            </button>
            <button type="button" className={`settings-toggle ${dealsOnly ? "on" : ""}`} onClick={onToggleDealsOnly}>
              <div>
                <div className="settings-toggle-label">Deals Only</div>
                <div className="settings-toggle-copy">Keep the news feed focused on promotions and discounts.</div>
              </div>
              <span>{dealsOnly ? "On" : "Off"}</span>
            </button>
          </section>

          <section className="settings-section">
            <div className="settings-section-title">Relevance Tuning</div>
            <div className="settings-copy">Add phrases the filter should always keep or always hide. Good for edge cases and favorite franchises.</div>

            <div className="settings-input-block">
              <label className="settings-label" htmlFor="include-keyword">Always keep phrase</label>
              <div className="settings-input-row">
                <input
                  id="include-keyword"
                  type="text"
                  value={includeInput}
                  placeholder='Example: "split fiction"'
                  onChange={(event) => setIncludeInput(event.target.value)}
                  onKeyDown={(event) => { if (event.key === "Enter") submitIncludeKeyword(); }}
                />
                <button type="button" onClick={submitIncludeKeyword}>Add</button>
              </div>
              <KeywordList keywords={customIncludeKeywords} emptyLabel="No always-keep phrases yet." onRemove={onRemoveIncludeKeyword} />
            </div>

            <div className="settings-input-block">
              <label className="settings-label" htmlFor="exclude-keyword">Always hide phrase</label>
              <div className="settings-input-row">
                <input
                  id="exclude-keyword"
                  type="text"
                  value={excludeInput}
                  placeholder='Example: "tv series"'
                  onChange={(event) => setExcludeInput(event.target.value)}
                  onKeyDown={(event) => { if (event.key === "Enter") submitExcludeKeyword(); }}
                />
                <button type="button" onClick={submitExcludeKeyword}>Add</button>
              </div>
              <KeywordList keywords={customExcludeKeywords} emptyLabel="No always-hide phrases yet." onRemove={onRemoveExcludeKeyword} />
            </div>
          </section>

          <section className="settings-section">
            <div className="settings-section-title">Muted Sources</div>
            <MutedList
              items={mutedSources}
              emptyLabel="No muted news sources."
              onRemove={onRemoveMutedSource}
              getLabel={(item) => item}
            />
          </section>

          <section className="settings-section">
            <div className="settings-section-title">Muted Accounts</div>
            <MutedList
              items={mutedAccounts}
              emptyLabel="No muted Bluesky accounts."
              onRemove={onRemoveMutedAccount}
              getLabel={(item) => `@${item}`}
            />
          </section>

          <section className="settings-section">
            <div className="settings-section-title">Bluesky Feed Health</div>
            {!socialLoaded ? (
              <div className="settings-empty">Open the Social tab or refresh once to inspect account health.</div>
            ) : (
              <>
                {socialRecoveredCount > 0 && (
                  <div className="settings-inline-note">
                    {socialRecoveredCount} account{socialRecoveredCount === 1 ? "" : "s"} recovered on automatic retry during the last refresh.
                  </div>
                )}
                <FailureList
                  items={socialFailures}
                  emptyLabel="All tracked Bluesky accounts loaded on the last refresh."
                />
                {socialFailures.length > 0 && (
                  <div className="settings-actions">
                    <button type="button" className="settings-action" onClick={onRetrySocialFailures}>
                      Retry Failed Accounts
                    </button>
                  </div>
                )}
              </>
            )}
          </section>

          <section className="settings-section">
            <div className="settings-section-title">Cleanup</div>
            <div className="settings-actions">
              <button type="button" className="settings-action" onClick={onRestoreFilterDefaults}>Restore Filter Defaults</button>
              <button type="button" className="settings-action" onClick={onResetHiddenStories} disabled={hiddenStoriesCount === 0}>
                Reset Hidden Stories ({hiddenStoriesCount})
              </button>
              <button type="button" className="settings-action danger" onClick={onClearSavedArticles} disabled={savedArticlesCount === 0}>
                Clear Saved ({savedArticlesCount})
              </button>
            </div>
          </section>
        </div>
      </aside>
    </div>
  );
}
