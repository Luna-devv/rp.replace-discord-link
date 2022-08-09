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

        inject('rdl-replacer', messages, 'sendMessage', (args) => {

            let text = [];
            args[1].content.split(' ')
                ?.forEach(string => {
                    if (string.match(/(https?:\/\/)(discord|ptb\.discord|canary\.discord)\.com/gi)) string = string.replace(string.split('.com')[0], `http${this.settings.get('http') ? '' : 's'}://${this.settings.get('subdomain') ? `${this.settings.get('subdomain')}.` : ''}discord`);
                    text.push(string);
                });
            args[1].content = text.join(' ');

            return args;
        }, true);
    }

    pluginWillUnload() {
        powercord.api.settings.unregisterSettings(this.entityID);
        uninject('rdl-replacer');
    }
}