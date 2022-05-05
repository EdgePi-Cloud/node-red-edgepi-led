# node-red-edgepi-led-array

# Installation: Node-Red on Debian
1. Install a supported version of Node.js: https://nodered.org/docs/faq/node-versions
    * $ sudo apt install curl
    * $ curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
    * $ sudo apt install nodejs
    * Verify Node.js installed: $ node -v
    * Verify npm installed: $ npm -v

2. Install Node-Red with npm
    * $ Change to home directory: $ cd ~
    * $ sudo npm install -g --unsafe-perm node-red

# Installation: led-trigger-node
1. git clone this repository
2. Change to project directory: $ cd node-red-edgepi-led-array
3. Install dependencies: $ npm install
4. Change to .node-red directory: $ ~/.node-red
5. $ npm install path_to_node-red-edgepi-led-array

# Running Node-Red
1. $ node-red-start

# Using led-trigger-node
1. Drag and drop the following nodes: inject, led-trigger-node, debug
2. Connect nodes as follows: inject -> led-trigger-node -> debug
3. Set inject payload to numeric value: either 0 (OFF) or 1 (ON)
4. Set led-trigger-node LED number: either 1 or 2
5. Click deploy
6. Inject a value using inject node.
