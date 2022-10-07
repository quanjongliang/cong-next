import Loading from "components/Common/Loading/Loading";
import { AlertDialog } from "components/Common/Notification/AlertDialog";
import Snackbar from "components/Common/Notification/Snackbar";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Router } from "next/router";
import NextNProgress from "nextjs-progressbar";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "store";
import { ThemeCustomization } from "themes";
import "../styles/globals.css";
import "react-quill/dist/quill.snow.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    Router.events.on("routeChangeStart", () => setLoading(true));
    Router.events.on("routeChangeComplete", () => setLoading(false));
    Router.events.on("routeChangeError", () => setLoading(false));
    return () => {
      Router.events.off("routeChangeStart", () => setLoading(true));
      Router.events.off("routeChangeComplete", () => setLoading(false));
      Router.events.off("routeChangeError", () => setLoading(false));
    };
  }, []);

  return (
    <Provider store={store}>
      <ThemeCustomization>
        <Head>
          <title>Cong phone</title>
        </Head>
        <NextNProgress />
        <Component {...pageProps} />
        <Snackbar />
        <AlertDialog />
        {loading && <Loading isLoading={loading} />}
      </ThemeCustomization>
    </Provider>
  );
}

export default MyApp;
