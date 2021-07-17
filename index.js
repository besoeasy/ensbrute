const ENS = require('ethereum-ens');
const Web3 = require('web3');
const fs = require('fs');

const provider = new Web3.providers.HttpProvider(`https://cloudflare-eth.com`);
const ens = new ENS(provider);



function sleep(ms) {
	second = ms * 1000;

	return new Promise((resolve) => setTimeout(resolve, second));
}

function filecontenttoarray(file) {
	var file = fs.readFileSync(file, 'utf8');
	var array = file.split('\n');
	return array;
}

async function main() {
	lines = await filecontenttoarray('list.txt');

	for (let i = 0; i < lines.length; i++) {
		// sanitize
		line = lines[i].trim() + `.eth`;

		// checking if domain is already registered
		await ens.owner(line).then(function (response) {
			if (response == '0x0000000000000000000000000000000000000000') {
				console.log(line + ' is not owned');
			}
		});

		// sleeping for 15 seconds to avoid rate limit
		await sleep(15);
	}
}

main();
