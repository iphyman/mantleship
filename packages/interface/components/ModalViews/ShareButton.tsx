import { Button, ButtonProps } from "@chakra-ui/react";

interface Props extends ButtonProps {
  text: string;
}

export const ShareButton = (props: Props) => {
  const { colorScheme, text, ...rest } = props;
  const url = "https://mantleship.vercel.app";

  const handleClick = () => {
    switch (colorScheme) {
      case "twitter": {
        return window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
          "",
          "left=0,top=0,width=650,height=420,personalbar=0,toolbar=0,scrollbars=0,resizable=0"
        );
      }

      case "telegram": {
        return window.open(`https://t.me/share/url?url=${url}&text=${text}`);
      }

      case "pinterest": {
        return window.open(
          `http://pinterest.com/pin/create/button/?url=${encodeURIComponent(
            url
          )}`,
          "",
          "left=0,top=0,width=650,height=420,personalbar=0,toolbar=0,scrollbars=0,resizable=0"
        );
      }

      case "messenger": {
        return window.open(`mailto:?body=${encodeURIComponent(text)}`, "_self");
      }

      default: {
        return;
      }
    }
  };

  return <Button colorScheme={colorScheme} onClick={handleClick} {...rest} />;
};
