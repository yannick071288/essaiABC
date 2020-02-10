var send_datas_btn = document.getElementById('enregistrer');
var pourcentage1 = document.getElementById("pourcentage1");
var  inputs = document.querySelectorAll('input');
var description_user = inputs[0];
var valeur_user = inputs[1];
var listePointAx = [];
var listePointAy = [];
var listePointBx = [];
var listePointBy = [];
var listePointCx = [];
var listePointCy = [];
var liste = [];
var listeNombres = [];
var listeElement = [];
var listeValeurCumulee = [];
var listeNombresNews = [];
var listeNombresFin = [];
var listeDicBD = [];
liste_description = [];
var nb = 0;
var b = document.querySelector("button"); 

//b.setAttribute("id", "helloButtonA");
//b.id.value ="enregistrer";
send_datas_btn.addEventListener('click', function(e){
	var test_champs = (description_user.value) && (valeur_user.value);
	var valeurC1 = Number(valeurC);
	var valeur_regex = /^[0-9]{1,}$/;
	var valeurC = document.getElementById("valeurC").value;
	var designation = document.getElementById("designation").value;
	liste_description.push(designation);
		if(test_champs != {} && valeur_regex.test(valeur_user.value)){
	 		var xhr_inserer1 = new XMLHttpRequest();
	 		//on envoie la requette
			xhr_inserer1.open("POST", "/abcdatas");
			//parametrage des entetes pour l'envoie du formulaire
			xhr_inserer1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			// envoie les données a un server
			var params =`description=${description_user.value}&valeur=${valeur_user.value}`;
			xhr_inserer1.send(params);
			//traitement du retour  du serveur
			xhr_inserer1.addEventListener('readystatechange', function(){
				if(this.readyState ==4 && this.status==200){
			        console.log(this.response);
			        var objElem = JSON.parse(this.response);
			        console.log(objElem["id"]);
			        if(objElem["id"] !== undefined){
				       	var ordre = document.getElementById('identification');
				        enregistrer.disabled = false;
				   		pourcentage1.disabled = true;
					    var diction = {};
					    var string1 = "";
					    diction[designation] = valeurC;
					    listeNombresNews.push(valeurC);
					    listeNombres.push(valeurC);
					    listeNombres.sort(compare);
					    listeNombresFin.push(diction);
					    listeDicBD.push(objElem);
					    //console.log('liste de la base de donnée initial : ', listeDicBD);
					    function compare(x, y){
					        return y - x;
					        }
					    for (var valuer of listeNombresFin){ // il parcoure la liste contenanr les dictionaires
				            for (var cle in valuer){ // il parcoure le dictionnaire 
				            	//valuer[cle] == valeurC == objElem[valeur]
				            	// objElem[description] == cle 
				                string1 +='La cle est -> ' + cle + ' et La valeur est ->  ' + valuer[cle] + " et L'indice est -> " + listeNombres.indexOf(valuer[cle]) + '<br>';
				            }
				        }
				       // console.log(listeNombresNews);
				
						var ligne = document.getElementById("tableau");
						var ligne_Inserer = ligne.insertRow(listeNombres.indexOf(valuer[cle])+1);
						ligne_Inserer.setAttribute("id", objElem['id']);
						ligne_Inserer.insertCell(0).innerHTML += "";
						ligne_Inserer.insertCell(1).innerHTML += cle;
						ligne_Inserer.insertCell(2).innerHTML += "";
						ligne_Inserer.insertCell(3).innerHTML += valuer[cle];
					    ligne_Inserer.insertCell(4).innerHTML += "";
						ligne_Inserer.insertCell(5).innerHTML += "";
						ligne_Inserer.insertCell(6).innerHTML += "";
						return listeNombresNews;
			        }else{
			       		alert("Attention vous avez deja ecrit cette lettre ");
				    }

				}
			});
		}else{
			alert("remplire exactement bien les champs et veillez a ne pas inserer les memes nom");
		}
});

