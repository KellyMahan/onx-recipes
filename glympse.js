// Used example from onx.ms message wife when leaving work.

// Author: Kelly Mahan
// Description: Used to glympse my wife when i leave work.
// Currently I must manually choose the favorite to send, but i'd like to automatically choose it with onx.

// Initializing variables 

var friend = { name : "my wife"} ;
var messageText = "I'm on my way";
var action = "exit" /* leave */;
var location = { name : "work",latitude : "35.63595",longitude : "-97.49478" } ;
  var apps = device.applications;

// End of variables initializing 

console.log('Started script: Glympse ' + friend.name + ' when I ' + action + ' ' + location.name);

  // create a geo region for the trigger to take place at
  var region = device.regions.createRegion({
      latitude: parseFloat(location.latitude, 10),
      longitude: parseFloat(location.longitude, 10),
      name: location.name,
      radius: 200
  });

  // register a callback which sends a message when entering/exiting the region (depends on action)
  region.on(action, function (){
      console.log('Launching Glympse to ' + friend.name);
      void apps.launch("Glympse", {},
          function (err) {
              if (err) {
                  console.error('Error launching Glympse: ' + JSON.stringify(err));
              }
          }
      );
  });

  // battery saving stuff
  device.battery.on("startedCharging", function (signal){
    // start monitoring the region
    device.regions.startMonitoring(region);
  });
  device.battery.on("stoppedCharging", function (signal){
    // stop monitoring the region
    if(signal.percentage < 70){
      device.regions.stopMonitoring(region);
    }
  });
  device.battery.on('updated', function (signal){
    // stop monitoring the region
    if(signal.percentage < 70){
      device.regions.stopMonitoring(region);
    }
  });
  console.log('Completed script: Glympse ' + friend.name +  ' when I ' + action + ' ' + location.name);
  
  // Debugging code
  //var locationSignal =    { latitude: 35.63595, longitude : -97.49478 };
  //region.emit('exit', locationSignal);