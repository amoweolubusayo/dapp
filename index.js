async function connect() {
    const priceElem = document.querySelector('#price')

    try {
        priceElem.textContent = 'Updating price...';

        const ABI = [{ "type": "constructor", "stateMutability": "nonpayable", "inputs": [] }, { "type": "event", "name": "OracleUpdate", "inputs": [{ "type": "string", "name": "key", "internalType": "string", "indexed": false }, { "type": "uint128", "name": "value", "internalType": "uint128", "indexed": false }, { "type": "uint128", "name": "timestamp", "internalType": "uint128", "indexed": false }], "anonymous": false }, { "type": "event", "name": "UpdaterAddressChange", "inputs": [{ "type": "address", "name": "newUpdater", "internalType": "address", "indexed": false }], "anonymous": false }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint128", "name": "", "internalType": "uint128" }, { "type": "uint128", "name": "", "internalType": "uint128" }], "name": "getValue", "inputs": [{ "type": "string", "name": "key", "internalType": "string" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "setValue", "inputs": [{ "type": "string", "name": "key", "internalType": "string" }, { "type": "uint128", "name": "value", "internalType": "uint128" }, { "type": "uint128", "name": "timestamp", "internalType": "uint128" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "updateOracleUpdaterAddress", "inputs": [{ "type": "address", "name": "newOracleUpdaterAddress", "internalType": "address" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "values", "inputs": [{ "type": "string", "name": "", "internalType": "string" }] }]

        const web3 = new Web3(new Web3.providers.HttpProvider("https://andromeda.metis.io/?owner=1088"))

        const contract = new web3.eth.Contract(ABI);
        contract.options.address = "0x6E6E633320Ca9f2c8a8722c5f4a993D9a093462E";

        const currentPriceResponse = await contract.methods.getValue('ETH/USD').call()

        if (currentPriceResponse[0]) {
            const formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2,
            });
            priceElem.textContent = formatter.format(currentPriceResponse[0] / 100000000);
        }

    } catch (e) {
        priceElem.textContent = 'An error occurred while updating the price, please refresh your page.';
    }
}

window.onload = function() {
    connect();
}