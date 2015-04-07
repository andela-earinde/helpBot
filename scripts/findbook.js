/*
*  Description:
*      make sonny download IT books from It-ebooks.info
*
*  Command:
*      Sonny get me a book on javascript
*      Sonny get me the book with id (number)
*
*  Author:
*      Arinde Eniola
*/

module.exports = function(sonny) {
  sonny.respond(/get me a book on (\w+)/, function(msg) {
	  var query = msg.match[1];
	  var num  = Math.floor(Math.random() * 3 + 1);
	  sonny.http("http://it-ebooks-api.info/v1/search/"+query+"/page/"+num)
	    .headers({'Content-Type': 'application/json'})
	    .get()(function(err, res, body) {
	       if(err) {
	           msg.send("Cannot connect to the server");
	       }
	       else {
	           var data  = JSON.parse(body);
	           msg.send("This are the ones I found")
	           for(var i = 0; i < 5; i++) {
	             var book = data.Books[i];
	             msg.send(book.Title+":"+book.ID);
	             msg.send(book.Image);
	           }
	           msg.send("Stop sending me to search for pirated books for you! :rage:")
	       }
	    });
	});

	sonny.respond(/find me the book with this id: (\d+)/, function(msg) {
	  var query = msg.match[1];
	  sonny.http("http://it-ebooks-api.info/v1/book/"+query)
	    .header("Content-Type", "application/json")
	    .get()(function(err, res, body) {
	        if(err) {
	          msg.send("Cannot connect to the server");
	        }
	        else {
	        	var data = JSON.parse(body);
	        	msg.send(data.Title);
	        	msg.send(data.Image);
	        	msg.send(data.Download);
	        	msg.send("Stop using pirated books");
	        }
	    });	
	});
}