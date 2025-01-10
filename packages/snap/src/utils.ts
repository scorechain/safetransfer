import { ManageStateOperation } from '@metamask/snaps-sdk';

type State = {
    id: string; 
  };

const DEFAULT_STATE = {
  id: "",
};


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


export async function clearState(encrypted: boolean) {
  await snap.request({
    method: 'snap_manageState',

    params: {
      operation: ManageStateOperation.ClearState,
      encrypted,
    },
  });
}