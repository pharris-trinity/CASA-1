import { useState, useEffect } from "react";

/*
    This component draws information about the user that logged in and stores information about them in the local storage for other components to use.
*/


//makes the default information for local storage.
function getStorageValue(key, defaultValue) {
    const saved = localStorage.getItem(key);
    const initial = JSON.parse(saved);
    return initial || defaultValue;
}


//gets the information of the user and parses the information to store in the local storage
export const useLocalStorage = (key, defaultValue) => {
    //useState to store the information that will be parsed.
    const [value, setValue] = useState(() => {
        return getStorageValue(key, defaultValue);
    });

    //where the information is parsed, runs when information is updated.
    useEffect(() => {
        if(value && !value.length == 0){
            //localStorage.setItem(key, JSON.stringify(value));
            const items = value.replaceAll('\"', '').split(',')
            for(let i = 0; i < items.length; i++){
                const param = items[i].split(':')
                if(param[0] == "_id" || param[0] == "school" || param[0] == "username" || param[0] == "displayname" || param[0] == "usertype"){
                    localStorage.setItem(param[0], param[1])
                }
                
            }
        }
        
    }, [key, value]);

    return [value, setValue];
};