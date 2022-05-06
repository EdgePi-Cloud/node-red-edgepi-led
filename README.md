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

3. Install Node Red Dashboard
    * $ cd ~/.node-red
    * $ npm i node-red-dashboard

# Installation: led-trigger-node
1. git clone this repository
2. Change to project directory: $ cd node-red-edgepi-led-array
3. Install dependencies: $ npm install
4. Change to .node-red directory: $ ~/.node-red
5. $ npm install path_to_node-red-edgepi-led-array

# Running Node-Red
1. To start: $ node-red-start
2. To stop: $ node-red-stop

# Using led-trigger-node
1. Use a dashboard Switch node to feed binary (0 or 1) inputs to led-trigger-node.

# Running Unit Tests
1. Unit tests are located in edgepi-leds_spec.js and use the mocha testing framework. This should be installed along with other dependencies when $ npm install was run during led-trigger-node installation.
2. To run unit tests: 
    * $ cd project_directory
    * $ npm test
