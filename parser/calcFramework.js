/**
 * calcFramework - An abstract representation of the scratch document as a whole
 * 
 *
 * @author Ben McCormick
 **/

/*global BigDecimal:false tablePlaceHolder:true RoundingMode:false EQParser:false*/



var calcFramework = (function () {
    var line1 = new Line();
    var lines = [null,line1];
    var idx = 0; //for loops
    EQParser.init();
    var cF = {};
    var MAXWIDTH = 5;

    cF.getLine = function (index) {
        //returns the specified line
        return lines[index];
    };

    cF.addLine = function (index) {
        //adds a line to the calc
        var newLine = new Line(index);
        if (index === null || typeof index === "undefined" || 
            index >= lines.length) {
            lines.push(newLine);
        }
        else {
            lines.splice(index, 0, newLine);
            for (idx = index + 1; idx < lines.length; idx++) {
                lines[idx].linenum++;
            }
        }
    };

    cF.removeLine = function (index) {
        //Removes a line from the calc
        if (index <= lines.length) {
            lines.splice(index, 1);
            for (idx = index; idx < lines.length; idx++) {
                lines[idx].linenum--;
            }
        }
    };

    cF.setLineWidth = function(width){
        MAXWIDTH = width;
    };

    cF.getLineWidth = function(){
        return MAXWIDTH;
    };
    cF.getLineHeight = function(linenum){
        return lines[linenum].length/MAXWIDTH|0;
    };

    cF.getNumLines = function(){
        //get the number of lines in the calculator
        return lines.length-1;
    };

    //Create Line type
    function Line(linenum) {
        this.input = "";
        this.linenum = linenum;
    }

    Line.prototype.output = function () {

        return EQParser.parse(this.input,10);
    };
    
    Line.prototype.formatted = function () {
        //return the input string for now, add syntax highlighting/controls later
        var output = this.input.chunk(MAXWIDTH).join("<br>");
        return markupGen.markup(output);
    };

    return cF;
}());