var enregistrerF = document.getElementById("enregistrerF");
enregistrerF.addEventListener('click', function(){
	alert('Verifier le tableau avant de continuez');
	var reponse_modification = prompt("Que voulez vous faire modifier (oui) ou concinuer (non) ? ");
	if(reponse_modification === 'oui'){
		enregistrer.disabled = false;
		pourcentage1.disabled = true;
	}else{
		enregistrer.disabled = true;
		pourcentage1.disabled = false;
	}

});

pourcentage1.addEventListener('click', function(){
	enregistrer.disabled = true;
	pourcentage1.disabled = false;
	methodeABC.disabled = false;
	enregistrerF.disabled = true;
	listeFIN = [];
	for(var h in listeNombres){
	    var nb = Number(listeNombres[h]);
	    listeFIN.push(nb);
	}
	console.log('La liste des elements En nombre', listeFIN)
	console.log('La liste des elements En chaine', listeNombresNews)
	const sum = listeFIN.reduce(add);
	function add(accumulator, a) {
	    return accumulator + a;
	}
	var nbr = 0; 
	for(var i=0; i<listeFIN.length; i++){
	    nbr += listeFIN[i];
	    liste.push(nbr);
	}
	var arrayLignes = document.getElementById("tableau").rows; //on récupère les lignes du tableau
	var longueur = arrayLignes.length;//on peut donc appliquer la propriété length
	for(var i=1; i<longueur; i++)//on peut directement définir la variable i dans la boucle
	{
	    var arrayColonnes = arrayLignes[i].cells;//on récupère les cellules de la ligne
	    var largeur = arrayColonnes.length;

	    arrayColonnes[0].innerHTML = i;
	    arrayColonnes[2].innerHTML = i*100/(longueur-1) + ' %';
	    var x = Math.round(Number(i*100/(longueur-1)))
	    listeElement.push(x);
	    arrayColonnes[2].style.color = 'red';
	    arrayColonnes[4].innerHTML = liste[i-1];
	    arrayColonnes[5].innerHTML = liste[i-1]*100/sum + ' %';
	    arrayColonnes[5].style.color = 'blue';
	    var y = Math.round(Number(liste[i-1]*100/sum));
	    listeValeurCumulee.push(y);
	}
	     return listeElement
});

var methodeABC = document.getElementById('abc');
methodeABC.addEventListener('click', function(){
	var string1 ="";
	var y1 = listeValeurCumulee;//liste d'element a inserer dans la table
	var x1 = listeElement;// liste d'element a inserer dans la table
   	
	pourcentage1.disabled = true;
	courbeABC.disabled = false;
	console.log('avant ', listeNombresFin);
	var longueurValeur = listeNombresFin.length;
	var listeParams = [];
	for(var i=0; i<longueurValeur; i++){
	var xhr_inserer = new XMLHttpRequest()
	xhr_inserer.open("POST", "/datas");
	xhr_inserer.setRequestHeader('Content-type', "application/x-www-form-urlencoded");	 
	var list = listeNombresFin[i];
	for (cle in list){
	    var val= list[cle];
	    var params_inserer =`valeur_X=${x1[i]}&valeur_Y=${y1[i]}`;
	    listeParams.push(params_inserer);
	    xhr_inserer.send(listeParams[i]);
	    console.log('params_inserer ', params_inserer);

	    }
	}
	xhr_inserer.addEventListener('readystatechange', function(){
		if(this.readyState ==4 && this.status==200){
		    console.log('oui bonjour');
		    var arrayLignes = document.getElementById("tableau").rows; //on récupère les lignes du tableau
		    var longueur = arrayLignes.length;//on peut donc appliquer la propriété length
		    for(var i=1; i<longueur; i++)//on peut directement définir la variable i dans la boucle
			{
				var arrayColonnes = arrayLignes[i].cells;
			    if (listeElement[i-1]<25 && listeValeurCumulee[i-1]<85){
			        listePointAx.push(listeElement[i-1]);
			        listePointAy.push(listeValeurCumulee[i-1]);
			        arrayColonnes[6].innerHTML ='A';
			        arrayColonnes[6].style.color = 'olive';
			    }else if ((listeElement[i-1]-listePointAx[listePointAx.length-1])<30 && (listeValeurCumulee[i-1]-listePointAy[listePointAy.length-1]) <20) {
			        var l1 = listePointAy[listePointAy.length-1];
			        var l2 = listeValeurCumulee[i-1];
			        arrayColonnes[6].innerHTML = 'B';
			        arrayColonnes[6].style.color = 'orange';
			    }else{
			        arrayColonnes[6].innerHTML =  'C';
			        arrayColonnes[6].style.color = 'purple';
			    }       
			}
		}else{
		     console.log('pas bonjour indexA.js');
		}        
	});

});

