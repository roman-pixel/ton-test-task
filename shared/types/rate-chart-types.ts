export type Point = [number, number];

export interface RateChartResponseData {
  points: Point[];
  error: string;
  error_code: number;
}
