/** URL for a file in public/, respecting the deploy base path (e.g. GitHub Pages). */
export function publicUrl(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
}
