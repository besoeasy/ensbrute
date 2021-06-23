const ENS = require('ethereum-ens');
const Web3 = require('web3');
const fs = require('fs');

const provider = new Web3.providers.HttpProvider(`https://main-light.eth.linkpool.io`);
const ens = new ENS(provider);

fs.readFile('list.txt', async function (error, data) {
	if (error) {
		throw error;
	}
	
	try {

			data
		.toString()
		.split('\n')
		.forEach(async function (line, index, arr) {
			if (index === arr.length - 1 && line === '') {
				return;
			}

			await ens.owner(line.trim() + `.eth`).then(function (response) {
				if (response == '0x0000000000000000000000000000000000000000') {
					console.log(line);
				}
			});
		});
		
		
}
catch(err) {
console.log(err)
}
	
	
	


});
