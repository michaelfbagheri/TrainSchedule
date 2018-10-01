
$(document).ready(function(){

var config = {
  apiKey: "AIzaSyCfxrNFR0IkXIzWEPrkJVR5UX0MGrqteL0",
  authDomain: "mikesproject-bd0c2.firebaseapp.com",
  databaseURL: "https://mikesproject-bd0c2.firebaseio.com",
  projectId: "mikesproject-bd0c2",
  storageBucket: "mikesproject-bd0c2.appspot.com",
  messagingSenderId: "911450662789"
};
firebase.initializeApp(config);
var database = firebase.database()


$('#schedule-table').empty() 
//Setup the table headers
$('#schedule-table').append('<tr><td class="table-org">Train Name</td><td class="table-org">Train Destination</td><td class="table-org">Train Frequency</td><td class="table-org">Next Arrival</td><td class="table-org">Min TillNextTrain</td>')

//setup the Connections Child Ref
var connectionsRef = database.ref("/connections");
var connectedRef = database.ref(".info/connected");
connectedRef.on("value", function(snap) {
  if (snap.val()) {
        var con = connectionsRef.push(true);
        con.onDisconnect().remove();
        }
});



//capture input from user and update database
$('#submit-button').on('click', function(){
   
    var trainName = $('#train-name').val().trim()
    var trainDestination = $('#train-destination').val().trim()
    var trainFreq = $('#train-freq').val().trim()
    var trainFirstArrival = $('#train-first-arrival').val().trim()
    $('.input-org').val('')
    console.log(trainFirstArrival)
    var firstTimeConverted = moment(trainFirstArrival,"HH:mm").subtract(1,"years")
    console.log(firstTimeConverted)

    var time = moment()
    console.log('Current Time: ' + moment(time).format("hh:mm"))
    
    var differenceInTime = moment().diff(moment(firstTimeConverted), "minutes")
    console.log(differenceInTime)
    
    var tReminder = differenceInTime % trainFreq
    console.log(tReminder)





    // trainMinAway equation needs to be derived
    var trainMinAway = trainFreq - tReminder
    console.log(trainMinAway)
    //Next Arrival needs to be calculate once the clock function is setup
    var trainNextArrival = moment().add(trainMinAway, "minutes")
    console.log("arrival Time: " + moment(trainNextArrival).format('hh:mm'))
    trainNextArrival = moment(trainNextArrival).format('hh:mm')
    var timestamp = firebase.database.ServerValue.TIMESTAMP
    
    
    database.ref("/Trains").push({
        trainName,
        trainDestination,
        trainFreq,
        trainMinAway,
        trainNextArrival,
        timestamp
    }) 

})



database.ref("/Trains").on('child_added',function(snapshot){
    if (snapshot.val() === null){
        return
    } else{
        $('#schedule-table').append('<tr><td class="table-org">' + snapshot.val().trainName + '</td><td class="table-org">' +  snapshot.val().trainDestination + '</td><td class="table-org">' + snapshot.val().trainFreq +  '</td><td class="table-org">' + snapshot.val().trainNextArrival + '</td><td class="table-org">' + snapshot.val().trainMinAway + '</td>')

        
    }
   



}, function(errorObject){
    console.log('The Read Failed: ' + errorObject.code)
})


})





