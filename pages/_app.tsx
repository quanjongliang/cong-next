import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { ThemeCustomization } from "themes";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeCustomization>
      <Component {...pageProps} />;
    </ThemeCustomization>
  );
}

export default MyApp;
