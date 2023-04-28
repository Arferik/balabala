import tw, { css, styled } from "twin.macro";
import Icon from "../Icon/Icon";
import { unit } from "../../utils/materialCommon";

export type ChipType = "assist" | "filter" | "input" | "suggestion";

interface ChipProps {
  variant?: ChipType;
  icon?: string;
  text?: string;
  disabled?: boolean;
}

const ChipBase = tw.button`h-8 rounded-lg flex items-center`;

const ChipRoot = styled(ChipBase)<ChipProps>(
  ({ variant = "assist", disabled }) => {
    return [
      variant === "assist" && [
        disabled
          ? css`
              &:disabled {
                border: ${unit(1)} solid var(--color-outline);
              }
            `
          : tw`border border-outline bg-surface-container-low shadow`,
      ],
    ];
  }
);

const IconRoot = styled(Icon)<{ chipVariant: ChipType }>(
  ({ chipVariant = "assist" }) => {
    return [chipVariant === "assist" && tw`text-primary `];
  }
);

const ChipTextRoot = styled.span<ChipProps>(({ variant = "assist" }) => {
  return [variant === "assist" && [tw`text-on-surface label-large`]];
});

const Chip: React.FC<ChipProps> = ({
  variant = "assist",
  text = "",
  icon = "",
  disabled,
}) => {
  return (
    <ChipRoot variant={variant} disabled={disabled}>
      {icon && <IconRoot name={icon} chipVariant={variant}></IconRoot>}
      <span></span>
      <ChipTextRoot>{text}</ChipTextRoot>
    </ChipRoot>
  );
};

export default Chip;
