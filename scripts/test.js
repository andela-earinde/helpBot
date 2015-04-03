/*
 Description:
   Valet at Wayne Manor.

 Configuration:
   HUBOT_FAVOURITE_MEAL - Something important Alfred needs to know.

  Commands:
    Man, I'm hungry! - Let Alfred know you're hungry and he'll let you know when dinner will be ready.
    Alfred make me dinner now! - Tell him to make dinner right now.

*/

var git = require('gift');

var log = function(msg, name, numCommits) {
  console.log(name);	
  var repo = git("https://github.com/andela-earinde/" + name);

  // Fall back to showing just 1 commit message.
  numCommits = Number(numCommits) || 1;

  repo.commits(null, Number(numCommits), function(err, commits) {
    var commitsStr = "";
    if (err) {
      msg.send("There was an error synchronizing. Here are the details:");
      msg.send(err);
    } 
    else {
      commits.forEach(function(commit, i) {
        commitsStr += commit.id.substring(0, 7) + " -  " + commit.message + "\n";
      });

      if (commits.length === 1) {
        msg.send("Here is the last commit for you:");
      }
       else {
        msg.send("Here are the last " + commits.length + " commits for you:");
      }

      msg.send(commitsStr);
    }
  });
};

module.exports = function(helpbot) {
	helpbot.respond(/.*last ([0-9]+)? ?commits? (in|on|for) ([^ ?]+)?/, function(msg) {
        console.log("message");
        log(msg, msg.match[3], msg.match[1]);
    });
};