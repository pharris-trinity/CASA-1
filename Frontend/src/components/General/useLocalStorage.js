import { useState, useEffect } from "react";

function getStorageValue(key, defaultValue) {
    const saved = localStorage.getItem(key);
    const initial = JSON.parse(saved);
    return initial || defaultValue;
}

export const useLocalStorage = (key, defaultValue) => {
    const [value, setValue] = useState(() => {
        return getStorageValue(key, defaultValue);
    });

    useEffect(() => {
        if(value && !value.length == 0){
            //localStorage.setItem(key, JSON.stringify(value));
            console.log(value)
            const items = value.replaceAll('\"', '').split(',')
            console.log(items)
            for(let i = 0; i < items.length; i++){
                const param = items[i].split(':')
                console.log(param)
                if(param[0] == "_id" || param[0] == "school" || param[0] == "username" || param[0] == "displayname" || param[0] == "usertype"){
                    localStorage.setItem(param[0], param[1])
                }
                
            }
        }
        
    }, [key, value]);

    return [value, setValue];
};