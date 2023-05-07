import {React, useState, useEffect} from "react"

export const formatTeamIDNumber = (id) => {
    
    var tempString = "";
    for(let i = 0; i < id.length; i++){
        if(i != 2) {
            tempString = tempString + id[i];
        }
    }
    return tempString;
}