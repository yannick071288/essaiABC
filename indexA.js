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
var liste_description = [];
var liste_id = [];
var listeA = [];
var listeB = [];
var listeC = [];
var nb = 0;
var b = document.querySelector("button"); 
var id = "";
var valeur_regex = /^[0-9]{1,}$/;
//b.setAttribute("id", "helloButtonA");
//b.id.value ="enregistrer";
send_datas_btn.addEventListener('click', function(e){
	var test_champs = (description_user.value) && (valeur_user.value);
	var valeurC1 = Number(valeurC);
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
			       //console.log(this.response);
			        var objElem = JSON.parse(this.response);
			        liste_id.push(objElem["id"]);
			        //console.log('pour voir si la regex passe ', objElem["id"]);
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
						var ligne_ajouter = document.getElementById(objElem['id']);
						var cell = ligne_ajouter.cells;
						cell[1].setAttribute('id', cle);
						cell[1].setAttribute('contenteditable', true);
						cell[3].setAttribute('id', valuer[cle]);
						cell[3].setAttribute('contenteditable', true);
						//console.log('le nombre de colonne ', cell.length);
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
enregistrerF.addEventListener('click', function(event){
	alert('Verifier le tableau avant de continuez');
	enregistrer.disabled = true;
	pourcentage1.disabled = false;
	changer.removeEventListener('click', myfontion);

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
	//console.log('La liste des elements En nombre', listeFIN)
	//console.log('La liste des elements En chaine', listeNombresNews)
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
	var zoneAx = document.getElementById('zoneAx').value;
	var zoneAy = document.getElementById('zoneAy').value;
	var zoneBx = document.getElementById('zoneBx').value;
	var zoneBy = document.getElementById('zoneBy').value;
	var zoneCx = document.getElementById('zoneCx').value;
	var zoneCy = document.getElementById('zoneCy').value;
	//console.log('zoneAx', zoneAx);
	//console.log('zoneAy', zoneAy);
	//console.log('zoneBx', zoneBx);
	//console.log('zoneBy', zoneBy);
	//console.log(typeof(zoneAx));
	//console.log('commencons a classifier les methode');
	var arrayLignes = document.getElementById("tableau").rows; //on récupère les lignes du tableau
	var longueur = arrayLignes.length;//le nombre de colonne de la ligne
	for(var i=1; i<longueur; i++)//on peut directement définir la variable i dans la boucle
	{
		var arrayColonnes = arrayLignes[i].cells;
		//console.log('listeElement[i-1]', listeElement[i-1]);
		//console.log('zoneAx', zoneAx);
		//console.log('(listeElement[i-1]<=zoneAx', listeElement[i-1]<=zoneAx);
		//console.log('listeValeurCumulee[i-1]', listeValeurCumulee[i-1]);
		//console.log('zoneAy', zoneAy);
		//console.log('listeValeurCumulee[i-1]<=zoneBx', listeValeurCumulee[i-1]<=zoneAy)
		if (listeElement[i-1]<=zoneAx && listeValeurCumulee[i-1]<=zoneAy){
			listePointAx.push(listeElement[i-1]);
			listePointAy.push(listeValeurCumulee[i-1]);
			arrayColonnes[6].innerHTML ='A';
		    arrayColonnes[6].style.color = 'olive';
			listeA.push('A');
			//console.log('liste Ax', listePointAx);
			//console.log('liste Ay', listePointAy);
			//console.log('zone A');
		}else if ((listeElement[i-1]-listePointAx[listePointAx.length-1])<=zoneBx && (listeValeurCumulee[i-1]-listePointAy[listePointAy.length-1]) <=zoneBy){
			//console.log('le dernier nombre de la liste A listeElement[i-1]', listeElement[i-1]);
			var l1 = listePointAy[listePointAy.length-1];
			var l2 = listeValeurCumulee[i-1];
			//console.log('listeElement[i-1]', listeElement[i-1]);
			/*console.log('listePointAx[listePointAx.length-1]', listePointAx[listePointAx.length-1]);
			console.log('listeElement[i-1]-listePointAx[listePointAx.length-1] = ', listeElement[i-1]-listePointAx[listePointAx.length-1]);
			console.log('zoneBx', zoneBx);
			console.log('listeValeurCumulee[i-1]', listeValeurCumulee[i-1]);
			console.log('istePointAy[listePointAy.length-1]', listePointAy[listePointAy.length-1]);
			console.log('listeValeurCumulee[i-1]-listePointAy[listePointAy.length-1] = ', listeValeurCumulee[i-1]-listePointAy[listePointAy.length-1]);*/
			listePointBx.push(listeElement[i-1]);
			listePointBy.push(listeValeurCumulee[i-1]);
			//console.log(listePointBx);
			//console.log(listePointBy);
			arrayColonnes[6].innerHTML = 'B';
			arrayColonnes[6].style.color = 'orange';
			listeB.push('B');
			console.log('zone B');
		}else{
			//console.log('le dernier nombre de la liste B listeElement[i-1]', listeElement[i-1]);
			listePointCx.push(listeElement[i-1]);
			listePointCy.push(listeValeurCumulee[i-1]);
			//console.log(listePointCx);
			//console.log(listePointCy)
			arrayColonnes[6].innerHTML =  'C';
			arrayColonnes[6].style.color = 'purple';    
			listeC.push('C');
	    }       
	}
			//console.log('liste des Ax', listePointAx);
			//console.log('liste des Ay', listePointAy);
			//console.log('liste des Bx', listePointBx);
			//console.log('liste des By', listePointBy);
			//console.log('liste des Cx', listePointCx);
			//console.log('liste des Cy', listePointCy);
	var listeABC = listeA.concat(listeB, listeC);
	//var string1 ="";
	var y1 = listeValeurCumulee;
	//console.log('liste des valeurs cumule', y1);//liste d'element a inserer dans la table 
	var x1 = listeElement;
	//console.log('liste des element en %', x1);// liste d'element a inserer dans la table
   	//console.log('liste des id ', liste_id);
   	//console.log('liste des valeur cumulé ', liste);
	pourcentage1.disabled = true;
	//courbeABC.disabled = false;
	//console.log('avant ', listeNombresFin);
	var longueurValeur = listeNombresFin.length;
	var listeParams = [];
	for(var i=0; i<longueurValeur; i++){
		var xhr_inserer = new XMLHttpRequest()
		xhr_inserer.open("POST", "/datas");
		xhr_inserer.setRequestHeader('Content-type', "application/x-www-form-urlencoded");
		var params_inserer =`valeur_X=${x1[i]}&valeur_Y=${y1[i]}&id=${liste_id[i]}&abc=${listeABC[i]}&valeurCC=${liste[i]}`;
		listeParams.push(params_inserer);
		xhr_inserer.send(listeParams[i]);
		//console.log('typeof(listeABC[i]) ', typeof(listeABC[i]));
		//console.log('typeof(liste_id[i]) ', typeof(liste_id[i]));
		//console.log('Element a ajouter  ', params_inserer);
	}
	xhr_inserer.addEventListener('readystatechange', function(){
		if(this.readyState ==4 && this.status==200){
			console.log("pas d'erreur")
		}else{
		     console.log('Une erreur');
		}        
	});

});

function hide(e){
	if(e.keyCode ===13){
		id = e.currentTarget.id;
		console.log(id);
		console.log(typeof(id));
		var array = document.getElementById(id);
		var cell = array.cells;
		var nouvelle_description = cell[1].innerHTML;
		var nouvelle_valeur = cell[3].innerHTML;
		var nouveau_champs = (nouvelle_description) && (nouvelle_valeur)
		if (nouveau_champs != "" && valeur_regex.test(cell[3].innerHTML)){
			console.log('nombre de colonne de la ligne selectionner ', cell.length);
			console.log('le nombre de dictionaire deja inseré ', listeDicBD);
			for(dictionaire of listeDicBD){
				if(dictionaire['id'] == id){
					console.log(dictionaire['id']);
					console.log(typeof(dictionaire['id']));
					var xhr_modif = new XMLHttpRequest();
					xhr_modif.open("POST", "/update");
					xhr_modif.setRequestHeader('Content-type', "application/x-www-form-urlencoded");
					var params_modif = `nouvelle_description=${cell[1].innerHTML}&nouvelle_valeur=${cell[3].innerHTML}&nouvelle_id=${id}`;
					xhr_modif.send(params_modif);
					var description = dictionaire['description'];
					var valeur = dictionaire['valeur'];
					var indice = listeNombres.indexOf(valeur);
					console.log('liste avant le remplacement ', listeNombres);
					console.log('la valeur que nous devons changer ', valeur);
					console.log('son Indice dans le tableau avant', indice);
					var ligne1 = document.getElementById('tableau');
					ligne1.deleteRow(indice+1);
					var remplacement_val = listeNombres.splice(indice, 1, cell[3].innerHTML);	
					var remplacement_desc = liste_description.splice(liste_description.indexOf(description), 1, cell[1].innerHTML);
					
					listeNombres.sort(compare);
					function compare(x, y){
				        return y - x;
				    }
					console.log('liste apres remplacement ', listeNombres);
				    var indice = listeNombres.indexOf(cell[3].innerHTML);
					var ligne2 = ligne1.rows;
					var ligne3 = ligne1.insertRow(indice +1);
					ligne3.setAttribute('id', id);
					ligne3.insertCell(0).innerHTML += "";
					ligne3.insertCell(1).innerHTML += cell[1].innerHTML;
					ligne3.insertCell(2).innerHTML += "";
					ligne3.insertCell(3).innerHTML += cell[3].innerHTML;
					ligne3.insertCell(4).innerHTML += "";
					ligne3.insertCell(5).innerHTML += "";
					ligne3.insertCell(6).innerHTML += "";
					var ligneAjouter = document.getElementById(id);
					var cell = ligneAjouter.cells;
					console.log('le type  cell[1].innerHTML ', typeof(cell[1].innerHTML));
					cell[1].setAttribute('id', cell[1].innerHTML);
					cell[1].setAttribute('contenteditable', true);
					cell[3].setAttribute('id', cell[3].innerHTML);
					cell[3].setAttribute('contenteditable', true);
					console.log('la valeur nouvelle valeur ', cell[3].innerHTML);
					console.log('son Indice de la nouvelle valeur dans le tableau ', indice);
					console.log('liste_description ', liste_description);
				
				}
			}
		}else{
			alert('Verifier si il nya pas de vide ou si les champs sont bien remplient');
		}
		//console.log(listeDicBD);
		//console.log('LA ligne a inserer', array);
		//console.log("Id de la ligne a supprimer ", id);
		//console.log(cell[3].innerHTML);
		//console.log(cell[1].innerHTML);
		var id_cell3 = cell[3].getAttribute('id');
		var id_cell1 = cell[1].getAttribute('id');
		var modif3 = document.getElementById(id_cell3);
		var modif1 = document.getElementById(id_cell1);
		//console.log(modif1.innerHTML);
		//console.log('modif1', modif1);
		//console.log(modif3.innerHTML);
		//console.log('modif3', modif3);
		return id

	}
}
var ligne = document.getElementsByTagName('tr');
var changer = document.getElementById('tableau');
changer.addEventListener('click', myfontion);
	function myfontion(){
	//alert('Ecrit ta valeur et tape la touche entrer ');
	for(let i = 1; i < ligne.length; i++){
	 	ligne[i].addEventListener('keydown', hide);
	}
	
};

/*

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