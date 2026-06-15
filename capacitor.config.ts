import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'test-bluetooth',
  webDir: 'www', 
    cordova: {
    // Permite que el plugin BluetoothSerial acceda al contexto de la app
    preferences: {
      // Ajuste de acceso en cleartext para comunicación interna con el plugin
      ScrollEnabled: 'false',
    },
  },
};

export default config;
