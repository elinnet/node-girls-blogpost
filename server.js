/* *
 * Start by requiring in the http module,
 * and make your own server!
 */

//
// var static = require('node-static');
// var file = new static.Server('./public/index.html');

var http = require('http');
var fs = require('fs'); //node way of reading files - uses the fs module
var port = process.env.PORT || 8000;
//
// var blog = require('./blog.json');
// console.log(blog);

// require('http').createServer(function (request, response) {
//     request.addListener('end', function () {
//         //
//         // Serve files!
//         //
//         file.serve(request, response);
//     }).resume();
// }).listen(8000);

function handler(request,response){

  var url = request.url;
  console.log(url);

  if (url === '/'){
    fs.readFile(__dirname+'/public/index.html', function(error,file){
      if (error){
        console.log(error);
        response.end();
      } else {
        response.writeHead(200,{"Content-Type":"text/html"});
        response.end(file);
      }
    });
  } else if (url === '/posts') {
      console.log('posts_test');
      fs.readFile("./blog.json","utf-8",function(err,data){
        if(err){
          respondError(response,500);
        } else {
          console.log('json',data);
          var data_sample = data;
          data_sample[0] = {"test": 1};
          console.log(data_sample);
        }
      });
  } else {
    fs.readFile(__dirname + '/public/' + url, function(error, file){
      if (error){
        console.log(error);
        response.end();
      } else {
        var ext = url.split('.')[1];
        console.log('url', url);
        console.log('url0',url.split('.')[0]);

        console.log('ext ',ext);

        response.writeHead(200,{"Context-Type":"text/" + ext});
        response.end(file);
      }
    });
  }

}


http.createServer(handler).listen(port);  //http module has a function called 'createServer'

console.log('node http server listening on http://localhost:' + port);
