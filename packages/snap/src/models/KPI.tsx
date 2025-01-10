import { trackingType } from './enumType/KPIType';

export interface KPIProps {
  type: trackingType;
  userId: string | undefined ;
}
