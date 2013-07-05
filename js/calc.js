// Author: Narmada
// Student id: 13259138

var dcalculator = (function(){
    var pub = {};
    var count = true; // private member to check decimal points
    var mem = 0; // private member to compute memory operations
    var store = ""; // private member to store display values.
    
    pub.eValue = function(val){ //function to evaluate numbers
        var checker = document.getElementById("result").value;
        if (String(checker).length<10) { //checks 10 digit display
            if ((String(checker) !="*") && (String(checker) !="+") // concatenating digits without operators.
                && (String(checker) !="-") && (String(checker) !="/")) {
                document.getElementById("result").value += val;
            }
            else{//if operator pressed already and new number is being pressed, operator pushed to store
                store += document.getElementById("result").value;
                document.getElementById("result").value = val;
            }
        }
         
    };
    
    pub.operatn = function(val){ //function to evaluate operators
        var temp = store;
        var check = document.getElementById("result").value;
        var lchar = temp.indexOf(temp.length-1);
        var last;
        //prevents the use of decimal more than once in number
        if ((String(val) !=".") && ((String(val) != "M+") && (String(val) != "M-")
            && (String(val) != "MR") && (String(val) != "MC")) &&
            ((check != "*") && (check != "/") && (check != "+") && (check != "-"))) { // last checks avaoid continous operators
            count = true;
            store += document.getElementById("result").value;
            document.getElementById("result").value = val;
        }
        else if (((lchar == "*") || (lchar == "/") || (lchar == "+") || (lchar == "-")) &&
                 ((check == "*") || (check == "/") || (check == "+") || (check == "-"))) {
            //do nothing
        }
        else if ( String(val) =="." && count) {
            count = false;
            document.getElementById("result").value += val;
        }
        else if (String(val) == "M+") {
            if ((check =="*") || (check =="/") || (check =="+") || (check == "-")) {
                temp = store;
                last = temp.split(/[\s*/+-]+/); //splits string by arithmetic operations
                last = (last[last.length-1]);
                mem += parseFloat(last); //converting string to number and adds to memory
            }
            else{
                mem += +document.getElementById("result").value; //unary operator used to convert string to number
            }
        }
        else if (String(val) == "M-") {
            if ((check =="*") || (check =="/") || (check =="+") || (check == "-")) {
                last = temp.split(/[^\s*/+-]+/); //splits expression by arithmetic operators
                last = (last[last.length-1]);
                mem -= parseFloat(last); // converting string to number and subracts from memory value
            }
            else{
                mem -= +document.getElementById("result").value;
            }
        }
        else if (String(val) == "MR") { //returns stored memory value
            document.getElementById("result").value = mem;
        }
        else if (String(val) == "MC") { //clears memory value
            mem = 0;
        }
        //prevents entering of operators except - at start
        if (String(val) == "-" && document.getElementById("result").value =="") {
            document.getElementById("result").value = 0;
        }
        temp = store;
    };
    
    pub.final = function(){ //function to evaluate the result
        var expresn = store;
        expresn+=document.getElementById("result").value;
        if (expresn && checkNum(expresn)) { //ensuring expression last characters are numbers
            expresn = eval(expresn).toPrecision(10).replace(/\.?0+$/,"").replace(/\.$/, "");
            if (String(expresn).length>10) { //assuring 10 digit display and returning error
                expresn = (String(expresn).substring(0,10)) + "-Out of Range";
            }
        }
        else if (!expresn) {
            expresn = 0;
        }
        else{
            expresn = "Invalid Entry"
        }
        document.getElementById("result").value = expresn;
    };
    
    pub.clear = function(){ //function to reset page
        document.getElementById("result").value = "";
        store = "";
        count = true;
    }; //reset button simulated in this function to maintain consistency in all browsers.
    
    //private function to check expression for numbers
    function checkNum(display) {
        for (var index = 0; index < display.length; index++) {
            var ch = display.substring(index, index+1)
            if (ch < "0" || ch > "9") {
                if (ch != "/" && ch != "*" && ch != "+" && ch !=
                    "-" && ch != "."&& ch != "(" && ch!= ")") {
                return false;
                }
            }
        }
        return true;
    }
    
    return pub;
}());