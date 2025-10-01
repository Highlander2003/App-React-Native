// Contenedor de pantalla consistente.
// - Aplica SafeArea para evitar solaparse con el notch/barras.
// - Prop `scroll` permite pantallas con contenido largo (usa ScrollView).
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useBreakpoint, { getContainerMaxWidth } from '../utils/useBreakpoint';

export default function Screen({ children, scroll = false, contentStyle, style }) {
  const { width, isWeb, name } = useBreakpoint();
  const maxWidth = getContainerMaxWidth(width);

  const containerStyle = [
    styles.content,
    // Centramos y limitamos ancho en pantallas grandes
    isWeb && { alignSelf: 'center', width: '100%', maxWidth },
    // Ajuste de padding según breakpoint
    name === 'sm' ? styles.padSm : name === 'md' ? styles.padMd : styles.padLg,
    contentStyle,
  ];

  if (scroll) {
    return (
      <SafeAreaView style={[styles.safe, style]}>
        <ScrollView contentContainerStyle={containerStyle}>{children}</ScrollView>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={[styles.safe, style]}>
      <View style={containerStyle}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Fondo y altura completa por defecto
  safe: { flex: 1, backgroundColor: '#181a20' },
  content: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  padSm: { paddingHorizontal: 16, paddingVertical: 16 },
  padMd: { paddingHorizontal: 20, paddingVertical: 18 },
  padLg: { paddingHorizontal: 24, paddingVertical: 20 },
});
