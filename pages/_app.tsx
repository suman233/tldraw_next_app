import Wrapper from "../layout/Wrapper/Wrapper";
import "../styles/globals.css";
// import { useAuth } from "firebase/auth";
import type { AppProps } from "next/app";

import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Wrapper>
      <Component {...pageProps} />
    </Wrapper>
  );
}
