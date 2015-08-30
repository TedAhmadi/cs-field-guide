/**
 * Awful Calculator Interactive
 * For use in the CS Field Guide
 * Created by Hayley van Waas, University of Canterbury
 */

$(document).ready(function () {
    var expression = [];

    $(".interactive-calculator-good button").click(function(){
        var input = $(this).val();
        // TODO: should change order of these if statements
        if (input == "=") {
            // evaluate
            document.getElementById("interactive-good-calculator-output").innerHTML = evaluateExpression(expression, expression.splice(0, 1), expression.splice(0, 1), expression.splice(0, 1));
        } else if (input == "C") {
            // clear
            expression = []; // clear expression list
            document.getElementById("interactive-good-calculator-output").innerHTML = ""; // clear display
        } else {
            if (input == parseInt(input)) {
                // accounts for numbers greater than 1 digit long
                if (expression.length >= 1){
                    if (expression[(expression.length)-1] == parseInt(expression[expression.length-1])) {
                        input = expression[expression.length-1] + input; // change input to multi digit number
                        expression.splice(expression.length - 1); // remove last input from list
                    }
                }
            }
            // add input to expression
            expression.push(input);
            document.getElementById("interactive-good-calculator-output").innerHTML = expression.join(" ");
        }
    });


    $(".interactive-calculator-awful button").click(function(){
        console.log($(this).val());
    });

});


// recursively calculates each part of the expression (does not use BEDMAS)
function evaluateExpression(expression, x, operator, y) {
    var evaluate = {
        "+": function (x, y) { return x + y },
        "-": function (x, y) { return x - y },
        "*": function (x, y) { return x * y },
        "/": function (x, y) { return x / y }
    };
    answer = evaluate[operator](parseInt(x), parseInt(y));
    if (expression.length > 0) {
        return evaluateExpression(expression, answer, expression.splice(0, 1), expression.splice(0, 1));
    } else {
        return answer;
    }
}
