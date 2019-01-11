exports.getCoins = getCoins;
function getCoins(req, res) {
    res.send(JSON.stringify(require('../responses/coins-response.json')));
}