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
    sonny.hear(/sonny start the reminder/, function(msg) {
        startReminder();
        msg.send("reminder started");

        function startReminder() {
            var dat = new Date(),
            hr  = dat.getHours(),
            min = dat.getMinutes(),
            sec = dat.getSeconds();
            if(hr == 08 && min == 00 && sec == 00) {
                msg.send("Hi Guys, Dont forget to log your freckle timer and check your emails.");
            }     
        }
        setInterval(startReminder, 500);
    });
}

