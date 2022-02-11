const fs = require('fs');
const { ethers } = require('ethers');
const provider = new ethers.providers.getDefaultProvider('mainnet');

function filecontenttoarray(file) {
	var file = fs.readFileSync(file, 'utf8');
	var array = file.split('\n');
	return array;
}

async function main() {
	lines = await filecontenttoarray('list.txt');

	for (let i = 0; i < lines.length; i++) {
		var line = lines[i].trim() + `.eth`;

		var address = await provider.resolveName(line);

		if (!address) {
			console.log(line + ' is not owned');
		}
		
	}
}

main();
