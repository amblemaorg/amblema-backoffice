export interface ChartAverage {
  academicPeriod: string[];
  coordinates: Coordinate[];
  total?: number;
}

interface Coordinate {
  x: any;
  y: any;
}
