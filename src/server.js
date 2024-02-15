const app = require('./app.js');
const bodyParser = require('body-parser');

app.listen(8080);
app.use(bodyParser.json());
console.log('Server started on port 8080');
