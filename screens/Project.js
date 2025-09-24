// Pantalla "Proyectos": ejemplo de tarjeta con entrada animada y soporte de scroll.
import React from 'react';
import { Text, StyleSheet, View, Platform, useWindowDimensions } from 'react-native';
import Screen from '../components/Screen';
import FadeInView from '../components/FadeInView';

const Project = () => {
	const { width } = useWindowDimensions();
	const isDesktop = Platform.OS === 'web' && width >= 1024;
	return (
    <Screen scroll>
      <FadeInView>
				<Text style={[styles.title, isDesktop && styles.titleDesktop]}>Proyectos</Text>
      </FadeInView>
      <FadeInView delay={100}>
				<View style={[styles.card, isDesktop && styles.cardDesktop]}>
					<Text style={[styles.text, isDesktop && styles.textDesktop]}>Aquí se mostrarán los proyectos realizados por el ingeniero de sistemas.</Text>
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
	titleDesktop: { fontSize: 30 },
	text: {
		fontSize: 16,
		color: '#b0b0b0',
		textAlign: 'center',
		lineHeight: 22,
		marginHorizontal: 8,
		marginBottom: 8,
	},
	textDesktop: { fontSize: 18, lineHeight: 26 },
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
	cardDesktop: { maxWidth: 560 },
});

export default Project;
