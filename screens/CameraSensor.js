// Pantalla para usar el sensor de la cámara con Expo Camera
// Funciones: solicitar permisos, mostrar preview, alternar cámara, flash y capturar foto
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Camera, CameraView } from 'expo-camera';
import Screen from '../components/Screen';

export default function CameraSensor() {
  const cameraRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  // Usamos claves string compatibles con CameraView
  const [facing, setFacing] = useState('back'); // 'back' | 'front'
  const [torchOn, setTorchOn] = useState(false); // torch (linterna)
  const [isCapturing, setIsCapturing] = useState(false);
  const [photoUri, setPhotoUri] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const toggleType = () => {
    setFacing((prev) => (prev === 'back' ? 'front' : 'back'));
  };

  const toggleFlash = () => {
    setTorchOn((prev) => !prev);
  };

  const takePicture = async () => {
    if (!cameraRef.current || isCapturing) return;
    try {
      setIsCapturing(true);
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.8, skipProcessing: true });
      setPhotoUri(photo?.uri ?? null);
    } catch (e) {
      console.warn('Error al capturar foto', e);
    } finally {
      setIsCapturing(false);
    }
  };

  if (hasPermission === null) {
    return (
      <Screen>
        <Text style={styles.info}>Solicitando permisos de cámara…</Text>
      </Screen>
    );
  }
  if (hasPermission === false) {
    return (
      <Screen>
        <Text style={styles.info}>Permiso de cámara denegado. Habilítalo en Ajustes.</Text>
      </Screen>
    );
  }

  return (
    <Screen style={{ backgroundColor: 'black' }}>
      <View style={styles.cameraContainer}>
        <CameraView
          ref={cameraRef}
          style={StyleSheet.absoluteFill}
          facing={facing}
          enableTorch={torchOn}
        />
        <View style={styles.controls}>
          <TouchableOpacity onPress={toggleFlash} style={[styles.btn, torchOn && styles.btnActive]}>
            <Text style={styles.btnText}>{torchOn ? 'Luz On' : 'Luz Off'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={takePicture} style={[styles.captureBtn, isCapturing && styles.captureBtnDisabled]} disabled={isCapturing} />
          <TouchableOpacity onPress={toggleType} style={styles.btn}>
            <Text style={styles.btnText}>Cambiar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {photoUri && (
        <View style={styles.previewBar}>
          <Image source={{ uri: photoUri }} style={styles.preview} />
          <TouchableOpacity onPress={() => setPhotoUri(null)} style={styles.clearBtn}>
            <Text style={styles.clearText}>Descartar</Text>
          </TouchableOpacity>
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    maxWidth: 680,
    alignSelf: 'center',
    aspectRatio: 9 / 16,
  },
  controls: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: 'rgba(34,35,43,0.8)',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
  },
  btnActive: { backgroundColor: 'rgba(0,198,207,0.3)' },
  btnText: { color: 'white', fontWeight: '600' },
  captureBtn: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'white',
    borderWidth: 6,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  captureBtnDisabled: { opacity: 0.6 },
  previewBar: {
    width: '100%',
    maxWidth: 680,
    alignSelf: 'center',
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  preview: { width: 60, height: 60, borderRadius: 8 },
  clearBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#22232b',
    borderRadius: 8,
  },
  clearText: { color: '#00c6cf', fontWeight: '600' },
  info: { color: '#e0e0e0', textAlign: 'center', padding: 24 },
});
