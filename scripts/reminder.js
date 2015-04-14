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
        msg.send("Okay");

        function startReminder() {
            message(msg);   
        }

        function message(msg) {
            var dat = new Date(),
            hr  = dat.getHours(),
            min = dat.getMinutes(),
            sec = dat.getSeconds();
            if(hr == 7 && min == 30 && sec == 00) {
                msg.send("@channel: Hi Guys! Don't forget to start your freckle timer,check your emails and sign in.");
            } 
            else if(hr == 16 && min == 00 && sec == 00) {
                msg.send("@channel: Hi Guys! Don't forget to log your freckle timer and sign out");
            }     
        } 
        setInterval(startReminder, 2000);
    });
}

