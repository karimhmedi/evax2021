
function callservicevax()
{
        
  $.ajax({
    url : 'https://apis.cni.tn/evax-stat/evax-stat',
    type : 'GET',
    dataType : 'json',
    success : function(resultat){
  
document.getElementById("totaleinscri").innerHTML = resultat.nbrInscrit;
document.getElementById("nbinscrit").innerHTML = resultat.nbrInscrit;
document.getElementById("nbvaccine1").innerHTML = resultat.nbrVaccine1;
document.getElementById("nbvaccine2").innerHTML = resultat.nbrVaccine2;
  $('.counter').counterUp({
    delay: 100,
    time: 60000,
    callback: function(e) { 
      document.getElementById("totaleinscri").innerHTML=resultat.nbrInscrit; 
      document.getElementById("nbinscrit").innerHTML=resultat.nbrInscrit;
      document.getElementById("nbvaccine1").innerHTML=resultat.nbrVaccine1;
      document.getElementById("nbvaccine2").innerHTML=resultat.nbrVaccine2;
    }
});
      
    },

    error : function(resultat, statut, erreur){
      console.log(statut +" : problème de connexion au service");
      document.getElementById("totaleinscri").innerHTML="";
      document.getElementById("nbinscrit").innerHTML="";
      document.getElementById("nbvaccine1").innerHTML="";
      document.getElementById("nbvaccine2").innerHTML="";
    },

    complete : function(resultat, statut){

    }

 });
}


$( document ).ready(function() {

  callservicevax();

    setInterval(function () { callservicevax(); 
        
    }, 300000);
   
});
