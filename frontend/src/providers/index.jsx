// import store from '@reducer/store';
import { HelmetProvider } from "react-helmet-async";
// import { Toaster } from 'react-hot-toast';
// import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";

const Provider = ({ children }) => {
  return (
    <BrowserRouter>
      <HelmetProvider>
        {/* <ReduxProvider store={store}> */}
        {/* <Toaster> */}
        {children}
        {/* </Toaster> */}
        {/* </ReduxProvider> */}
      </HelmetProvider>
    </BrowserRouter>
  );
};

export default Provider;
