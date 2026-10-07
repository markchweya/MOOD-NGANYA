<script setup lang="ts">
import { useLoop } from "@tresjs/core";
import { AdditiveBlending, Color, DoubleSide, ShaderMaterial } from "three";
import { onBeforeUnmount } from "vue";
import { C } from "../colours";

/**
 * The display turntable: a brushed steel plate with a neon rim. The rim is a
 * GLSL shader: dashes chase around it in purple and pink while a brighter
 * comet laps it. `power` (0 to 1) brings it up with the lights.
 */
const { power, radius = 5.2 } = defineProps<{ power: number; radius?: number }>();

const INNER = radius - 0.22;
const OUTER = radius + 0.02;

const vertexShader = /* glsl */ `
  varying vec2 vPos;
  void main() {
    vPos = position.xy;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// RingGeometry's UVs are planar, so the polar coordinates come from the position:
// `around` is 0..1 around the ring, `across` is 0..1 from its inner to outer edge.
const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uPower;
  uniform float uInner;
  uniform float uOuter;
  uniform vec3 uA;
  uniform vec3 uB;
  varying vec2 vPos;

  void main() {
    float around = atan(vPos.y, vPos.x) / 6.2832 + 0.5;
    float across = (length(vPos) - uInner) / (uOuter - uInner);
    float dashes = 48.0;
    float phase = fract(around * dashes - uTime * 0.8);
    float dash = smoothstep(0.0, 0.08, phase) * (1.0 - smoothstep(0.55, 0.63, phase));
    // A brighter comet runs once around per few seconds.
    float comet = pow(1.0 - fract(around - uTime * 0.12), 10.0);
    vec3 colour = mix(uA, uB, 0.5 + 0.5 * sin(around * 6.2832 * 2.0 + uTime));
    // Soft edges across the ring's width.
    float edge = smoothstep(0.0, 0.35, across) * smoothstep(1.0, 0.65, across);
    float glow = (0.35 + 0.65 * dash + 2.5 * comet) * edge * uPower;
    gl_FragColor = vec4(colour * glow * 2.4, 1.0);
  }
`;

const rim = new ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    uTime: { value: 0 },
    uPower: { value: 0 },
    uInner: { value: INNER },
    uOuter: { value: OUTER },
    uA: { value: new Color(C.ledViolet) },
    uB: { value: new Color(C.neonPink) },
  },
  transparent: true,
  blending: AdditiveBlending,
  depthWrite: false,
  side: DoubleSide,
  toneMapped: false,
});

const { onBeforeRender } = useLoop();
onBeforeRender(({ elapsed }) => {
  const uniforms = rim.uniforms as { uTime: { value: number }; uPower: { value: number } };
  uniforms.uTime.value = elapsed;
  uniforms.uPower.value = power;
});

onBeforeUnmount(() => {
  rim.dispose();
});
</script>

<template>
  <TresGroup>
    <!-- Plate -->
    <TresMesh :position="[0, 0.06, 0]">
      <TresCylinderGeometry :args="[radius, radius + 0.08, 0.12, 96]" />
      <TresMeshPhysicalMaterial
        color="#2b2731"
        :metalness="0.85"
        :roughness="0.38"
        :clearcoat="0.6"
        :clearcoat-roughness="0.2"
      />
    </TresMesh>
    <!-- Neon rim: a flat ring hugging the plate's edge. -->
    <TresMesh :position="[0, 0.125, 0]" :rotation="[-Math.PI / 2, 0, 0]" :render-order="2">
      <TresRingGeometry :args="[INNER, OUTER, 192, 1]" />
      <primitive :object="rim" attach="material" />
    </TresMesh>
  </TresGroup>
</template>
