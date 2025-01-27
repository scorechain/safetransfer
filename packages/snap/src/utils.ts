import { ManageStateOperation } from '@metamask/snaps-sdk';
type State = {
  id: string;
};
const DEFAULT_STATE = {
  id: '',
};
/**
 * Retrieves the application state from the Metamask Snap.
 * @param encrypted - Whether the state should be retrieved in encrypted format.
 * @returns The retrieved state object, or the default state if no state exists.
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
 * Updates the application state in the Metamask Snap.
 * @param newState - The new state object to set.
 * @param encrypted - Whether the state should be stored in encrypted format.
 * @returns Resolves when the state update is complete.
 */
export async function setState(newState: State, encrypted: boolean) : Promise<void> {
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
 * Clears the application state in the Metamask Snap.
 * @param encrypted - Whether the state clearing operation should account for encryption.
 * @returns Resolves when the state is successfully cleared.
 */
export async function clearState(encrypted: boolean) : Promise<void>{
  await snap.request({
    method: 'snap_manageState',
    params: {
      operation: ManageStateOperation.ClearState,
      encrypted,
    },
  });
}
