// Hook de breakpoints simples para RN/RN Web
// sm: <600, md: >=600, lg: >=900, xl: >=1200
import { useWindowDimensions, Platform } from 'react-native';

export const BREAKPOINTS = {
  md: 600,
  lg: 900,
  xl: 1200,
};

export default function useBreakpoint() {
  const { width, height, scale, fontScale } = useWindowDimensions();
  const isWeb = Platform.OS === 'web';

  const isMd = width >= BREAKPOINTS.md;
  const isLg = width >= BREAKPOINTS.lg;
  const isXl = width >= BREAKPOINTS.xl;

  let name = 'sm';
  if (isXl) name = 'xl';
  else if (isLg) name = 'lg';
  else if (isMd) name = 'md';

  return { width, height, scale, fontScale, isWeb, isMd, isLg, isXl, name };
}

export function getContainerMaxWidth(width) {
  if (width >= BREAKPOINTS.xl) return 1200;
  if (width >= BREAKPOINTS.lg) return 1000;
  if (width >= BREAKPOINTS.md) return 760;
  return undefined; // ancho fluido en móviles
}
