<script setup lang="ts">
import { ContactShadows, OrbitControls } from "@tresjs/cientos";
import { TresCanvas, type TresContext } from "@tresjs/core";
import {
  BloomPmndrs,
  EffectComposerPmndrs,
  SMAAPmndrs,
  ToneMappingPmndrs,
  VignettePmndrs,
} from "@tresjs/post-processing";
import gsap from "gsap";
import { ToneMappingMode } from "postprocessing";
import {
  FogExp2,
  HalfFloatType,
  NoToneMapping,
  PMREMGenerator,
  type PerspectiveCamera,
  type Scene,
  type WebGLRenderer,
} from "three";
import type { OrbitControls as OrbitControlsImpl } from "three/examples/jsm/controls/OrbitControls.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { computed, onBeforeUnmount, reactive, shallowRef, watch } from "vue";
import { busHotspots } from "@/content/garage";
import BusHotspots from "./BusHotspots.vue";
import { faceAnchor, type Vec3 } from "./busGeometry";
import {
  BUS_CENTRE,
  DOOR_Z,
  MAX_DISTANCE,
  OPENING,
  fieldOfView,
  showroomEye,
  streetEye,
} from "./garageLayout";
import { C } from "./colours";
import MoodBus from "./bus/MoodBus.vue";
import GarageRoom from "./room/GarageRoom.vue";
import RenderGate from "./RenderGate.vue";
import RollerDoor from "./room/RollerDoor.vue";

/**
 * The garage, directed. Closed, the camera faces the tagged shutter from the
 * street. Opening rolls the shutter up, flickers the strip lights on and
 * glides the camera inside, where MOOD turns slowly on its turntable. Drag to
 * walk around it; pick a dot and the camera flies to that detail.
 */
const { opened, selected, reducedMotion, active, aspect } = defineProps<{
  opened: boolean;
  /** Width over height of the canvas; the lens and framing follow it. */
  aspect: number;
  selected: number | null;
  reducedMotion: boolean;
  /** False while the section is off screen: rendering pauses. */
  active: boolean;
}>();
const emit = defineEmits<{ ready: []; open: []; select: [index: number | null] }>();

const street = computed(() => ({
  position: streetEye(aspect),
  target: [0, OPENING.height / 2, DOOR_Z] as Vec3,
}));
const showroom = computed(() => ({ position: showroomEye(aspect), target: BUS_CENTRE }));
const fov = computed(() => fieldOfView(aspect));
/** Limits that keep the orbiting camera inside the walls and above the floor. */
const ORBIT = { minDistance: 7, maxDistance: MAX_DISTANCE, minPolar: 0.55, maxPolar: 1.5 } as const;
const FOCUS_DISTANCE = 2.8;

/** Everything the timelines animate. Reactive, so the scene follows the tweens. */
const stage = reactive({ door: 0, power: 0.04, autoRotate: false });
const controlsEnabled = shallowRef(false);
const camera = shallowRef<PerspectiveCamera | null>(null);
/** Cientos exposes the three.js controls as `instance`. */
const controls = shallowRef<{ instance: OrbitControlsImpl | null } | null>(null);
const scene = shallowRef<Scene | null>(null);

/** The camera's eye and target, tweened together so every move stays smooth. */
const rig = {
  px: street.value.position[0],
  py: street.value.position[1],
  pz: street.value.position[2],
  tx: street.value.target[0],
  ty: street.value.target[1],
  tz: street.value.target[2],
};

function applyRig() {
  camera.value?.position.set(rig.px, rig.py, rig.pz);
  const orbit = controls.value?.instance;
  if (orbit) {
    orbit.target.set(rig.tx, rig.ty, rig.tz);
    orbit.update();
  } else {
    camera.value?.lookAt(rig.tx, rig.ty, rig.tz);
  }
}

/** Reads where the user has left the camera, so the next flight starts there. */
function captureRig() {
  const cam = camera.value;
  const orbit = controls.value?.instance;
  if (!cam) return;
  Object.assign(rig, { px: cam.position.x, py: cam.position.y, pz: cam.position.z });
  if (orbit) Object.assign(rig, { tx: orbit.target.x, ty: orbit.target.y, tz: orbit.target.z });
}

let flight: gsap.core.Timeline | gsap.core.Tween | null = null;

function fly(to: { position: Vec3; target: Vec3 }, duration: number, onDone?: () => void) {
  flight?.kill();
  captureRig();
  controlsEnabled.value = false;
  flight = gsap.to(rig, {
    px: to.position[0],
    py: to.position[1],
    pz: to.position[2],
    tx: to.target[0],
    ty: to.target[1],
    tz: to.target[2],
    duration: reducedMotion ? 0 : duration,
    ease: "power3.inOut",
    onUpdate: applyRig,
    onComplete: () => {
      applyRig();
      controlsEnabled.value = true;
      onDone?.();
    },
  });
}

