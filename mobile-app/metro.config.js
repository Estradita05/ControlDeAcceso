const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Fix: react-native-svg intenta importar 'css-tree' que a veces causa problemas de resolución en Metro.
// Si no se encuentra o causa errores, lo redirigimos a un módulo vacío.
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName.startsWith('css-tree')) {
    return {
      type: 'empty',
    };
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
