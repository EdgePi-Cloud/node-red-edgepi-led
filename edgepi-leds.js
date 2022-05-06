const { Gpio } = require( 'onoff' );

// dict holding LED # : BCM GPIO PIN # pairs
// Example: '1':'13' maps LEDY C1 to GPIO13 pin
const ledToPin = {
    '1':'13', '2':'12'
};

module.exports = function(RED) {
    function ledTriggerNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        // runs when node receives an input
        node.on('input', function(msg) {
            ledNum = msg.topic;             // LED number to toggle
            toggleState = msg.payload;      // state to toggle

            // toggle LED if LED number is valid
            if (ledNum in ledToPin) {
                // build Gpio object at BCM pin corresponding to LED light number
                const outpin = new Gpio(Number(ledToPin[ledNum]), 'out');
                outpin.writeSync(parseInt(toggleState));
            }
            else {
                node.error(`LED Number ${ledNum} does not exist.`);
            }

            // add selected GPIO pin to output msg for unit testing
            msg.pin = Number(ledToPin[ledNum]);
            node.send(msg);
        });
    }
    RED.nodes.registerType("led-trigger-node", ledTriggerNode);
}
