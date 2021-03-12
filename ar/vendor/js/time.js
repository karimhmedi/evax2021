function refresh(){
    var t = 1000; // rafraîchissement en millisecondes
    setTimeout('showDate()',t)
}

function showDate() {
    var date = new Date();
    var dateday = date.toJSON().slice(0, 10); 
            var nDate = dateday.slice(8, 10) + '/'  
                       + dateday.slice(5, 7) + '/'  
                       + dateday.slice(0, 4); 
            
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    if( h < 10 ){ h = '0' + h; }
    if( m < 10 ){ m = '0' + m; }
    if( s < 10 ){ s = '0' + s; }
    var time = h + ':' + m + ':' + s
    document.getElementById('horloge').innerHTML = time;
    document.getElementById('today').innerHTML = nDate;
    refresh();
 }