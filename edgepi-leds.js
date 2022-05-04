const { Gpio } = require( 'onoff' );

// dict holding LED # : BCM GPIO PIN # pairs
// Example: '1':'13' maps LEDY C1 to GPIO13 pin
const ledToPin = {
    '1':'13', '2':'12'
};

module.exports = function(RED) {
    function ledTriggerNode(ledNum) {
        RED.nodes.createNode(this, ledNum);
        var node = this;

        node.on('input', function(msg) {
            // build Gpio object at BCM pin corresponding to LED light number
            const ledNum = msg.payload;
            // toggle LED if LED number is valid
            if (ledNum in ledToPin) {
                const outpin = new Gpio(Number(ledToPin[msg.payload]), 'out');
                outpin.writeSync(1)
            }
            else {
                node.error("LED number does not exist");
            }
            node.send(msg);
        });
    }
    RED.nodes.registerType("led-trigger-node", ledTriggerNode);
}
