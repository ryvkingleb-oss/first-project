import type { ReactNode } from "react";
import { site } from "@/lib/site";

type MessengerKey = keyof typeof site.messengers;

const icons: Record<MessengerKey, ReactNode> = {
  telegram: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M21.8 4.3c.3-.9-.5-1.6-1.3-1.3L2.9 9.3c-.9.3-.9 1.6.1 1.9l4.5 1.4 1.7 5.4c.2.8 1.2 1 1.7.4l2.5-2.6 4.7 3.5c.7.5 1.7.1 1.9-.7l2.8-14.3ZM8.5 12.7l9.3-5.7-7.2 6.9-.3 3.1-1.8-4.3Z"
      />
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2.1A9.9 9.9 0 0 0 3.4 16.7L2 22l5.5-1.4A9.9 9.9 0 1 0 12 2.1Zm0 18a8.1 8.1 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.1 8.1 0 1 1 12 20.1Zm4.5-5.9c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.1-.2 0-.4.1-.5l.7-.8c.1-.1.1-.3.1-.4 0-.1 0-.3-.1-.4l-.7-1.7c-.2-.4-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.3c.1.2 1.6 2.5 3.9 3.4 2.3.9 2.3.6 2.7.6.4 0 1.3-.5 1.5-1 .2-.5.2-.9.1-1Z"
      />
    </svg>
  ),
  max: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M4.2 5.2h3.1l2.6 6.4h.1L12.7 5.2h3.1v13.6h-2.7V10.4h-.1l-2.8 8.4H9.1L6.3 10.4h-.1v8.4H3.5V5.2h.7Zm13.4 0H20v13.6h-2.4V5.2Z"
      />
    </svg>
  ),
};

export function MessengerIcons({
  className = "",
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const items = Object.entries(site.messengers) as [
    MessengerKey,
    (typeof site.messengers)[MessengerKey],
  ][];

  return (
    <div className={`messenger-icons messenger-icons-${size} ${className}`.trim()}>
      {items.map(([key, item]) => (
        <a
          key={key}
          className={`messenger-icon is-${key}`}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.label}
          title={item.label}
        >
          {icons[key]}
        </a>
      ))}
    </div>
  );
}
