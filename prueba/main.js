document.addEventListener('keydown', function(evento){
	if(evento.keyCode == 32 && trex.saltando == false){
		if (nivel.muerto == false) {
			saltar();
		}
		else {
			nivel.velocidad = 9;
			nube.velocidad = 1;
			cactus.x = ancho + 100;
			nube.x = ancho + 100;
			nivel.marcador = 0;
			nivel.muerto = false;
		}
	}
});

var imgRex, imgNube, imgCactus, imgSuelo;

function cargaImagenes(){
	imgRex = new Image();
	imgNube = new Image();
	imgCactus = new Image();
	imgSuelo = new Image();

	imgRex.src = 'sources/rex.png';
	imgNube.src = 'sources/nube.png';
	imgCactus.src = 'sources/cactus.png';
	imgSuelo.src = 'sources/suelo.png';
}

//funciion borrar
var ancho = 700;
var alto = 400; 


var canvas,ctx;

function inicializa(){
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	cargaImagenes();
}

function borraCanvas(){
	canvas.width = ancho;
	canvas.height = alto;
}

var suelo = 250
var trex = {y: suelo, vy:0, gravedad:2, salto:28, vymax:9, saltando: false};
var nivel = {velocidad: 9, marcador: 0, muerto: false};
var cactus = {x: ancho + 100 ,y: suelo - 40};
var nube = {x: 400, y: 100, velocidad:2};
var suelog = {x: 0, y: suelo + 30};

function contador(){
	if (nivel.muerto == false && nivel.marcador >= 0){

		nivel.marcador ++;
	}
	else {
		nivel.marcador = 0;
	}
}
console.log(nivel.marcador)

function dibujaRex(){
	ctx.drawImage(imgRex,0,0,280,180,100,trex.y,70,50);
}

function dibujaCactus(){
	ctx.drawImage(imgCactus,0,0,73,103,cactus.x,cactus.y,50,90);
}

function logicaCactus(){
	if (cactus.x < -100){
		cactus.x = ancho + 100;
	}
	else{
		cactus.x -= nivel.velocidad;
	}
}

function dibujaNube(){
	ctx.drawImage(imgNube,0,0,131,65,nube.x,nube.y,82,31);
}

function logicaNube(){
	if (nube.x < -100){
		nube.x = ancho + 100;
	}
	else{
		nube.x -= nube.velocidad;
	}
}

function dibujaSuelo(){
	ctx.drawImage(imgSuelo,suelog.x,0,700,68,0,suelog.y,736,40);
}

function logicaSuelo(){
	if (suelog.x > 70){
		suelog.x = 0;
	}
	else{
		suelog.x += nivel.velocidad;
	}
}

function saltar(){
	trex.saltando = true;
	trex.vy = trex.salto;
}

function gravedad(){
	if(trex.saltando == true){
		if(trex.y - trex.vy - trex.gravedad > suelo){
			trex.saltando = false;
			trex.vy = 0;
			trex.y = suelo;
		}
		else{
			trex.vy -= trex.gravedad;
			trex.y -= trex.vy;
		}
	}
}

function colision(){
	if (cactus.x >= 80 && cactus.x <= 160) {
		if (trex.y >= suelo - 25 ) {
			nivel.muerto = true;
			nivel.velocidad = 0;
			nube.velocidad = 0;
		}
		else if(trex.y >= suelo - 40 ){
			nivel.muerto = true;
			nivel.velocidad = 0;
			nube.velocidad = 0;
		}
	}
		
}

function puntuacion(){
	ctx.font = "20px impact";
	ctx.filStyle = "#555555";
	ctx.fillText(`${nivel.marcador}`,600,20);

	if (nivel.muerto == true){
		ctx.font = "60px impact";
		ctx.fillText(`GAME OVER`,240,150);
	}
}

//bucle
var FPS = 50;
setInterval(function(){
	principal();
},1000/FPS);

function principal(){
	borraCanvas();
	gravedad();
	colision();
	logicaSuelo();
	logicaCactus();
	logicaNube();
	dibujaSuelo();
	dibujaCactus();
	dibujaNube();
	dibujaRex();
	puntuacion();
	contador();
}
