const express = require('express')
const app = express()

/*app.use(express.static('toolpages'));
app.get('/', function(req, res) {
    res.send('情缘');
});

var server = app.listen(3006, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
*/
app.use(express.static('./toolpages/html'))
app.listen(3006, () => {
    console.log('server running at http://127.0.0.1:3006');
})