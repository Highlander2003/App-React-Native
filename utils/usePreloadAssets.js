// Hook de precarga de assets que mantiene visible el Splash hasta que finaliza.
// - Evita pantallas en blanco o cambios bruscos al inicio.
// - Usa expo-asset para descargar los módulos de imagen.
import { useCallback, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { Asset } from 'expo-asset';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync().catch(() => {});

export default function usePreloadAssets(assets = []) {
  const [ready, setReady] = useState(false);

  const load = useCallback(async () => {
    try {
      const downloads = assets.map((a) => Asset.fromModule(a).downloadAsync());
      await Promise.all(downloads);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('Asset preload failed:', e?.message || e);
    } finally {
      // Señalizamos que todo está listo y ocultamos el Splash
      setReady(true);
      await SplashScreen.hideAsync().catch(() => {});
    }
  }, [assets]);

  useEffect(() => {
    load();
  }, [load]);

  // `ready` indica si se pueden renderizar pantallas sin flickers
  return ready;
}
