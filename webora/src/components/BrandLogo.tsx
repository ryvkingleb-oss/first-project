import Link from "next/link";
import { site } from "@/lib/site";

export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`brand-mark-svg ${className}`.trim()}
      viewBox="0 0 40 40"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="40" height="40" rx="10" fill="#1f4d3a" />
      <path
        d="M8 26c4.5-1.8 7.2-5.4 10.5-9.2C21.5 13.5 24.2 10 32 8"
        fill="none"
        stroke="#f3faf6"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M8 31c5.2-1.6 8.4-4.8 12-8.4C23.4 19 26.2 16.2 34 14.5"
        fill="none"
        stroke="#c45c26"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.95"
      />
      <circle cx="31.5" cy="8.2" r="2.2" fill="#c45c26" />
      <circle cx="20" cy="20.5" r="2" fill="#f3faf6" />
    </svg>
  );
}

export function BrandLogo({
  href = "/",
  size = "md",
  asLink = true,
  showSlogan = true,
  className = "",
}: {
  href?: string;
  size?: "sm" | "md" | "lg" | "hero";
  asLink?: boolean;
  showSlogan?: boolean;
  className?: string;
}) {
  const content = (
    <>
      <BrandMark />
      <span className="brand-lockup">
        <span className="brand-name">{site.name}</span>
        {showSlogan ? <span className="brand-slogan">{site.logoSlogan}</span> : null}
      </span>
    </>
  );

  const classes = `brand brand-${size} ${className}`.trim();

  if (!asLink) {
    return (
      <div className={classes} aria-label={`${site.name} — ${site.logoSlogan}`}>
        {content}
      </div>
    );
  }

  return (
    <Link className={classes} href={href} aria-label={`${site.name} — ${site.logoSlogan}`}>
      {content}
    </Link>
  );
}
