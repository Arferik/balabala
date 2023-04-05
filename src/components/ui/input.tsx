import React, { forwardRef, useState } from "react";
import { Button } from "./button";
import tw, { css, styled } from "twin.macro";
import { Icon } from "./icon";
import { type FieldErrors } from "react-hook-form";

const InputLabel = styled.label(() => [
  tw`body-large absolute pointer-events-none top-4 left-12 text-on-surface-variant transition-all`,
]);

const InputMain = styled.input(() => [
  tw`m-0 bg-transparent outline-none placeholder-shown:placeholder:(text-transparent) 
  w-full h-full border-outline border text-on-surface rounded-md `,
  css`
    &:not(:placeholder-shown) ~ .input-label,
    &:focus ~ .input-label {
      background: var(--md-sys-color-surface);
      transform: scale(0.75) translate(-2px, -36px);
    }
    &:focus {
      border-color: var(--md-sys-color-primary) !important;
    }
  `,
]);
const InputContainer = tw.div`relative w-full h-full `;
const InputError = tw.div`body-small text-error mt-1 indent-3`;

export type InputProps = {
  value?: string;
  classNames?: string;
  errors?: FieldErrors;
  trailingIcon?: React.ReactNode;
  label?: string;
} & Pick<
  React.ComponentProps<"input">,
  "onChange" | "type" | "name" | "autoComplete" | "autoFocus"
>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
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
    }: InputProps,
    ref
  ) => {
    const [value, setValue] = useState<string>("");

    const onChangeHandle: React.ChangeEventHandler<HTMLInputElement> = (
      event
    ) => {
      setValue(event.target.value);
      onChange && onChange(event);
    };

    const onClearHandle = () => {
      setValue("");
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
      <div>
        <div
          tw="relative cursor-text inline-flex h-14 
         items-center  w-full"
          className={classNames || ""}
        >
          {trailingIcon && (
            <span tw="ml-1.5 fill-on-surface-variant">{trailingIcon}</span>
          )}
          <InputContainer>
            <InputMain
              ref={ref}
              autoComplete={autoComplete}
              name={name}
              value={value}
              onChange={onChangeHandle}
              type={type}
              placeholder={label}
              aria-invalid={errorMessage() ? "true" : "false"}
            />
            <InputLabel className="input-label">{label}</InputLabel>
          </InputContainer>
          {value?.length !== 0 && (
            <Button
              onClick={onClearHandle}
              type="text"
              icon={
                <Icon name="close-circle" tw="fill-on-surface-variant"></Icon>
              }
            ></Button>
          )}
        </div>
        {errorMessage() && <InputError>{errorMessage()}</InputError>}
      </div>
    );
  }
);

Input.displayName = "Input";
