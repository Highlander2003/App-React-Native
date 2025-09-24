// Pantalla "Habilidades": lista de barras de progreso animadas.
// Nota: `useNativeDriver: false` porque animamos width (propiedad de layout).
import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Screen from '../components/Screen';
import FadeInView from '../components/FadeInView';

const skillsData = [
	{ name: 'Programación', level: 0.95 },
	{ name: 'Bases de datos', level: 0.85 },
	{ name: 'Redes', level: 0.8 },
	{ name: 'Seguridad informática', level: 0.75 },
	{ name: 'Desarrollo móvil', level: 0.9 },
	{ name: 'Gestión de proyectos', level: 0.7 },
	{ name: 'Cloud Computing', level: 0.65 },
];

const Skills = () => {
	return (
		<Screen scroll>
			<FadeInView>
				<Text style={styles.title}>Mis Habilidades</Text>
			</FadeInView>
			{skillsData.map((skill, idx) => (
				<SkillBar key={idx} name={skill.name} level={skill.level} delay={idx * 150} />
			))}
		</Screen>
	);
};

const SkillBar = ({ name, level, delay }) => {
	const widthAnim = useRef(new Animated.Value(0)).current;
	const fadeAnim = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		Animated.parallel([
			Animated.timing(widthAnim, {
				toValue: level * 100,
				duration: 900,
				delay,
				useNativeDriver: false,
			}),
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 700,
				delay,
				useNativeDriver: true,
			})
		]).start();
	}, [widthAnim, fadeAnim, level, delay]);

	return (
		<Animated.View style={[styles.skillContainer, { opacity: fadeAnim }]}> 
			<Text style={styles.skill}>{name}</Text>
			<View style={styles.progressBg}>
				<Animated.View style={[styles.progressBar, { width: widthAnim.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }) }]} />
			</View>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,
		color: '#e0e0e0',
	},
	skillContainer: {
		width: '100%',
		marginBottom: 18,
	},
	skill: {
		fontSize: 18,
		marginBottom: 6,
		color: '#e0e0e0',
	},
	progressBg: {
		width: '100%',
		height: 10,
		backgroundColor: '#22232b',
		borderRadius: 5,
		overflow: 'hidden',
	},
	progressBar: {
		height: 10,
		backgroundColor: '#00c6cf',
		borderRadius: 5,
	},
});

export default Skills;
