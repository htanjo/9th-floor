import {
  BackEase,
  EasingFunction,
  IAnimationKey,
  SineEase,
} from '@babylonjs/core';

export interface AnimationConfig {
  easingFunction: EasingFunction;
  easingMode: number;
  framePerSecond: number;
  keys: Array<IAnimationKey>;
}

const defaultFps = 60;

export const flickerFast: AnimationConfig = {
  easingFunction: new BackEase(),
  easingMode: EasingFunction.EASINGMODE_EASEOUT,
  framePerSecond: defaultFps,
  keys: [
    { frame: 0, value: 1.0 },
    { frame: 50, value: 1.6 },
    { frame: 70, value: 0.8 },
    { frame: 90, value: 1.2 },
    { frame: 150, value: 2.2 },
    { frame: 160, value: 1.0 },
    { frame: 170, value: 1.6 },
    { frame: 190, value: 0.6 },
    { frame: 220, value: 1.2 },
    { frame: 340, value: 1.0 },
  ],
};

export const flickerFastGentle: AnimationConfig = {
  easingFunction: flickerFast.easingFunction,
  easingMode: flickerFast.easingMode,
  framePerSecond: defaultFps,
  keys: flickerFast.keys.map((key) => ({
    frame: key.frame,
    value: 1 + (key.value - 1) / 4,
  })),
};

export const flickerMedium: AnimationConfig = {
  easingFunction: new BackEase(),
  easingMode: EasingFunction.EASINGMODE_EASEOUT,
  framePerSecond: defaultFps,
  keys: [
    { frame: 0, value: 1.0 },
    { frame: 90, value: 2.0 },
    { frame: 120, value: 1.2 },
    { frame: 140, value: 0.9 },
    { frame: 160, value: 1.6 },
    { frame: 170, value: 0.8 },
    { frame: 200, value: 1.2 },
    { frame: 310, value: 1.0 },
  ],
};

export const flickerSlow: AnimationConfig = {
  easingFunction: new BackEase(),
  easingMode: EasingFunction.EASINGMODE_EASEOUT,
  framePerSecond: defaultFps,
  keys: [
    { frame: 0, value: 1.0 },
    { frame: 100, value: 2.0 },
    { frame: 160, value: 0.8 },
    { frame: 200, value: 1.4 },
    { frame: 250, value: 1.0 },
  ],
};

export const flickerVerySlow: AnimationConfig = {
  easingFunction: new SineEase(),
  easingMode: EasingFunction.EASINGMODE_EASEINOUT,
  framePerSecond: defaultFps,
  keys: [
    { frame: 0, value: 1.0 },
    { frame: 150, value: 1.8 },
    { frame: 200, value: 0.4 },
    { frame: 260, value: 0.6 },
    { frame: 340, value: 1.2 },
    { frame: 510, value: 1.0 },
  ],
};

export const flickerVerySlowGentle: AnimationConfig = {
  easingFunction: flickerVerySlow.easingFunction,
  easingMode: flickerVerySlow.easingMode,
  framePerSecond: defaultFps,
  keys: flickerVerySlow.keys.map((key) => ({
    frame: key.frame,
    value: 1 + (key.value - 1) / 4,
  })),
};

export const animationTemplates = {
  flickerFast,
  flickerFastGentle,
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
      frame: (key.frame * baseFps) / 60,
      value: baseValue * key.value,
    })),
  };
  return animationConfig;
}
