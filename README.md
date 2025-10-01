# App2 - Portafolio Personal en React Native

Una aplicación móvil de portafolio personal desarrollada con React Native y Expo, diseñada para mostrar información profesional, proyectos y habilidades de manera elegante y responsive.

## 🚀 Características

- ✨ **Animaciones suaves**: Transiciones y efectos de entrada fluidos
- 📱 **Diseño responsive**: Adaptable a diferentes tamaños de pantalla
- 🎨 **Tema oscuro moderno**: Interfaz elegante con colores cuidadosamente seleccionados
- ⚡ **Optimización de rendimiento**: Precarga de assets y lazy loading
- 🔧 **Arquitectura modular**: Componentes reutilizables y código mantenible
- 📟 **Sensores del dispositivo**: Pantallas de Cámara y Acelerómetro con soporte multiplataforma

## 🛠️ Tecnologías y Librerías

### Framework Principal
- **React Native** `0.81.4` - Framework para desarrollo móvil multiplataforma
- **Expo** `~54.0.0` - Plataforma de desarrollo que simplifica el workflow de React Native
- **React** `19.1.0` - Librería de JavaScript para construir interfaces de usuario

### Navegación
- **@react-navigation/native** `^7.1.17` - Librería principal de navegación
- **@react-navigation/stack** `^7.4.8` - Navegador de pila para transiciones entre pantallas
- **react-native-screens** `~4.16.0` - Optimización nativa de pantallas
- **react-native-safe-area-context** `~5.6.0` - Manejo de áreas seguras en dispositivos

### Gestión de Assets y UI
- **expo-asset** `~12.0.9` - Carga y caché optimizado de assets
- **expo-splash-screen** `~31.0.10` - Control avanzado de la pantalla de carga
- **expo-status-bar** `~2.2.3` - Configuración de la barra de estado

### Sensores
- **expo-camera** `SDK 54 compatible` - Acceso a la cámara (CameraView)
- **expo-sensors** `SDK 54 compatible` - Acelerómetro (en nativo); fallback con DeviceMotion en Web

### Herramientas de Desarrollo
- **@babel/core** `^7.20.0` - Transpilador de JavaScript
- **@react-native-community/cli** - Herramientas de línea de comandos

## 🏗️ Arquitectura del Proyecto

```
App2/
├── assets/                 # Recursos estáticos (iconos, imágenes)
│   ├── icon.png
│   ├── splash-icon.png
│   ├── adaptive-icon.png
│   └── favicon.png
├── components/             # Componentes reutilizables
│   ├── FadeInView.js      # Animaciones de entrada
│   ├── PrimaryButton.js   # Botón principal estilizado
│   └── Screen.js          # Wrapper de pantalla base
├── screens/               # Pantallas de la aplicación
│   ├── AboutMe.js
│   ├── Project.js
│   ├── Skills.js
│   ├── ResponsiveCards.js
│   ├── CameraSensor.js        # Cámara: preview, torch y captura
│   └── AccelerometerSensor.js # Acelerómetro: bola interactiva + fondo dinámico
├── theme/                 # Sistema de diseño
│   └── tokens.js          # Tokens de colores y espaciado
├── utils/                 # Utilidades y hooks
│   └── usePreloadAssets.js # Hook para precarga de assets
├── App.js                 # Punto de entrada principal
└── package.json           # Configuración de dependencias
```

## ⚡ Optimizaciones Implementadas

### 1. **Precarga de Assets**
- **Hook personalizado** `usePreloadAssets` que precarga imágenes y recursos
- **Caché inteligente** usando `expo-asset` para evitar descargas repetidas
- **Splash screen persistente** hasta que todos los assets estén listos

### 2. **Optimización de Rendimiento**
- **Native Driver** en todas las animaciones para mejor performance
- **Componentes modulares** que se renderizan solo cuando es necesario
- **Safe Area Context** para manejo eficiente de áreas seguras

### 3. **Animaciones Optimizadas**
```javascript
// Uso de Native Driver para animaciones fluidas
Animated.timing(opacity, {
  toValue: 1,
  duration: 900,
  useNativeDriver: true, // Ejecuta en el hilo nativo
})
```

### 4. **Sistema de Tokens de Diseño**
- **Colores centralizados** en `theme/tokens.js`
- **Espaciado consistente** con valores predefinidos
- **Mantenibilidad mejorada** del código de estilos

### 5. **Optimización de Imágenes**
- Script `optimize:images` usando `expo-optimize`
- **Adaptive icons** para Android con diferentes densidades
- **Favicon optimizado** para versión web

### 6. **Arquitectura Nueva de React Native**
- **New Architecture habilitada** (`newArchEnabled: true`)
- **Edge-to-edge** en Android para aprovechamiento completo de pantalla

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn
- Expo CLI global: `npm install -g @expo/cli`

### Instalación
```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd App2

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm start
```

### Scripts Disponibles
```bash
# Iniciar servidor de desarrollo
npm start

# Ejecutar en Android
npm run android

# Ejecutar en iOS
npm run ios

# Ejecutar en web
npm run web

# Optimizar imágenes
npm run optimize:images
```

## 📱 Pantallas de la Aplicación

1. **Home** (Inicio)
   - Descripción: Punto de entrada con presentación breve y navegación a las secciones.
   - UI y UX:
     - Layout responsivo: grid de 1, 2 o 3 columnas según breakpoint (móvil, tablet, desktop).
     - Tipografía y ancho de texto adaptativos.
   - Librerías y funciones:
     - `useBreakpoint` (custom): detecta ancho y devuelve nombre de breakpoint.
     - `Screen`, `PrimaryButton`, `FadeInView`: componentes reutilizables para layout y animación.

