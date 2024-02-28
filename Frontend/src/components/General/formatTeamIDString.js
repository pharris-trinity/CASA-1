import {React, useState, useEffect} from "react"

export const formatTeamIDString = (id) => {
    const stringID = id.toString();
    if(stringID.length === 6) {
        var tempString = "";
        for(let i = 0; i < stringID.length; i++){
            if(i == 2) {
                tempString = tempString + "-" + stringID[i];
            } else {
                tempString = tempString + stringID[i];
            }
        }
        // console.log(tempString)
             return tempString;
    } else console.log("unsuccessfully calling formatTeamIDString")
}