// Contenedor de pantalla consistente.
// - Aplica SafeArea para evitar solaparse con el notch/barras.
// - Prop `scroll` permite pantallas con contenido largo (usa ScrollView).
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

export default function Screen({ children, scroll = false, contentStyle, style }) {
  if (scroll) {
    return (
      <SafeAreaView style={[styles.safe, style]}>
        <ScrollView contentContainerStyle={[styles.content, contentStyle]}>
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={[styles.safe, style]}>
      <View style={[styles.content, contentStyle]}>{children}</View>
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
    padding: 20,
  },
});
