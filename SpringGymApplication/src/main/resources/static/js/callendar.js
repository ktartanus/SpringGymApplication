$(document).ready(function() {


     $('#calendar').fullCalendar({
         defaultDate: trainingHandler.convertDateToInputDate(new Date()),
         editable: true,
         eventDurationEditable:false,
         eventStartEditable: false,
         eventLimit: 1,
         dayClick: function(date, jsEvent) {
            var classes = jsEvent.target.className.split(" ");
            for(i in classes) {
                if (classes[i] == "fc-day-number") {
                    return;
                }
            }
            trainingHandler.showAddEventForm(new Date(date));
        },
         eventClick: function(event) {
         trainingHandler.showUpdateEventForm(event);
},
         eventLimitClick: function(){
            alert('You have training for today, first make this trainng,then add next!');
         }
    });

     trainingHandler.addWeightInputsToForm();
     trainingHandler.updateExcerciseFormWithFetchedEnums();
     trainingHandler.updateDataCallendarEvents();
     trainingHandler.saveTraining();
     trainingHandler.updateTraining();
     trainingHandler.toggleExcercise2();
     trainingHandler.deleteExcercise();
     trainingHandler.deleteUpdatedExcercise();
     trainingHandler.addNewExcerciseSchema();
     trainingHandler.addIconsReloadToFCButtons();
     trainingHandler.statusChanged();
});



