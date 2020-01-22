const fs = require('fs')
const path = require('path')

fs.rmdirSync(path.join(require('os').homedir(), '.ocs-server', 'test'), { recursive: true })
