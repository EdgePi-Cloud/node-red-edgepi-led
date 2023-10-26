module.exports = function(RED) {
    const rpc = require("@edgepi-cloud/edgepi-rpc")

    function LEDNode(config) {
        // Create node with user config
        RED.nodes.createNode(this, config);
        const node = this;
        const ipc_transport = "ipc:///tmp/edgepi.pipe"
        const tcp_transport = `tcp://${config.tcpAddress}:${config.tcpPort}`
        const transport = (config.transport === "Network") ? tcp_transport : ipc_transport;

        // Init new led
        const led = new rpc.LEDService(transport);
        if (led){
            console.debug("LED node initialized on:", transport);
            node.status({fill:"green", shape:"ring", text:"led initialized"});
        }

        // Input event listener
        node.on('input', async function (msg, send, done) {
            node.status({fill:"green", shape:"dot", text:"input recieved"});
            try{
                // Get configurations
                const method = (config.config === "Editor") ? config.method : msg.topic;
                const ledPin = (config.config === "Editor") ? config.ledPin : msg.payload.ledPin;

                // Call method through RPC
                const response = await led[method](rpc.LEDPins[ledPin]);
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
    RED.nodes.registerType("led", LEDNode);
}