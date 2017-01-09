var trainingHandler = (function(){
    var my = {};
    var modalOptions = {
        backdrop: true,
        keyboard: true,
        show: true,
    };
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

    function showModal(name) {
        $('#' + name).modal(modalOptions);
    }

    function setDateInTrainingForm(clickedDate) {
        var convertedDate = convertDateToInputDate(clickedDate);
        $("#addTrainingForm .form-group input").val(convertedDate);
    }
    function setDefaultStatusInTrainingFrom(clickedDate) {
        var clickedDateTime = clickedDate.getTime();
        var actualDateTime = new Date().getTime();

        if(clickedDateTime<actualDateTime){
            $('#statusInput').val("DONE");
        }
        else{
            $('#statusInput').val("IN_PROGRESS");

        }
    };
    function refreshForm(formName){
        $("#" + formName + " > div.excercise").not(":first").each(function () {
            $(this).remove();
        });
    };
    function addAllTrainings(events) {
        var convertedDate = new Date(events[0].date);
        $('#updateTrainingForm .statusInput').val(events[0].status);
        $('#updateTrainingForm .dateInput').val(convertedDate);

        for(ev in events){
            addSingleTrainig(events[ev]);
        }
        $("#updateTrainingForm > div:nth-child(3)").hide();
    }

    function addSingleTrainig(singleEvent){

        $modalExcerciseForm = $("#updateTrainingForm > div:nth-child(3)").clone(true,true);
        $newModalForm = $modalExcerciseForm.clone(true,true);
        $newModalForm.show();
        $('.modal-body', $newModalForm).hide();
        $('.slideButton', $newModalForm).text("+");
        $('.excerciseInput', $newModalForm).val(singleEvent.excercise);
        $('.seriesInput', $newModalForm).val(singleEvent.series);
        $('.repeatsInput', $newModalForm).val(singleEvent.repeats);

        $(".modal-body-header", $newModalForm).text(singleEvent.excercise);
        $newModalForm.addClass("topLine");
        $newModalForm.insertBefore(".modal-footer");

    };

    my.convertDateToInputDate = function (date) {
        convertDateToInputDate(date);
    }
    my.showUpdateEventForm = function (event) {
        showModal("myUpdateModal");
        addAllTrainings(event.training);
        refreshForm("updateTrainingForm");
    }
    my.showAddEventForm = function (clickedDate) {
        showModal("myAddModal");
        refreshForm("addTrainingForm");
        setDateInTrainingForm(clickedDate);
        setDefaultStatusInTrainingFrom(clickedDate);
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

    function getEvents(elem) {
        var events = [];
        for (e in elem) {
            var event = {};
            event.date = elem[e][0].date;
            event.training = [];
            for (res in elem[e]) {
                event.training.push(elem[e][res]);
            }
            events.push(event);
        }
        return events;
    }


    function getCallendarEvents(elem) {

        var events = [];
        for (var ev in elem) {
            var singleEvent = {};
            singleEvent.start = convertDateToInputDate(new Date(elem[ev].date));
            singleEvent.training = elem[ev].training;
            singleEvent.title = "";
            events.push(singleEvent);
        }
        return events;
    }
    my.callEvents = [];
    my.moduleProperty = 1;

    function addTrainings() {
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "/addTrainings?${_csrf.parameterName}=${_csrf.token}",
            data: JSON.stringify(getAllExcercisesFromForm()),
            success: function(data){
                var events = getEvents(groupByDate(data));
                var callendarEvents = callEvents.concat(getCallendarEvents(events));
                callEvents = callendarEvents;
                reloadCallendarEvents(callEvents);

                alert("succes");
            },
            error: function(data){  alert("fail");}
        });
    };

    my.updateTraining = function () {
        $.ajax({
            type: "PATCH",
            contentType: "application/json",
            url: "/updateTrainings?${_csrf.parameterName}=${_csrf.token}",
            data: JSON.stringify([
                {
                    id: 21
                    ,

                    excercise: "PODCIAGANIE"
                    ,

                    status: "IN_PROGRESS"
                    ,

                    series: 4
                    ,

                    repeats: 10
                    ,

                    date: new Date(2017,00,05,0,0,0,0)
                },
                {
                    id: 22
                    ,

                    excercise: "KLATA"
                    ,

                    status: "IN_PROGRESS"
                    ,

                    series: 4
                    ,

                    repeats: 10
                    ,

                    date: new Date(2017,00,05,0,0,0,0)
                }
            ]),
            success: function(data){ console.log(data); console.log(new Date(data.date))},
            error: function(data){ console.log(data);}
        });

    };
    function getExcerciseDataFromInput(excercise){
            var excerciseName = $('.excerciseInput', excercise).val();
            var series = $('.seriesInput', excercise).val();
            var repeats = $('.repeatsInput', excercise).val();
            var status = $('#addTrainingForm .statusInput').val();
            var date = $('#addTrainingForm .dateInput').val();

            var singleExcerciseResult = {};
            singleExcerciseResult.excercise = excerciseName;
            singleExcerciseResult.series = series;
            singleExcerciseResult.repeats = repeats;
            singleExcerciseResult.status = status;
            singleExcerciseResult.date = date;
            return singleExcerciseResult;

        }

    function getAllExcercisesFromForm() {
        var trainings = [];
        $("#addTrainingForm .modal-body").each(function () {
            trainings.push( getExcerciseDataFromInput(this));
        });
        return trainings;
    }
    function setExcerciseTittleFromSelectInput(){
        $(".excerciseInput").change(function () {
            $that = $(this);
            $(this).parent().parent().parent().children("span").text($that.val());
        })
    }

    my.updateExcerciseFormWithFetchedEnums = function () {
        $.ajax({
            type: "GET",
            contentType: "application/json",
            url: "/getStatusEnum?${_csrf.parameterName}=${_csrf.token}",
            success: function(data){
                for (var i=0;i<data.length;i++){
                    $('<option/>').val(data[i]).html(data[i]).appendTo('.statusInput');
                }
            },
            error: function(data){ console.log(data);}
        });

        $.ajax({
            type: "GET",
            contentType: "application/json",
            url: "/getExcerciseEnum?${_csrf.parameterName}=${_csrf.token}",
            success: function(data){
                for (var i=0;i<data.length;i++){
                    $('<option/>').val(data[i]).html(data[i]).appendTo('.excerciseInput');
                }
            },
            error: function(data){ console.log(data);},
            async: false
        });

        setExcerciseTittleFromSelectInput();

    };

    my.deleteExcercise = function () {
        $(".deleteButton").click(function () {
           $(this).parent().remove();
            console.log(callendarEvents);
        });

    };

    my.saveTraining = function(){

        $("#addTrainingForm").submit(function(e){
            e.preventDefault();
            addTrainings();
        })

    };
    my.toggleExcercise = function(){
        $(".modal-body-header").click(function () {
            $(this).next().toggle(function () {
                    $(this).next().slideUp(500);

                },
                function () {
                    $(this).next().slideDown(500);
                });
        })
    };
    my.toggleExcercise2 = function(){
        $(".slideButton").click(function () {
            var $that = $(this);

            $(this).next().toggle(function ($that) {
                    $(this).next().slideUp(500);
                    $that.text("-");

                },
                function () {
                    $(this).next().slideDown(500);
                    $(this).prev().text("+");
                });
        })
    };
    my.addNewExcerciseSchema = function(){
        $modalForm = $("#addTrainingForm > div:nth-child(3)").clone(true,true);
        $("#addNewExcerciseButton").click(function(e){
            $newModalForm = $modalForm.clone(true,true);
            $(".modal-body input", $newModalForm).each(function(){
                $(this).val("");
            });
            $(".modal-body-header", $newModalForm).text("NewExcercise");
            $newModalForm.addClass("topLine");
            $newModalForm.insertBefore(".modal-footer");
        })

    };

    my.getTrainings = function(){
    };
    function reloadCallendarEvents(newEvents) {
        $('#calendar').fullCalendar('removeEvents');
        $('#calendar').fullCalendar('addEventSource', newEvents);
    }
    my.updateDataCallendarEvents= function () {
        $.ajax({
            type: "GET",
            contentType: "application/json",
            url: "/getTrainings?${_csrf.parameterName}=${_csrf.token}",
            success: function(data){
                var groupedData = groupByDate(data);
                var ev = getEvents(groupedData);
                var callendarEvents = getCallendarEvents(ev);
                callEvents = callendarEvents;
                reloadCallendarEvents(callEvents);

            },
            error: function(data){ console.log(data);}
        });
    };

    return my;
}());