var changer = document.getElementById('tableau_representation');
changer.addEventListener('click', function(){
	//console.log(listeDicBD);
	//alert(prompt("Quel est votre signe astrologique ?"));
	let description_user_news = prompt("Quelle est le nom de l'element ?");
	let val_changer = prompt("Quelle est la valeur de l'element ?");
	var val_changer2 = val_changer;
	//console.log('type de val_changer ', typeof(val_changer))
	//console.log("le mot taper", val_changer);
	//console.log("le type du mot taper", typeof val_changer);
	console.log("la liste a changer", listeNombresNews);
	console.log("son indice dans la listeNombresNews (val_changer) ", listeNombresNews.indexOf(val_changer));
	var j = 0;
	while(j<listeNombresNews.length){
		if(val_changer === listeNombresNews[j] && description_user_news === liste_description[j]){
			let desc_user_news = prompt("Quelle est le nom exacte de l'element");
			let val_nouvelle = prompt("Quelle est la valeur exacte ?");
			let new_val = val_nouvelle;
			let new_desc = desc_user_news;
			//console.log('le nouveau mot', val_nouvelle);
			//console.log('indice de la valeur que nous devons changer ', listeNombresNews[listeNombresNews[j]]);
			for(var dictionaire of listeDicBD){
				var nouvelle_description = dictionaire["description"];
				var nouvelle_valeur = dictionaire["valeur"];
				var nouvelle_id = dictionaire["id"];
				//console.log('commencons la boucle for par connaitre lindice', nouvelle_id, ' --> ', typeof(nouvelle_id));
				if(nouvelle_description === description_user_news && nouvelle_valeur === val_changer){
					//console.log('La liste Changer a la fin de la boucle ', listeNombresNews);
					//console.log('lindice des valeur a changer', nouvelle_id, ' --> type ', typeof(nouvelle_id));
					var new_val1 = Number(new_val);
					//console.log('la nouvelle valeur', new_val1, ' --> type ', typeof(new_val1));
					xhr_update_update = new XMLHttpRequest();
					xhr_update_update.open("POST", "/update");
					xhr_update_update.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					// envoie les données a un server
					var params_update =`nouvelle_description=${new_desc}&nouvelle_valeur=${new_val1}&nouvelle_id=${nouvelle_id}`;
					//console.log(params_update);
					xhr_update_update.send(params_update);
					xhr_update_update.addEventListener('readystatechange', function(){
						if(this.readyState ==4 && this.status==200){
					        //console.log(this.response);
					        var objElem1 = JSON.parse(this.response);
					        //console.log(objElem1["id"]);
					        console.log('La liste pour des nom 0 ', liste_description);
					    }
					 });
					listeNombresNews.sort(compare);
			    	function compare(x, y){
				        return y - x;
				    }
				    console.log('La liste pour changer le tableau premiere ordre ', listeNombresNews);
				    //console.log('val_changer', val_changer);
				    //console.log('val_changer type', typeof(al_changer));
				    var indice = listeNombresNews.indexOf(val_changer2);
					//console.log('indice dans le tableau de lement a supprimer 1', indice);
					var remplacement_val = listeNombresNews.splice(listeNombresNews.indexOf(listeNombresNews[j]), 1, new_val);	
					var remplacement_desc = liste_description.splice(liste_description.indexOf(liste_description[j]), 1, new_desc);
					listeNombresNews.sort(compare);
			    	function compare(x, y){
				        return y - x;
				    }
					//console.log('remplacement_val ', remplacement_val);
					//console.log('remplacement_desc', remplacement_desc);
					//console.log('La liste listeNombres ', listeNombres);
					//console.log('indide de la valeur a changer ', listeNombres[val_changer2])
					//console.log('La liste pour changer le tableau 1 ', listeNombresNews);
					console.log('La liste pour des nom 1 ', liste_description);
					var ligne1 = document.getElementById('tableau');
					//console.log('nombre de ligne', ligne1.length);
					ligne1.deleteRow(indice+1);
					//console.log('nombre de ligne', ligne1.length);
					//console.log('indice dans le tableau de lement a supprimer', indice)
					var ligne2 = document.getElementById('tableau').rows;
				var ligne3 = document.getElementById("tableau").insertRow(listeNombresNews.indexOf(new_val) +1);
				//console.log('indice dans le tableau de lement a inserer', listeNombresNews.indexOf(new_val) +1)
				ligne3.insertCell(0).innerHTML += "";
				ligne3.insertCell(1).innerHTML += new_desc;
				ligne3.insertCell(2).innerHTML += "";
				ligne3.insertCell(3).innerHTML += new_val;
			    ligne3.insertCell(4).innerHTML += "";
				ligne3.insertCell(5).innerHTML += "";
				ligne3.insertCell(6).innerHTML += "";   
					
				}
			 
			}
			//console.log('La liste pour changer le tableau 1 ', listeNombresNews);

			break;
		}
		j ++
	
	}
	console.log('La liste pour changer le tableau 2 ', listeNombresNews);

		//document.location.reload();

});
/* Systeme de courbe 

var courbeAbc = document.getElementById("courbeABC");
courbeAbc.addEventListener('click', function(){
		//abc.disabled = true;
		//courbeABC.disabled = true;
		console.log('Liste des Y ',listeValeurCumulee);
		console.log('Liste des X ',listeElement);
		//var resultat_courbe = document.getElementById('resultat_courbe');
		//resultat_courbe.innerHTML = 'RESULTAT';
		var ctx = document.getElementById('myChart').getContext('2d');
		var myChart = new Chart(ctx, {
		    type: 'line',
		    data: {
		        labels: [0, 50, 230, 300, 450, 500, 540, 550, 570, 600, 657, 677],
		        datasets: [{
		            label: '# of Votes',
		            data: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"],
		            backgroundColor: [
		                'rgba(255, 99, 132, 0.2)',
		                'rgba(54, 162, 235, 0.2)',
		                'rgba(255, 206, 86, 0.2)',
		                'rgba(75, 192, 192, 0.2)',
		                'rgba(153, 102, 255, 0.2)',
		                'rgba(255, 159, 64, 0.2)'
		            ],
		            borderColor: [
		                'rgba(255, 99, 132, 1)',
		                'rgba(54, 162, 235, 1)',
		                'rgba(255, 206, 86, 1)',
		                'rgba(75, 192, 192, 1)',
		                'rgba(153, 102, 255, 1)',
		                'rgba(255, 159, 64, 1)'
		            ],
		            borderWidth: 1
		        }]
		   			 },
				    options: {
				    	responsive: true,
				        scales: {
				        	 xAxes:[{
				            	ticks:{
									//autoSkip: true,
		    						//maxTicksLimit: 8
		    	
				            	}
				            }],
				            yAxes: [{
				                ticks: {
		                			max: 27,
                					min: 0,
              						stepSize: 2
				                }
				            }]
				        }
				    }
		});
});*/