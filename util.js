//for smoother ball arc
function scale(number, inMin, inMax, outMin, outMax) {
    //from https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}