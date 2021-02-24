import OovvuuNavigaPluginPackage from './OovvuuNavigaPluginPackage'
import {registerPlugin} from 'writer'

(() => {
    // Register the plugin with the Writer when registerPlugin() is available
    if(registerPlugin) {
        registerPlugin(OovvuuNavigaPluginPackage)
    }
    else {
        console.error('Register method not yet available')
    }
})()