2. **Sobre Mí**
   - Descripción: Información personal y profesional, enfoque en claridad y legibilidad.
   - UI/Animación: uso de `FadeInView` para entradas suaves.
   - Librerías: React Native base.

3. **Proyectos**
   - Descripción: Showcase de proyectos con estructura simple y clara.
   - Librerías: React Native base; estilos modulares.

4. **Habilidades**
   - Descripción: Lista de competencias técnicas con barras de progreso animadas.
   - Animación: `Animated.timing` y `Animated.parallel` (JS driver para web, nativo en dispositivos).
   - Librerías: React Native `Animated`.

5. **Tarjetas Responsivas**
   - Descripción: Ejemplo de diseño adaptativo con tarjetas; aprovecha `useBreakpoint`.
   - Librerías: React Native base + hook `useBreakpoint`.

6. **Cámara (Sensor)** — `screens/CameraSensor.js`
   - Funcionalidad:
     - Solicita permisos de cámara y muestra preview en vivo con `CameraView` (Expo SDK 54).
     - Alterna entre cámara frontal/trasera y activa linterna (torch) cuando el dispositivo lo soporta.
     - Captura fotos; tras capturar, abre una previsualización a pantalla completa con opciones de Cerrar/Descartar.
     - Miniatura persistente de la última foto con acciones “Ver” y “Descartar”.
   - Librerías usadas:
     - `expo-camera` (CameraView): acceso a la cámara y torch.
     - `react-native-safe-area-context`: contenedor `Screen` con áreas seguras.
   - Permisos y configuración:
     - iOS: `NSCameraUsageDescription` en `app.json`.
     - Android: permiso `CAMERA` en `app.json`.
   - Compatibilidad Web:
     - La disponibilidad de torch/flash depende del navegador. La preview y captura funcionan si el navegador soporta MediaDevices.

7. **Acelerómetro (Sensor)** — `screens/AccelerometerSensor.js`
   - Funcionalidad:
     - Lectura de aceleración x, y, z.
     - Visual interactiva: una “bolita” que se mueve según inclinación del dispositivo.
     - Fondo de pantalla dinámico que cambia de color según eje dominante y dirección (X+/X-/Y+/Y-).
     - Controles de suscripción (On/Off) y frecuencia con botones +/- (intervalo en ms).
   - Librerías y APIs usadas:
     - Nativo (Android/iOS): `expo-sensors` (Accelerometer.addListener, setUpdateInterval).
     - Web: evento `devicemotion` del navegador con permiso solicitado en iOS/Safari (DeviceMotionEvent.requestPermission).
   - Notas de compatibilidad:
     - Desktop y algunos navegadores móviles pueden no emitir `devicemotion` o requerir interacción del usuario.
     - El botón “Activar sensor (permiso)” aparece en Web cuando hay que conceder permisos.

## 🎨 Sistema de Diseño

### Paleta de Colores
```javascript
colors: {
  bg: '#181a20',        // Fondo principal
  card: '#22232b',      // Fondo de tarjetas
  text: '#e0e0e0',      // Texto principal
  subtext: '#b0b0b0',   // Texto secundario
  primary: '#00c6cf',   // Color de acento
}
```

### Espaciado
```javascript
spacing: {
  xs: 6,   // Espaciado extra pequeño
  sm: 10,  // Espaciado pequeño
  md: 16,  // Espaciado medio
  lg: 24,  // Espaciado grande
}
```

## 🔧 Configuración de Expo

- **Orientación**: Default (retrato y paisaje)
- **Interfaz**: Tema claro como base
- **Plataformas soportadas**: iOS, Android y Web
- **Nueva arquitectura**: Habilitada para mejor rendimiento

### Permisos de sensores
- Cámara:
  - iOS: `infoPlist.NSCameraUsageDescription` definido en `app.json`.
  - Android: permiso `CAMERA` configurado en `app.json`.
- Acelerómetro (Web): algunos navegadores requieren acción del usuario para habilitar `DeviceMotion`. La pantalla muestra un botón “Activar sensor (permiso)” cuando es necesario.

### Notas de compatibilidad
- Web puede limitar acceso a características de hardware (torch/flash, devicemotion). Prueba en dispositivo real para validar comportamiento.

## 🧩 Componentes reutilizables principales

- `Screen`: contenedor con `SafeAreaView` (react-native-safe-area-context), layout consistente entre pantallas.
- `PrimaryButton`: botón principal con animación de presión y estilos unificados.
- `FadeInView`: animación de entrada (fade + translateY) reutilizable para mejorar la percepción de fluidez.

## 🧪 Consejos de prueba

- Cámara:
  - En Expo Go, concede permisos al abrir la pantalla.
  - Si torch no funciona en Web, prueba en un dispositivo Android/iOS.
- Acelerómetro:
  - En Web móvil, pulsa “Activar sensor (permiso)” si aparece.
  - Desktop rara vez publica devicemotion: prueba en teléfono físico para validar movimiento y cambio de color de fondo.

## 📝 Licencia

Este proyecto es privado y está desarrollado con fines educativos y de portafolio personal.

## 👨‍💻 Autor

**Ingeniero de Sistemas** - Portafolio personal desarrollado con React Native

---

*Desarrollado con ❤️ usando React Native y Expo*