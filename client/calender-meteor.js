Session.setDefault('editing_calevent', null);
Session.setDefault('showEditEvent', false);
Session.setDefault('lastMod', null);

Template.calendar.rendered = function(){
    $('#cal').fullCalendar({
        dayClick : function(date , allDay, jsEvent,view){
            CalEvents.insert({
                title:'New Event',
                start:date,
                end : date
            });
            Session.set("lastMod",new Date());
        },
        eventClick: function(calEvent,jsEvent,view){
            Session.set('editing_calevent' , calEvent.id);
            Session.set('showEditEvent',true);
        },
        events: function(start ,end, callback){
            var e = [];
            calEvents = CalEvents.find();
            console.log("here" + calEvents.count());

            calEvents.forEach(function(evt){
                e.push({
                    id : evt._id,
                    title : evt.title,
                    start :evt.start,
                    end : evt.end
                });
            });
            callback(e);
        }
    });
}

Template.calendar.helpers({
    lastMod:function(){ return Session.get('lastMod');},
    showEditEvent: function(){return Session.get('showEditEvent')}
});