<script setup lang="ts">
import { useLoop } from "@tresjs/core";
import {
  BoxGeometry,
  Color,
  InstancedMesh,
  Matrix4,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  Mesh,
  SphereGeometry,
} from "three";
import { onBeforeUnmount } from "vue";
import { BUS } from "../busGeometry";
import { C } from "../colours";

/**
 * The crown: beacon domes lined end to end along both roof edges, alternating
 * red and purple, on a chrome rail. One instanced mesh for every dome.
 * `power` (0 to 1) fades them in when the garage lights come on.
 */
const { power } = defineProps<{ power: number }>();

const SPACING = 0.3;
const INSET = 0.12;
const from = -BUS.length / 2 + 0.25;
const perSide = Math.floor((BUS.length - 0.7) / SPACING) + 1;
const edgeX = BUS.width / 2 - INSET;

const dome = new SphereGeometry(0.062, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2);
/** Unlit and outside tone mapping, so the colour can run past 1 and bloom. */
const glass = new MeshBasicMaterial({ toneMapped: false });
const beacons = new InstancedMesh(dome, glass, perSide * 2);

const red = new Color(C.tailRed).multiplyScalar(3);
const purple = new Color(C.ledViolet).multiplyScalar(3);
const matrix = new Matrix4();
for (let i = 0; i < perSide; i++) {
  for (const [k, x] of [-edgeX, edgeX].entries()) {
    const index = i * 2 + k;
    matrix.setPosition(x, BUS.roof + 0.05, from + i * SPACING);
    beacons.setMatrixAt(index, matrix);
    beacons.setColorAt(index, i % 2 ? purple : red);
  }
}

const railGeometry = new BoxGeometry(0.06, 0.05, BUS.length - 0.4);
const chrome = new MeshPhysicalMaterial({ color: "#d9d4e3", metalness: 1, roughness: 0.15 });
const rails = [-edgeX, edgeX].map((x) => {
  const rail = new Mesh(railGeometry, chrome);
  rail.position.set(x, BUS.roof + 0.025, -0.1);
  return rail;
});

const { onBeforeRender } = useLoop();
onBeforeRender(({ elapsed }) => {
  // A slow shimmer on top of the power level, like a running light show.
  const shimmer = 0.85 + 0.15 * Math.sin(elapsed * 3);
  glass.color.setScalar(0.08 + power * shimmer);
});

onBeforeUnmount(() => {
  dome.dispose();
  glass.dispose();
  railGeometry.dispose();
  chrome.dispose();
  beacons.dispose();
});
</script>

<template>
  <primitive :object="beacons" />
  <primitive v-for="(rail, i) in rails" :key="i" :object="rail" />
</template>
