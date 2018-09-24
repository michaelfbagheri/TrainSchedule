
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
var trainFirstTime = '';
var trainFreq = 0;
var i = 0;
// var headerArray = {
//     trainName: 'Train Name',
//     trainDestination: 'Destination',
//     trainFreq: 'Frequency',
//     trainNextArrival: 'Next Arrival',
//     trainMinAway: 'Minutes Away',
// };

var headerArray = ['Train Name','Destination','Frequency','Next Arrival','Minutes Away',]

database.ref('/trainRecord'+ i).set({
    trainName :'Train Name',
    trainDestination : 'Destination',
    trainFreq : 'Frequency',
    trainNextArrival : 'Next Arrival',
    trainMinAway : 'Minutes Away'
    
}) 

//capture input from user and update database
$('#submit-button').on('click', function(){
    i++
    trainName = $('#train-name').val().trim()
    trainDestination = $('#train-destination').val().trim() 
    trainFreq = $('#train-freq').val().trim()
    // trainMinAway equation needs to be derived
    trainMinAway = 5
    //Next Arrival needs to be calculate once the clock function is setup
    nextArrivalTime = 12
    
    database.ref('/trainRecord'+ i).set({
        trainName: trainName,
        trainDestination: trainDestination,
        trainFreq: trainFreq, 
        trainNextArrival : nextArrivalTime,
        trainMinAway: trainMinAway
        
    }) 

})


database.ref().on('value',function(snapshot){

$('#schedule-table').empty()
debugger
    i = snapshot.numChildren()
    let tempFullIdIndex = '';
    if (snapshot.val() === null){
        return
    } else{
        var newTabRow = $('<tr>')
        $('#schedule-table').append(newTabRow)
        newTabRow.attr('id','header-row')
        //setup header html
        for (var headerCount = 0; headerCount < headerArray.length; headerCount++){
            var newTabHeader = $('<th>')
            $('#header-row').append(newTabHeader)
            newTabHeader.addClass('table-org')
            }
        //setup Row for input data/html
        for (let rowCount = 1; rowCount < i; rowCount++){  
            var newTabRow = $('<tr>')
            $('#schedule-table').append(newTabRow)
            newTabRow.attr('id','Row-' + rowCount )
            //setup Column for input data/html
            for(let colCount = 0; colCount < 5; colCount++){
                var tableData = $('<td>')
                tempFullIdIndex = 'Row-' + rowCount + '-Col-' + colCount;
                tableData.attr('id',tempFullIdIndex)
                newTabRow.append(tableData)
            }
            debugger

            // // $('<tr>').attr('id','"horzRow-' + j + '"')
            // // $(newTabRow).append('<td>')
            // // $('td').attr('id',tempFullIdIndex)
            
            // // (tempFullIdIndex).text(snapshot.child('/trainRecord' + j + '/trainName').val())
            // // debugger
            // // tempIdIndexNum++
            // // $('#horzRow-' + j).append('<td>')
            // // tempFullIdIndex = '"horzRow-' + j + '-VertCol-' + tempIdIndexNum + '"';
            // // $('td').attr('id',tempFullIdIndex)
            // // $(tempFullIdIndex).text(snapshot.child('/trainRecord' + j + '/trainDestination').val())
            // // tempIdIndexNum++
            // // $('#horzRow-' + j).append('<td>')
            // // tempFullIdIndex = '"horzRow-' + j + '-VertCol-' + tempIdIndexNum + '"';
            // // $('td').attr('id',tempFullIdIndex)
            // // $(tempFullIdIndex).text(snapshot.child('/trainRecord' + j + '/trainFirstTime').val())
            // // tempIdIndexNum++
            // // $('#horzRow-' + j).append('<td>')
            // // tempFullIdIndex = '"horzRow-' + j + '-VertCol-' + tempIdIndexNum + '"';
            // // $('td').attr('id',tempFullIdIndex)
            // // $(tempFullIdIndex).text(snapshot.child('/trainRecord' + j + '/trainFreq').val())
        }
        
    }
    

}, function(errorObject){
    console.log('The Read Failed: ' + errorObject.code)
})




})





