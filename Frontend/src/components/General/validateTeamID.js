import {React, useState, useEffect} from "react"

export const validateTeamID = (id) => {
    //console.log("national ID: ", id)
    const digits = "0123456789"

    if(!(id.length == 7)){
        console.log("Given national ID is either not long enough or too long")
        return false
    }

    for(let i = 0; i < id.length; i++){
        if(i == 2){
            if(!(id[2] == '-')){
                console.log("National ID is missing a - after the second digit")
                return false
            }
        }
        else{
            if(!digits.includes(id[i])){
                console.log("only digits 0-9 are allowed in a national ID")
                return false
            }
        }
    }

    return true
}