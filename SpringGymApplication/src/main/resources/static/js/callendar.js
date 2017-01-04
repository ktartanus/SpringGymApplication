/**
 * Created by Tarti on 2016-12-28.
 */
$(document).ready(function() {

    var options = {
        backdrop: true,
        keyboard: true,
        show: true,
    };

    $('#calendar').fullCalendar({
        defaultDate: '2016-11-01',
        editable: true,
        eventLimit: true, // allow "more" link when too many events
        dayClick: function() {
            alert('a day has been clicked!');
            $.ajax({
                type: "POST",
                contentType: "application/json",
                url: "/addTrainings?${_csrf.parameterName}=${_csrf.token}",
                data: JSON.stringify([
                    {
                        id: 11
                        ,

                        excercise: "DIPSY"
                        ,

                        status: "IN_PROGRESS"
                        ,

                        series: 1
                        ,

                        repeats: 2
                        ,

                        date: new Date(2017,00,05,0,0,0,0)
                    },
                    {
                        id: 10
                        ,

                        excercise: "BRZUSZKI"
                        ,

                        status: "IN_PROGRESS"
                        ,

                        series: 1
                        ,

                        repeats: 4
                        ,

                        date: new Date(2017,00,05,0,0,0,0)
                    }
                    ]),
                success: function(data){ console.log(data); console.log(new Date(data[0].date))},
                error: function(data){ console.log(data);}
            });

            $('#myModal').modal(options);
        },
        eventClick: function() {
            alert('a event has been clicked!');
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

        },
        eventLimit :1,
        eventLimitClick: function(){
            alert('You have training for today, first make this trainng,then add next!');
        },
        events: [
            {
                title: 'All Day Event',
                start: '2016-11-01'
            },
            {
                title: 'Long Event',
                start: '2016-11-07',
                end: '2016-11-10'
            },
            {
                id: 999,
                title: 'Repeating Event',
                start: '2016-11-09T16:00:00'
            },
            {
                id: 999,
                title: 'Repeating Event',
                start: '2016-11-16T16:00:00'
            },
            {
                title: 'Conference',
                start: '2016-11-11',
                end: '2016-11-13'
            },
            {
                title: 'Meeting',
                start: '2016-11-12T10:30:00',
                end: '2016-11-12T12:30:00'
            },
            {
                title: 'Lunch',
                start: '2016-11-12T12:00:00'
            },
            {
                title: 'Meeting',
                start: '2016-11-12T14:30:00'
            },
            {
                title: 'Happy Hour',
                start: '2016-11-12T17:30:00'
            },
            {
                title: 'Dinner',
                start: '2016-11-12T20:00:00'
            },
            {
                title: 'Birthday Party',
                start: '2016-11-13T07:00:00'
            },
            {
                title: 'Click for Google',
                url: 'http://google.com/',
                start: '2016-11-28'
            }
        ]
    });

});