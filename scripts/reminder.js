/*
*  Description:
*     This makes sonny remind the group of the daily activities
*
*  Dependencies:
*      None 
*
*  Configuration:
*      None
*
*  
*  Commands:
*      None
*
*  Author:
*     Arinde Eniola
*/

module.exports = function(sonny) {    
    sonny.hear(/sonny start the reminder at (\d+)/, function(msg) {
        startReminder();
        msg.send("reminder started at "+msg.match[1]);

        function startReminder() {
            var dat = new Date(),
            hr  = dat.getHours(),
            min = dat.getMinutes(),
            sec = dat.getSeconds();
            if(hr == 13 && min == 14 && sec == 00) {
                msg.send("you asked me to remind you this");
            }     
        }
        setInterval(startReminder, 500);
    });
}

