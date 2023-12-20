module.exports = function (RED) {
  const rpc = require("@edgepi-cloud/edgepi-rpc");

  function LEDNode(config) {
    RED.nodes.createNode(this, config);
    const node = this;

    setInitialConfigs(config).then((led) => {
      node.on("input", async function (msg, send, done) {
        node.status({ fill: "green", shape: "dot", text: "input received" });
        try {
          const state = msg.payload === "on" ? "turnOn" : "turnOff";
          const ledPin = "LED" + msg.pin.toString();
          msg.payload = await led[state](rpc.LEDPins[ledPin]);
        } catch (err) {
          console.error(err);
          msg.payload = err;
        }
        send(msg);
        if (done) {
          done();
        }
      });
    });

    async function setInitialConfigs(config) {
      const ipc_transport = "ipc:///tmp/edgepi.pipe";
      const tcp_transport = `tcp://${config.tcpAddress}:${config.tcpPort}`;
      const transport =
        config.transport === "Network" ? tcp_transport : ipc_transport;

      try {
        const led = new rpc.LEDService(transport);
        console.info("LED node initialized on:", transport);
        node.status({
          fill: "green",
          shape: "ring",
          text: "led initialized",
        });
        await led[config.ledState](rpc.LEDPins[config.ledPin]);
        return led;
      } catch (error) {
        console.error(error);
        node.status({
          fill: "red",
          shape: "ring",
          text: "Initialization error",
        });
      }
    }
  }

  RED.nodes.registerType("led", LEDNode);
};
