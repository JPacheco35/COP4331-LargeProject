// JavaScript source code
import React from "react";

// Function takes in the palette value and returns the selected
// palette for the user.
// Light = 0, Dark = 1, CB Light = 2, CB Dark = 3
// Default is 0.
export default function loadColors(palette) {
    console.log(palette);
    // Strings
    // addC = add button, removeC = remove button
    // extendC = extend entry button
    // bg
    var addC, removeC, extendC, bgC, ebgC;

    // Switch statement handles color assignment
    switch (palette) {
        case 1:
            console.log(1);
            return "dark";
        case 2:
            console.log(2);
            return "cbLight";
        case 3:
            console.log(3);
            return "cbDark";
        default:
            console.log(0);
            return "light";
    }

}
