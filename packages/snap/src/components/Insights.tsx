import { Box, Text, Row, Address, Bold, Link } from '@metamask/snaps-sdk/jsx';
import type { SnapComponent } from '@metamask/snaps-sdk/jsx';

import type { InsightProps } from '../types/InsightProps';

export const Insight: SnapComponent<InsightProps> = ({ to, score }) => {
  let riskLevel: {
    icon: string;
    message: string;
  };
  if (score === 'UNAVAILABLE') {
    riskLevel = {
      icon: '⚪',
      message:
        'This address has not interacted with the blockchain yet. No risk level can be determined.',
    };
  } else if (score === 'CRITICAL') {
    riskLevel = {
      icon: '🔴',
      message: 'This address is CRITICAL risk. Do not proceed.',
    };
  } else if (score === 'HIGH') {
    riskLevel = {
      icon: '🟠',
      message: 'This address is HIGH risk. Proceed with caution.',
    };
  } else if (score === 'MEDIUM') {
    riskLevel = {
      icon: '🟡',
      message: 'This address is MEDIUM risk. Be cautious.',
    };
  } else if (score === 'LOW') {
    riskLevel = {
      icon: '🟢',
      message: 'This address is LOW risk. No detected issues.',
    };
  } else {
    riskLevel = {
      icon: '✅',
      message: 'This address has NO risk detected.',
    };
  }

  return (
    <Box>
      <Box>
        <Row label="To">
          {to ? (
            <Address address={to as `0x${string}`} />
          ) : (
            <Text>
              The score is <Bold>{score}%</Bold>
            </Text>
          )}
        </Row>
      </Box>
      <Box>
        <Row label="Insight">
          <Text>
            <Bold>{riskLevel.icon}</Bold> &nbsp;
            {riskLevel.message}
          </Text>
        </Row>
      </Box>

      <Box>
        <Text>
          <Bold>
            Want to know more about this address and create a report ?{' '}
          </Bold>{' '}
          &nbsp;
        </Text>
        <Text>
          Install our ScorechainBot in Telegram for a lite report.
          <Link href="https://t.me/scorechainbot"> </Link>
        </Text>
        <Text>
          Go to our website for a full detailed address report.
          <Link href="https://www.scorechain.com/kya-know-your-address-metamask">
            {' '}
          </Link>
        </Text>
      </Box>
    </Box>
  );
};
