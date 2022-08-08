const { React } = require('powercord/webpack');
const { TextInput, SwitchItem } = require('powercord/components/settings');

module.exports = class settings extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <TextInput
                    onChange={value => this.props.updateSetting('subdomain', value)}
                    defaultValue={this.props.getSetting('subdomain', '')}
                    required={true}
                    disabled={false}
                    note='This will be the subdomain for all discord.com links'
                >
                    Subdomain
                </TextInput>
                <SwitchItem
                    value={this.props.getSetting('http')}
                    onChange={() => this.props.toggleSetting('http')}
                >
                    Replace https with http in all discord links
                </SwitchItem>
            </div>
        )
    }
}