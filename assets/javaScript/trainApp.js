
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
$('#schedule-table').append('<tr><td class="table-org output-title">Train Name</td><td class="table-org output-title">Train Destination</td><td class="table-org output-title">Frequency (min)</td><td class="table-org output-title">Next Arrival</td><td class="table-org output-title">Next Train (min)</td>')

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
    
   
    var timestamp = firebase.database.ServerValue.TIMESTAMP
    
    database.ref("/Trains").push({
        trainName,
        trainDestination,
        trainFirstArrival,
        trainFreq,
        timestamp
    }) 

})



database.ref("/Trains").on('child_added',function(snapshot){

    var tempTrainFreq = snapshot.val().trainFreq
    console.log(tempTrainFreq)
    var tempTrainFirstArrival = snapshot.val().trainFirstArrival
    console.log(tempTrainFirstArrival)

 
    var firstTimeConverted = moment(tempTrainFirstArrival,"HH:mm").subtract(1,"years")
    console.log(firstTimeConverted)
    var time = moment()
    var differenceInTime = moment().diff(moment(firstTimeConverted), "minutes")
    console.log(differenceInTime)
    var tReminder = differenceInTime % tempTrainFreq
    console.log(tReminder)
    var trainMinAway = tempTrainFreq - tReminder
    console.log(trainMinAway)
    var trainNextArrival = moment().add(trainMinAway, "minutes")
    trainNextArrival = moment(trainNextArrival).format('hh:mm')
    console.log(trainNextArrival)

    if (snapshot.val() === null){
        return
    } else{
    var trainMinAway = tempTrainFreq - tReminder
    $('#schedule-table').append('<tr><td class="table-org">' + snapshot.val().trainName + '</td><td class="table-org">' +  snapshot.val().trainDestination + '</td><td class="table-org">' + snapshot.val().trainFreq +  '</td><td class="table-org">' + trainNextArrival + '</td><td class="table-org">' + trainMinAway + '</td>')

        
    }
   



}, function(errorObject){
    console.log('The Read Failed: ' + errorObject.code)
})


})





