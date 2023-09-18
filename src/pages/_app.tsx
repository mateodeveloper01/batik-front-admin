import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type AppType } from "next/dist/shared/lib/utils";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { AuthProvider } from "~/global/authProviders";
import { persistor, store } from "~/redux/store";
import { ChakraProvider } from "@chakra-ui/react";

import "~/styles/globals.css";
import Layout from "~/components/layouts/Layout";
const queryClient = new QueryClient();

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <AuthProvider>
          <PersistGate loading="loading" persistor={persistor}>
            <QueryClientProvider client={queryClient}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </QueryClientProvider>
          </PersistGate>
        </AuthProvider>
      </ChakraProvider>
    </Provider>
  );
};

export default MyApp;
