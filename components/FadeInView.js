// Animación de entrada genérica: fade + desplazamiento vertical.
// Props:
// - delay: retardo antes de iniciar
// - duration: duración del fade
// - initialOffset: desplazamiento Y inicial
// Uso: envolver cualquier contenido para entrada suave en pantalla
import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

// Fade + translateY on mount for simple entrance animations
export default function FadeInView({
  children,
  delay = 0,
  duration = 900,
  initialOffset = 40,
  style,
}) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(initialOffset)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        delay,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        friction: 6,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, translateY, delay, duration]);

  return (
    <Animated.View style={[{ opacity, transform: [{ translateY }] }, style]}>
      {children}
    </Animated.View>
  );
}
