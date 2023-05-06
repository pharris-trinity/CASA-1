import {React, useState, useEffect} from "react"

export const formatTeamIDString = (id) => {
    if(id.length == 6) {
        var tempString = "";
        for(let i = 0; i < id.length; i++){
            if(i == 2) {
                tempString = tempString + "-" + id[i];
            } else {
                tempString = tempString + id[i];
            }
        }
        return tempString;
    }
}