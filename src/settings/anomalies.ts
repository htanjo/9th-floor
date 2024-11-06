export interface AnomalyConfig {
  name: string;
}

export type AnomalyConfigs = AnomalyConfig[];

export const anomalyConfigs: AnomalyConfigs = [
  {
    name: 'screen_monochrome',
  },
  {
    name: 'picture_wink',
  },
];
