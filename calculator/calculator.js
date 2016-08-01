// Based on http://en.wikipedia.org/wiki/Recursive_descent_parser
function calc(expr) {
    var expressionToParse = expr.replace(/\s+/g, '').split('');
    
    function peek() {
        return expressionToParse[0] || '';
    }
    
    function get() {
        return expressionToParse.shift();
    }
    
    /*
      Grammar Rule:
      number = [0-9] {[0-9.]+}
      Hint: remember this means we need to get the first number
        followed by any number of numbers (or the period .)
     */
    function number() {
    }
    
    /* Grammar Rule:
      factor = number
              | "(" expression ")"
              | - factor
      Hints:
        - If we see a number, produce a number 
        - If we see a (  then consume it and an expression
        - If we see a "-", return the negative of the factor
     */
    function factor() {
    }
    
    /*
      term = factor {(*|/) factor}
     */
    function term() {
    }
    /* Grammar Rules
        expression = term {(+|-) term}
    */
    function expression() {
        var result = term();
        while (peek() == '+' || peek() == '-') {
            if (get() == '+') {
                result += term();
            } else {
                result -= term();
            }
        }
        return result;
    }
    return expression();
}