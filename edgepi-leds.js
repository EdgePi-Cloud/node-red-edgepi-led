module.exports = function(RED) {
    const rpc = require("@edgepi-cloud/edgepi-rpc")

    function LEDNode(config) {
        RED.nodes.createNode(this, config);
        const node = this;
        const led = new rpc.LEDService()
        this.on('input', async function (msg, send, done) {
            try{
                let response = await led.toggleLed(rpc.LEDPins.LED1);
                msg.payload = response;
            }
            catch(err) {
                console.error(err);
                msg.payload = 'Wait! Only one RPC send operation for a given service may be in progress at any time'
            }
            
            send(msg);
            if (done) {
                done();
            }
        })


        // handle exit
        node.on("close", function(done) {
            node.status({fill:"grey", shape:"ring", text:"led terminated"});
            
             done();
        });
    }
    RED.nodes.registerType("edgepi-led-node", LEDNode);
}