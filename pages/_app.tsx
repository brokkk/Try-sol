import "../styles/styles.css";
import "../styles/customstyles.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { WalletBalanceProvider } from "../hooks/useWalletBalance";

require("@solana/wallet-adapter-react-ui/styles.css");

const WalletConnectionProvider = dynamic(
  () => import("../components/WalletConnection/WalletConnectionProvider"),
  {
    ssr: false,
  }
);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WalletConnectionProvider>
      <WalletBalanceProvider>
        <Component {...pageProps} />
      </WalletBalanceProvider>
    </WalletConnectionProvider>
  );
}
export default MyApp;
