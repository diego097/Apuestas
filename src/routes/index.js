const { json } = require("body-parser");
const express = require("express");
const fetch = require("node-fetch");
const ODDS = require("../database/Odds.json");
const marketGames = require("../database/FileFromMarketGames.json");
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
            activeMatch.push({
                id: element.id,
                market_id: element.market_id,
                selection_id: element.selection_id,
                selection_name: element.selection_name,
                odd_quota: element.odd_quota,
                odd_origin: element.odd_origin,
                status: element.status,
            });
        }
    });
}

function compareJsonOddsAndMarket(odds, market) {

    var temp_market_id = 0;

    odds.forEach(elementOne => {
        market.forEach(elementTwo => {
            if ( temp_market_id == 0 && elementOne.market_id == elementTwo.id) {
                
                finalJson.push({
                    id: elementTwo.id,
                    market_name: elementTwo.name, 
                    odds: {
                        id: elementOne.id,
                        odd_name: elementOne.selection_name,
                        odd_origin: elementOne.odd_origin,
                        selection_id: elementOne.selection_id
                    },
                    
                })
                
                temp_market_id = elementOne.market_id;

            }else if (temp_market_id == elementOne.market_id ) {

                
                finalJson[elementOne].odds[elementTwo].push({
                    id: elementOne.id,
                    odd_name: elementOne.selection_name,
                    odd_origin: elementOne.odd_origin,
                    selection_id: elementOne.selection_id
                });

                temp_market_id = elementOne.market_id;  
            } 
        });
    });

    
}

Router.get("/", (req, res) => {


    
    //funcion que limpia el JSON de ODDS
    cleanJsonOdds(ODDS.data);

    //console.log(activeMatch);
    //Funcion que compara los objetos del odds y marketGames
    //compareJsonOddsAndMarket(activeMatch, marketGames.data)

    console.log(finalJson.);
    res.render("index.ejs", {
        finalJson
    });
});

module.exports = Router;