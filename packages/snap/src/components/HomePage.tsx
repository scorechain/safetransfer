import type { SnapComponent } from '@metamask/snaps-sdk/jsx';
import { Box, Row, Text, Heading, Link } from '@metamask/snaps-sdk/jsx';

export const HomePage: SnapComponent = () => {
  return (
    <Box>
      <Heading>Welcome to Scorechain SafeTransfer 🚀</Heading>

      <Row label="Why use it?">
        <Text>
          Take control of your financial safety—minimize risk, maximize
          confidence. Don’t take chances with your crypto transactions!
        </Text>
      </Row>

      <Row label="Networks We Support">
        <Text>
          We support the following networks to help you manage your transactions
          securely:
        </Text>
      </Row>
      <Box>
        <Text>🌐 AVALANCHE</Text>
        <Text>🌐 BASE</Text>
        <Text>🌐 BSC (Binance Smart Chain)</Text>
        <Text>🌐 ETHEREUM</Text>
        <Text>🌐 POLYGON</Text>
        <Text>🌐 ARBITRUM ONE</Text>
        <Text>🌐 OPTIMISM</Text>
        <Text>🌐 BLAST</Text>
      </Box>

      <Box>
        <Text>Want to learn more?</Text>
        <Link href="https://www.scorechain.com/">Visit Us 🌐</Link>
      </Box>
    </Box>
  );
};
