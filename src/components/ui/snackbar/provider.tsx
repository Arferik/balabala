import { createContext, useContext, useState } from "react";

interface CustomParams {
  duration?: number;
  onClose?: () => void;
  autoDismiss?: boolean;
}

type OpenHandle = (
  message: string,
  actionText?: string,
  onAction?: () => void,
  cusParma?: CustomParams
) => void;

interface SnackbarProviderType {
  message: string;
  isOpen?: boolean;
  onClose?: () => void;
  onAction?: () => void;
  open?: OpenHandle;
  actionText?: string;
  closeHandle?: () => void;
}

const Snackbar = createContext({
  message: "",
} as SnackbarProviderType);

let timeId: NodeJS.Timeout;
export function SnackbarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setOpen] = useState<boolean>();
  const [message, setMessage] = useState<string>("");
  const [actionText, setText] = useState<string>("");
  const [action, setAction] = useState<() => void>();
  const [close, setClose] = useState<() => void>();

  const sharedState: SnackbarProviderType = {
    isOpen,
    actionText,
    message,
    open(
      message: string,
      actionText?: string,
      onAction?: () => void,
      cusParma = {}
    ) {
      setOpen(true);
      console.log("sssss open");
      setMessage(message);
      if (actionText) setText(actionText);
      const autoDismiss = cusParma?.autoDismiss;
      if (!autoDismiss) {
        clearTimeout(timeId);
        timeId = setTimeout(() => {
          setOpen(false);
          cusParma.onClose && cusParma.onClose();
        }, cusParma.duration || 3000);
      }
      if (onAction) setAction(onAction);
      if (cusParma.onClose) setClose(cusParma.onClose);
    },
    onAction: () => {
      action && action();
    },
    onClose: () => {
      close && close();
    },
    closeHandle: () => {
      setOpen(false);
      close && close();
    },
  };

  return <Snackbar.Provider value={sharedState}>{children}</Snackbar.Provider>;
}

export function useSnackbar() {
  return useContext<SnackbarProviderType>(Snackbar);
}
