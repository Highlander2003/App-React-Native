// Pantalla de tarjetas que demuestran diseño responsivo (flex + porcentajes)
// y diseño adaptativo (useWindowDimensions para cambiar el layout >= 600px).
import React from 'react';
import { View, Text, StyleSheet, Image, useWindowDimensions } from 'react-native';
import Screen from '../components/Screen';
import FadeInView from '../components/FadeInView';

import icon from '../assets/icon.png';
import splashIcon from '../assets/splash-icon.png';
import adaptiveIcon from '../assets/adaptive-icon.png';

export default function ResponsiveCards() {
  const { width } = useWindowDimensions();
  const isTablet = width >= 600; // Punto de corte adaptativo

  // Contenido de las 3 tarjetas solicitado
  const cards = [
    {
      id: 'desc',
      title: 'Descripción de la app',
      text:
        'Esta aplicación demo muestra cómo aplicar diseño responsivo y adaptativo en React Native con Expo. Las tarjetas cambian de distribución según el tamaño de pantalla.',
      image: icon,
    },
    {
      id: 'tech',
      title: 'Tecnologías usadas',
      text:
        'React Native, Expo, React Navigation, Animated API, Safe Area, y componentes propios reutilizables para botones, pantallas y animaciones.',
      image: splashIcon,
    },
    {
      id: 'team',
      title: 'Proyecto e integrantes',
      text:
        'Proyecto: Diseño Responsivo y Adaptativo. Integrantes: Luis Fernando Caicedo (Desarrollador/Estudiante).',
      image: adaptiveIcon,
    },
  ];

  return (
    // Usamos scroll para permitir ver todo en pantallas pequeñas
    <Screen scroll contentStyle={[styles.container, isTablet ? styles.containerTablet : styles.containerMobile]}>
      <FadeInView>
        <Text style={styles.header}>Tarjetas Responsivas y Adaptativas</Text>
      </FadeInView>
      <View style={styles.grid}>
        {cards.map((c, idx) => (
          <FadeInView key={c.id} delay={idx * 100} style={[styles.card, { width: isTablet ? '45%' : '100%' }]}>
            {/* Adaptativo: en tablet mostramos la imagen a la izquierda y el texto a la derecha */}
            <View style={[styles.cardInner, isTablet ? styles.row : styles.column]}>
              <Image source={c.image} style={[styles.image, isTablet ? styles.imageTablet : styles.imageMobile]} resizeMode="contain" />
              <View style={styles.textBox}>
                <Text style={styles.title}>{c.title}</Text>
                <Text style={styles.text}>{c.text}</Text>
              </View>
            </View>
          </FadeInView>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    paddingTop: 10,
    gap: 12,
  },
  containerMobile: {
    // En móvil, una sola columna (las tarjetas ocuparán 100%)
  },
  containerTablet: {
    // En tablet, permitimos múltiples columnas usando el grid con flexWrap
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    color: '#e0e0e0',
    textAlign: 'center',
    marginBottom: 8,
  },
  grid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap', // Responsivo: permite múltiples columnas automáticamente
    justifyContent: 'space-between',
    gap: 12,
  },
  card: {
    backgroundColor: '#22232b',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 2,
  },
  cardInner: {
    alignItems: 'center',
    gap: 12,
  },
  row: { flexDirection: 'row' },
  column: { flexDirection: 'column' },
  image: {
    backgroundColor: '#1b1c23',
    borderRadius: 8,
  },
  imageMobile: {
    width: '100%',
    height: 100,
  },
  imageTablet: {
    width: 90,
    height: 90,
  },
  textBox: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#e0e0e0',
    marginBottom: 6,
  },
  text: {
    fontSize: 15,
    color: '#c9c9c9',
    lineHeight: 21,
  },
});
