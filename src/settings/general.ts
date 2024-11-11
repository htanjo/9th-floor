import Bowser from 'bowser';

export const frameHeight = 200;
export const hasPointingDevice = matchMedia('(pointer:fine)').matches; // TODO: May not be perfect.
export const hasTouchscreen = matchMedia('(pointer:coarse)').matches;
export function toRadians(degrees: number) {
  return degrees * (Math.PI / 180);
}
const browser = Bowser.parse(window.navigator.userAgent);
export const isDesktop = browser.platform.type === 'desktop';
export const isIos = browser.os.name === 'iOS';
