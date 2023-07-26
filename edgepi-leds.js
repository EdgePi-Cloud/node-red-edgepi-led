module.exports = function(RED) {
    const rpc = require("@edgepi-cloud/edgepi-rpc")

    function LEDNode(config) {
        RED.nodes.createNode(this, config);
        const node = this;
        node.LedPin = config.LedPin;
        node.Method = config.Method;
        const led = new rpc.LEDService();

        console.log(node.Method, node.Pin)

        if (led !== null){
            node.status({fill:"green", shape:"ring", text:"led initialized"});
        }
        node.on('input', async function (msg, send, done) {
            try{
                let response = await led[node.Method](rpc.LEDPins[node.LedPin]);
                msg.payload = response;
                node.status({fill:"green", shape:"dot", text:"input recieved"});
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