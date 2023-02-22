import { HTMLChakraProps, chakra, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

export const NavLink = (props: HTMLChakraProps<"a">) => {
  const { href, ...rest } = props;
  const { pathname } = useRouter();

  return (
    <Link href={href as string} legacyBehavior passHref>
      <chakra.a
        aria-current={pathname === href ? "page" : undefined}
        padding="1 3"
        borderRadius="full"
        transition="all 0.2s ease"
        color={useColorModeValue("gray.600", "whiteAlpha.800")}
        fontWeight={600}
        _hover={{ bg: useColorModeValue("gray.100", "whiteAlpha.100") }}
        _activeLink={{
          fontWeight: "semibold",
          color: "teal.500",
        }}
        {...rest}
      />
    </Link>
  );
};
