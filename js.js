// Get the root element
var r = document.querySelector(':root');
var rs = getComputedStyle(r);
var curChap = 1;
var curElt;
var listCheck;
var offChecked;
var offList;
var maxChap;

function init() {
	// body onload
 // Select all officers
	listCheck = document.querySelectorAll('input[type="checkbox"]');
	offChecked = ""
	listCheck.forEach(function (inp) {
		inp.checked = true;
      	offChecked += (offChecked == "" ? "" : ",")+"div."+inp.parentElement.parentElement.id
	})
	offList = document.getElementById("chap"+curChap).querySelectorAll(offChecked)
	// Selection du premier texte d'un officier selectionne
    curElt = 0
    offList[curElt].focus()
   	maxChap = document.querySelectorAll('div.chapter').length;
}

function toc() {
	// affichage de la table des matières
	document.getElementById("DocToc").style.left = "0px";
}

function hidToc(e) {
	document.getElementById("DocToc").style.left = "-999px";
	if(e){
		curChap = e.target.href.substr(e.target.href.search("#")+1)
		offList = document.getElementById("chap"+curChap).querySelectorAll(offChecked)
		// Selection du premier texte d'un officier selectionne
    	curElt = -1
    	next()
	}
}

function offSel() {
	// body...
	document.getElementById("offSelect").style.left = "0px";
}

function sel(e){
	inp = e.target
    if (inp.checked){
    	r.style.setProperty("--"+inp.parentElement.parentElement.id+"col",rs.getPropertyValue("--"+inp.parentElement.parentElement.id+"color"));
	} else 
		{r.style.setProperty("--"+inp.parentElement.parentElement.id+"col","rgb(240,240,240)");}
	listOff();
}

function hidOff() {
	// Masquage de la fenetre des officiers
	document.getElementById("offSelect").style.left = "-999px";
	listOff();
}

function listOff() {
	// Mise a jour des Officiers mis en couleur
	listCheck = document.querySelectorAll('input[type="checkbox"]');
	offChecked = ""
	listCheck.forEach(function (inp) {
      	if (inp.checked){
      		r.style.setProperty("--"+inp.parentElement.parentElement.id+"col",rs.getPropertyValue("--"+inp.parentElement.parentElement.id+"color"));
      		offChecked += (offChecked == "" ? "" : ",")+"div."+inp.parentElement.parentElement.id
		} else 
			{r.style.setProperty("--"+inp.parentElement.parentElement.id+"col","rgb(240,240,240)");}
    	})
	if (offChecked == ""){
		document.getElementById("left").style.visibility = "hidden"
		document.getElementById("right").style.visibility = "hidden"
	} else {
		document.getElementById("left").style.visibility = "visible"
		document.getElementById("right").style.visibility = "visible"
		offList = document.getElementById("chap"+curChap).querySelectorAll(offChecked)
		// Selection du premier texte d'un officier selectionne
	    curElt = -1
	    next();
	}
}

function selAll(){
 // Select all officers
	listCheck = document.querySelectorAll('input[type="checkbox"]');
	listCheck.forEach(function (inp) {
		inp.checked = true;
	  	r.style.setProperty("--"+inp.parentElement.parentElement.id+"col",rs.getPropertyValue("--"+inp.parentElement.parentElement.id+"color"));
	})
}

function unselAll(){
 // Unselect all officers
	listCheck = document.querySelectorAll('input[type="checkbox"]');
	listCheck.forEach(function (inp) {
		inp.checked = false;
		{r.style.setProperty("--"+inp.parentElement.parentElement.id+"col","rgb(240,240,240)");}
	})
}

function prev() {
	if((curElt == 0)&&(curChap > 1)){
		curChap -= 1;
		offList = document.getElementById("chap"+curChap).querySelectorAll(offChecked)
		curElt = offList.length-1;
	}else{
    	curElt = Math.max(0,curElt - 1)
	}
	offList[curElt].focus()
}

function next() {
	if((curElt == offList.length-1)&&(curChap < maxChap)){
		curElt = 0;
		curChap += 1;
		offList = document.getElementById("chap"+curChap).querySelectorAll(offChecked)
	}else{
    	curElt = Math.min(offList.length-1,curElt + 1)
	}
    offList[curElt].focus()
}

