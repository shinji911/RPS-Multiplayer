//ready js
$(document).ready(function () {

   // Initialize Firebase
   var config = {
      apiKey: "AIzaSyAp0p4jQMx4fcRFGXwcCHB4-u815mU5gYw",
      authDomain: "rps-multiplayer-38276.firebaseapp.com",
      databaseURL: "https://rps-multiplayer-38276.firebaseio.com",
      projectId: "rps-multiplayer-38276",
      storageBucket: "rps-multiplayer-38276.appspot.com",
      messagingSenderId: "793060521046"
   };

   firebase.initializeApp(config);

   var dataRef = firebase.database();



   // Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
   dataRef.ref().on("value", function (childSnapshot) {

      // Log everything that's coming out of snapshot
      console.log(childSnapshot.val().name);
      console.log(childSnapshot.val().role);
      console.log(childSnapshot.val().startDate);
      console.log(childSnapshot.val().rate);

      // full list of items to the well
      $("#empList").append(
         "<tr><td>" + childSnapshot.val().name + "</td><td>" + childSnapshot.val().role + "</td><td>" + childSnapshot.val().startDate + "</td><td>" + moment().diff(moment(childSnapshot.val().startDate), "months") + "</td><td>" + childSnapshot.val().rate + "</td><td>" + parseInt(moment().diff(moment(childSnapshot.val().startDate), "months")) * parseInt(childSnapshot.val().rate) + "</td></tr>"
      );

      // Handle the errors
   }, function (errorObject) {
      console.log("Errors handled: " + errorObject.code);
   });

   //end ready js
});