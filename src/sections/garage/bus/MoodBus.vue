<script setup lang="ts">
import type { Texture } from "three";
import { onBeforeUnmount, onMounted, shallowRef } from "vue";
import sideLeft from "@/assets/livery/side-left.webp";
import sideRight from "@/assets/livery/side-right.webp";
import { cutouts } from "@/content/cutouts";
import {
  BACK_WIDTH,
  BACK_Z,
  BUS,
  FACE_CENTRE_Y,
  FRONT_WIDTH,
  FRONT_Z,
  type Vec3,
} from "../busGeometry";
import { C } from "../colours";
import { loadPhoto } from "../textures";
import BusWheel from "./BusWheel.vue";
import LampGlows from "./LampGlows.vue";
import RoofBeacons from "./RoofBeacons.vue";

/**
 * MOOD in 3D. The front and back are the real photo cutouts; the sides are
 * MOOD's real paintwork unwarped from photos, clear-coated so they catch the
 * garage lights, on a modelled body with alloy wheels and the roof crown.
 * Emits `ready` once every texture is on the GPU.
 */
const { power } = defineProps<{
  /** Lamps and beacons, 0 (off) to 1 (full). */
  power: number;
}>();
const emit = defineEmits<{ ready: [] }>();

const front = shallowRef<Texture | null>(null);
const back = shallowRef<Texture | null>(null);
const liveryRight = shallowRef<Texture | null>(null);
const liveryLeft = shallowRef<Texture | null>(null);

onMounted(async () => {
  [front.value, back.value, liveryRight.value, liveryLeft.value] = await Promise.all([
    loadPhoto(cutouts.frontCrisp.src),
    loadPhoto(cutouts.back.src),
    // Built from the real paintwork by scripts/build-side-livery.py. The
    // photographed side is the left (-x); the right (+x) is laid out nose-first.
    loadPhoto(sideRight),
    loadPhoto(sideLeft),
  ]);
  emit("ready");
});

onBeforeUnmount(() => {
  for (const texture of [front, back, liveryRight, liveryLeft]) texture.value?.dispose();
});

const panelHeight = BUS.roof - BUS.bodyBottom;
const panelY = BUS.bodyBottom + panelHeight / 2;
const bodyLength = BUS.length - 0.08;

const { frontAxle, rearAxle, radius, track } = BUS.wheel;
const wheels = [frontAxle, rearAxle].flatMap((z) =>
  ([1, -1] as const).map((side) => ({
    key: `${String(z)}-${String(side)}`,
    side,
    position: [side * track, radius, z] satisfies Vec3,
  })),
);
</script>

<template>
  <TresGroup>
    <!-- Body shell in clear-coated purple. -->
    <TresMesh :position="[0, panelY, 0]">
      <TresBoxGeometry :args="[BUS.width, panelHeight, bodyLength]" />
      <TresMeshPhysicalMaterial
        :color="C.moodPurple"
        :metalness="0.55"
        :roughness="0.32"
        :clearcoat="1"
        :clearcoat-roughness="0.06"
      />
    </TresMesh>

    <!-- Chassis and underbody, seen from low angles. -->
    <TresMesh :position="[0, BUS.bodyBottom / 2 + 0.12, -0.2]">
      <TresBoxGeometry :args="[BUS.width - 0.5, BUS.bodyBottom - 0.1, BUS.length - 1.2]" />
      <TresMeshStandardMaterial color="#0d0a10" :roughness="0.9" />
    </TresMesh>

    <!-- Side livery, clear-coated like the real paint. -->
    <template v-if="liveryRight && liveryLeft">
      <TresMesh :position="[BUS.width / 2 + 0.004, panelY, 0]" :rotation="[0, Math.PI / 2, 0]">
        <TresPlaneGeometry :args="[BUS.length, panelHeight]" />
        <TresMeshPhysicalMaterial
          :map="liveryRight"
          :metalness="0.25"
          :roughness="0.38"
          :clearcoat="1"
          :clearcoat-roughness="0.08"
        />
      </TresMesh>
      <TresMesh :position="[-(BUS.width / 2 + 0.004), panelY, 0]" :rotation="[0, -Math.PI / 2, 0]">
        <TresPlaneGeometry :args="[BUS.length, panelHeight]" />
        <TresMeshPhysicalMaterial
          :map="liveryLeft"
          :metalness="0.25"
          :roughness="0.38"
          :clearcoat="1"
          :clearcoat-roughness="0.08"
        />
      </TresMesh>
    </template>

    <!-- The real front and back, cut out of their photos. Lit gently and kept
         close to the photo's own colours with an emissive copy of the map. -->
    <TresMesh v-if="front" :position="[0, FACE_CENTRE_Y, FRONT_Z]">
      <TresPlaneGeometry :args="[FRONT_WIDTH, BUS.faceHeight]" />
      <TresMeshStandardMaterial
        :map="front"
        :emissive-map="front"
        emissive="#ffffff"
        :emissive-intensity="0.3"
        :alpha-test="0.5"
        :roughness="0.45"
      />
    </TresMesh>
    <TresMesh v-if="back" :position="[0, FACE_CENTRE_Y, BACK_Z]" :rotation="[0, Math.PI, 0]">
      <TresPlaneGeometry :args="[BACK_WIDTH, BUS.faceHeight]" />
      <TresMeshStandardMaterial
        :map="back"
        :emissive-map="back"
        emissive="#ffffff"
        :emissive-intensity="0.3"
        :alpha-test="0.5"
        :roughness="0.45"
      />
    </TresMesh>

    <BusWheel
      v-for="wheel in wheels"
      :key="wheel.key"
      :position="wheel.position"
      :side="wheel.side"
    />
    <RoofBeacons :power="power" />
    <LampGlows :power="power" />
  </TresGroup>
</template>
