import type { TrackingType } from './enumType/KPIType';

export type KPIProps = {
  type: TrackingType;
  userId: string | undefined;
};
