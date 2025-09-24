import React from "react";
import { Text, StyleSheet, View, Platform, useWindowDimensions } from "react-native";
import Screen from "../components/Screen";
import FadeInView from "../components/FadeInView";
import PrimaryButton from "../components/PrimaryButton";

export default function AboutMe({ navigation }) {
  const { width } = useWindowDimensions();
  const isDesktop = Platform.OS === 'web' && width >= 1024;
  return (
    // Pantalla "Sobre mí": estructura simple, animaciones de entrada y botones de navegación.
    <Screen>
      <FadeInView>
        <Text style={[styles.title, isDesktop && styles.titleDesktop]}>Sobre mí</Text>
      </FadeInView>
      <FadeInView delay={100}>
        <Text style={[styles.text, isDesktop && styles.textDesktop]}>Mi nombre es Luis Fernando Caicedo</Text>
        <Text style={[styles.text, isDesktop && styles.textDesktop]}>Estudio Ingeniería de Sistemas en la</Text>
        <Text style={[styles.text, isDesktop && styles.textDesktop]}>Institución Universitaria Antonio José Camacho</Text>
      </FadeInView>
      {/* Botones de navegación con estilo consistente */}
      <FadeInView style={styles.buttonContainer} delay={200}>
        <PrimaryButton label="Ver mis habilidades" onPress={() => navigation.navigate("Skills")} />
        <View style={{ height: 12 }} />
        <PrimaryButton label="Proyecto del curso" onPress={() => navigation.navigate("Project")} />
      </FadeInView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#e0e0e0",
    marginBottom: 16,
    textAlign: 'center',
  },
  titleDesktop: { fontSize: 26 },
  text: {
    fontSize: 16,
    color: "#e0e0e0",
    marginBottom: 8,
    textAlign: "center",
  },
  textDesktop: { fontSize: 18 },
  buttonContainer: {
    width: "100%",
    marginTop: 16,
    alignItems: 'center',
  },
});