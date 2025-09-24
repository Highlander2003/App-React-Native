// Botón primario reutilizable con animación de presión.
// Props: label, onPress, disabled, style, textStyle.
// Mejora accesibilidad/consistencia y evita repetir estilos de botones.
import React, { useRef } from 'react';
import { Text, TouchableOpacity, Animated, StyleSheet, Platform, useWindowDimensions } from 'react-native';

export default function PrimaryButton({ label, onPress, style, textStyle, disabled }) {
  const pressAnim = useRef(new Animated.Value(1)).current;
  const { width } = useWindowDimensions();
  const isDesktop = Platform.OS === 'web' && width >= 900;

  const handlePressIn = () => {
    Animated.spring(pressAnim, { toValue: 0.96, friction: 4, useNativeDriver: true }).start();
  };
  const handlePressOut = () => {
    Animated.spring(pressAnim, { toValue: 1, friction: 4, useNativeDriver: true }).start();
  };

  return (
    <Animated.View style={[{ transform: [{ scale: pressAnim }] }, style]}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        style={[styles.button, isDesktop && styles.buttonDesktop, disabled && styles.disabled]}
      >
        <Text style={[styles.text, isDesktop && styles.textDesktop, textStyle]}>{label}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#22232b',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#00c6cf',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 4,
    minWidth: 200,
  },
  buttonDesktop: {
    minWidth: 260,
    paddingVertical: 16,
    // RN Web: cursor pointer
    cursor: 'pointer',
  },
  text: {
    color: '#00c6cf',
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  textDesktop: {
    fontSize: 18,
  },
  disabled: {
    opacity: 0.6,
  },
});
