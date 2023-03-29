import tw, { css, styled } from "twin.macro";

const CheckboxRoot = styled.input(() => [
  tw`align-middle outline-none appearance-none
   top-1 left-1 absolute z-10 opacity-0 w-7 h-7
    cursor-pointer
  `,
  css`
    &:checked + label {
      background: var(--md-sys-color-primary);
      border-color: var(--md-sys-color-primary);
    }
    &:checked + label::after {
      content: "";
      position: absolute;
      left: 16px;
      top: 11px;
      width: 5px;
      height: 12px;
      border-right: 2px solid var(--md-sys-color-on-primary);
      border-bottom: 2px solid var(--md-sys-color-on-primary);
      transform: rotate(45deg);
    }
  `,
]);

const CheckboxLabel = styled.label(() => [
  tw`w-5 h-5 border border-on-surface rounded`,
]);

export const Checkbox: React.FC<{
  name: string;
}> = ({ name }) => {
  return (
    <div tw="relative w-5 h-5 p-2 box-content flex items-center justify-center">
      <CheckboxRoot name={name} id={name} type="checkbox"></CheckboxRoot>
      <CheckboxLabel htmlFor={name}></CheckboxLabel>
    </div>
  );
};
