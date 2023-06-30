
var express = require("express");
var router = express.Router();

const axios = require("axios");

const TIMEOUT = 30000;
const STEAM_URL = "http://api.steampowered.com/ISteamApps/GetAppList/v0002/";
const STEAMKEY = "E0D30EBED9AC4899862E1B97F33B21C0";

const STEAM_SPY_API = "https://steamspy.com/api.php";


const default_limit = 20;
const default_genre = 'RPG';

const fetchData = async (res, URL, params) => {
  let ret = [];
  console.log('fetching...');
  try {
    const res1 = await axios.get(URL, {
      //headers: { "Access-Control-Allow-Origin": "*" },
      params: params,
      timeout: TIMEOUT,
    });
    if (res1 != null && res1.data!= null) {

      Object.keys(res1.data).forEach(function (key) {
        var obj = {};
        obj = res1.data[key];
        ret.push(obj); 
      });

      console.log('ret length', ret.length);
      //res.send(ret);
      console.log("Done fetch");
    }
  } catch (err) {
    console.log(err);
  }
  
  return ret;
};

function getRandom(arr, limit) {
  let dup_arr = [...arr];
  var result = new Array(limit),
    len = arr.length;
  if (limit > len){
    limit = len;
  }
    //throw new RangeError("getRandom: more elements taken than available");
  while (limit--) {
    let x = Math.floor(Math.random() * len);
    result[limit] = dup_arr[x];
    
    const halfBeforeUnwantedUnit = dup_arr.slice(0, x);
    const halfAfterUnwantedUnit = dup_arr.slice(x + 1);
    dup_arr = halfBeforeUnwantedUnit.concat(halfAfterUnwantedUnit);
    len = len - 1;
  }
  return result;
}


router.get("/get_all", function (req, res) {
    console.log('Here getAllApp');
    let Steam_api_params = { key: STEAMKEY, format: "json" };
    var params = new URLSearchParams(Steam_api_params);

    fetchData(res, STEAM_URL, Steam_api_params);
    //res.send("API is working properly");
});

router.get("/get_in_genre/:genre", function (req, res) {

  const STEAM_GENRE_API =
    `https://store.steampowered.com/contenthub/
    ajaxgetcontenthubdata?hubtype=category&category=rpg`;
  console.log("Here get genre ", req.params.genre);

  let genre = req.params.genre ? req.params.genre : default_genre;
  let in_params = { request: 'genre', genre: genre};

  var params = new URLSearchParams(in_params);


  fetchData(res, STEAM_SPY_API, params).then((ret)=>{
    res.send(ret.slice(0,10));
  })
  //res.send("API is working properly");
});

router.get("/get_top_100", function (req, res) {
  console.log("Here getTop100App");
  let in_params = { request: "top100in2weeks" };
  var params = new URLSearchParams(in_params);

  fetchData(res, STEAM_SPY_API, params);
  //res.send("API is working properly");
});

router.get("/get_random/", function (req, res) {
  console.log("Here get_random");
  let limit = req.query.limit? req.query.limit: default_limit;

  let in_params = { request: "top100in2weeks" };
  var params = new URLSearchParams(in_params);


  fetchData(res, STEAM_SPY_API, params)
    .then((ret) => {
      if(!ret){
        res.send([]);
      }
      const data = getRandom(ret, limit);
      res.send(data);
    })
  //res.send("API is working properly");
  //.then((data) => {getRandom(data, 1)})
});


module.exports = router;
