
$(function () {

	// 連線，連接到本地 enode
	var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

	// register contract
	var registerDataStorage = web3.eth.contract(
			[{"constant":false,"inputs":[{"name":"uId","type":"uint256"}],"name":"getMemberAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"member","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"uId","type":"uint256"}],"name":"newMember","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"owner","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"result","type":"bool"}],"name":"memberSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"addr","type":"address"}],"name":"memberAddress","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"addr","type":"address"}],"name":"memberGetAddress","type":"event"}]
		).at('0x474c860d1bb494da830546a1b8d41c9e9c4760df');
	var searchDataStorage = web3.eth.contract(
			[{"constant":false,"inputs":[{"name":"docHash","type":"bytes32"},{"name":"addr","type":"address"}],"name":"setDocs","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"docHash","type":"bytes32"}],"name":"getDoc","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"result","type":"bool"}],"name":"docSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"addr","type":"address"}],"name":"docGet","type":"event"}]
	).at('0x474c860d1bb494da830546a1b8d41c9e9c4760df');
	var memberAddr = '';

	// register
	$('#registerMember').on('click', function() {
		var memberId = $('#memberId').val()
		registerDataStorage.newMember(memberId, {
			from: web3.eth.coinbase,
			gas: 77777777
		}, (err, tx) => {
			if (err !== undefined && err !== null) {
				console.log(err)
			}else {
				console.log(tx);
			}
			//}
		})
		// let message = document.getElementById('message')
		// message.innerHTML = ''
		registerDataStorage.memberSet({}, function(err, event) {
			if(event.args.result == true) {
				registerDataStorage.memberAddress({}, function(error, e) {
					$('#message').text('Success! Your member address is : ' + e.args.addr)
				})
			}else {
				$('#message').text('This member Id has been used!')
			}
		})


	})


	// check member
	$('#checkMemberButton').on('click', function() {
		var memberIdCheck = $('#memberIdCheck').val()
		registerDataStorage.getMemberAddress(memberIdCheck, {
			from: web3.eth.coinbase,
			gas: 77777777
		}, (err, tx) => {
			if (err !== undefined && err !== null) {
				console.log(err)
			}else {
				console.log(tx);
			}
		})
		registerDataStorage.memberGetAddress({}, function(err, event) {
			if(event.args.addr == 0 || event.args.addr == null){
				$('#message2').text('No member')
			}
			else{
				console.log('the addr ' + event.args.addr)
				$('#message2').text('Your member address is : ' + event.args.addr)
				//console.log(event)
				//memberAddr = event.args.addr.toString();
				//console.log('memberAddr: ' + memberAddr)
			}
		})
	})

	// login
	$('#loginButton').on('click', function() {
		var loginId = $('#loginId').val()
		registerDataStorage.getMemberAddress(loginId, {
			from: web3.eth.coinbase,
			gas: 77777777
		}, (err, tx) => {
			if (err !== undefined && err !== null) {
				console.log(err)
			}else {
				console.log(tx);
			}
		})
		registerDataStorage.memberGetAddress({}, function(err, event) {
			if(event.args.addr != 0){
				memberAddr = event.args.addr.toString();
				console.log(memberAddr);
				$('#loginMessage').text('Success')
			}
			else
				$('#loginMessage').text('No member')
		})
	})

	var tradeSecretAddr = ''

	// creat file
	$('#newTradeSecret').on('click', function() {
		// member contract
		//console.log('memberAddr: ' + memberAddr)
		var memberDataStorage = web3.eth.contract(
			[{"constant":false,"inputs":[{"name":"tradeSecretName","type":"uint256"}],"name":"getTradeSecret","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"tradeSecretName","type":"uint256"}],"name":"newTradeSecret","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"myTradeSecret","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_uId","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"result","type":"bool"}],"name":"tradeSecretSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"addr","type":"address"}],"name":"tradeSecretAddress","type":"event"}]
		).at(memberAddr);
		let tradeSecretName = document.getElementById('tradeSecretName').value

		memberDataStorage.newTradeSecret(tradeSecretName, {
			from: web3.eth.coinbase,
			gas: 77777777
		}, (err, tx) => {
			if (err !== undefined && err !== null) {
				console.log(err)
			}else {
				console.log(tx);
			}
		})

		memberDataStorage.tradeSecretAddress({}, function(err, event) {
			if (err !== undefined && err !== null) {
				console.log(err)
			}else {
				tradeSecretAddr = event.args.addr.toString()
				console.log('tradeSecretADDR: ' + tradeSecretAddr)
				//console.log(event);
			}	//$('#message').text('Success! Your member address is : ' + e.args.addr)
		})

		memberDataStorage.tradeSecretSet({}, function(err, event) {
			if(event.args.result == true) {
				console.log(event.args.result)
			}else {
		    //$('#message').text('This member Id has been used!')
		    console.log('false')
		  }
		})
	})



	$('#sendFile').on('click', function() {
		var tradeSecretStorage = web3.eth.contract(
			[{"constant":false,"inputs":[{"name":"docHash","type":"bytes32"},{"name":"docType","type":"uint256"},{"name":"docNumber","type":"uint256"},{"name":"docVer","type":"uint256"},{"name":"note","type":"string"}],"name":"setTradeSecretAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getTradeSecretData","outputs":[{"name":"","type":"bytes32"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"uId","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"done","type":"bool"}],"name":"setTradeSecret","type":"event"}]
			).at(tradeSecretAddr);
		let docType = document.getElementById('docType').value
		let docNumber = document.getElementById('docNumber').value
		let docVer = document.getElementById('docVer').value
		let note = document.getElementById('note').value
		let docHash ='';
		// 讀取檔案並計算hash值
		var file = document.getElementById("memberFile").files[0];
		var reader = new FileReader();
		reader.onloadend = function(file) {
			if (file.target.readyState == FileReader.DONE) { // DONE == 2
        var wordArray = CryptoJS.lib.WordArray.create(file.target.result);
        var hash = CryptoJS.SHA256(wordArray);
				// console.log('myhash: ' +  hash.toString())
				docHash = hash.toString();
				//console.log('hash is :')
				//console.log(hash)

				tradeSecretStorage.setTradeSecretAll(docHash, docType, docNumber, docVer, note, {
					from: web3.eth.coinbase,
					gas: 88888888
				}, (err, tx) => {
					if (err !== undefined && err !== null) {
						console.log(err)
					}else {
						console.log(tx);
						//console.log(docHash);
					}
				})
				//console.log('memberaddr:::::' + memberAddr)
				searchDataStorage.setDocs(docHash, memberAddr, {
					from: web3.eth.coinbase,
					gas: 77777777
				}, (err, tx) => {
					//console.log('memberaddrQQQ: ' + memberAddr)
					if (err !== undefined && err !== null) {
						console.log(err)
					}else {
						console.log(tx);
					}
				})
				// console.log(docType + ' ' + docNumber + ' ' + docVer + ' ' + note + ' ' + docHash);
			}
		}
		reader.readAsArrayBuffer(file)

		//console.log('test ' + docHash)
		// send to Blockchain

		tradeSecretStorage.setTradeSecret({}, function(err, event) {
			if(event.args.done == true) {
				console.log('done')
			}else {
				console.log('error')
			}
		})

		searchDataStorage.docSet({}, function(err, event) {
			if(event.args.result == true) {
				console.log('search set done')
			}else {
				console.log('search set error')
				console.log(err)
			}
		})

	})

	$('#search').on('click', function() {
		var sHash = document.getElementById('docHashSearch').value
		searchDataStorage.getDoc(sHash, {
			from: web3.eth.coinbase,
			gas: 77777777
		}, (err, tx) => {
			if (err !== undefined && err !== null) {
				console.log(err)
			}else {
				console.log(tx);
			}
		})

		searchDataStorage.docGet({}, function(err, event) {
			if(err !== undefined && err !== null) {
				console.log(err)
			}else {
				console.log(event.args.addr);
			}
		})
	})
	// $('#test').on('click', function() {
	// 	var file = document.getElementById("testFile").files[0];
	// 	var reader = new FileReader();
	// 	reader.onloadend = function(file) {
	// 		if (file.target.readyState == FileReader.DONE) { // DONE == 2
	//
  //       var wordArray = CryptoJS.lib.WordArray.create(file.target.result);
  //       var hash = CryptoJS.SHA256(wordArray);
	// 			console.log(hash.toString());
	// 		}
	// 	}
	// 	reader.readAsArrayBuffer(file)
	//
	// })

	// $('#sendFile').on('click', function() {
	// 	var searchStorage = web3.eth.contract(
	// 		[{"constant":false,"inputs":[{"name":"docHash","type":"bytes32"},{"name":"addr","type":"address"}],"name":"setDocs","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"docHash","type":"bytes32"}],"name":"getDoc","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]
	// 	).at(searchAddr);
	// 	//searchStorage.
	// })

})
