export const getDateTime = function() {
    const now = new Date();
    const date = now.getFullYear() + '-' + String(now.getMonth()).padStart(2,"0") + '-' + String(now.getDate()).padStart(2,"0");
    const time = String(now.getHours()) + ':' + String(now.getMinutes()).padStart(2,"0") + ':' + String(now.getSeconds()).padStart(2,"0");
    return date + ' ' + time;
}
