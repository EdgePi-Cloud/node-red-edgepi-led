const { Gpio } = require( 'onoff' );

// dict holding LED # : BCM GPIO PIN # pairs
// Example: '1':'13' maps LEDY C1 to GPIO13 pin
const ledToPin = {
    '1':'13', '2':'12'
};

module.exports = function(RED) {
    function ledTriggerNode(config) {
        RED.nodes.createNode(this, config);
        this.led = config.led;
        var node = this;

        node.on('input', function(msg) {
            // build Gpio object at BCM pin corresponding to LED light number
            ledNum = node.led
            // toggle LED if LED number is valid
            if (ledNum in ledToPin) {
                const outpin = new Gpio(Number(ledToPin[ledNum]), 'out');
                outpin.writeSync(parseInt(msg.payload))
            }
            else {
                node.error(`LED Number ${ledNum} does not exist.`);
            }
            node.send(msg);
        });
    }
    RED.nodes.registerType("led-trigger-node", ledTriggerNode);
}
