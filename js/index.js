$(document).ready(function(){


  /*
document.getElementById("audio").fastSeek(0);
document.getElementById("audio").play();
setTimeout(function(){
  document.getElementById("audio").pause();
},2300);


*/

  var pomodoroSetting = 25; //in minutes
  var pauseSetting = 5; //in minutes
  var pomodoroMinutes = 0;
  var pauseMinutes = 0;
  var pomodoroSeconds = 0;
  var pauseSeconds = 0;
  var cleanStart = true;
  var operating = false;
  var bombIntervalID;
  var mouseTimeoutId;

  $("#pomodoro-value").html(pomodoroSetting);
  $("#pause-value").html(pauseSetting);
  $("#display").html(pomodoroSetting+"\"00");


  $("#pomodoro-more").on("click",function(){
    if(pomodoroSetting == 99){return;}
    pomodoroSetting += 1;
    $("#pomodoro-value").html(pomodoroSetting);
    });

  $("#pomodoro-more").on("mousedown", function() {

         mouseTimeoutId = setInterval (function (){

          if(pomodoroSetting == 99){return;}
          pomodoroSetting += 1;
          $("#pomodoro-value").html(pomodoroSetting);
        }, 100);
    }).on("mouseup mouseleave", function() {
        clearInterval(mouseTimeoutId);
    });

  $("#pomodoro-less").on("click",function(){
    if(pomodoroSetting == 1){return;}
    pomodoroSetting -= 1;
    $("#pomodoro-value").html(pomodoroSetting);
    });

    $("#pomodoro-less").on("mousedown", function() {

           mouseTimeoutId = setInterval (function (){

            if(pomodoroSetting == 1){return;}
            pomodoroSetting -= 1;
            $("#pomodoro-value").html(pomodoroSetting);
          }, 100);
      }).on("mouseup mouseleave", function() {
          clearInterval(mouseTimeoutId);
      });

  $("#pause-more").on("click",function(){
    if(pauseSetting == 99){return;}
    pauseSetting += 1;
    $("#pause-value").html(pauseSetting);
    });

    $("#pause-more").on("mousedown", function() {

           mouseTimeoutId = setInterval (function (){

            if(pauseSetting == 99){return;}
            pauseSetting += 1;
            $("#pause-value").html(pauseSetting);
          }, 100);
      }).on("mouseup mouseleave", function() {
          clearInterval(mouseTimeoutId);
      });


  $("#pause-less").on("click",function(){
    if(pauseSetting == 1){return;}
    pauseSetting -= 1;
    $("#pause-value").html(pauseSetting);
    });

    $("#pause-less").on("mousedown", function() {

           mouseTimeoutId = setInterval (function (){

            if(pauseSetting == 1){return;}
            pauseSetting -= 1;
            $("#pause-value").html(pauseSetting);
          }, 100);
      }).on("mouseup mouseleave", function() {
          clearInterval(mouseTimeoutId);
      });


  $("#start").on("click",function(){

    if(operating){
      clearInterval(bombIntervalID);
      $("#start").html("<i class='fa fa-play'></i>");
      operating = false;
      $("#thepomodoro").attr('class', 'background-grey');
      return;
    }

    operating = true;
    $("#start").html("<i class='fa fa-pause'></i>");

    if(cleanStart){
      pomodoroMinutes = pomodoroSetting;
      pauseMinutes = pauseSetting;
      cleanStart = false;
      pomodoroSeconds = 0;
      pauseSeconds = 0;
    }

    bombIntervalID = setInterval(function(){
      if(pomodoroSeconds === 0 && pomodoroMinutes === 0){


        if (pauseSeconds === 0 && pauseMinutes === 0){
          //pause is over
          pomodoroMinutes = pomodoroSetting;
          pauseMinutes = pauseSetting;
          $("#thepomodoro").attr('class', 'background-red');
          document.getElementById("audio").fastSeek(0);
          document.getElementById("audio").play();
          setTimeout(function(){
            document.getElementById("audio").pause();
          },2200);
        }else {
          //pause mode
          $("#thepomodoro").attr('class', 'background-blue');

        if(pauseSeconds === 0){
          pauseSeconds = 59;
          pauseMinutes -= 1;
          $("#display").html(pauseMinutes+"\""+pauseSeconds);
        }else{
          pauseSeconds -=1;
          if(pauseSeconds<10){
            $("#display").html(pauseMinutes+"\"0"+pauseSeconds);
          }else{
            $("#display").html(pauseMinutes+"\""+pauseSeconds);
          }
        }


      }


      }else{
        //pomodoro mode
        $("#thepomodoro").attr('class', 'background-red');
        if(pomodoroSeconds === 0){
          pomodoroSeconds = 59;
          pomodoroMinutes -= 1;
          $("#display").html(pomodoroMinutes+"\""+pomodoroSeconds);
        }else{
          pomodoroSeconds -=1;
          if(pomodoroSeconds<10){
            $("#display").html(pomodoroMinutes+"\"0"+pomodoroSeconds);
          }else{
          $("#display").html(pomodoroMinutes+"\""+pomodoroSeconds);
          }
        }

        if(pomodoroSeconds === 0 && pomodoroMinutes === 0){
          //pause mode visual switch
            $("#thepomodoro").attr('class', 'background-blue');
            document.getElementById("audio").fastSeek(0);
            document.getElementById("audio").play();
            setTimeout(function(){
              document.getElementById("audio").pause();
            },2200);
        }








      }
    }, 1000);



  });//fin start btn





  $("#reset").on("click",function(){
    if(operating){
      return;
    }
    cleanStart = true;
    $("#display").html(pomodoroSetting+"\"00");
    $("#start").html("<i class='fa fa-play'></i>");



    });



})//fin doc ready