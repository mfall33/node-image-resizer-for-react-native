const path = require('path');

const filePath = '/home/user/documents/report.txt';

const fileName = path.basename(filePath, ".txt");
console.log(fileName);