# node-red-edgepi-led

## EdgePi LED node that changes the state of LEDs on the EdgePi.

## Install
Install normally through the node-red editor or install with npm in your node-red directory
(typically located  at `~/node.red`) by running the following command:
```
npm install @edgepi-cloud/node-red-edgepi-led
```
## Properties

**RPC Server** <br>
The connection to your EdgePi's RPC Server.

## Inputs

  - **payload** (*string*)<br>
  The LED state.
  - **pin** (*JSON* `{"argName":"argValue"..}`)<br>
The LED pin on which to change state.

Example input configuration:
```
msg {
  "payload": "on",
  "pin": 1
}
```

## Outputs

- **payload** (*string*)<br>
A success message stating the configuration of the given LED.


