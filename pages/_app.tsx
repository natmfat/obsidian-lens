import "katex/dist/katex.min.css";
import "../styles/globals.css";
import "../styles/prism.css";

import type { AppProps } from "next/app";
import { Provider } from "urql";
import client from "../schemaClient/client";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Provider value={client}>
            <Component {...pageProps} />
        </Provider>
    );
}
