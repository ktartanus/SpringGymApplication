var trainingHandler = (function(){
    var my = {};
    var modalOptions = {
        backdrop: true,
        keyboard: true,
        show: true,
    };
    var eventColors = { DONE : "#62be12", FAIL : "#be2b0b", IN_PROGRESS : "#ffff00"};
    var deletedExcercises = [];
    my.callEvents = [];

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
        $("#addTrainingForm .form-group .dateInput").val(convertedDate);
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
    }
    my.statusChanged = function () {
        $(".statusInput").change(function () {
            $span = $(this).prev();
            if($(this).val() == "DONE"){
                $("i", $span).removeClass();
                $("i", $span).addClass("fa fa-thumbs-up");
            }
            if($(this).val() == "IN_PROGRESS"){
                $("i", $span).removeClass();
                $("i", $span).addClass("fa fa-hand-rock-o");
            }
            if($(this).val() == "FAILED"){
                $("i", $span).removeClass();
                $("i", $span).addClass("fa fa-thumbs-down");
            }

        });
    }
    function refreshForm(formName){
        $("#" + formName + " > div.excercise").not(":first").each(function () {
            $(this).remove();
        });
        var $firstExcercieForm = $("#" + formName + " > div.excercise").eq(0);
        $(".modal-body .form-group .seriesInput", $firstExcercieForm).val(4);
        $(".modal-body .form-group .repeatsInput", $firstExcercieForm).val(8);
        $(".modal-body .form-group .weightInput", $firstExcercieForm).val(20);
        if(formName == "addTrainingForm") {
            $(".modal-body .form-group .seriesInput", $firstExcercieForm).trigger("change");
        }
        resetErrors();

    }
    function resetErrors(){
        $(".help-block").text("").addClass("hidden");
    }

    function removeWeightInputs( nodeElement) {
        //$(".weightInput").first().parent().addClass("hidden");
        //$(".weightInput").not(":first").parent().remove();
        //var $weightinputParent =  $("#" + typeForm + " .modal-body>div.form-group input.weightInput").not(":eq(0)").parent().css("background","red").remove();
        var $weightinputParent =  $(" input.weightInput", nodeElement).not(":eq(0)").parent().remove();
    }
    function addAllTrainingsToUpdateForm(events) {
        var convertedDate = convertDateToInputDate(new Date(events[0].date));
        $('#updateTrainingForm .statusInput').val(events[0].status);
        $('#updateTrainingForm .dateInput').val(convertedDate);

        for(ev in events){
            addSingleTrainig(events[ev]);
        }
        $("#updateTrainingForm > div:nth-child(2)").hide();
    }

    function addSingleTrainig(singleEvent){
        $modalExcerciseForm = $("#updateTrainingForm > div:nth-child(2)").clone(true,true);
        $newModalForm = $modalExcerciseForm.clone(true,true);
        $newModalForm.show();
        $('.modal-body', $newModalForm).hide();
        $('.idInput', $newModalForm).val(singleEvent.id);
        $('.excerciseInput', $newModalForm).val(singleEvent.excercise);
        $('.seriesInput', $newModalForm).val(singleEvent.series);
        $('.repeatsInput', $newModalForm).val(singleEvent.repeats);

        var weightArray = singleEvent.weight.split("x");
        var $weightInput = $('.weightInput', $newModalForm).parent();
        $weightInput.removeClass("hidden");
        for(singleWeight in weightArray){
            if(singleWeight == 0){
                $("input", $weightInput).val(weightArray[singleWeight]);
            }
            else {
                var $clonedWeightInput = $weightInput.clone(true, true);
                $("input", $clonedWeightInput).val(weightArray[singleWeight]);
                $clonedWeightInput.insertAfter($weightInput);

            }
        }

        $(".modal-body-header", $newModalForm).text(singleEvent.excercise);
        $newModalForm.addClass("topLine");
        $newModalForm.insertBefore(".modal-footer");

    };
     function addIconsToEvents() {
        $(".icon-done").each(function () {
            $content = $(".fc-content",this);
            jQuery('<i/>', {
                class: 'fa fa-thumbs-up fa-5x icon-fa-done',
            }).appendTo($content);
        })
        $(".icon-fail").each(function () {
            $content = $(".fc-content",this);
            jQuery('<i/>', {
                class: 'fa fa-thumbs-down fa-5x icon-fa-fail',
            }).appendTo($content);
        })
        $(".icon-inProgress").each(function () {
            $content = $(".fc-content",this);
            jQuery('<i/>', {
                class: 'fa fa-hand-rock-o fa-5x icon-fa-inProgress',
            }).appendTo($content);
        })
    }

    my.addIconsReloadToFCButtons = function () {
        $(".fc-button").click( function () {
            addIconsToEvents();
        });
    };
    my.convertDateToInputDate = function (date) {
        convertDateToInputDate(date);
    };
    my.showUpdateEventForm = function (event) {
        deletedExcercises = [];
        showModal("myUpdateModal");
        refreshForm("updateTrainingForm");
        addAllTrainingsToUpdateForm(event.training);
    };
    my.showAddEventForm = function (clickedDate) {
        showModal("myAddModal");
        refreshForm("addTrainingForm");
        //removeWeightInputs();
        setDateInTrainingForm(clickedDate);
        setDefaultStatusInTrainingFrom(clickedDate);
    };

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
            singleEvent.color = setSingleEventColor(elem[ev]);
            singleEvent.className = setSingleEventClass(elem[ev]);
            events.push(singleEvent);
        }

        return events;
    }
    function setSingleEventColor(element){
        var color = "";
        if(element.training[0].status == "DONE") {
            color = eventColors["DONE"];
        }
        if(element.training[0].status == "FAILED") {
            color = eventColors["FAIL"];
        }
        if(element.training[0].status == "IN_PROGRESS") {
            color = eventColors["IN_PROGRESS"];
        }
        return color;
    }
    function setSingleEventClass(element){
        var eventClass = "";
        if(element.training[0].status == "DONE") {
            eventClass = "icon-done";
        }
        if(element.training[0].status == "FAILED") {
            eventClass = "icon-fail";
        }
        if(element.training[0].status == "IN_PROGRESS") {
            eventClass = "icon-inProgress";
        }
        return eventClass;
    }


    function addTrainings() {
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "/addTrainings?${_csrf.parameterName}=${_csrf.token}",
            data: JSON.stringify(getAllExcercisesFromForm("addTrainingForm")),
            success: function(data){
                var events = getEvents(groupByDate(data));
                var callendarEvents = callEvents.concat(getCallendarEvents(events));
                callEvents = callendarEvents;
                reloadCallendarEvents(callEvents);
                addIconsToEvents();
                alert("succes");
            },
            error: function(data) {
                alert("fail");
                handleFormErrors(data.responseJSON, "addTrainingForm");
            }
        });
    };

    function handleFormErrors(errors,formType) {
        resetErrors();
        var myErrors = errors.fieldErrors;
        for(error in myErrors){
            var parsedError = parseErrorField(myErrors[error], formType);
            handleFieldError(parsedError, formType);
        }
        console.log(myErrors);

    }

    function parseErrorField(unparsedError,formType) {
        var test = unparsedError.field;
        var testRE = test.match("\\[(.*)\\]");
        var testRE2 = test.match("\\[(.*)\\]\\.(.*)");
        var listElement = 0;
        var field = "";
        if (testRE2 != null){
            listElement = testRE2[1];
            field = testRE2[2];
        }
        else{
            listElement = testRE[1];
            field = "global";
        }
        if(formType == "updateTrainingForm"){
            listElement =  parseInt(listElement) + 1;
        }
        return {listIndex : listElement, field : field, message : unparsedError.message};
    }

    function handleFieldError(fieldError, formType){
        console.log(fieldError);
        var $excerciseId = $("#"+ formType +">div.excercise").eq(fieldError.listIndex);
        var inputId = "." + fieldError.field + "Input";
        if(fieldError.field == "global"){
            $("#"+ formType+">div.row>div").last().children(".with-errors").text(fieldError.message).removeClass("hidden");
        }
        else if(fieldError.field == "weight"){
            $(inputId, $excerciseId).parent().next(".with-errors").text(fieldError.message).removeClass("hidden");
        }
        else {
            $(inputId, $excerciseId).parent().next().text(fieldError.message).removeClass("hidden");
        }
    }
    function deleteEventsFromCallendarEvents(){
        for( i in callEvents){
            for(j in callEvents[i].training)
                for(k in deletedExcercises){
                    if(callEvents[i].training[j].id == deletedExcercises[k]){
                        callEvents[i].training.splice(j, 1);
                    }
                }

            if(callEvents[i].training.length == 0){
                callEvents.splice(i, 1);
            }
        }
    }
    function updateTraining() {
        $.ajax({
            type: "PATCH",
            contentType: "application/json",
            url: "/updateTrainings?${_csrf.parameterName}=${_csrf.token}",
            data: JSON.stringify(getAllExcercisesFromUpdateForm("updateTrainingForm")),
            success: function(data){
                deleteTrainings();
                var events = getEvents(groupByDate(data));
                var newCallendarEvents = (getCallendarEvents(events));

                callEvents = addUpdatedEventsAndRemoveDoubled(newCallendarEvents);
                reloadCallendarEvents(callEvents);
                addIconsToEvents();
                alert("sukces");
            },
            error: function(data){
                alert("fail");
                handleFormErrors(data.responseJSON, "updateTrainingForm");
               }
        });

    }
    function addUpdatedEventsAndRemoveDoubled(newEvents) {
        var newCallEvents = callEvents;
        for(i in newEvents){
            var changedAllTraining = true;
            for(j in newCallEvents){
                if(newCallEvents[j].start == newEvents[i].start){
                    changedAllTraining = false;
                    if(newCallEvents[j].training.length < newEvents[i].training.length){
                        newCallEvents[j].training = newEvents[i].training;
                    }
                }
            }
            if(changedAllTraining == true){
                newCallEvents.add(newEvents[i]);
            }
        }
        return newCallEvents;
    }

    function deleteTrainings(){
        $.ajax({
            type: "DELETE",
            contentType: "application/json",
            url: "/deleteTrainings?${_csrf.parameterName}=${_csrf.token}",
            data: JSON.stringify(deletedExcercises),
            success: function(data){
                deleteEventsFromCallendarEvents();
                reloadCallendarEvents(callEvents);
                addIconsToEvents();
                alert("sukces");},
            error: function(data){
                alert("fail");
                console.log(data);}
        });
    }

    function getExcerciseDataFromInput(excercise, typeForm){
            var idinput = $('.idInput', excercise).val();
            var excerciseName = $('.excerciseInput', excercise).val();
            var series = $('.seriesInput', excercise).val();
            var repeats = $('.repeatsInput', excercise).val();
            var status = $('#' + typeForm + ' .statusInput').val();
            var date = $('#' + typeForm + ' .dateInput').val();
            var weight = "";
            $('.weightInput', excercise).each(function () {
                if ($(this).val()!=null) {
                    weight = weight + $(this).val() + "x";
                }
            });

            weight = weight.slice(0, -1);

            var singleExcerciseResult = {};
            singleExcerciseResult.excercise = excerciseName;
            singleExcerciseResult.series = series;
            singleExcerciseResult.repeats = repeats;
            singleExcerciseResult.status = status;
            singleExcerciseResult.weight = weight;
            singleExcerciseResult.date = date;
            singleExcerciseResult.id = idinput;
            return singleExcerciseResult;

        }

    function getAllExcercisesFromForm(typeForm) {
        var trainings = [];
        $("#" + typeForm +" .modal-body").each(function () {
            trainings.push( getExcerciseDataFromInput(this, typeForm));
        });
        console.log(trainings);
        return trainings;
    }

    function getAllExcercisesFromUpdateForm(typeForm) {
        var trainings = [];
        $("#" + typeForm +" .modal-body").not(":first").each(function () {
            trainings.push( getExcerciseDataFromInput(this, typeForm));
        });
        return trainings;
    }

    function setExcerciseTittleFromSelectInput(){
        $(".excerciseInput").change(function () {
            $that = $(this);
            var $form = $(this).parent().parent().parent();
            $("h3",$form).text($that.val());
        })
    }

    my.updateExcerciseFormWithFetchedEnums = function () {
        $.ajax({
            type: "GET",
            contentType: "application/json",
            url: "/getStatusEnum?${_csrf.parameterName}=${_csrf.token}",
            success: function(data){
                for (var i=0;i<data.length;i++){
                    var $option = $('<option/>').val(data[i]).html(data[i]).appendTo('.statusInput');

                    if(data[i] == "FAILED"){
                        $('<i/>').addClass("fa fa-thumbs-down toLeft margin-right-5").appendTo($option);
                    }
                    if(data[i] == "IN_PROGRESS"){
                        $('<i/>').addClass("fa fa-hand-rock-o toLeft  margin-right-5").appendTo($option);
                    }
                    if(data[i] == "DONE"){
                        $('<i/>').addClass("fa fa-thumbs-up toLeft  margin-right-5").appendTo($option);
                    }
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
           $(this).parent().parent().parent().remove();
        });

    };

    my.deleteUpdatedExcercise = function () {
        $(".deleteUpdateButton").click(function () {
            var $parent = $(this).parent().parent().parent();
            var $firstGroup = $("div.modal-body .form-group",$parent).eq(0);
            var id = $("input", $firstGroup).val();
            deletedExcercises.push(id);
            $(this).parent().parent().parent().remove();
        });

    };

    my.saveTraining = function(){

        $("#addTrainingForm").submit(function(e){
            e.preventDefault();
            addTrainings();
        })

    };

    my.updateTraining = function(){

        $("#updateTrainingForm").submit(function(e){
            e.preventDefault();
            updateTraining();
        })

    };

    my.toggleExcercise2 = function(){
        $(".slideButton").click(function () {
            var $that = $(this);

            $(this).parent().parent().next().toggle(function () {
                    $(this).parent().parent().next().show(500);
                    // $(".fa", $that).addClass("fa-angle-down");
                    // $(".fa", $that).removeClass("fa-angle-up");
                    $(".slideButton .fa").removeClass("fa-angle-up");
                    $(".slideButton .fa").addClass("fa-angle-down");

                },
                function () {
                    $(this).parent().parent().next().hide(500);
                    //var $button = $(this).prev();
                    $(".slideButton .fa").removeClass("fa-angle-down");
                    $(".slideButton .fa").addClass("fa-angle-up");
                });
        })
    };
    my.addNewExcerciseSchema = function(){
        $modalForm = $("#addTrainingForm > div:nth-child(2)").clone(true,true);
        $(".addNewExcerciseButton").click(function(e){
            $newModalForm = $modalForm.clone(true,true);
            $(".modal-body input", $newModalForm).each(function(){
                $(this).val("");
            });
            $(".modal-body-header", $newModalForm).text("New Excercise");
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
                addIconsToEvents();

            },
            error: function(data){ console.log(data);}
        });
    };

    function addColorToEvent(event, status){};
    if(status=="IN_PROGRESS"){
        $(event).addClass("bg-inProgress");
    }
    if(status=="DONE"){
        $(event).addClass("bg-done");
    }
    if(status=="FAIL"){
        $(event).addClass("bg-fail");
    }

    function addColorToAllEvents(mEvents) {
        for(i in mEvents){

        }

    }

    my.deleteDefaultDayNumberClickEvent = function(){
        //$(".fc-day-number").css("background", "edr");
    };

    my.addWeightInputsToForm = function(){
        $(".seriesInput").change(function () {
            //poprawic funkcje remove weightinputs i clone weight inputs

            var $parent = $(this).parent().parent();
            removeWeightInputs($parent);
            var count = $(this).val();
            var $weightinput =  $("input.weightInput", $parent).eq(0).parent().removeClass("hidden");
            for(var i = count; i>=2; i--) {
                var $clonedWeightInput = $weightinput.clone(true, true);
                $("label", $clonedWeightInput).text("Series " + i + ":");
                $clonedWeightInput.insertAfter($weightinput);
            }
        })
    };

    return my;
}());