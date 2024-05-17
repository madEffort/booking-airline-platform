/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useContext, createContext, useState } from 'react';
import ReactDOM from 'react-dom';
import Backdrop from '../components/Backdrop';

export const layoutContext = createContext({});
layoutContext.displayName = 'LayoutContext';

export const Layout = ({ children }) => {
  const [dialog, setDialog] = useState(null);

  return (
    <layoutContext.Provider value={{ dialog, setDialog }}>
      {children}
    </layoutContext.Provider>
  );
};

export const useDialog = () => {
  const { dialog, setDialog } = useContext(layoutContext);
  const openDialog = (element) => setDialog(element);
  const closeDialog = () => setDialog(null);
  return { dialog, openDialog, closeDialog };
};

export const DialogContainer = () => {
  const { dialog } = useDialog();
  return (
    <>
      {dialog &&
        ReactDOM.createPortal(
          <Backdrop>{dialog}</Backdrop>,
          document.querySelector('#dialog')
        )}
    </>
  );
};
