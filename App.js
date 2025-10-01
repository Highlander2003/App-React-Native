// Punto de entrada de la app. Aquí configuramos navegación y precarga de assets.
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AboutMe from './screens/AboutMe';
import Project from './screens/Project';
import ResponsiveCards from './screens/ResponsiveCards';
import Skills from './screens/Skills';
import CameraSensor from './screens/CameraSensor';
import AccelerometerSensor from './screens/AccelerometerSensor';
// Componentes reutilizables para mantener la UI consistente y simple
import Screen from './components/Screen';
import FadeInView from './components/FadeInView';
import PrimaryButton from './components/PrimaryButton';
// Hook que precarga y cachea assets manteniendo visible el SplashScreen hasta que todo esté listo
import usePreloadAssets from './utils/usePreloadAssets';
// Assets estáticos a precargar (mejora la primera renderización)
import icon from './assets/icon.png';
import splashIcon from './assets/splash-icon.png';
import adaptiveIcon from './assets/adaptive-icon.png';

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  // Pantalla de inicio minimalista con animaciones suaves y botones primarios
  return (
    <Screen>
      {/* Texto de bienvenida con animación de entrada */}
      <FadeInView>
        <Text style={styles.description}>
          Bienvenido a mi portafolio como Ingeniero de Sistemas. Explora para conocer más sobre mí, mis proyectos y habilidades.
        </Text>
      </FadeInView>
      {/* Grupo de botones con estilo unificado */}
      <FadeInView style={styles.buttonContainer}>
        {[
          { label: 'Sobre mí', screen: 'AboutMe' },
          { label: 'Proyectos', screen: 'Project' },
          { label: 'Habilidades', screen: 'Skills' },
          { label: 'Tarjetas Responsivas', screen: 'ResponsiveCards' },
          { label: 'Cámara (Sensor)', screen: 'CameraSensor' },
          { label: 'Acelerómetro (Sensor)', screen: 'AccelerometerSensor' },
        ].map((btn) => (
          // PrimaryButton aplica feedback de presión y estilo consistente
          <PrimaryButton key={btn.screen} label={btn.label} onPress={() => navigation.navigate(btn.screen)} />
        ))}
      </FadeInView>
    </Screen>
  );
}

export default function App() {
  // Precarga de assets. Mientras no esté listo, mantenemos visible el Splash (retornando null)
  const ready = usePreloadAssets([icon, splashIcon, adaptiveIcon]);
  if (!ready) return null; // SplashScreen is visible until ready

  return (
    // Contenedor de navegación (stack simple entre Home, AboutMe, Project y Skills)
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} />
        <Stack.Screen name="AboutMe" component={AboutMe} options={{ title: 'Sobre mí' }} />
        <Stack.Screen name="Project" component={Project} options={{ title: 'Proyectos' }} />
        <Stack.Screen name="Skills" component={Skills} options={{ title: 'Habilidades' }} />
        <Stack.Screen name="ResponsiveCards" component={ResponsiveCards} options={{ title: 'Tarjetas' }} />
        <Stack.Screen name="CameraSensor" component={CameraSensor} options={{ title: 'Cámara' }} />
        <Stack.Screen name="AccelerometerSensor" component={AccelerometerSensor} options={{ title: 'Acelerómetro' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  // Estilos base para el texto y la agrupación de botones en Home
  description: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    color: '#e0e0e0',
    letterSpacing: 0.5,
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
    marginTop: 10,
    alignItems: 'center',
  },
});
