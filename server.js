/**
 * A simple http server that serves up your ui5 js and html
 * 
 * to run: 'node server.js'
 * @author Urooj
 */
"use strict";

let express= require("express");
let app=express();

let port=2999;


//http://localhost:2999/public/test-resources/testsuite/samples.html
app.use('/public', express.static('./public')); 
app.use('/src', express.static('./src'));
// 5. Anything else that slips through, log an error:

app.get('/*',function(req,res) {
    console.log('WARN:Cant supply request for '+req.url);
    res.status(404);
    res.send('Not found '+req.url+"\n");
});


// start the web server on the given port:
console.log(`Server listening on http://localhost:${port}/public`);
app.listen(port); 
