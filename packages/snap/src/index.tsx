import type {
  OnTransactionHandler,
  OnHomePageHandler,
  OnInstallHandler,
  OnUpdateHandler,
} from '@metamask/snaps-sdk';
import { Box, Heading, Text } from '@metamask/snaps-sdk/jsx';
import { Insight } from './components/Insights';
import { HomePage } from './components/HomePage';
import { getScoring } from './getScoring';
import { getBlockchainName } from './getBlockchain';
import { Unavailable } from './components/Unavailable';
import { v4 as uuidv4 } from 'uuid';
import { trackingType } from './models/enumType/KPIType';
import { postKPI } from './postKPI';
import { getState, setState } from './utils';

export const onTransaction: OnTransactionHandler = async ({
  transaction,
  chainId,
}) => {
  const _blockchain = getBlockchainName(chainId);
  if (_blockchain != null) {
    let state = await getState(true);

    if (state['id'] === undefined || state['id'] === '') {
      const userId = uuidv4();
      await setState({ id: userId }, true);
      state = await getState(true);
    }

    await postKPI({
      type: trackingType.TRANSACTION,
      userId: String(state['id']),
    });

  
    const result = await getScoring({
      objectId: transaction.to,
      blockchain: _blockchain,
    });

    if (result.success) {
      const score = result.data.score;
      if (Number(score) === -1) {
        await snap.request({
          method: 'snap_notify',
          params: {
            type: 'inApp',
            message: `Hmm... The address ${transaction.to.slice(0,7)} hasn’t interacted with the blockchain yet. No risk level available. Proceed carefully and verify further!`,
          },
        });
      } else if (Number(score) === 1) {
  await snap.request({
    method: 'snap_notify',
    params: {
      type: 'inApp',
      message: `WARNING! The address ${transaction.to.slice(0,7)} is CRITICAL risk. It’s best to stay away from this one.`,
    },
  });
} else if (Number(score) >= 2 && Number(score) <= 29) {
  await snap.request({
    method: 'snap_notify',
    params: {
      type: 'inApp',
      message: `WARNING! The address ${transaction.to.slice(0,7)} is HIGH risk. Think twice before proceeding.`,
    },
  });
} else if (Number(score) >= 30 && Number(score) <= 69) {
  await snap.request({
    method: 'snap_notify',
    params: {
      type: 'inApp',
      message: `Caution! The address ${transaction.to.slice(0,7)} has MEDIUM risk. Be sure to double-check before continuing.`,
    },
  });
} else if (Number(score) >= 70 && Number(score) <= 99) {
  await snap.request({
    method: 'snap_notify',
    params: {
      type: 'inApp',
      message: `Looking good! The address ${transaction.to.slice(0,7)} is LOW risk.`,
    },
  });
} else {
  await snap.request({
    method: 'snap_notify',
    params: {
      type: 'inApp',
      message: `Great news! The address ${transaction.to.slice(0,7)} has NO detected risk. All clear to move forward.`,
    },
  });
}

      return {
        content: (
          <Insight to={transaction.to} score={score} />
        ),
      };
    } else {
      if (result.status === 404) {
        return {
          content: (
            <Unavailable
              message={'Sorry, we have no insight about this address.'}
            />
          ),
        };
      } else if (result.status === 429) {
        await postKPI({
          type: trackingType.BLOCKED,
          userId: state && state['id'] ? String(state['id']) : undefined,
        });
        return {
          content: (
            <Unavailable
              message={'Too Many Requests. Please Try Again Later'}
            />
          ),
        };
      } else {
        return {
          content: (
            <Unavailable
              message={
                'Sorry, action failed. If this continues please contact us at support@scorechain.com.'
              }
            />
          ),
        };
      }
    }
  } else {
    return {
      content: (
        <Unavailable message={"Sorry, we don't support this network."} />
      ),
    };
  }
};

export const onHomePage: OnHomePageHandler = async () => {
  return {
    content: <HomePage />,
  };
};

export const onInstall: OnInstallHandler = async () => {
  const userId = uuidv4();
  await setState({ id: userId }, true);
  await postKPI({
    type: trackingType.INSTALLATION,
    userId: userId,
  });

  await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'alert',
      content: (
        <Box>
          <Heading>Thank you for installing Scorechain Snap</Heading>
        </Box>
      ),
    },
  });
};

export const onUpdate: OnUpdateHandler = async () => {
  const state = await getState(true);

  await postKPI({
    type: trackingType.UPDATE,
    userId: state && state['id'] ? String(state['id']) : undefined,
  });
};
