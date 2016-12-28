/**
 * Created by Tarti on 2016-12-28.
 */
$(document).ready(function() {

    $('#calendar').fullCalendar({
        defaultDate: '2016-11-01',
        editable: true,
        eventLimit: true, // allow "more" link when too many events
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