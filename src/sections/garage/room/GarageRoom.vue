<script setup lang="ts">
import { MeshReflectionMaterial } from "@tresjs/cientos";
import { AdditiveBlending, Color, Object3D, SpotLight } from "three";
import { computed, onBeforeUnmount, watchEffect } from "vue";
import { C } from "../colours";
import { concrete, corrugated, neonSign } from "../surfaces";
import Turntable from "./Turntable.vue";

/**
 * The garage around the bus: a reflective concrete floor, ribbed metal walls,
 * a neon MOOD sign on the back wall, strip lights in the roof and two
 * spotlights on the turntable. `power` (0 to 1) is the main switch.
 */
const { power } = defineProps<{ power: number }>();

/** Interior size in metres; the door opening is in the front wall at z = ROOM.front. */
const ROOM = { halfWidth: 7.5, back: -9, front: 7, height: 5.6 } as const;
const OPENING = { width: 11.2, height: 4.9 } as const;
const roomDepth = ROOM.front - ROOM.back;
const roomCentreZ = (ROOM.front + ROOM.back) / 2;
const pillarWidth = ROOM.halfWidth + 1 - OPENING.width / 2;

const floorMap = concrete();
const ribs = corrugated();
const backWall = concrete();
backWall.repeat.set(3, 1.2);
const sign = neonSign();
onBeforeUnmount(() => {
  for (const texture of [floorMap, ribs, backWall, sign]) texture.dispose();
});

/** Unlit colours above 1 so the tubes and neon bloom; scaled by the switch. */
const tubeColour = computed(() => new Color("#f4f1ff").multiplyScalar(0.15 + 2.6 * power));
const signColour = computed(() => new Color("#ffffff").multiplyScalar(0.05 + 1.8 * power));
const tubes = [-5.5, -1.5, 2.5];

/** Both spotlights aim at the middle of the bus. */
const aim = new Object3D();
aim.position.set(0, 1.2, 0);

/** The key light, warm white from the front corner. */
const key = new SpotLight("#fff4f8", 0, 30, 0.75, 0.7, 2);
key.position.set(5.5, ROOM.height - 0.5, 5);
key.target = aim;
watchEffect(() => {
  key.intensity = 260 * power;
});
const beams = [-7, -3.5, 0, 3.5];
const tyreStacks: [x: number, z: number, count: number][] = [
  [-6.3, -7.6, 4],
  [-5.1, -7.9, 3],
  [6.2, -7.5, 5],
];
</script>

