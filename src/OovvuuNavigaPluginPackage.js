import './scss/index.scss';
import OovvuuNavigaPluginComponent from './OovvuuNavigaPluginComponent';
import OovvuuCommand from './commands/OovvuuCommand';
import OovvuuNode from './nodes/OovvuuNode';
import OovvuuComponent from './nodes/OovvuuComponent';
import OovvuuConverter from './converters/OovvuuConverter';

export default {
  name: 'oovvuu',
  id: 'en.infomaker.oovvuu',

  // The configure() is called by the writer when it wants the
  // plugin to initalize itself and its different parts.
  configure(config, pluginConfig) {
    // Add plugin to main sidebar (can be overriden in plugin config)
    config.addToSidebar('Search', pluginConfig, OovvuuNavigaPluginComponent);
    config.addCommand('oovvuu.insert', OovvuuCommand);
    config.addNode(OovvuuNode);
    config.addComponent(OovvuuNode.type, OovvuuComponent);
    config.addConverter(OovvuuConverter);
  },
};
