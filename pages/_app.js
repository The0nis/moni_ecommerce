import "../styles/globals.css";
import { Layout } from "../components";
import { Toaster } from "react-hot-toast";

//IMPORT THE STATE CONTEXT
import { StateContext } from "../context/StateContext";


export default function App({ Component, pageProps }) {
  //THEN WRAP THE LAYOUT WITH THE STATECONTEXT
  return (
    <StateContext>
      <Layout>
        <Toaster/>
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  );
}
