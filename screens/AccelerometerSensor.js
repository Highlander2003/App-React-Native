// Pantalla para usar el acelerómetro con expo-sensors
// Muestra valores x,y,z, controla frecuencia y una bolita que se mueve según inclinación
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, Switch, Platform, TouchableOpacity } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import Screen from '../components/Screen';

const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

export default function AccelerometerSensor() {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });
  const [enabled, setEnabled] = useState(true);
  const [interval, setInterval] = useState(100); // ms
  const subRef = useRef(null);
  const lastTsRef = useRef(0); // para throttle en web
  const [webPerm, setWebPerm] = useState('unknown'); // 'unknown' | 'granted' | 'denied' (solo web)

  // Nativo: usar expo-sensors
  useEffect(() => {
    if (Platform.OS === 'web') return;
    if (enabled) {
      subRef.current = Accelerometer.addListener(setData);
    }
    Accelerometer.setUpdateInterval(interval);
    return () => {
      subRef.current?.remove?.();
      subRef.current = null;
    };
  }, [enabled, interval]);

  // Web: usar DeviceMotion con permiso explícito (iOS/Safari), throttling por interval
  useEffect(() => {
    if (Platform.OS !== 'web') return;
    if (!enabled || webPerm !== 'granted') return;

    const handler = (e) => {
      const now = Date.now();
      if (now - lastTsRef.current < interval) return;
      lastTsRef.current = now;
      const acc = e.accelerationIncludingGravity || e.acceleration;
      if (!acc) return;
      const { x = 0, y = 0, z = 0 } = acc;
      // Ajuste simple: invertir x para simular mismo sentido que nativo
      setData({ x: x / 9.81, y: y / 9.81, z: z / 9.81 });
    };
    window.addEventListener('devicemotion', handler);
    return () => {
      window.removeEventListener('devicemotion', handler);
    };
  }, [enabled, interval, webPerm]);

  const requestWebPermission = async () => {
    if (Platform.OS !== 'web') return;
    try {
      const anyWin = window;
      const DME = anyWin?.DeviceMotionEvent;
      if (typeof DME?.requestPermission === 'function') {
        const res = await DME.requestPermission();
        setWebPerm(res === 'granted' ? 'granted' : 'denied');
      } else {
        // Navegadores que no requieren permiso explícito
        setWebPerm('granted');
      }
    } catch (e) {
      setWebPerm('denied');
    }
  };

  const toggle = () => {
    setEnabled((e) => {
      const next = !e;
      if (Platform.OS !== 'web') {
        if (next && !subRef.current) {
          subRef.current = Accelerometer.addListener(setData);
        } else if (!next && subRef.current) {
          subRef.current.remove();
          subRef.current = null;
        }
      }
      return next;
    });
  };

  // Mapeo de x,y a posición de la bolita
  const radius = 18;
  const box = 220;
  const center = box / 2 - radius;
  const offsetX = clamp(-(data.x || 0) * center, -center, center);
  const offsetY = clamp((data.y || 0) * center, -center, center);

  const bgColor = useMemo(() => {
    const x = data.x ?? 0;
    const y = data.y ?? 0;
    const ax = Math.abs(x);
    const ay = Math.abs(y);
    const threshold = 0.2;
    if (Math.max(ax, ay) < threshold) return '#181a20'; // casi plano
    if (ax > ay) {
      return x > 0 ? '#b71c1c' : '#0d47a1'; // X+ rojo | X- azul
    } else {
      return y > 0 ? '#ff6f00' : '#1b5e20'; // Y+ naranja | Y- verde
    }
  }, [data.x, data.y]);

  return (
    <Screen style={{ backgroundColor: bgColor }}>
      <Text style={styles.title}>Acelerómetro</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Suscripción</Text>
        <Switch value={enabled} onValueChange={toggle} />
      </View>
      <View style={[styles.row, { gap: 8 }]}>
        <Text style={styles.label}>Intervalo:</Text>
        <TouchableOpacity style={styles.stepBtn} onPress={() => setInterval((v) => Math.max(16, v - 16))}>
          <Text style={styles.stepTxt}>-16</Text>
        </TouchableOpacity>
        <Text style={styles.value}>{interval} ms</Text>
        <TouchableOpacity style={styles.stepBtn} onPress={() => setInterval((v) => Math.min(1000, v + 16))}>
          <Text style={styles.stepTxt}>+16</Text>
        </TouchableOpacity>
      </View>

      {Platform.OS === 'web' && webPerm !== 'granted' && (
        <TouchableOpacity style={[styles.stepBtn, { marginTop: 8 }]} onPress={requestWebPermission}>
          <Text style={styles.stepTxt}>
            {webPerm === 'denied' ? 'Permiso rechazado. Reintentar' : 'Activar sensor (permiso)'}
          </Text>
        </TouchableOpacity>
      )}

      <View style={[styles.box, { width: box, height: box }]}> 
        <View
          style={[
            styles.ball,
            {
              width: radius * 2,
              height: radius * 2,
              transform: [
                { translateX: center + offsetX },
                { translateY: center + offsetY },
              ],
            },
          ]}
        />
      </View>

      <View style={styles.values}>
        <Text style={styles.value}>x: {data.x?.toFixed(3)}</Text>
        <Text style={styles.value}>y: {data.y?.toFixed(3)}</Text>
        <Text style={styles.value}>z: {data.z?.toFixed(3)}</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: 'bold', color: '#e0e0e0', marginBottom: 16 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  label: { color: '#e0e0e0' },
  box: {
    backgroundColor: '#22232b',
    borderRadius: 16,
    marginVertical: 20,
    overflow: 'hidden',
  },
  ball: {
    position: 'absolute',
    backgroundColor: '#00c6cf',
    borderRadius: 999,
    shadowColor: '#00c6cf',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
  },
  values: { flexDirection: 'row', gap: 14 },
  value: { color: '#e0e0e0', fontFamily: 'monospace' },
  stepBtn: {
    backgroundColor: '#22232b',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  stepTxt: { color: '#00c6cf', fontWeight: '600' },
});
