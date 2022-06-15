import { registerRootComponent } from "expo";
import { AxiosProvider } from "./context/AxiosContext";
import { AuthProvider } from './context/AuthContext';


import App from "./App";

const Root = () => {
  return (
    <AuthProvider>
      <AxiosProvider>
        <App />
      </AxiosProvider>
    </AuthProvider>
  );
};
registerRootComponent(Root);
