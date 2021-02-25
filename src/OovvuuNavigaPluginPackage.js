import './scss/index.scss'
import {OovvuuNavigaPluginComponent} from './OovvuuNavigaPluginComponent'
import {OovvuuTool} from './tools/OovvuuTool.js'
import {OovvuuCommand} from './commands/OovvuuCommand.js'
import {OovvuuNode} from './nodes/OovvuuNode.js'
import {OovvuuComponent} from './nodes/OovvuuComponent.js'
import {OovvuuConverter} from './converters/OovvuuConverter.js'

export default {
    name: 'oovvuu',
    id: 'en.infomaker.oovvuu',

    // The configure() is called by the writer when it wants the
    // plugin to initalize itself and its different parts.
    configure: function(config, pluginConfig) {

        // Add plugin to main sidebar (can be overriden in plugin config)
        config.addToSidebar('Oovvuu', pluginConfig, OovvuuNavigaPluginComponent)
        config.addContentMenuTopTool('oovvuu.insert', OovvuuTool)
        config.addCommand('oovvuu.insert', OovvuuCommand)
        config.addNode(OovvuuNode)
        config.addComponent(OovvuuNode.type, OovvuuComponent)
        config.addConverter(OovvuuConverter)
    }
}
