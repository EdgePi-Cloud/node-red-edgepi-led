# node-red-edgepi-led

## EdgePi LED node that changes the state of LEDs on the EdgePi.

## Install

Install normally through the node-red editor or install with npm in your node-red directory
(typically located at `~/node.red`) by running the following command:

```
npm install @edgepi-cloud/node-red-edgepi-led
```

## Properties

**RPC Server** <br>
The connection to your EdgePi's RPC Server.

**Configure with**<br>
Whether to configure LEDs based on configurations from the editor or from input received in the flow.

## Inputs

- When configuration is set to the editor:
  Any message can be used to trigger this node.

- When configuration is set to input received:
  - **topic** (_string_)<br>
    The name of the EdgePi LED method you want to call.
  - **payload** (_JSON_ `{"argName":"argValue"..}`)<br>
    A JSON object consisting of the method's argument parameters as properties and their respective values.

## Outputs

- **payload** (_string_)<br>
  A success message stating the configuration of the given LED.
