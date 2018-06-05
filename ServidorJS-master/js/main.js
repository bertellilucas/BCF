function cadastrarServidor(e){
	e.preventDefault()

	server = {
		servicos:[]
	}

	var servs = document.getElementById('servs')

	server.nome = document.getElementById('serverNome').value
	server.ip = document.getElementById('serverIp').value
	server.porta = document.getElementById('serverPorta').value

	for (var i = 0; i < servs.childElementCount; i++) {
		servico = {}

		servico.nome = servs.children[i].querySelector('.servNome').value
		servico.ip = servs.children[i].querySelector('.servIp').value
		servico.porta = servs.children[i].querySelector('.servPorta').value
		servico.usuario = servs.children[i].querySelector('.servUser').value
		servico.senha = servs.children[i].querySelector('.servSenha').value
		servico.dataInstalacao = servs.children[i].querySelector('.servInstalacao').value

		server.servicos.push(servico)
	}


	// if(!modeloServico && !ipUsuario){
	//
	// 	alert("Preencha todos os campos!");
	// 	return false;
	// }

	if(localStorage.getItem('info') === null){
		var info = [];
		info.push(server);
		localStorage.setItem('info', JSON.stringify(info));
	} else {
		var info = JSON.parse(localStorage.getItem('info'));
		info.push(server);
		localStorage.setItem('info', JSON.stringify(info));
	}


	 document.getElementById('formulario').reset();
	 document.getElementById('servs').innerHTML="";
	 addServico()

	mostraInfo();
}

function addServico() {
	var servs = document.getElementById('servs')

	servs.insertAdjacentHTML('beforeend', `
		<div class="pb-2 d-flex">
			<div class="form-group">
				<label>Nome</label>
				</br>
				<input type="text" class="form-control servNome" name="" placeholder="Digite o serviço...">
			</div>
			<div class="form-group">
				<label>Ip</label>
				</br>
				<input type="type" class="form-control servIp" name="" placeholder="Digite o Ip...">
			</div>
			<div class="form-group">
				<label>Porta</label>
				</br>
				<input type="number" class="form-control servPorta" name="" placeholder="Digite a porta...">
			</div>
			<div class="form-group">
				<label>Usuário</label>
				</br>
				<input type="text" class="form-control servUser" name="" placeholder="Digite o usuário...">
			</div>
			<div class="form-group">
				<label>Senha</label>
				</br>
				<input type="password" class="form-control servSenha" name="" id="servSenha" placeholder="Digite a senha...">
			</div>
			<div class="form-group">
				<label>Data Instalação</label>
				</br>
				<input type="date" class="form-control servInstalacao" name="" placeholder="Digite a data...">
			</div>
		</div>
		`)
}

function removeServer(ip){
	var info = JSON.parse(localStorage.getItem('info'));

	 for(var i = 0 ; i < info.length; i++){
		if(info[i].ip == ip){
			info.splice(i, 1);
		}
	}

	localStorage.setItem('info', JSON.stringify(info));

	mostraInfo();
}

function consultaServicos(ip) {
	var info =  JSON.parse(localStorage.getItem('info'))
	var infoResultado = document.getElementById('consulta');

	consulta.innerHTML = '';

	for (var i = 0; i < info.length; i++) {
		if(info[i].ip == ip) {
			infos = info[i]
			for (var j = 0; j < infos.servicos.length; j++) {

				servicos = infos.servicos
				testar = ""
				servicos[j].ip.length>0 ? null : testar = "disabled"
				consulta.innerHTML += `<tr><td>${servicos[j].nome}</td>
													<td>${servicos[j].ip}</td>
													<td>${servicos[j].porta}</td>
													<td>${servicos[j].usuario}</td>
													<td>${servicos[j].senha}</td>
													<td>${dateMask(servicos[j].dataInstalacao)}</td>
													<td class="text-center"><button ${testar} onclick="testarServer(${servicos[j].ip})" class="btn btn-success">Testar</button></td>
											 </tr>`
			}
		}
	}
}

function mostraInfo(){
	var consulta = document.getElementById('consulta');

	var infos = JSON.parse(localStorage.getItem('info'));
	var infoResultado = document.getElementById('resultados');

	infoResultado.innerHTML = '';
	consulta.innerHTML = '';

	for(var i = 0; i < infos.length; i++){
		var nome = infos[i].nome;
		var ip = infos[i].ip;
		var porta = infos[i].porta;
		 infoResultado.innerHTML += '<tr><td>'+ nome + '</td>'+
		 							 	  '<td>'+ ip + '</td>' +
		 							 	  '<td>'+ porta + '</td>' +
											'<td class="text-center"><button onclick="consultaServicos(\''+ ip +'\')" class="btn btn-success">Consultar</button></td>' +
		 							 	  '<td class="text-center"><button onclick="removeServer(\''+ ip +'\')" class="btn btn-danger">Remover</button></td>'+
		 							 '</tr>';
	}
}

function dateMask(d){
	dt = d.split("-")
	return `${dt[2]}/${dt[1]}/${dt[0]}`
}

function testarServer(ip){
	alert = document.getElementById('alert')
	alert.innerHTML=`Conexão no IP(${ip}) realizada com sucesso!`
	alert.classList.remove("d-none")
	$("#alert").alert()
	setTimeout(
		function(){
			alert.classList.add("d-none")
		}	,4000)
}

(function() {
	document.getElementById('formulario').addEventListener('submit', cadastrarServidor);
	document.getElementById('add').addEventListener('click', addServico);

	mostraInfo()


})()
