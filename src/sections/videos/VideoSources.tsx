import type { Video } from "@/content/types";
import { publicUrl } from "@/lib/publicUrl";

/** H.264 first for hardware decoding everywhere, VP9 for builds without it. */
export function VideoSources({ video }: { video: Video }) {
  return (
    <>
      <source src={publicUrl(`${video.src}.mp4`)} type="video/mp4" />
      <source src={publicUrl(`${video.src}.webm`)} type="video/webm" />
    </>
  );
}
