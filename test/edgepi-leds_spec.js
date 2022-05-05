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
            n1.should.have.property('led', undefined);
            done();
          } catch(err) {
            done(err);
          }
        });
      });
});