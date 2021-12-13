web3 = new Web3(new Web3.providers.HttpProvider("https://andromeda.metis.io/?owner=1088"))
var account;
web3.eth.getAccounts().then((f) => {
    account = f[0];
})

abi = JSON.parse('[{"type":"constructor","stateMutability":"nonpayable","inputs":[]},{"type":"event","name":"OracleUpdate","inputs":[{"type":"string","name":"key","internalType":"string","indexed":false},{"type":"uint128","name":"value","internalType":"uint128","indexed":false},{"type":"uint128","name":"timestamp","internalType":"uint128","indexed":false}],"anonymous":false},{"type":"event","name":"UpdaterAddressChange","inputs":[{"type":"address","name":"newUpdater","internalType":"address","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"view","outputs":[{"type":"uint128","name":"","internalType":"uint128"},{"type":"uint128","name":"","internalType":"uint128"}],"name":"getValue","inputs":[{"type":"string","name":"key","internalType":"string"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setValue","inputs":[{"type":"string","name":"key","internalType":"string"},{"type":"uint128","name":"value","internalType":"uint128"},{"type":"uint128","name":"timestamp","internalType":"uint128"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateOracleUpdaterAddress","inputs":[{"type":"address","name":"newOracleUpdaterAddress","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"values","inputs":[{"type":"string","name":"","internalType":"string"}]}]')

contract = new web3.eth.Contract(abi);
contract.options.address = "0x6E6E633320Ca9f2c8a8722c5f4a993D9a093462E";

$(document).ready(function() {
    let x = contract.methods.getValue('ETH/USD').call().then(function(result) {
        $('#getValue').html(Math.round(result[0] / 100000000))
    });
});