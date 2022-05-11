const { Gpio } = require( 'onoff' );

// dict holding LED # : BCM GPIO PIN # pairs
// Example: '1':'13' maps LEDY C1 to GPIO13 pin
const ledToPin = {
    'LED1':'13', 'LED2':'12'
};

module.exports = function(RED) {
    function ledTriggerNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        // runs when node receives an input
        node.on('input', function(msg) {
            ledNum = msg.topic;                     // LED number to toggle
            toggleState = parseInt(msg.payload);    // state to toggle

            // toggle LED if LED number and input are valid
            if (ledNum in ledToPin) {
                if (toggleState == 1 || toggleState == 0) {
                    // build Gpio object at BCM pin corresponding to LED light number
                    const outpin = new Gpio(Number(ledToPin[ledNum]), 'out');
                    outpin.writeSync(toggleState);
                }
                else {
                    node.error('led-trigger-node.error: Input must be an integer, either 0 or 1.');
                }
            }
            else {
                node.error(`led-trigger-node.error: LED ID '${ledNum}' does not exist.`);
            }

            // add selected GPIO pin to output msg for unit testing
            msg.pin = Number(ledToPin[ledNum]);
            node.send(msg);
        });
    }
    RED.nodes.registerType("led-trigger-node", ledTriggerNode);
}
