import Image from "next/image";
import tw from "twin.macro";
interface AvatarProps {
  src?: string;
  alt: string;
  className?: string;
}

const NoImageContainer = tw.div`
 w-14 h-14 bg-on-background text-on-primary title-large rounded-full
 text-center [line-height: 3.5rem]
`;

export const Avatar: React.FC<AvatarProps> = ({ src, alt, className }) => {
  if (!src) {
    return <NoImageContainer className={className}>{alt}</NoImageContainer>;
  }
  return (
    <>
      <Image
        src={src}
        alt={alt}
        width={56}
        height={56}
        className={className}
      ></Image>
    </>
  );
};
