const helper = require("node-red-node-test-helper");
const ledTriggerNode = require("../edgepi-leds.js");

helper.init(require.resolve('node-red'));

describe('led-trigger-node', function () {
    beforeEach(function (done) {
        helper.startServer(done);
    });

    afterEach(function (done) {
        helper.unload(done);
        helper.stopServer(done);
    });

    // assert node is correctly instantiated
    it('should be instantiated correctly', function (done) {
        const flow = [{ id: "node_1", type: "led-trigger-node", name: "led-trigger-node"}];
        helper.load(ledTriggerNode, flow, function () {
          const n1 = helper.getNode("node_1");
          try {
            n1.should.have.property('name', 'led-trigger-node');
            n1.should.have.property('type', 'led-trigger-node');
            n1.should.have.property('id', 'node_1');
            done();
          } catch(err) {
            done(err);
          }
        });
      });

    it('should map led number to correct GPIO pin', function (done) {
      // node wiring: n1 -> n2 -> n3 (msg sent along this order)
      const flow = [
        { id: "n1", type: "helper", wires:[["n2"]] },
        { id: "n2", type: "led-trigger-node", name: "led-trigger-node", wires:[["n3"]] },
        { id: "n3", type: "helper" }
      ];
      helper.load(ledTriggerNode, flow, function() {
        const n1 = helper.getNode('n1');
        const n2 = helper.getNode('n2');
        const n3 = helper.getNode('n3');
        n3.on("input", function(msg) {
          try {
            // assert input to n2 not corrupted
            msg.should.have.property('payload', 1);
            msg.should.have.property('topic', 'LED2');
            // GPIO pin 12 should have been toggled ON
            msg.should.have.property('pin', 12);
            done();
          } catch(err) {
            done(err);
          }
        });
        // send instruction to toggle ON LED #2
        n1.send({payload: 1, topic: 'LED2'});
      });
    });
});