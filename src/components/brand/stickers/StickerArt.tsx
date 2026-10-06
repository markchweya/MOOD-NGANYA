import type { ComponentType } from "react";
import type { StickerId } from "@/content/types";
import { Smiley } from "../Smiley";
import { FirstClassSticker } from "./FirstClassSticker";
import { AtmosphereSticker, SchoolSticker } from "./LetteringStickers";
import { NoRiskSticker } from "./NoRiskSticker";
import { PlateSticker } from "./PlateSticker";
import { HazardSticker, WarningSticker } from "./SignStickers";
import { TryMeSticker } from "./TryMeSticker";
import type { StickerProps } from "./types";
import { WindshieldSticker } from "./WindshieldSticker";

/** Every sticker on the nganya, keyed by id, with its artwork's aspect ratio. */
export const stickerArt: Readonly<
  Record<StickerId, { Art: ComponentType<StickerProps>; aspect: number }>
> = {
  windshield: { Art: WindshieldSticker, aspect: 380 / 140 },
  "no-risk": { Art: NoRiskSticker, aspect: 320 / 64 },
  "try-me": { Art: TryMeSticker, aspect: 320 / 160 },
  "first-class": { Art: FirstClassSticker, aspect: 1 },
  atmosphere: { Art: AtmosphereSticker, aspect: 440 / 90 },
  school: { Art: SchoolSticker, aspect: 180 / 120 },
  "plate-front": { Art: (props) => <PlateSticker side="front" {...props} />, aspect: 280 / 80 },
  "plate-rear": { Art: (props) => <PlateSticker side="rear" {...props} />, aspect: 280 / 80 },
  hazard: { Art: HazardSticker, aspect: 120 / 108 },
  warning: { Art: WarningSticker, aspect: 120 / 108 },
  "smiley-dead": { Art: (props) => <Smiley variant="dead" {...props} />, aspect: 100 / 116 },
  "smiley-melting": { Art: (props) => <Smiley variant="melting" {...props} />, aspect: 100 / 116 },
};
