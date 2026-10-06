const SEEN_KEY = "mood-intro-seen";

/** Play the intro once per browser session, and never for reduced-motion visitors. */
export function shouldPlayIntro(): boolean {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    return sessionStorage.getItem(SEEN_KEY) === null;
  } catch {
    return false;
  }
}

export function markIntroSeen(): void {
  try {
    sessionStorage.setItem(SEEN_KEY, "1");
  } catch {
    /* non-essential */
  }
}
