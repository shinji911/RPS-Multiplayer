//ready js
$(document).ready(function () {

   //Initialize variables

   let playerNo = 0;

   let player1 = {
      playing: false,
      playSelect: "none",
      wins: 0,
      losses: 0,
   };

   let player2 = {
      playing: false,
      playSelect: "none",
      wins: 0,
      losses: 0,
   };

   let players = {
      player1: player1,
      player2: player2
   };

   const msg = $("#msg");

   // Initialize Firebase
   let config = {
      apiKey: "AIzaSyAp0p4jQMx4fcRFGXwcCHB4-u815mU5gYw",
      authDomain: "rps-multiplayer-38276.firebaseapp.com",
      databaseURL: "https://rps-multiplayer-38276.firebaseio.com",
      projectId: "rps-multiplayer-38276",
      storageBucket: "rps-multiplayer-38276.appspot.com",
      messagingSenderId: "793060521046"
   };

   firebase.initializeApp(config);

   let dataRef = firebase.database();

   // Capture button click for player entry
   $("#p1enter").on("click", function () {
      if (player1.playing === false && playerNo === 0) {
         player1.playing = true;
         playerNo = 1;
         $("#dispPlayer").text("You are Player 1")
         setdata();
      }
   });
   $("#p2enter").on("click", function () {
      if (player2.playing === false && playerNo === 0) {
         player2.playing = true;
         playerNo = 2;
         $("#dispPlayer").text("You are Player 2")
         setdata();
      }
   });


   // Capture button click for player 1 selection
   $(".rpsBtn1").on("click", function () {
      if (playerNo === 1 && player1.playSelect === "none") {
         player1.playSelect = $(this).attr("play");
         setdata();
      }
   });

   // Capture button click for player 2 selection
   $(".rpsBtn2").on("click", function () {
      if (playerNo === 2 && player2.playSelect === "none") {
         player2.playSelect = $(this).attr("play");
         setdata();
      }
   });

   //Capture button for leaving the game
   $("#leave").on("click", function () {
      if (playerNo === 1) {
         playerNo = 0;
         player1 = {
            playing: false,
            playSelect: "none",
            wins: 0,
            losses: 0,
         };
         setdata();
      };
      if (playerNo === 2) {
         playerNo = 0;
         player2 = {
            playing: false,
            playSelect: "none",
            wins: 0,
            losses: 0,
         };
         setdata();
      };
   });

   //reset btn
   $("#reset").on("click", function () {
      playerNo = 0;
      player1 = {
         playing: false,
         playSelect: "none",
         wins: 0,
         losses: 0,
      };
      player2 = {
         playing: false,
         playSelect: "none",
         wins: 0,
         losses: 0,
      };
      clearimg();
      setdata();
   });

   // Firebase watcher
   dataRef.ref().on("value", function (snapshot) {

      // store the player object from database to local
      console.log(snapshot.val());
      player1 = snapshot.val().player1;
      player2 = snapshot.val().player2;

      //display if player present
      if (player1.playing === true) {
         $("#p1enter").text("Player 1 Present");
      } else {
         $("#p1enter").text("Choose Player 1");
      };      
      if (player2.playing === true) {
         $("#p2enter").text("Player 2 Present");
      } else {
         $("#p2enter").text("Choose Player 2");
      };

      //display if player made selection
      if (player1.playSelect != "none") {
         msg.text("Player 1 has made their play!");
         clearimg();
      };
      if (player2.playSelect != "none") {
         msg.text("Player 2 has made their play!");
         clearimg();
      };

      //display result of round if both player made their selection
      if (player1.playSelect != "none" && player2.playSelect != "none") {
         if (player1.playSelect === "r") {
            $("#p1playimg").append($("<img>").attr("src", "./assets/images/rock.png"));
         };
         if (player1.playSelect === "p") {
            $("#p1playimg").append($("<img>").attr("src", "./assets/images/paper.png"));
         };
         if (player1.playSelect === "s") {
            $("#p1playimg").append($("<img>").attr("src", "./assets/images/scis.png"));
         };
         if (player2.playSelect === "r") {
            $("#p2playimg").append($("<img>").attr("src", "./assets/images/rock.png"));
         };
         if (player2.playSelect === "p") {
            $("#p2playimg").append($("<img>").attr("src", "./assets/images/paper.png"));
         };
         if (player2.playSelect === "s") {
            $("#p2playimg").append($("<img>").attr("src", "./assets/images/scis.png"));
         };

         if (player1.playSelect === player2.playSelect) {
            msg.text("The round was a Tie!");
            player1.playSelect = "none";
            player2.playSelect = "none";
            setdata();
         }
         else if ((player1.playSelect === "r" && player2.playSelect === "s") || (player1.playSelect === "s" && player2.playSelect === "p") || (player1.playSelect === "p" && player2.playSelect === "r")) {
            msg.text("This round goes to Player 1!");
            player1.wins++;
            player1.playSelect = "none";
            player2.losses++;
            player2.playSelect = "none";
            setdata();
         }
         else {
            msg.text("Player 2 takes this round!");
            player2.wins++;
            player2.playSelect = "none";
            player1.losses++;
            player1.playSelect = "none";
            setdata();
         };
      };

      //display number of wins & losses
      $("#p1wins").text("Player 1 Wins: " + player1.wins);
      $("#p1losses").text("Player 1 Losses: " + player1.losses);
      $("#p2wins").text("Player 2 Wins: " + player2.wins);
      $("#p2losses").text("Player 2 Losses: " + player2.losses);

      // Handle the errors
   }, function (errorObject) {
      console.log("Errors handled: " + errorObject.code);
   });

   //function to clear image div
   function clearimg() {
      $("#p1playimg").empty();
      $("#p2playimg").empty();
   };

   //function to set current state onto database
   function setdata() {
      players = {
         player1: player1,
         player2: player2
      };
      dataRef.ref().set(players);
   };


   //end ready js
});