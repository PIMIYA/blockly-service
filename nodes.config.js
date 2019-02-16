const constValue = require('./common/constValue');

let ecosystem = []
for (let i = 0; i < constValue.NodeCount; i++) {
    ecosystem.push({
        name: 'worker-' + i,
        script: './led-node/app.js',
        watch: false,
        env: {
            'Index': i,
            'PORT': 3100 + i,
            'ServerHost': 'http://192.168.1.22:3000',
        }
    })
}

module.exports = ecosystem
