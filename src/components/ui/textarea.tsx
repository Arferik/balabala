import React, { forwardRef, useEffect, useState } from "react";
import { Button } from "./button";
import tw, { css, styled } from "twin.macro";
import { Icon } from "./icon";
import { type FieldErrors } from "react-hook-form";
const InputLabel = styled.label<{ isFocus: boolean }>(({ isFocus }) => [
  tw`body-large whitespace-nowrap overflow-hidden text-ellipsis absolute top-4 left-12 text-on-surface-variant transition-all`,
  isFocus && tw`body-small top-2`,
]);

const TextArea = tw.textarea`w-full pl-0 pr-2 h-6 bg-transparent relative inline-flex outline-none top-2`;
const InputContainer = styled.div<{ isFocus: boolean }>(({ isFocus }) => [
  tw`w-full flex ml-4
  before:(border-b border-on-surface-variant left-0 bottom-0 absolute right-0 pointer-events-none)
  after:(border-b-2 border-primary absolute right-0 left-0 pointer-events-none transform-gpu scale-x-0 bottom-0)`,
  css`
    transition: transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  `,
  isFocus &&
    css`
      &::after {
        transform: scaleX(1) translateX(0);
      }
    `,
]);
const InputError = tw.div`body-small text-error mt-1 indent-3`;

type TextAreaProps = {
  value?: string;
  classNames?: string;
  errors?: FieldErrors;
  trailingIcon?: React.ReactNode;
  label?: string;
} & Pick<
  React.ComponentProps<"textarea">,
  "onChange" | "name" | "autoComplete" | "autoFocus"
>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      classNames,
      trailingIcon,
      autoComplete,
      name = "",
      onChange,
      errors,
      autoFocus = false,
    }: TextAreaProps,
    ref
  ) => {
    const [isFocus, setFocus] = useState<boolean>(false);
    const [value, setValue] = useState<string>("");
    useEffect(() => {
      setFocus(autoFocus);
    }, [autoFocus]);
    const onChangeHandle: React.ChangeEventHandler<HTMLTextAreaElement> = (
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

      const indexNu = indexName === -1 ? 0 : +indexName;
      const mutiMessage = errors[parentsName] as any;
      if (!subName) {
        return errors[parentsName]?.message;
      }
      console.log("errorMessage", errorMessage);
      return mutiMessage?.[indexNu]?.[subName]?.message;
    };

    return (
      <div>
        <div
          tw="relative cursor-text inline-flex h-14
       rounded-t-md bg-surface-variant items-center text-on-surface w-full"
          className={classNames || ""}
        >
          {trailingIcon && (
            <span tw="ml-1.5 fill-on-surface-variant">{trailingIcon}</span>
          )}
          <InputContainer isFocus={isFocus}>
            <InputLabel isFocus={isFocus || value?.length !== 0}>
              {label}
            </InputLabel>
            <TextArea
              ref={ref}
              autoComplete={autoComplete}
              name={name === "" ? undefined : name}
              value={value}
              onChange={onChangeHandle}
              maxLength={512}
              onClick={() => {
                setFocus(true);
              }}
              onFocus={() => {
                setFocus(true);
              }}
              onBlur={() => {
                if (value.length === 0) {
                  setFocus(false);
                }
              }}
              aria-invalid={errors && errors[name] ? "true" : "false"}
            />
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

Textarea.displayName = "TextArea";
