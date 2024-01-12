import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {Amplify} from "aws-amplify";
import RootProvider from './providers';


Amplify.configure({
  Auth: {
    Cognito: {
      // region: import.meta.env.VITE_APP_REGION,
      userPoolId: import.meta.env.VITE_APP_USER_POOL_ID,
      userPoolClientId: import.meta.env.VITE_APP_USER_POOL_CLIENT_ID,
    }
  },
  API: {
    REST: {
      api: {
        endpoint: import.meta.env.VITE_APP_API_URL,
        region: import.meta.env.VITE_APP_REGION
      }
    }
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RootProvider>
      <App />
    </RootProvider>
  </React.StrictMode>,
)