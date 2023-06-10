export const getDateTime = function() {
    const now = new Date();
    const date = now.getUTCFullYear() + '-' + String(now.getUTCMonth()+1).padStart(2,"0") + '-' + String(now.getUTCDate()).padStart(2,"0");
    const time = String(now.getUTCHours()).padStart(2,"0") + ':' + String(now.getUTCMinutes()).padStart(2,"0") + ':' + String(now.getUTCSeconds()).padStart(2,"0");
    console.log("dateTime :",date + " " + time)
    return date + ' ' + time;
}


