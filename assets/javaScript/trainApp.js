
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
var trainName = '';
var trainDestination = '';
var trainFreq = 0;
var countEntries = 0;

// var headerArray = {
//     trainName: 'Train Name',
//     trainDestination: 'Destination',
//     trainFreq: 'Frequency',
//     trainNextArrival: 'Next Arrival',
//     trainMinAway: 'Minutes Away',
// };
var fieldsArray = ['trainName','trainDestination','trainFreq','trainNextArrival','trainMinAway'] 
var headerArray = ['Train Name','Destination','Frequency','Next Arrival','Minutes Away',]

database.ref('/trainRecord'+ countEntries).set({
    trainName :'Train Name',
    trainDestination : 'Destination',
    trainFreq : 'Frequency',
    trainNextArrival : 'Next Arrival',
    trainMinAway : 'Minutes Away',
    countNumTrains: 0
    
}) 

//capture input from user and update database
$('#submit-button').on('click', function(){
    
   
    trainName = $('#train-name').val().trim()
    trainDestination = $('#train-destination').val().trim() 
    trainFreq = $('#train-freq').val().trim()
    // trainMinAway equation needs to be derived
    trainMinAway = 5
    //Next Arrival needs to be calculate once the clock function is setup
    nextArrivalTime = 12

    
    database.ref('/trainRecord'+ countEntries).set({
        trainName: trainName,
        trainDestination: trainDestination,
        trainFreq: trainFreq, 
        trainNextArrival : nextArrivalTime,
        trainMinAway: trainMinAway,
        countNumTrains: countEntries

        
    }) 

})



database.ref().on('value',function(snapshot){

$('#schedule-table').empty()   
//capture total number of children in the database, subtract 1 for connections and one for the header row
    var i = snapshot.numChildren() - 2
    i = snapshot.child('/trainRecord' + i + '/countNumTrains').val()



    // var test = "/trainRecord" + i +"/" + fieldsArray[1]  
    // console.log(snapshot.child(test).val())
   
//set countEntries global variable so we don't overwrite the database records
    countEntries = snapshot.numChildren() - 1
    
    let tempFullIdIndex = '';
    if (snapshot.val() === null){
        return
    } else{
        var newTabRow = $('<tr>')
        $('#schedule-table').append(newTabRow)
        newTabRow.attr('id','header-row')
        //setup header tr/th, Class/ID, plus add data from headerArray to it
        for (var headerCount = 0; headerCount < headerArray.length; headerCount++){
            var newTabHeader = $('<th>')
            $('#header-row').append(newTabHeader)
            newTabHeader.addClass('table-org')
            newTabHeader.attr('id', headerCount)
            newTabHeader.text(headerArray[headerCount])
            }
       
        //setup Row for input data/html
        for (let rowCount = 1; rowCount <= i; rowCount++){  
            var newTabRow = $('<tr>')
            $('#schedule-table').append(newTabRow)
            newTabRow.attr('id','Row-' + rowCount )
            //setup Column for input data/html
            for(let colCount = 0; colCount < headerArray.length; colCount++){
                var tableData = $('<td>')
                tempFullIdIndex = 'Row-' + rowCount + '-Col-' + colCount;
                tableData.attr('id',tempFullIdIndex)
                newTabRow.append(tableData)
                tableData.text(snapshot.child('/trainRecord' + rowCount + '/'+ fieldsArray[colCount]).val())
            }
            

        }
        
    }
    

}, function(errorObject){
    console.log('The Read Failed: ' + errorObject.code)
})




})





