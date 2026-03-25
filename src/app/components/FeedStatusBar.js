export default function FeedStatusBar({ items = [], actions = [] }) {
  const visibleItems = items.filter(Boolean);
  const visibleActions = actions.filter(Boolean);

  if (!visibleItems.length && !visibleActions.length) return null;

  return (
    <div className="status-panel">
      {visibleItems.length > 0 && (
        <div className="status-chips">
          {visibleItems.map((item) => (
            <span
              key={item.label}
              className={`status-chip ${item.tone || ""}`.trim()}
              title={item.title || item.label}
            >
              {item.label}
            </span>
          ))}
        </div>
      )}
      {visibleActions.length > 0 && (
        <div className="status-actions">
          {visibleActions.map((action) => (
            <button
              key={action.label}
              type="button"
              className={`status-action ${action.tone || ""}`.trim()}
              onClick={action.onClick}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
