export default function TopStoryCard({ title, source, color, time, count, link, onDismiss }) {
  return (
    <div className="ts-card" style={{ position: "relative" }}>
      <button
        type="button"
        aria-label={`Dismiss ${title}`}
        onClick={(event) => { event.preventDefault(); event.stopPropagation(); onDismiss(); }}
        style={{ position: "absolute", top: "12px", right: "12px", background: "none", border: "none", color: "var(--text2)", cursor: "pointer", fontSize: "16px", padding: "4px", zIndex: 10 }}
      >
        X
      </button>

      <a href={link} target="_blank" rel="noopener noreferrer" style={{ display: "block", paddingRight: "20px" }}>
        <div className="ts-title">{title}</div>
        <div className="ts-meta">
          <span className="ts-src" style={{ color }}>{source}</span>
          {time && <span className="card-time">· {time}</span>}
          <span className="ts-count">+{count} sources</span>
        </div>
      </a>
    </div>
  );
}
