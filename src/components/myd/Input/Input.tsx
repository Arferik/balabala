import React, { forwardRef } from "react";
import tw, { css, styled } from "twin.macro";
import { type FieldErrors } from "react-hook-form";
import IconButton from "../IconButton/IconButton";

const InputLabel = styled.label<{ trailingIcon: boolean }>(
  ({ trailingIcon }) => [
    !!trailingIcon ? tw`left-12` : tw`left-3`,
    tw`body-large absolute pointer-events-none top-4  text-on-surface-variant transition-all px-1`,
  ]
);

const InputMain = styled.input<{ trailingIcon?: string }>(
  ({ trailingIcon }) => [
    !!trailingIcon ? tw`pl-12` : tw`pl-6`,
    tw`m-0 bg-transparent  outline-none placeholder-shown:placeholder:(text-transparent) 
  border-outline border absolute w-full rounded-md text-on-surface h-full box-border pr-12`,
    css`
      &:not(:placeholder-shown) ~ .input-label,
      &:focus ~ .input-label {
        background: var(--md-sys-color-surface);
        color: var(--md-sys-color-primary);
        transform: scale(0.85) translate(-2px, -32px);
      }
      &:focus {
        border-width: 2px;
        border-color: var(--md-sys-color-primary) !important;
      }
    `,
  ]
);
const InputContainer = tw.div`relative w-full h-14 flex items-center `;
const InputError = tw.div`body-small text-error mt-1 indent-3`;

export type InputProps = {
  value?: string;
  classNames?: string;
  errors?: FieldErrors;
  trailingIcon?: string;
  label?: string;
} & Pick<
  React.ComponentProps<"input">,
  | "onChange"
  | "type"
  | "name"
  | "autoComplete"
  | "autoFocus"
  | "onBlur"
  | "defaultValue"
>;

 const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      classNames,
      trailingIcon,
      autoComplete,
      name = "",
      onChange,
      errors,
      type = "text",
      value,
      onBlur,
      defaultValue,
    }: InputProps,
    ref
  ) => {
    // const [value, setValue] = useState<string>("");

    const isShowClearButton = React.useMemo(() => {
      return false;
    }, [value]);

    const onChangeHandle: React.ChangeEventHandler<HTMLInputElement> = (
      event
    ) => {
      // setValue(event.target.value);
      onChange && onChange(event);
    };
    const onClearHandle = () => {
      // setValue("");
    };

    const errorMessage = () => {
      const [parentsName, indexName = -1, subName] = name.split(".") || "";
      if (!parentsName || !errors || !errors[parentsName]) {
        return false;
      }
      const indexNumber = indexName === -1 ? 0 : +indexName;
      const multipleMessage = errors[parentsName] as any;
      if (!subName) {
        return errors[parentsName]?.message;
      }
      return multipleMessage?.[indexNumber]?.[subName]?.message;
    };

    return (
      <div
        tw="cursor-text inline-flex flex-col w-full"
        className={classNames || ""}
      >
        <InputContainer>
          {trailingIcon && (
            <IconButton icon={trailingIcon} tw="absolute left-3"></IconButton>
          )}
          <InputMain
            defaultValue={defaultValue}
            trailingIcon={trailingIcon}
            ref={ref}
            autoComplete={autoComplete}
            name={name}
            value={value}
            onBlur={onBlur}
            onChange={onChangeHandle}
            type={type}
            placeholder={label}
            aria-invalid={errorMessage() ? "true" : "false"}
          />
          <InputLabel className="input-label" trailingIcon={!!trailingIcon}>
            {label}
          </InputLabel>
          {!!value && (
            <div tw="flex items-center absolute right-0">
              <IconButton onClick={onClearHandle} icon="close"></IconButton>
            </div>
          )}
        </InputContainer>
        {errorMessage() && <InputError>{errorMessage()}</InputError>}
      </div>
    );
  }
);

Input.displayName = "Input";


export default Input