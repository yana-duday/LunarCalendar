
// Shows the lunar_cal div with the monthly calendar, and display "Hide" option
function show() {

   document.getElementById("lunar_cal").style.display = "block";
   document.getElementById("show-month").style.display = "none";
   document.getElementById("hide-month").style.display = "block";

}

// Hides the lunar_cal div with the monthly calendar, and display "Show" option
function hide() {
   document.getElementById("lunar_cal").style.display = "none";
   document.getElementById("hide-month").style.display = "none";
   document.getElementById("show-month").style.display = "block";
}

// Generate table for the monthly calendar
function lunar_calendar(calendarDay) {
   if (calendarDay == null) calDate=new Date()
   else calDate = new Date(calendarDay);

   document.write("<table id='calendar_table'>");
   writeCalTitle(calDate);
   writeDayNames();
   writeCalDays(calDate);
   document.write("</table>");
}

// Display month in table heading
function writeCalTitle(calendarDay) {
   var monthName = new Array("January", "February", "March", "April", "May",
      "June", "July", "August", "September", "October", "November", "December");

   var thisMonth=calendarDay.getMonth();
   var thisYear=calendarDay.getFullYear();

   document.write("<tr>");
   document.write("<th id='calendar_head' colspan='7'>");
   document.write(monthName[thisMonth]+" "+thisYear);
   document.write("</th>");
   document.write("</tr>");
}

// Write the day names in heading
function writeDayNames() {
   var dayName = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");
   document.write("<tr>");
   for (var i=0;i<dayName.length;i++) {
      document.write("<th class='calendar_weekdays'> " + dayName[i]+"</th>");
   }
   document.write("</tr>");
}

// Figure out days in the month
function daysInMonth(calendarDay) {
   var thisYear = calendarDay.getFullYear();
   var thisMonth = calendarDay.getMonth();
   var dayCount = new Array(31,28,31,30,31,30,31,31,30,31,30,31);

   if (thisYear % 4 == 0) {
      if ((thisYear % 100 != 0) || (thisYear % 400 == 0)) {
         dayCount[1]=29;  // this is a leap year
      }
   }
   return dayCount[thisMonth]; // return the number of days in the month
}

// Write month days in cells in table
function writeCalDays(calendarDay) {
   var currentDay = calendarDay.getDate();

   // determine the starting day of the week
   var dayCount = 1;
   var totalDays = daysInMonth(calendarDay);
   calendarDay.setDate(1);               // set the date to the first day of the month
   var weekDay = calendarDay.getDay();   // the day of the week of the first day

   // write blank cells preceding the starting day
   document.write("<tr>");
   for (var i=0; i < weekDay; i++) {
      document.write("<td></td>");
   }

   // write cells for each day of the month
   while (dayCount <= totalDays) {
      //write the table rows and cells
      if (weekDay == 0) document.write("<tr>");

         // display the day as usual
         document.write("<td class='calendar_dates'>"+dayCount+"<img src='phase" + 
            calcMPhase(calendarDay) + ".jpg'></td>");
      

      if (weekDay == 6) document.write("</tr>");

      // move to the next day
      dayCount++;
      calendarDay.setDate(dayCount);
      weekDay = calendarDay.getDay();
   }
   document.write("</tr>")
}

// Calculate phase of moon to generate image based on moon's age
function calcMPhase(calendarDay) {
   var AG = calcMAge(calendarDay);

   if (AG < 0.759) phase=0;
   else if (AG < 2.759) phase=1;
   else if (AG <  4.759) phase=2;
   else if (AG < 5.759) phase=3;
   else if (AG <  7.759) phase=4;
   else if (AG < 9.759) phase=5;
   else if (AG < 10.759) phase=6;
   else if (AG < 13.759) phase=7;
   else if (AG < 15.759) phase=8;
   else if (AG < 17.759) phase=9;
   else if (AG < 18.759) phase=10;
   else if (AG < 20.759) phase=11;
   else if (AG < 22.759) phase=12;
   else if (AG < 23.759) phase=13;
   else if (AG < 24.759) phase=14;
   else if (AG < 28.289) phase=15;
   else phase=0;

   return phase;
}

// Calculate age of the moon, based on 1999 calculation by Bradley Schaefer
function calcMAge(calendarDay) {
   var thisYear=calendarDay.getFullYear();
   var thisMonth=calendarDay.getMonth()+1;
   var thisDay=calendarDay.getDate();

   var YY = thisYear - Math.floor((12 - thisMonth)/10);
   var MM = thisMonth+9;
   if (MM >= 12) MM=MM-12;     
    
   var K1 = Math.floor( 365.25 * ( YY + 4712 ) );
   var K2 = Math.floor( 30.6 * MM + 0.5 );
   var K3 = Math.floor( Math.floor( ( YY / 100 ) + 49 ) * 0.75 ) - 38;
    
   var JD = K1 + K2 + thisDay + 59;
   if (JD > 2299160) JD=JD-K3;

   var IP = normalize((JD-2451550.1)/29.530588853);
   var AG = IP*29.53; // the moon's age in days   

   return roundValue(AG, 3);
}

function roundValue(value, n) {
   return Math.round(Math.pow(10,n)*value)/Math.pow(10,n);
}

function normalize(v) {
   v = v - Math.floor(v);
   if (v < 0) v++;
   return v;
}