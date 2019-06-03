$(document).ready(function () {

    console.log("Here We Go");

    getSalesforceDates();
}); 

function getSalesforceDates() {

    console.log("(ajax-call)Starting.........");

    $.ajax({
        type: "GET",

        url: "https://staging-stthomas.cs42.force.com/applicantportal/services/apexrest/usteventfeed?eventId=a3s56000000Mf6n&feedType=eventList&viewStart=2019-6-3+00:00:00&viewEnd=2019-9-3+24:59:599",

        dataType: "jsonP",

        error: function(error){
            alert("Error Occurred");
            console.log("Failed ajax call" , error);
        },
        
        success: function(data){
            console.log("DATA:", data);
            
            
            $.each(data, function(key, value){
                //console.log("Date", value.start,value.end)

                //gives the value in Date format
                var start = new Date(value.start);
                var end = new Date(value.end);

                //gives the date and time 
                console.log(start.toLocaleString());
                //console.log(end.toLocaleString());
                var starttime = start.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' });
                var endtime = end.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' });
             
                var url = value.eventUrl;

                var STtime = start.toLocaleTimeString( { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
                //gives pm and am.
                //console.log('Month:', STtime);

          
            $('.show').append( 

            '<div class="data">'+

            '<div class="left">' +' '+
            starttime+ ' - '+
            endtime +
            '</div>'+
  
            '<div class="right">'+    
            
            '<button id="button" onclick="window.open(\''+url+'\',\'_blank\')">Register</button>'+
            // '<a id="button" href="https://staging-stthomas.cs42.force.com/applicantportal/USTEventRegister?instanceID=a3456000000HNn1AAG" target="_blank">Register</a>'+
            // '</div>'+
           
            
            '</div>'
            )
                
            })
        } 

    });

}