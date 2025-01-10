import { Box, Text, Row } from '@metamask/snaps-sdk/jsx';
import type { SnapComponent } from '@metamask/snaps-sdk/jsx';

export const Unavailable: SnapComponent<{ message: string }> = ({
  message,
}) => {
  return (
    <Box>
      <Box>
        <Row label="Oops ! ">
          <Text>{message}</Text>
        </Row>
      </Box>
    </Box>
  );
};
