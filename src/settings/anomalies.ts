export interface AnomalyConfig {
  name: string;
}

export type AnomalyConfigs = AnomalyConfig[];

export const anomalyConfigs: AnomalyConfigs = [
  {
    name: 'screen_monotone',
  },
  {
    name: 'picture_closed_eyes',
  },
];
