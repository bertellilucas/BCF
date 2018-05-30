
document.getElementById('formulario').addEventListener('submit', cadastrarServidor);

function cadastrarServidor(e){

	var modeloServico = document.getElementById('modeloServico').value;
	var ipUsuario = document.getElementById('ipUsuario').value;
	var portaUser = document.getElementById('portaUser').value;
	var nomeUser = document.getElementById('nomeUser').value;
	var senhaUser = document.getElementById('senhaUser').value;
	var dataUser = document.getElementById('dataUser').value;

	if(!modeloServico && !ipUsuario){

		alert("Preencha todos os campos!");
		return false;
	}

	var servico = {
		modelo: modeloServico,
		ip: ipUsuario,
		porta: portaUser,
		usuario: nomeUser,
		senha: senhaUser,
		data: dataUser
	};

	if(localStorage.getItem('patio') === null){
		var servicos = [];
		servicos.push(servico);
		localStorage.setItem('patio', JSON.stringify(servicos));
	} else {
		var servicos = JSON.parse(localStorage.getItem('patio'));
		servicos.push(servico);
		localStorage.setItem('patio', JSON.stringify(servicos));
	}

	document.getElementById('formulario').reset();

	mostraPatio();

	e.preventDefault();
}

function removeservico(ip){
	var patio = JSON.parse(localStorage.getItem('patio'));
	console.log(patio);

	 for(var i = 0 ; i < patio.length; i++){
		if(patio[i].ip == ip){
			patio.splice(i, 1);
		}
	}

	localStorage.setItem('patio', JSON.stringify(patio));

	mostraPatio();
}

function mostraPatio(){
	var servicos = JSON.parse(localStorage.getItem('patio'));
	var patioResultado = document.getElementById('resultados');

	patioResultado.innerHTML = '';

	for(var i = 0; i < servicos.length; i++){
		var modelo = servicos[i].modelo;
		var ip = servicos[i].ip;
		var porta = servicos[i].porta;
		var usuario = servicos[i].usuario;
		var senha = servicos[i].senha;
		var data = servicos[i].dataUser;
		 patioResultado.innerHTML += '<tr><td>'+ modelo + '</td>'+
		 							 	  '<td>'+ ip + '</td>' +
		 							 	  '<td>'+ porta + '</td>' +
		 							 	  '<td>'+ usuario + '</td>' +
		 							 	  '<td>'+ senha + '</td>' +
		 							 	  '<td>'+ data + '</td>' +
		 							 	  '<td><button onclick="removeservico(\''+ ip +'\')" class="btn btn-danger">Remover</button></td>'+
		 							 '</tr>';
	}
}