<template>
  <TresGroup>
    <!-- Polished concrete with soft, blurred reflections. -->
    <TresMesh :rotation="[-Math.PI / 2, 0, 0]" :position="[0, 0, 4]">
      <TresPlaneGeometry :args="[40, 40]" />
      <MeshReflectionMaterial
        :map="floorMap"
        color="#8a8494"
        :roughness="0.55"
        :metalness="0.2"
        :mix="0.9"
        :blur-size="[400, 120]"
        :blur-mix-smooth="1"
        :blur-mix-rough="1"
        :resolution="512"
      />
    </TresMesh>

    <!-- Corrugated side walls. -->
    <TresMesh
      v-for="side in [-1, 1]"
      :key="side"
      :position="[side * ROOM.halfWidth, ROOM.height / 2, roomCentreZ]"
      :rotation="[0, (-side * Math.PI) / 2, 0]"
    >
      <TresPlaneGeometry :args="[roomDepth, ROOM.height]" />
      <TresMeshStandardMaterial
        color="#3a3346"
        :bump-map="ribs"
        :bump-scale="2"
        :metalness="0.6"
        :roughness="0.5"
      />
    </TresMesh>

    <!-- Back wall and its neon sign. -->
    <TresMesh :position="[0, ROOM.height / 2, ROOM.back]">
      <TresPlaneGeometry :args="[ROOM.halfWidth * 2, ROOM.height]" />
      <TresMeshStandardMaterial :map="backWall" color="#6a6274" :roughness="0.85" />
    </TresMesh>
    <TresMesh :position="[0, 3.5, ROOM.back + 0.02]" :render-order="2">
      <TresPlaneGeometry :args="[9, 2.8]" />
      <TresMeshBasicMaterial
        :map="sign"
        :color="signColour"
        :blending="AdditiveBlending"
        :transparent="true"
        :depth-write="false"
        :tone-mapped="false"
      />
    </TresMesh>
    <TresPointLight
      :position="[0, 3.5, ROOM.back + 1.2]"
      :color="C.neonPink"
      :intensity="18 * power"
      :distance="14"
    />

    <!-- Roof, beams and strip lights. -->
    <TresMesh :position="[0, ROOM.height, roomCentreZ]" :rotation="[Math.PI / 2, 0, 0]">
      <TresPlaneGeometry :args="[ROOM.halfWidth * 2, roomDepth]" />
      <TresMeshStandardMaterial color="#17131c" :roughness="0.9" />
    </TresMesh>
    <TresMesh v-for="z in beams" :key="`beam-${z}`" :position="[0, ROOM.height - 0.18, z]">
      <TresBoxGeometry :args="[ROOM.halfWidth * 2, 0.3, 0.22]" />
      <TresMeshStandardMaterial color="#231d2a" :metalness="0.5" :roughness="0.6" />
    </TresMesh>
    <TresMesh v-for="z in tubes" :key="`tube-${z}`" :position="[0, ROOM.height - 0.42, z]">
      <TresBoxGeometry :args="[7, 0.06, 0.14]" />
      <TresMeshBasicMaterial :color="tubeColour" :tone-mapped="false" />
    </TresMesh>

    <!-- Key and fill spotlights on the turntable. -->
    <primitive :object="key" />
    <TresSpotLight
      :position="[-6, ROOM.height - 0.5, -4]"
      :target="aim"
      :intensity="140 * power"
      :angle="0.8"
      :penumbra="0.9"
      :decay="2"
      :distance="30"
      :color="C.purpleGlow"
    />
    <primitive :object="aim" />
    <TresHemisphereLight color="#6d5a86" ground-color="#120b18" :intensity="0.25 + 0.5 * power" />

    <Turntable :power="power" />

    <!-- Tyre stacks in the back corners. -->
    <template v-for="[x, z, count] in tyreStacks" :key="`${x}-${z}`">
      <TresMesh
        v-for="level in count"
        :key="level"
        :position="[x, 0.15 + (level - 1) * 0.3, z]"
        :rotation="[Math.PI / 2, 0, level * 0.4]"
      >
        <TresTorusGeometry :args="[0.42, 0.15, 14, 36]" />
        <TresMeshStandardMaterial color="#141117" :roughness="0.95" />
      </TresMesh>
    </template>

    <!-- Front wall around the door opening, outside face. -->
    <TresMesh
      v-for="side in [-1, 1]"
      :key="`pillar-${side}`"
      :position="[side * (OPENING.width / 2 + pillarWidth / 2), ROOM.height / 2, ROOM.front + 0.15]"
    >
      <TresBoxGeometry :args="[pillarWidth, ROOM.height, 0.3]" />
      <TresMeshStandardMaterial color="#2a2431" :roughness="0.8" />
    </TresMesh>
    <TresMesh :position="[0, (ROOM.height + OPENING.height) / 2, ROOM.front + 0.15]">
      <TresBoxGeometry :args="[OPENING.width, ROOM.height - OPENING.height, 0.3]" />
      <TresMeshStandardMaterial color="#2a2431" :roughness="0.8" />
    </TresMesh>
    <!-- Painted kerb along the threshold. -->
    <TresMesh :position="[0, 0.03, ROOM.front + 0.15]">
      <TresBoxGeometry :args="[OPENING.width, 0.06, 0.3]" />
      <TresMeshStandardMaterial :color="C.smiley" :roughness="0.6" />
    </TresMesh>
  </TresGroup>
</template>
