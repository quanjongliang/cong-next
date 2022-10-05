import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { ThemeCustomization } from "themes";
import Head from "next/head";
import { store } from "store";
import Snackbar from "components/Common/Notification/Snackbar";
import { AlertDialog } from "components/Common/Notification/AlertDialog";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeCustomization>
        <Head>
          <title>Cong phone</title>
        </Head>
        <Component {...pageProps} />
        <Snackbar />
        <AlertDialog />
      </ThemeCustomization>
    </Provider>
  );
}

export default MyApp;
