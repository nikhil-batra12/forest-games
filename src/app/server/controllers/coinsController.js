exports.getCoins = getCoins;
function getCoins(req, res) {
    res.end(JSON.stringify(require('./response/coins-response.json')));
}