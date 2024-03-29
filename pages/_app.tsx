import Layout from "@/components/Layout";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import Modal from "@/components/Modal";
import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import EditModal from "@/components/modals/EditModal";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <Toaster />
        <LoginModal />
        <EditModal />
        <RegisterModal />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </>
  );
}
