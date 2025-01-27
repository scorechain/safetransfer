import type { KPIProps } from './models/KPI';

export type RequestReturnSuccess = {
  success: true;
  pages?: string;
  status: number;
};
export type RequestReturnError = {
  success: false;
  message: string;
  status: number;
  error?: string;
};
export type RequestReturn = RequestReturnSuccess | RequestReturnError;

export const postKPI = async (body: KPIProps): Promise<RequestReturn> => {
  try {
    const response = await fetch(`https://lite.api.scorechain.com/v1/userKPI`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : null,
    });
    if (response.status === 200) {
      return {
        success: true,
        status: response.status,
      };
    }
    const json = (await response?.json()) as {
      message: string;
      error: string;
    };
    return {
      success: false,
      message: json?.message,
      error: json?.error,
      status: response.status,
    };
  } catch (error) {
    return {
      success: false,
      message: String(error),
      status: (error as { code: number }).code || 0,
    };
  }
};
