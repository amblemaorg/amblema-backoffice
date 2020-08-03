export interface ChartAverage {
  academicPeriod: string[];
  coordinates: Coordinate[];
  total?: number;
}

interface Coordinate {
  x: number;
  y: number;
}
