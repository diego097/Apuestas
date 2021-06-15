const { json } = require("body-parser");
const express = require("express");
const fetch = require("node-fetch");
const ODDS = require("../database/Odds.json");
const marketGames = require("../database/MatchGame.json");
const { urlencoded } = require("express");
const Router = express.Router();


const activeMatch = [];
const finalJson = [];


function cleanJsonOdds(myJsonOdds) {

    myJsonOdds.forEach((element) => {


        if (
            element.status == "OP" ||
            element.status == "TD" ||
            element.status == "TDM"
        ) {


            activeMatch.push({ id: element.id, market_id: element.market_id, selection_id: element.selection_id, selection_name: element.selection_name, odd_quota: element.odd_quota, odd_origin: element.odd_origin, status: element.status });

        }

    });
}

function compareJsonOddsAndMarket(odds, market) {

    market.forEach(elementOne => {
        odds.forEach(elementTwo => {
            if (elementOne.id == elementTwo.market_id) {
                finalJson.push[{}]
            }
        });
    });

}

Router.get("/", (req, res) => {


    //funcion que limpia el JSON de ODDS
    cleanJsonOdds(ODDS.data)

    //Funcion que compara los objetos del odds y marketGames


    console.log(activeMatch);
    res.render("index.ejs", {
        ODDS,
        marketGames,
    });
});

module.exports = Router;