/** Fluorescent tubes don't just switch on: they stutter first. */
function flickerOn(timeline: gsap.core.Timeline, at: number) {
  for (const [power, duration] of [
    [0.55, 0.05],
    [0.08, 0.07],
    [0.75, 0.05],
    [0.15, 0.12],
    [0.9, 0.06],
    [0.35, 0.08],
    [1, 0.25],
  ] as const) {
    timeline.to(stage, { power, duration, ease: "none" }, at);
    at += duration;
  }
}

function openGarage() {
  if (reducedMotion) {
    Object.assign(stage, { door: 1, power: 1 });
    fly(showroom.value, 0);
    return;
  }
  flight?.kill();
  const timeline = gsap.timeline({ onComplete: () => (stage.autoRotate = true) });
  timeline.to(stage, { door: 1, duration: 2.2, ease: "power2.inOut" }, 0);
  flickerOn(timeline, 0.5);
  timeline.add(() => {
    fly(showroom.value, 2.6);
  }, 1.2);
}

watch(
  () => opened,
  (isOpen) => {
    if (isOpen && stage.door === 0) openGarage();
  },
);

watch(
  () => selected,
  (index) => {
    stage.autoRotate = false;
    if (index === null) {
      if (opened) fly(showroom.value, 1.6, () => (stage.autoRotate = !reducedMotion));
      return;
    }
    const spot = busHotspots[index];
    if (!spot) return;
    const { position, normal } = faceAnchor(spot.face, spot.x, spot.y);
    fly(
      {
        position: [
          position[0] + normal[0] * FOCUS_DISTANCE,
          Math.max(0.6, position[1] + 0.3),
          position[2] + normal[2] * FOCUS_DISTANCE,
        ],
        target: position,
      },
      1.4,
    );
  },
);

/** Studio reflections from a generated room, no HDRI download; fog for depth. */
function onReady(context: TresContext) {
  const renderer = context.renderer.instance as WebGLRenderer;
  const root = context.scene.value as Scene;
  const pmrem = new PMREMGenerator(renderer);
  root.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  pmrem.dispose();
  root.fog = new FogExp2(C.purpleNight, 0.018);
  scene.value = root;
  applyRig();
}

// Reflections come up with the lights.
watch(
  () => [stage.power, scene.value] as const,
  ([power, root]) => {
    if (root) root.environmentIntensity = 0.15 + 0.85 * power;
  },
);

watch(fov, () => {
  camera.value?.updateProjectionMatrix();
});
watch(street, (view) => {
  if (stage.door > 0 || flight) return;
  Object.assign(rig, {
    px: view.position[0],
    py: view.position[1],
    pz: view.position[2],
  });
  applyRig();
});

function onUserOrbit() {
  stage.autoRotate = false;
  flight?.kill();
}

onBeforeUnmount(() => {
  flight?.kill();
  gsap.killTweensOf(stage);
});
</script>

<template>
  <TresCanvas
    :clear-color="C.purpleNight"
    :tone-mapping="NoToneMapping"
    :dpr="[1, 2]"
    @ready="onReady"
  >
    <TresPerspectiveCamera
      ref="camera"
      :position="street.position"
      :fov="fov"
      :near="0.1"
      :far="80"
    />
    <OrbitControls
      ref="controls"
      :enabled="controlsEnabled"
      :target="BUS_CENTRE"
      :enable-pan="false"
      :enable-damping="true"
      :damping-factor="0.06"
      :auto-rotate="stage.autoRotate"
      :auto-rotate-speed="0.7"
      :min-distance="selected === null ? ORBIT.minDistance : 1.2"
      :max-distance="ORBIT.maxDistance"
      :min-polar-angle="ORBIT.minPolar"
      :max-polar-angle="ORBIT.maxPolar"
      @start="onUserOrbit"
    />

    <RenderGate :active="active" />
    <GarageRoom :power="stage.power" />
    <RollerDoor
      :open="stage.door"
      :width="OPENING.width"
      :height="OPENING.height"
      :z="DOOR_Z"
      @open="emit('open')"
    />
    <MoodBus :power="stage.power" @ready="emit('ready')" />
    <!-- A soft, blurred shadow rendered from below the bus, resting on the turntable. -->
    <ContactShadows
      :position="[0, 0.13, 0]"
      :scale="[6, 11]"
      :width="6"
      :height="11"
      :blur="2.4"
      :far="3.2"
      :opacity="0.85"
      color="#05020a"
    />
    <BusHotspots v-if="stage.door > 0.9" :selected="selected" @select="emit('select', $event)" />

    <Suspense>
      <EffectComposerPmndrs :multisampling="0" :frame-buffer-type="HalfFloatType">
        <BloomPmndrs
          :intensity="1.15"
          :luminance-threshold="0.9"
          :luminance-smoothing="0.25"
          mipmap-blur
          :radius="0.75"
        />
        <VignettePmndrs :offset="0.3" :darkness="0.65" />
        <ToneMappingPmndrs :mode="ToneMappingMode.ACES_FILMIC" />
        <SMAAPmndrs />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
