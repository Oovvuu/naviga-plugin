import { registerPlugin } from 'writer';
import OovvuuNavigaPluginPackage from './OovvuuNavigaPluginPackage';
import './scss/index.scss';

(() => {
  // Register the plugin with the Writer when registerPlugin() is available
  if (registerPlugin) {
    registerPlugin(OovvuuNavigaPluginPackage);
  } else {
    console.error('Register method not yet available');
  }
})();
