$(document).ready(function() {
    var colors = [
        "#FF0F00",
        "#FF6600",
        "#FF9E01",
        "#FCD202"
        ,"#F8FF01"
        ,"#B0DE09"
        ,"#04D215"
        ,"#0D8ECF"
        ,"#0D52D1"
        ,"#2A0CD0"
        ,"#8A0CCF"
        ,"#CD0D74"
        ,"#754DEB"
        ,"#DDDDDD"
        ,"#999999"
        ,"#333333"
        ,"#000000"
    ];
    var chart = AmCharts.makeChart("chartdiv", {
        "theme": "none",
        "color" : "#FFFFFF",
        "type": "serial",
        "startDuration": 2,
        "fontSize" : 20,
        "fontFamily" : "Lato",
        "dataProvider": [],
        "valueAxes": [{
            "position": "left",
            "title": "Weight Volume"
        }],
        "graphs": [{
            "balloonText": "[[category]]: <b>[[value]]</b>",
            "fillColorsField": "color",
            "fillAlphas": 1,
            "lineAlpha": 0.1,
            "type": "column",
            "valueField": "weight"
        }],
        "depth3D": 20,
        "angle": 30,
        "chartCursor": {
            "categoryBalloonEnabled": false,
            "cursorAlpha": 0,
            "zoomable": false
        },
        "categoryField": "date",
        "categoryAxis": {
            "gridPosition": "start",
            "labelRotation": 90
        },
        "export": {
            "enabled": true
        }
    });

    var newChartData = [];
    var events=[];
    var selectedExcerciseLimit=25;
    var selectedExcerciseName="ALL"
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "/getTrainings?${_csrf.parameterName}=${_csrf.token}",
        success: function(data){
            getUserTrainings(data);
            reloadChart(newChartData);
            var excerciseArray = getExcervisesArray(data);
            setUsersExcercisesList(excerciseArray);
        },
        error: function(data){ console.log(data);}
    });

    $("#userExcercisesList").change(function () {
        selectedExcerciseName = $(this).val();
        newChartData = getChartRepresentObject(events, selectedExcerciseName, selectedExcerciseLimit);
        reloadChart(newChartData);
    });
    $("#userExcercisesLimit").change(function () {
        selectedExcerciseLimit = $(this).val();
        newChartData = getChartRepresentObject(events, selectedExcerciseName, selectedExcerciseLimit);
        reloadChart(newChartData);
    });

    $("#statisticsInfo").mouseover(function () {
        $("#statisticsModalInfo").removeClass("hidden")
        var width = $(this).css(width);
    });
    $("#statisticsInfo").mouseout(function () {
        $("#statisticsModalInfo").addClass("hidden")
    });


    function getUserTrainings(data){
        var groupedData = groupByDate(data);
        events = getEventsByDate(groupedData);
        events = events.sort(function(a, b){return a.date-b.date});
        newChartData = getChartRepresentObject(events, selectedExcerciseName, selectedExcerciseLimit);
    }

    function reloadChart(newData) {
        chart.dataProvider = newData;
        chart.validateData();
    }

    function getExcervisesArray(data){
        var mySet = new Set();
        for(i in data) {
            var excerciseName = data[i].excercise;
            mySet.add(excerciseName);
        }
        return Array.from(mySet);
    }

    function setUsersExcercisesList(userExcercisesList){
        for (var i=0;i<userExcercisesList.length;i++){
            $('<option/>').val(userExcercisesList[i]).html(userExcercisesList[i]).appendTo('#userExcercisesList');
        }
    }

    function groupBy( array , f )
    {
        var groups = {};
        array.forEach( function( o )
        {
            var group = JSON.stringify( f(o) );
            groups[group] = groups[group] || [];
            groups[group].push( o );
        });
        return Object.keys(groups).map( function( group )
        {
            return groups[group];
        })
    }

    function groupByDate(data) {
        var result = groupBy(data, function (item) {
            return [item.date];
        });
        return result;
    }

    function getEventsByDate(elem) {
        var myEvents = [];
        for (e in elem) {
            var event = {};
            event.date = elem[e][0].date;
            event.training = [];
            for (res in elem[e]) {
                event.training.push(elem[e][res]);
            }
            myEvents.push(event);
        }
        return myEvents;
    }

    function getChartRepresentObject(elem, excerciseName, excerciseLimit) {

        var myEvents = [];
        for (var ev in elem) {
            var singleEvent = {};
            if (elem[ev].training[0].status != "IN_PROGRESS") {
                singleEvent.date = convertDateToInputDate(new Date(elem[ev].date));
                var allWeight = 0;
                for (j in elem[ev].training) {
                    if(excerciseName == "ALL" || elem[ev].training[j].excercise == excerciseName) {
                        allWeight = allWeight + calculateExcerciseVolume(elem[ev].training[j]);
                    }
                }

                //var colorChanger = ev;
                singleEvent.weight = allWeight;
                singleEvent.color = getColor(allWeight);
                if(singleEvent.weight != 0) {
                    myEvents.push(singleEvent);
                }
                if(myEvents.length==excerciseLimit){
                    return myEvents;
                }
            }
        }
        return myEvents;
    }
    function getColor(value){
        var arr = ['A', 'B', 'C', 'D', 'E', 'F'];
        var redValue = parseInt(value / 100);
        var color = "#" + redValue + "F0000";
        if(redValue > 10){
            var modTen = redValue%10;
            modTen = modTen<6 ? modTen : 5;
            color = "#" + arr[modTen] + "F0000";
        }
        return color;
    }
    function calculateExcerciseVolume(excercise){
        var weightArray = parseWeightToArray(excercise.weight);
        var result = 0;
        for(i in weightArray){
            result = result + parseInt(weightArray[i]) * excercise.repeats;
        }
        return result;
    }
    function parseWeightToArray(weightString){
        var parsedWeightArray = [];
        parsedWeightArray = weightString.split("x");
        return parsedWeightArray;
    }

    function convertDateToInputDate(date){
        var convertedDate = "";
        var mydate = new Date(date);
        var localDate = mydate.toLocaleDateString();
        var dateElements = localDate.split(".");
        var years = dateElements[2]
        var months = dateElements[1]
        var days = dateElements[0]
        if(days<10){
            days = "0" + days;
        }
        convertedDate = years + "-" + months + "-" + days;

        return convertedDate;
    }

});