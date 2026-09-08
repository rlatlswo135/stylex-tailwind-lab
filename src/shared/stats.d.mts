export const summarize: (
  values: number[],
) => {
  samples: number;
  median: number;
  p95: number;
  min: number;
  max: number;
} | null;
