import "twin.macro";
import { Button } from "../button";
import { useSnackbar } from "./provider";

export const Snackbar: React.FC = () => {
  const { isOpen, message, actionText, onAction } = useSnackbar();
  return (
    <>
      {isOpen && (
        <div tw="bg-inverse-surface rounded-[4px] h-12 flex items-center fixed bottom-5 left-1/2 -translate-x-1/2">
          <span tw="text-inverse-on-surface body-medium px-4">{message}</span>
          {actionText && (
            <Button tw="!text-inverse-primary" onClick={onAction} type="text">
              {actionText}
            </Button>
          )}
        </div>
      )}
    </>
  );
};
