// Used example from onx.ms message wife when leaving work.

// Author: Kelly Mahan
// Description: Message my wife when my bettery gets low.
// Not fully tested but i think this will work

// Initializing variables 

var friend = { name : "my wife", number: "01234567890"} ;
var messageText = "My battery is about to die.";
var message_sent = false;
var low_bat = 10;

// End of variables initializing 
  
  function send_message(){
    device.messaging.sendSms({
             to: friend.number,
             body: messageText
         },
         function (err) {
             console.log(err || 'sms was sent successfully');
         }
     );
  }

  device.battery.on("startedCharging", function (signal){
    message_sent = false;
  });
  device.battery.on('updated', function (signal){
    if(signal.percentage < low_bat && !message_sent){
      send_message();
      message_sent = true;
    }
  });
  
  