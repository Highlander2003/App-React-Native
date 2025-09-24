// Pantalla "Proyectos": ejemplo de tarjeta con entrada animada y soporte de scroll.
import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Screen from '../components/Screen';
import FadeInView from '../components/FadeInView';

const Project = () => {
  return (
    <Screen scroll>
      <FadeInView>
        <Text style={styles.title}>Proyectos</Text>
      </FadeInView>
      <FadeInView delay={100}>
        <View style={styles.card}>
          <Text style={styles.text}>Aquí se mostrarán los proyectos realizados por el ingeniero de sistemas.</Text>
        </View>
      </FadeInView>
    </Screen>
  );
};

const styles = StyleSheet.create({
	title: {
		fontSize: 26,
		fontWeight: '600',
		color: '#e0e0e0',
		marginBottom: 16,
		letterSpacing: 1,
	},
	text: {
		fontSize: 16,
		color: '#b0b0b0',
		textAlign: 'center',
		lineHeight: 22,
		marginHorizontal: 8,
		marginBottom: 8,
	},
	card: {
		backgroundColor: '#22232b',
		borderRadius: 12,
		padding: 18,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.12,
		shadowRadius: 8,
		elevation: 2,
		marginVertical: 8,
		width: '100%',
		maxWidth: 350,
	},
});

export default Project;
