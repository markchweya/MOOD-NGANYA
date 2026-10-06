import type { Video } from "./types";

/**
 * Clips live in public/video. Convert new ones with scripts/add-video.sh,
 * which prints the width and height to use here.
 */
export const videos: readonly Video[] = [
  {
    id: "pull-up",
    src: "video/pull-up",
    poster: "video/pull-up.webp",
    width: 720,
    height: 1086,
    caption: "Pull up, smiley mirrors, handshake",
    credit: "@mood_family33 with @lenny_mmoja_ & @matrix_family33",
  },
];
