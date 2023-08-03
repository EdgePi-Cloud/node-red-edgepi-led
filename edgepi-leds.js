module.exports = function(RED) {
    const rpc = require("@edgepi-cloud/edgepi-rpc")

    function LEDNode(config) {
        RED.nodes.createNode(this, config);
        const node = this;
        node.ConfigStyle = config.ConfigStyle;
        node.LedPin = config.LedPin;
        node.Method = config.Method;
        let led = null;
        let transport = null;

        if(config.transport === "Network"){
            transport = `tcp://${config.tcpAddress}:${config.tcpPort}`;
            led = new rpc.LEDService(transport); 
        } else {
            transport = 'ipc:///tmp/edgepi.pipe';
            led = new rpc.LEDService(transport);
        }
        console.debug("LED node initialized transport on: ", transport);

        if (led !== null){
            node.status({fill:"green", shape:"ring", text:"led initialized"});
        }
        node.on('input', async function (msg, send, done) {
            node.status({fill:"green", shape:"dot", text:"input recieved"});
            // Check if on ReceiveInput
            if(node.ConfigStyle == "ReceiveInput"){
                node.Method = msg.payload.Method;
                node.LedPin = msg.payload.LedPin;
            }
            // Send method call
            try{
                let response = await led[node.Method](rpc.LEDPins[node.LedPin]);
                msg.payload = response;
                
            }
            catch(err) {
                console.error(err);
                msg.payload = err;
            }
            // Send message payload
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