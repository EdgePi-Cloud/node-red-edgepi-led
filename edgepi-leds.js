module.exports = function(RED) {
    const rpc = require("@edgepi-cloud/edgepi-rpc")

    function ThermocoupleNode(config) {
        RED.nodes.createNode(this, config);
        const node = this;
        const tc = new rpc.TcService()
        this.on('input', async function (msg, send, done) {
            try{
                let temps = await tc.singleSample();
                msg.payload = temps;
            }
            catch(err) {
                console.error(err);
                msg.payload = 'Wait! Only one RPC send operation may be in progress at any time'
            }
            
            send(msg);
            if (done) {
                done();
            }
        })


        // handle exit
        node.on("close", function(done) {
            node.status({fill:"grey", shape:"ring", text:"tc terminated"});
            
             done();
        });
    }
    RED.nodes.registerType("edgepi-thermocouple-node", ThermocoupleNode);
}