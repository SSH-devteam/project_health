export const getDateTime = function() {
    const now = new Date();
    const date = now.getFullYear() + '-' + now.getMonth() + '-' + now.getDate();
    const time = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
    return date + ' ' + time;
}