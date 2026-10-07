<script setup lang="ts">
import { useLoop } from "@tresjs/core";
import { AdditiveBlending, Mesh, MeshBasicMaterial, PlaneGeometry } from "three";
import { onBeforeUnmount } from "vue";
import { FRONT_LAMPS, type Lamp } from "@/components/brand/busLamps";
import { BACK_WIDTH, FRONT_WIDTH, faceAnchor } from "../busGeometry";
import { glowTexture, lampColour } from "../textures";

/**
 * Light blooms over the real lamps in the front and back photos: added on top
 * and left out of tone mapping, so the bloom pass turns them into glowing
 * light. They pulse out of step, like the bus's light show. `power` is 0 to 1.
 */
const { power } = defineProps<{ power: number }>();

/** The back cutout's tail lights, LED strips and diffuser lamp, measured like FRONT_LAMPS. */
const BACK_LAMPS: readonly Lamp[] = [
  { x: 50, y: 14, w: 62, h: 3, colour: "var(--color-tail-red)", delay: 0 },
  { x: 13, y: 30, w: 3, h: 26, colour: "var(--color-tail-red)", delay: 0.2 },
  { x: 88, y: 30, w: 3, h: 26, colour: "var(--color-tail-red)", delay: 0.2 },
  { x: 28, y: 57, w: 30, h: 5, colour: "var(--color-tail-red)", delay: 0.4 },
  { x: 72, y: 57, w: 30, h: 5, colour: "var(--color-tail-red)", delay: 0.4 },
  { x: 25, y: 66, w: 32, h: 4, colour: "var(--color-tail-red)", delay: 0.6 },
  { x: 75, y: 66, w: 32, h: 4, colour: "var(--color-tail-red)", delay: 0.6 },
  { x: 50, y: 82, w: 18, h: 3, colour: "var(--color-tail-red)", delay: 0.8 },
];

/** Halos spill a little past the lamp itself. */
const HALO = 1.7;
const plane = new PlaneGeometry(1, 1);
const glows: { mesh: Mesh; material: MeshBasicMaterial; delay: number }[] = [];

function addLamps(face: "front" | "back", lamps: readonly Lamp[], faceWidth: number) {
  for (const lamp of lamps) {
    const material = new MeshBasicMaterial({
      map: glowTexture(),
      color: lampColour(lamp.colour),
      transparent: true,
      blending: AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
    });
    const mesh = new Mesh(plane, material);
    const { position } = faceAnchor(face, lamp.x, lamp.y);
    mesh.position.set(...position);
    mesh.scale.set((lamp.w / 100) * faceWidth * HALO, (lamp.h / 100) * faceWidth * HALO, 1);
    if (face === "back") mesh.rotation.y = Math.PI;
    mesh.renderOrder = 2;
    glows.push({ mesh, material, delay: lamp.delay });
  }
}
addLamps("front", FRONT_LAMPS, FRONT_WIDTH);
addLamps("back", BACK_LAMPS, BACK_WIDTH);

const { onBeforeRender } = useLoop();
onBeforeRender(({ elapsed }) => {
  for (const glow of glows) {
    const pulse = 0.6 + 0.4 * Math.sin(((elapsed - glow.delay) / 1.6) * Math.PI * 2);
    glow.material.opacity = power * pulse * 1.6;
  }
});

onBeforeUnmount(() => {
  plane.dispose();
  for (const glow of glows) glow.material.dispose();
});
</script>

<template>
  <primitive v-for="(glow, i) in glows" :key="i" :object="glow.mesh" />
</template>
