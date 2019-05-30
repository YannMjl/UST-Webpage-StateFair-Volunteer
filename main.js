// Do some stuff when page hmtl page is launched
$(document).ready(function () {

    $("#headerTitle").hide(300).show(1500);

    // calling show Events list function
    showEvent();
});

function showEvent() {

    var eventId = 'a3s56000000Mf6n',
        viewStart = '2019-5-3+00:00:00',
        viewEnd = '2019-12-3+00:00:00',
    state_fair_2019_feed = 'https://staging-stthomas.cs42.force.com/applicantportal/services/apexrest/usteventfeed?eventId=a3s56000000Mf6n&feedType=eventList&viewStart=2019-6-3+00:00:00&viewEnd=2019-9-3+24:59:59';
   
    $.ajax({

        type: "GET",

        url: state_fair_2019_feed,

        data: {
            'feedType': 'eventList',
            'eventId': eventId,
            'viewStart': viewStart.replace("+", " "),
            'viewEnd': viewEnd.replace("+", " ")
        },

        dataType: "jsonP", // use JsonP for datatype if API does not have CORS set

        error: function (e) {
            alert("An error occurred while processing API calls");
            console.log("API call Failed: ", e);
        },

        success: function (data){

            console.log('show data: ', data);

            $.each(data, function (index, value) {

                // console.log('Title: ', value.title);
                $('ul').append(
                    '<li>' + value.ID + '</li>'
                );
                
            });
            
        }

    });
}