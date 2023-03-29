import React from "react";
import tw, { styled } from "twin.macro";

type ButtonType = "elevated" | "filled" | "outlined" | "text" | "tonal";

interface ButtonWrapperProps {
  disabled?: boolean;
  icon?: React.ReactNode;
  btnChildNode?: React.ReactNode;
  mdType?: ButtonType;
}

interface ButtonProps {
  disabled?: boolean;
  icon?: React.ReactNode;
  type?: ButtonType;
  children?: React.ReactNode;
  nativeType?: "button" | "submit" | "reset";
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const BaseButton = tw.button`inline-flex justify-center items-center
                      relative overflow-hidden cursor-pointer leading-none
                      appearance-none box-border outline-none m-0
                      rounded-full h-10`;

const ButtonWrapper = styled(BaseButton)<ButtonWrapperProps>(
  ({ mdType, disabled, icon, btnChildNode }) => [
    icon ? tw`h-[46px]` : tw`pl-6 pr-6`,
    !btnChildNode && tw`px-3`,
    mdType === "elevated" &&
      tw`!bg-surface text-primary label-large shadow-sm
  hover:after:w-[200%] hover:after:h-[200%] hover:after:bg-primary
  hover:after:opacity-[.08] hover:after:absolute hover:after:top-[-50%]
  hover:after:left-[-50%] hover:shadow-md
  active:after:w-[200%] active:after:h-[200%] active:after:bg-primary active:after:opacity-[.12]
  active:after:absolute active:after:top-[-50%] active:after:left-[-50%]
  active:shadow-md`,
    mdType === "filled" &&
      tw`!bg-primary text-on-primary label-large
  hover:after:w-[200%] hover:after:h-[200%] hover:after:bg-on-primary 
  hover:after:opacity-[.08] hover:after:absolute hover:after:top-[-50%]
  hover:after:left-[-50%] hover:shadow-md
  active:after:w-[200%] active:after:h-[200%] active:after:bg-on-primary active:after:opacity-[.12]
   active:after:absolute active:after:top-[-50%] active:after:left-[-50%]`,
    mdType === "outlined" &&
      tw`!bg-surface text-primary label-large border border-solid border-primary
   hover:after:w-[200%] hover:after:h-[200%]
   hover:after:bg-primary hover:after:opacity-[.08]
   hover:after:absolute hover:after:top-[-50%] hover:after:left-[-50%]
   active:after:w-[200%] active:after:h-[200%]
   active:after:bg-primary active:after:opacity-[.12]
   active:after:absolute active:after:top-[-50%] active:after:left-[-50%]`,
    mdType === "text" &&
      tw`text-primary label-large 
    hover:after:w-[200%] hover:after:h-[200%] hover:after:bg-primary
    hover:after:opacity-[.08] hover:after:absolute
    hover:after:top-[-50%] hover:after:left-[-50%]
    active:after:w-[200%] active:after:h-[200%] active:after:bg-primary
    active:after:opacity-[.12] active:after:absolute active:after:top-[-50%] active:after:left-[-50%]`,
    mdType === "tonal" &&
      tw`!bg-secondary-container text-on-secondary-container label-large 
 hover:after:w-[200%] hover:after:h-[200%] hover:after:bg-on-secondary-container
 hover:after:opacity-[.08] hover:after:absolute hover:after:top-[-50%]
 hover:after:left-[-50%] hover:shadow-md
 active:after:w-[200%] active:after:h-[200%] active:after:bg-on-secondary-container
 active:after:opacity-[.12] active:after:absolute
 active:after:top-[-50%] active:after:left-[-50%]`,
    disabled &&
      mdType === "text" &&
      tw`cursor-not-allowed !bg-transparent
  after:w-[200%] after:h-[200%] after:bg-on-surface after:opacity-[.12] after:absolute after:top-[-50%] after:left-[-50%]
  hover:after:w-[200%] hover:after:h-[200%] hover:after:bg-on-surface
   hover:after:opacity-[.12] hover:after:absolute
   hover:after:top-[-50%] hover:after:left-[-50%] hover:shadow-none
  active:after:w-[200%] active:after:h-[200%]
   active:after:bg-on-surface active:after:opacity-[.12] active:after:absolute active:after:top-[-50%] active:after:left-[-50%]`,

    disabled &&
      mdType === "outlined" &&
      tw`cursor-not-allowed !bg-transparent
    after:w-[200%] after:h-[200%] after:bg-on-surface after:opacity-0
     after:absolute after:top-[-50%] after:left-[-50%]
    hover:after:w-[200%] hover:after:h-[200%]
     hover:after:bg-on-surface hover:after:opacity-0 
     hover:after:absolute hover:after:top-[-50%] hover:after:left-[-50%] hover:shadow-none
    active:after:w-[200%] active:after:h-[200%] 
    active:after:bg-on-surface active:after:opacity-0 active:after:absolute active:after:top-[-50%] active:after:left-[-50%]`,
    disabled &&
      tw`cursor-not-allowed !bg-transparent
  after:w-[200%] after:h-[200%] after:bg-on-surface after:opacity-0 after:absolute after:top-[-50%] after:left-[-50%]
  hover:after:w-[200%] hover:after:h-[200%] hover:after:bg-on-surface hover:after:opacity-0 hover:after:absolute hover:after:top-[-50%] hover:after:left-[-50%] hover:shadow-none
  active:after:w-[200%] active:after:h-[200%] active:after:bg-on-surface active:after:opacity-0 active:after:absolute active:after:top-[-50%] active:after:left-[-50%]`,
  ]
);

const TextSpan = styled.span<{ icon?: React.ReactNode }>(({ icon }) => [
  icon && tw`ml-1`,
]);

const IconSpan = styled.div<{ icon?: React.ReactNode }>(({ icon }) => [
  tw`text-2xl w-8 h-[1.125rem] overflow-hidden`,
]);

export const Button: React.FC<ButtonProps> = ({
  icon,
  children,
  type = "elevated",
  disabled,
  className,
  onClick,
  nativeType = "button",
}) => {
  return (
    <ButtonWrapper
      onClick={onClick}
      mdType={type}
      disabled={disabled}
      type={nativeType}
      className={className}
      btnChildNode={children}
    >
      {icon && <IconSpan>{icon}</IconSpan>}
      {children && <TextSpan icon={icon}>{children}</TextSpan>}
    </ButtonWrapper>
  );
};
