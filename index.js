const { Plugin } = require('powercord/entities');
const { inject, uninject } = require('powercord/injector');
const { messages } = require('powercord/webpack');

const Settings = require('./components/settings.jsx');

module.exports = class PluginName extends Plugin {
    startPlugin() {
        powercord.api.settings.registerSettings(this.entityID, {
            category: this.entityID,
            label: 'Replace Discord Link',
            render: Settings
        });

        inject('replacer', messages, 'sendMessage', (args) => {
            if (this.settings.get('subdomain')) {
                args[1].content = args[1].content.replace('https://discord', `https://${this.settings.get('subdomain')}.discord`);
                args[1].content = args[1].content.replace('https://ptb.discord', `https://${this.settings.get('subdomain')}.discord`);
                args[1].content = args[1].content.replace('https://canary.discord', `https://${this.settings.get('subdomain')}.discord`);
            };
            if (this.settings.get('http')) args[1].content = args[1].content.replace(`https://${this.settings.get('subdomain') || 'canary'}`, `http://${this.settings.get('subdomain')}`)

            return args;
        }, true);
    }

    pluginWillUnload() {
        powercord.api.settings.unregisterSettings(this.entityID);
        uninject('replacer');
    }
}