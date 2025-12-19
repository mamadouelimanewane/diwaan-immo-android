import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'sn.diwaan.app',
  appName: 'Diwaan Immo',
  webDir: 'out',
  server: {
    // Pour utiliser l'app web déployée sur Vercel
    url: 'https://diwaan-immo-android.vercel.app',
    cleartext: true
  },
  android: {
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: true
  }
};

export default config;
