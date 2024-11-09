import {
  BackEase,
  EasingFunction,
  SineEase,
} from '@babylonjs/core/Animations/easing';
import { IAnimationKey } from '@babylonjs/core/Animations/animationKey';

export interface AnimationConfig {
  targetProperty?: string; // Optional. Can be set afterwards.
  easingFunction: EasingFunction;
  easingMode: number;
  framePerSecond: number;
  keys: Array<IAnimationKey>;
}

const defaultFps = 60;

export const flickerVeryFast: AnimationConfig = {
  easingFunction: new BackEase(),
  easingMode: EasingFunction.EASINGMODE_EASEOUT,
  framePerSecond: defaultFps,
  keys: [
    { frame: 0, value: 1.0 },
    { frame: 20, value: 1.6 },
    { frame: 30, value: 0.8 },
    { frame: 40, value: 1.2 },
    { frame: 70, value: 2.2 },
    { frame: 80, value: 1.0 },
    { frame: 95, value: 1.6 },
    { frame: 100, value: 0.6 },
    { frame: 110, value: 1.2 },
    { frame: 170, value: 1.0 },
  ],
};

export const flickerVeryFastGentle: AnimationConfig = {
  easingFunction: flickerVeryFast.easingFunction,
  easingMode: flickerVeryFast.easingMode,
  framePerSecond: defaultFps,
  keys: flickerVeryFast.keys.map((key) => ({
    frame: key.frame,
    value: 1 + (key.value - 1) / 2,
  })),
};

export const flickerVeryFastSlight: AnimationConfig = {
  easingFunction: flickerVeryFast.easingFunction,
  easingMode: flickerVeryFast.easingMode,
  framePerSecond: defaultFps,
  keys: flickerVeryFast.keys.map((key) => ({
    frame: key.frame,
    value: 1 + (key.value - 1) / 4,
  })),
};

export const flickerFast: AnimationConfig = {
  easingFunction: new BackEase(),
  easingMode: EasingFunction.EASINGMODE_EASEOUT,
  framePerSecond: defaultFps,
  keys: [
    { frame: 0, value: 1.0 },
    { frame: 40, value: 2.0 },
    { frame: 60, value: 1.2 },
    { frame: 70, value: 0.9 },
    { frame: 80, value: 1.6 },
    { frame: 85, value: 0.8 },
    { frame: 100, value: 1.2 },
    { frame: 160, value: 1.0 },
  ],
};

export const flickerMedium: AnimationConfig = {
  easingFunction: new BackEase(),
  easingMode: EasingFunction.EASINGMODE_EASEOUT,
  framePerSecond: defaultFps,
  keys: [
    { frame: 0, value: 1.0 },
    { frame: 30, value: 1.6 },
    { frame: 80, value: 1.4 },
    { frame: 95, value: 0.8 },
    { frame: 130, value: 1.3 },
    { frame: 140, value: 1.4 },
    { frame: 190, value: 1.0 },
    { frame: 210, value: 1.2 },
    { frame: 230, value: 1.0 },
  ],
};

export const flickerSlow: AnimationConfig = {
  easingFunction: new BackEase(),
  easingMode: EasingFunction.EASINGMODE_EASEOUT,
  framePerSecond: defaultFps,
  keys: [
    { frame: 0, value: 1.0 },
    { frame: 60, value: 2.0 },
    { frame: 90, value: 0.8 },
    { frame: 120, value: 1.4 },
    { frame: 150, value: 1.0 },
  ],
};

export const flickerVerySlow: AnimationConfig = {
  easingFunction: new SineEase(),
  easingMode: EasingFunction.EASINGMODE_EASEINOUT,
  framePerSecond: defaultFps,
  keys: [
    { frame: 0, value: 1.0 },
    { frame: 180, value: 1.8 },
    { frame: 220, value: 0.5 },
    { frame: 300, value: 0.7 },
    { frame: 420, value: 1.3 },
    { frame: 530, value: 1.0 },
  ],
};

export const flickerVerySlowGentle: AnimationConfig = {
  easingFunction: flickerVerySlow.easingFunction,
  easingMode: flickerVerySlow.easingMode,
  framePerSecond: defaultFps,
  keys: flickerVerySlow.keys.map((key) => ({
    frame: key.frame,
    value: 1 + (key.value - 1) / 2,
  })),
};

export const animationTemplates = {
  flickerVeryFast,
  flickerVeryFastGentle,
  flickerVeryFastSlight,
  flickerFast,
  flickerMedium,
  flickerSlow,
  flickerVerySlow,
  flickerVerySlowGentle,
};

export type AnimationTemplates = typeof animationTemplates;

export function createAnimationConfig(
  animationName: keyof AnimationTemplates,
  baseValue: number,
  baseFps: number,
): AnimationConfig {
  const animationTemplate = animationTemplates[animationName];
  const { easingMode, easingFunction, keys } = animationTemplate;
  const animationConfig = {
    easingFunction,
    easingMode,
    framePerSecond: baseFps,
    keys: keys.map((key) => ({
      frame: (key.frame * baseFps) / defaultFps,
      value: baseValue * key.value,
    })),
  };
  return animationConfig;
}
