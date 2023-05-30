export interface TrainingType {
  id: number;
  series: number;
  repetitions: string;
  exercise: string;
  startPeriod: string;
  endPeriod: string;
  videoUrl: string;
  weight: string;
  weekDay: string;
}

export interface TrainingCreatorType {
  series?: number | undefined;
  repetitions?: string | undefined;
  exercise?: string | undefined;
  startPeriod?: string | undefined;
  endPeriod?: string | undefined;
  videoUrl?: string | undefined;
  weight?: string | undefined;
  weekDay?: string | undefined;
}
