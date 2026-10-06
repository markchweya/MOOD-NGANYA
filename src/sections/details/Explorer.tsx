import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { explorerViews } from "@/content/details";
import { photos } from "@/content/photos";
import type { ViewId } from "@/content/types";
import { cn } from "@/lib/cn";
import { easeOut, spring } from "@/lib/motion";

/** Numbered hotspots over Mood's photos; picking one pops its story into the card. */
export function Explorer() {
  const [viewId, setViewId] = useState<ViewId>("head-on");
  const [selected, setSelected] = useState(0);

  const view = explorerViews.find((v) => v.id === viewId) ?? explorerViews[0];
  if (!view) return null;
  const photo = photos[view.photo];
  const detail = view.hotspots[selected] ?? view.hotspots[0];

  const changeView = (id: ViewId) => {
    setViewId(id);
    setSelected(0);
  };

  return (
    <div>
      <div role="tablist" aria-label="Choose a view" className="mb-8 flex gap-4">
        {explorerViews.map((v) => {
          const isActive = v.id === view.id;
          return (
            <button
              key={v.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`${v.label} view`}
              onClick={() => {
                changeView(v.id);
              }}
              className="group relative size-16 rounded-full p-1"
            >
              {isActive && (
                <motion.span
                  layoutId="view-ring"
                  transition={spring}
                  className="absolute inset-0 rounded-full border-[3px] border-smiley"
                />
              )}
              <img
                src={photos[v.photo].src}
                alt=""
                className={cn(
                  "size-full rounded-full object-cover transition-opacity duration-300",
                  isActive ? "opacity-100" : "opacity-50 group-hover:opacity-100",
                )}
              />
            </button>
          );
        })}
      </div>

      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div
          role="tabpanel"
          aria-label={`${view.label} view`}
          className="relative overflow-hidden rounded-3xl border-4 border-ink shadow-slab"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.img
              key={photo.id}
              src={photo.src}
              width={photo.width}
              height={photo.height}
              alt={photo.alt}
              loading="lazy"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: easeOut }}
              className="h-auto w-full"
            />
          </AnimatePresence>
          <motion.div
            key={view.id}
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.3 } } }}
            className="absolute inset-0"
          >
            {view.hotspots.map((spot, i) => {
              const isSelected = i === selected;
              return (
                <motion.button
                  key={spot.title}
                  type="button"
                  aria-label={`${i + 1}: ${spot.title}`}
                  aria-pressed={isSelected}
                  onClick={() => {
                    setSelected(i);
                  }}
                  variants={{
                    hidden: { scale: 0, opacity: 0 },
                    show: { scale: 1, opacity: 1, transition: { ...spring, damping: 14 } },
                  }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                  className={cn(
                    "absolute -mt-4 -ml-4 grid size-8 place-items-center rounded-full border-2 font-sans text-sm font-bold shadow-lg transition-colors",
                    isSelected
                      ? "z-10 border-atmos-white bg-tail-red text-atmos-white"
                      : "border-ink bg-smiley text-ink",
                  )}
                >
                  {!isSelected && (
                    <span
                      aria-hidden
                      className="absolute inset-0 animate-ping rounded-full border-2 border-smiley opacity-60"
                    />
                  )}
                  {i + 1}
                </motion.button>
              );
            })}
          </motion.div>
        </div>

        <div className="grid gap-5 lg:sticky lg:top-28">
          <div
            aria-live="polite"
            className="relative min-h-40 overflow-hidden rounded-3xl border-2 border-mood-purple bg-surface p-6"
          >
            <AnimatePresence mode="wait" initial={false}>
              {detail && (
                <motion.div
                  key={`${view.id}-${String(selected)}`}
                  initial={{ opacity: 0, y: 16, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: easeOut }}
                  className="flex gap-4"
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-full border-2 border-ink bg-tail-red font-display text-lg text-atmos-white">
                    {selected + 1}
                  </span>
                  <div>
                    <h3 className="mb-2 text-xl">{detail.title}</h3>
                    <p className="text-fg-muted">{detail.text}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <ol className="grid gap-2 sm:grid-cols-2">
            {view.hotspots.map((spot, i) => (
              <li key={spot.title}>
                <button
                  type="button"
                  aria-pressed={i === selected}
                  onClick={() => {
                    setSelected(i);
                  }}
                  className="relative flex w-full items-center gap-3 rounded-2xl border border-line px-3 py-2.5 text-left transition-colors hover:border-accent"
                >
                  {i === selected && (
                    <motion.span
                      layoutId="detail-row"
                      transition={spring}
                      className="absolute inset-0 rounded-2xl bg-mood-purple/20 ring-1 ring-mood-purple"
                    />
                  )}
                  <span className="relative grid size-6 shrink-0 place-items-center rounded-full bg-smiley text-xs font-bold text-ink">
                    {i + 1}
                  </span>
                  <span className="relative">{spot.title}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
