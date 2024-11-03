export const frameHeight = 200;
export const hasPointingDevice = matchMedia('(pointer:fine)').matches; // TODO: May not be perfect.
export const hasTouchscreen = matchMedia('(pointer:coarse)').matches;
export function toRadians(degrees: number) {
  return degrees * (Math.PI / 180);
}
