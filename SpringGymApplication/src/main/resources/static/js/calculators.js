$(document).ready(function() {
    var BMRActivityIndex = [1.4, 1.5, 1.6, 1.7, 1.8];
    var maleMetabolismIndex = [42.5, 39.5, 39.5, 38.5, 37.5, 36.5, 35.5];
    var femaleMetabolismIndex = [37, 37, 36.5, 36.5, 35, 34, 33.5];

    $(".BMIinfo").mouseover(function () {
        $("#BMImodalInfo").removeClass("hidden")
    });
    $(".BMIinfo").mouseout(function () {
        $("#BMImodalInfo").addClass("hidden")
    });

    $(".BMRinfo").mouseover(function () {
        $("#BMRmodalInfo").removeClass("hidden")
    });
    $(".BMRinfo").mouseout(function () {
        $("#BMRmodalInfo").addClass("hidden")
    });

    $(".RMinfo").mouseover(function () {
        $("#RMmodalInfo").removeClass("hidden")
    });
    $(".RMinfo").mouseout(function () {
        $("#RMmodalInfo").addClass("hidden")
    });

    $(".BMIbutton").click(function () {
        var result = calculateBMI();
        $(".BMIresult").text("Your BMI = " +result);
    });

    $(".BMRbutton").click(function () {
        var result = calculateBMR();
        $(".BMRresult").text("Your BMR = " + result + "kcal");
    });

    $(".RMbutton").click(function () {
        var result = calculateRM();
        $(".RMresult").text("Your 1RM = " +result + "kg");
    });

    function calculateBMI() {
        var weight = $("#BMIbodyWeight").val();
        var height = $("#BMIheight").val();

        height = height/100;
        var result = weight / Math.pow(height,2);
        result = result.toFixed(1);
        return result;
    }

    function calculateBMR() {
        var weight = $("#BMRbodyWeight").val();
        var height = $("#BMRheight").val();
        var age = $("#BMRage").val();
        var sex = $('input[name=BMRsex]:checked').val();
        var activity = $("#BMRactivity").val();

        var skinSurface = calculateSkinSurface(weight, height);
        var PPM = calculatePPM(skinSurface, sex, age);
        var result =  calculateCMP(PPM, activity);
        return result.toFixed();
    }

    function calculateRM() {
        var oneRepMaxPercentages = [100, 95, 93, 90, 87, 85, 83, 80, 77, 75, 73, 70];
        var weight = $("#RMweight").val();
        var repeats = $("#RMrepeats").val();
        var arrayPosition = parseInt(repeats) - 1;
        var result = weight/(oneRepMaxPercentages[arrayPosition]/100);
        result = round(result);
        return result;

    }

    function calculatePPM(skinSurface, sex, age){

        var metabolismIndex = femaleMetabolismIndex;
        if(sex == "male"){
            metabolismIndex = maleMetabolismIndex;
        }
        var metabolism = 0.0;
        if( age < 18){
            metabolism = metabolismIndex[0];
        }
        else if(age>=18 && age<30){
            metabolism = metabolismIndex[1];
        }
        else if(age>=30 && age<40){
            metabolism = metabolismIndex[2];
        }
        else if(age>=40 && age<50){
            metabolism = metabolismIndex[3];
        }
        else if(age>=50 && age<60){
            metabolism = metabolismIndex[4];
        }
        else if(age>=60 && age<70){
            metabolism = metabolismIndex[5];
        }
        else if(age>=70){
            metabolism = metabolismIndex[6];
        }

        var result = metabolism * skinSurface * 24;
        return result;
    }

    function calculateSkinSurface(bodyWeight, height){
        var result = 0.0167 * Math.pow((bodyWeight*height), 0.5);
        return result;

    }
    function calculateCMP(PPM, activity){
        var result = PPM*BMRActivityIndex[activity];
        return result;
    }

    function round(number) {
        var value = (number * 2).toFixed() / 2;
        return value;
    }
})
