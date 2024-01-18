module.exports = function (RED) {
  const rpc = require("@edgepi-cloud/edgepi-rpc");

  function LEDNode(config) {
    RED.nodes.createNode(this, config);
    const node = this;
    let { ledState, ledPin } = config;

    initializeNode(config).then((led) => {
      node.on("input", async function (msg, send, done) {
        node.status({ fill: "green", shape: "dot", text: "input received" });
        try {
          ledPin = msg.pin || ledPin;
          ledState =
            msg.payload && typeof msg.payload == "boolean"
              ? msg.payload
              : ledState;
          const stateStr = ledState === true ? "turnOn" : "turnOff";

          msg = { payload: await led[stateStr](ledPin - 1) };
        } catch (error) {
          console.error(error);
          msg = { payload: error };
        }
        send(msg);
        done?.();
      });
    });

    async function initializeNode(config) {
      const transport =
        config.transport === "Network"
          ? `tcp://${config.tcpAddress}:${config.tcpPort}`
          : "ipc:///tmp/edgepi.pipe";
      try {
        const led = new rpc.LEDService(transport);
        console.info("LED node initialized on:", transport);
        node.status({
          fill: "green",
          shape: "ring",
          text: "led initialized",
        });
        const stateStr = ledState === true ? "turnOn" : "turnOff";
        console.info(await led[stateStr](ledPin - 1));
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
