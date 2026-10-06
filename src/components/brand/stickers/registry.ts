import type { Component } from "vue";
import type { StickerId } from "@/content/types";
import Smiley from "../Smiley.vue";
import AtmosphereSticker from "./AtmosphereSticker.vue";
import FirstClassSticker from "./FirstClassSticker.vue";
import HazardSticker from "./HazardSticker.vue";
import NoRiskSticker from "./NoRiskSticker.vue";
import PlateSticker from "./PlateSticker.vue";
import SchoolSticker from "./SchoolSticker.vue";
import TryMeSticker from "./TryMeSticker.vue";
import WarningSticker from "./WarningSticker.vue";
import WindshieldSticker from "./WindshieldSticker.vue";

export interface StickerArt {
  component: Component;
  /** Props to render this variant, e.g. the rear plate. */
  props?: Record<string, unknown>;
  /** Width / height of the artwork. */
  aspect: number;
}

/** Every sticker on the nganya, keyed by id. */
export const stickerRegistry: Readonly<Record<StickerId, StickerArt>> = {
  windshield: { component: WindshieldSticker, aspect: 380 / 140 },
  "no-risk": { component: NoRiskSticker, aspect: 320 / 64 },
  "try-me": { component: TryMeSticker, aspect: 320 / 160 },
  "first-class": { component: FirstClassSticker, aspect: 1 },
  atmosphere: { component: AtmosphereSticker, aspect: 440 / 90 },
  school: { component: SchoolSticker, aspect: 180 / 120 },
  "plate-front": { component: PlateSticker, props: { side: "front" }, aspect: 280 / 80 },
  "plate-rear": { component: PlateSticker, props: { side: "rear" }, aspect: 280 / 80 },
  hazard: { component: HazardSticker, aspect: 120 / 108 },
  warning: { component: WarningSticker, aspect: 120 / 108 },
  "smiley-dead": { component: Smiley, props: { variant: "dead" }, aspect: 100 / 116 },
  "smiley-melting": { component: Smiley, props: { variant: "melting" }, aspect: 100 / 116 },
};
