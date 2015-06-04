/*
*  Description:
*      make sonny get questions from stackoverflow
*
*  Command:
*      Sonny stack me <question>
*  
*
*  Author:
*      Arinde Eniola
*/
var zlib = require('zlib');


module.exports = function(sonny) {

  sonny.respond(/stack me (\w+)/, function(msg) {
    var query = msg.match[1];
    sonny.http("https://api.stackexchange.com/2.2/search/advanced?key=7ieOe03gAecDFr)"+
                "13I59dw((&order=desc&q="+query+"&sort=activity&site=stackoverflow")
           .headers({'Content-Type': 'application/json',
                     'Accept-Encoding': 'gzip'})
           .get()(function(err, res, body) {
             if(err) {
                 msg.send("Cannot connect to the server");
             }
             else {          
                 var json;
                 console.log(zlib);
                 zlib.gunzip(body, function(err, dezipped) {
                   var json_string = dezipped.toString('utf-8');
                   console.log(json_string);
                   json = JSON.parse(json_string);
                 });
                 var data  = json;

                 msg.send("These are the ones I found")
                 for(var i = 0; i < 5; i++) {
                   var ques = data.items[i];
                   msg.send(ques.title);
                   msg.send(ques.link);
                 }
             }
       });
   });
}