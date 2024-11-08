export interface AnomalyConfig {
  name: string;
}

export type AnomalyConfigs = AnomalyConfig[];

export const anomalyIncidenceRate = 1;

export const anomalyConfigs: AnomalyConfigs = [
  {
    name: 'overall_red',
  },
  {
    name: 'phonograph_large',
  },
  {
    name: 'sword_stand',
  },
  {
    name: 'cat_ghost',
  },
  {
    name: 'picture_eyes',
  },
  {
    name: 'floor_none',
  },
  {
    name: 'chair_outside',
  },
];
