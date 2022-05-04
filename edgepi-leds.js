const { Gpio } = require( 'onoff' );

module.exports = function(RED) {
    function ledTriggerNode(ledNum) {
        RED.nodes.createNode(this, ledNum);
        var node = this;

        node.on('input', function(msg) {
            // build Gpio object at BCMP pin corresponding to LED light number
            const outpin = new Gpio(Number(msg.payload), 'out');
            outpin.writeSync(1)
            node.send(msg);
        });
    }
    RED.nodes.registerType("led-trigger-node", ledTriggerNode);
}