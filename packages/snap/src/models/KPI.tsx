import type { trackingType } from './enumType/KPIType';

export type KPIProps = {
  type: trackingType;
  userId: string | undefined;
};
