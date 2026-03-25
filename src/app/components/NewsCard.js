import { useState } from "react";

export default function NewsCard({
  title,
  source,
  time,
  color,
  image,
  link,
  isSaved,
  onSave,
  isDealFlag,
  isBreaking,
  isSourceMuted = false,
  onToggleMute,
}) {
  const [copied, setCopied] = useState(false);

  async function handleShare(event) {
    event.preventDefault();
    event.stopPropagation();

    if (navigator.share) {
      try {
        await navigator.share({ title, url: link });
        return;
      } catch {}
    }

    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  return (
    <div className="card">
      <div className="card-body">
        <div className="card-meta">
          <span className="card-src" style={{ color }}>{source}</span>
          {time && <span className="card-time">· {time}</span>}
          {isBreaking && <span className="badge-brk">BREAKING</span>}
          {isDealFlag && <span className="badge-deal">DEAL</span>}
        </div>
        <a href={link} target="_blank" rel="noopener noreferrer">
          <div className="card-title">{title}</div>
        </a>
        <div className="card-actions">
          <button type="button" className={`save-btn ${isSaved ? "on" : ""}`} onClick={onSave}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
            </svg>
            {isSaved ? "SAVED" : "SAVE"}
          </button>
          {onToggleMute && (
            <button type="button" className={`mute-btn ${isSourceMuted ? "on" : ""}`} onClick={onToggleMute}>
              {isSourceMuted ? "UNMUTE" : "MUTE"}
            </button>
          )}
          <button type="button" className={`share-btn ${copied ? "on" : ""}`} onClick={handleShare}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
            </svg>
            {copied ? "COPIED" : "SHARE"}
          </button>
        </div>
      </div>
      {image && (
        <a href={link} target="_blank" rel="noopener noreferrer">
          {/* Remote feed images come from many hosts with unknown dimensions, so a raw img is intentional here. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="card-thumb" src={image} alt="" onError={(event) => { event.target.style.display = "none"; }} />
        </a>
      )}
    </div>
  );
}
