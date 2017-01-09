$(document).ready(function() {


     $('#calendar').fullCalendar({
        defaultDate: trainingHandler.convertDateToInputDate(new Date()),
         editable: true,
        eventLimit: true,
        dayClick: function(date) {
            trainingHandler.showAddEventForm(new Date(date));
        },
        eventClick: function(event) {
            trainingHandler.showUpdateEventForm(event);
        },
        eventLimitClick: function(){
            alert('You have training for today, first make this trainng,then add next!');
        }
    });

     trainingHandler.updateExcerciseFormWithFetchedEnums();
     trainingHandler.updateDataCallendarEvents();
     trainingHandler.saveTraining();
     trainingHandler.toggleExcercise();
     trainingHandler.toggleExcercise2();
     trainingHandler.deleteExcercise();
     trainingHandler.addNewExcerciseSchema();

});



