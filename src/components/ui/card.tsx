import tw, { styled } from "twin.macro";
type CardType = "elevated" | "filled" | "outlined";
interface CardProps {
  type?: CardType;
}

export const Card = styled.div<CardProps>(({ type = "elevated" }) => [
  tw`overflow-hidden shadow-lg relative box-border rounded-2xl`,
  type === "elevated" &&
    tw`bg-surface shadow-md hover:after:w-[200%] hover:after:h-[200%] hover:after:bg-primary hover:after:opacity-[.08]
    hover:after:absolute hover:after:-z-10 hover:after:top-[-50%] hover:after:left-[-50%] hover:shadow-md
    active:after:w-[200%] active:after:h-[200%] active:after:bg-primary active:after:opacity-[.12] active:after:absolute active:after:top-[-50%] active:after:left-[-50%]
    active:shadow-md`,
  type === "filled" &&
    tw`bg-surface-variant 
  hover:after:w-[200%] hover:after:h-[200%] hover:after:bg-on-primary hover:after:opacity-[.08] hover:after:absolute hover:after:-z-10 hover:after:top-[-50%] hover:after:left-[-50%] hover:shadow-md
          active:after:w-[200%] active:after:h-[200%] active:after:bg-on-primary active:after:opacity-[.12] active:after:absolute active:after:top-[-50%] active:after:left-[-50%]`,
  type === "outlined" &&
    tw`bg-surface text-primary label-large border border-solid border-primary
   hover:after:w-[200%] hover:after:h-[200%] hover:after:bg-primary hover:after:opacity-[.08] hover:after:absolute hover:after:-z-10 hover:after:top-[-50%] hover:after:left-[-50%]
   active:after:w-[200%] active:after:h-[200%] active:after:bg-primary active:after:opacity-[.12] active:after:absolute active:after:top-[-50%] active:after:left-[-50%]`,
]);
