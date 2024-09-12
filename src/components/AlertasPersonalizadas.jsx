import { Alert, Grow, IconButton } from "@mui/material";
import { useEffect } from "react";
import CloseIcon from '@mui/icons-material/Close';

export const Notificacion = ({ tipo, info, onOpen, onClose }) => {

  useEffect(() => {
    if (onOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);

      return () => clearTimeout(timer); 
    }
  }, [onOpen, onClose]);

  return (
    <Grow 
      in={onOpen} 
      style={{ transformOrigin: '0 0 0' }}
      {...(onOpen ? { timeout: 600 } : {})}>
      <Alert
        sx={{
          position: "fixed",
          top: 10,
          left: 10,
          width: 300,
          zIndex: 9999,
          ml: 2,
          mt: 2
        }}
        variant="filled"
        severity={tipo}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={onClose}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        {info}
      </Alert>
    </Grow>
  );
};
