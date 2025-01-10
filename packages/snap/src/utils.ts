import { ManageStateOperation } from '@metamask/snaps-sdk';

type State = {
  id: string;
};

const DEFAULT_STATE = {
  id: '',
};

/**
 *
 * @param encrypted
 */
export async function getState(encrypted: boolean): Promise<State> {
  const state = await snap.request({
    method: 'snap_manageState',

    params: {
      operation: ManageStateOperation.GetState,
      encrypted,
    },
  });

  return (state as State | null) ?? DEFAULT_STATE;
}

/**
 *
 * @param newState
 * @param encrypted
 */
export async function setState(newState: State, encrypted: boolean) {
  await snap.request({
    method: 'snap_manageState',

    params: {
      operation: ManageStateOperation.UpdateState,
      newState,
      encrypted,
    },
  });
}

/**
 *
 * @param encrypted
 */
export async function clearState(encrypted: boolean) {
  await snap.request({
    method: 'snap_manageState',

    params: {
      operation: ManageStateOperation.ClearState,
      encrypted,
    },
  });
}
