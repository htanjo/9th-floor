export interface AnomalyConfig {
  name: string;
}

export type AnomalyConfigs = AnomalyConfig[];

// Probability that anomaly will occur.
export const anomalyIncidenceRate = 0.7;

// Probability that resolved anomaly will be selected again.
export const resolvedAnomalyRate = 0.2;

// Max number of consecutive times with anomaly.
export const maxAnomalyCount = 4;

// Max number of consecutive times with no anomaly.
export const maxNoAnomalyCount = 3;

export const anomalyConfigs: AnomalyConfigs = [
  {
    name: 'overall_red',
  },
  {
    name: 'phonograph_oval',
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
