import { useMediaQuery, useTheme } from '@chakra-ui/react';

export default function useScreenSize(): boolean {
    const theme = useTheme();
    const [isDesktop] = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);

    return isDesktop;
}
