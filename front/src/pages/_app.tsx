import { AnimatePresence } from 'framer-motion';
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from '../context/AuthContext';
import { NotifyProvider } from '../context/NotifyContext';
import GlobalStyle from "../styles/global";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
        <GlobalStyle/>
        <NotifyProvider>
          <AuthProvider>
              <AnimatePresence exitBeforeEnter>
                <Component {...pageProps} />
              </AnimatePresence>
              <ToastContainer />
          </AuthProvider>
        </NotifyProvider>
    </>
  )
}

export default MyApp
