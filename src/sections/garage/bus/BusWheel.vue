<script setup lang="ts">
import { BUS, type Vec3 } from "../busGeometry";

/** A tyre with a black multi-spoke alloy, turned to roll along the bus's length. */
const { position, side } = defineProps<{
  position: Vec3;
  /** Which way the face of the rim looks: +1 for the right side, -1 for the left. */
  side: 1 | -1;
}>();

const { radius, width } = BUS.wheel;
/** Each bar runs through the hub, so five bars make ten spokes. */
const BARS = 5;
const barAngles = Array.from({ length: BARS }, (_, i) => (i / BARS) * Math.PI);
</script>

<template>
  <!-- Turned so the cylinder's axis (local y) runs along world +x. -->
  <TresGroup :position="position" :rotation="[0, 0, -Math.PI / 2]">
    <!-- Tyre -->
    <TresMesh cast-shadow>
      <TresCylinderGeometry :args="[radius, radius, width, 48, 1]" />
      <TresMeshStandardMaterial color="#121014" :roughness="0.92" :metalness="0" />
    </TresMesh>
    <!-- Sidewall lip -->
    <TresMesh :position="[0, (side * width) / 2, 0]" :rotation="[Math.PI / 2, 0, 0]">
      <TresTorusGeometry :args="[radius * 0.86, radius * 0.1, 12, 48]" />
      <TresMeshStandardMaterial color="#19161b" :roughness="0.85" />
    </TresMesh>
    <!-- Rim barrel -->
    <TresMesh :position="[0, (side * width) / 2 + side * 0.004, 0]">
      <TresCylinderGeometry :args="[radius * 0.66, radius * 0.66, 0.02, 40]" />
      <TresMeshPhysicalMaterial
        color="#0b0a0d"
        :metalness="0.9"
        :roughness="0.28"
        :clearcoat="1"
        :clearcoat-roughness="0.1"
      />
    </TresMesh>
    <!-- Spokes -->
    <TresGroup :position="[0, (side * width) / 2 + side * 0.016, 0]">
      <TresMesh v-for="angle in barAngles" :key="angle" :rotation="[0, angle, 0]">
        <TresBoxGeometry :args="[0.05, 0.02, radius * 1.18]" />
        <TresMeshPhysicalMaterial
          color="#1c1a20"
          :metalness="0.95"
          :roughness="0.22"
          :clearcoat="1"
        />
      </TresMesh>
      <!-- Hub cap -->
      <TresMesh>
        <TresCylinderGeometry :args="[radius * 0.16, radius * 0.18, 0.05, 24]" />
        <TresMeshPhysicalMaterial color="#c9c2d6" :metalness="1" :roughness="0.18" />
      </TresMesh>
    </TresGroup>
  </TresGroup>
</template>
