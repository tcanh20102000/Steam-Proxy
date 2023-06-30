var express = require("express");
var router = express.Router();
const axios = require("axios");


const TIMEOUT = 30000;
const STEAM_DETAIL_URL = "https://store.steampowered.com/api/appdetails";
const STEAM_REVIEW_URL = "https://store.steampowered.com/appreviews";
//const STEAMKEY = "E0D30EBED9AC4899862E1B97F33B21C0";

//const STEAM_SPY_API = "https://steamspy.com/api.php";

const fetchData = async (res, URL, params) => {
  let ret = [];
  console.log("fetching...");
  try {
    const res1 = await axios.get(URL, {
      params: params,
      timeout: TIMEOUT,
    });
    if (res1 != null && res1.data != null) {
      console.log(res1.data);
      
      ret = res1.data;
      console.log("ret length", ret.length);
      //res.send(ret);
      console.log("Done fetch");
    }
  } catch (err) {
    console.log(err);
  }

  return ret;
};

const fetchDataTwiceChain = async (res, URL1, params1, URL2, params2) => {
  let ret = {};
  console.log("fetching...");
  try {
    const [firstResponse, secondResponse] = await Promise.all([
      axios.get(URL1, {
        params: params1,
        timeout: TIMEOUT,
      }),
      axios.get(URL2, {
        params: params2,
        timeout: TIMEOUT,
      }),
    ]);
    if (firstResponse == null && firstResponse.data == null) {
    } else if (secondResponse == null && secondResponse.data == null) {
    } else {
      ret = [firstResponse, secondResponse];
    }
    return ret;
  } catch (err) {
    console.log(err);
  }

  return ret;
};



router.get("/app/:appId", function (req, res) {
  
  console.log("Here getNApp");
  //res.send("API is working properly");
  let gameId = req.params.appId;

  let input_params1 = { appids: gameId };
  var params1 = new URLSearchParams(input_params1);

  let input_params2 = { appids: gameId, json: 1, language: 'all'  };
  var params2 = new URLSearchParams(input_params2);


  fetchData(res, STEAM_DETAIL_URL, params1).then((ret) => {
    if (!ret) {
      res.send([]);
    }
    //console.log("random ,", data, "end");
    res.send(ret);
  });
});

router.get("/app/:appId", function (req, res) {
  console.log("Here getApp detail");
  let gameId = req.params.appId;


  let input_params2 = {  json: 1, language: "all" };
  var params2 = new URLSearchParams(input_params2);

  fetchData(res, STEAM_REVIEW_URL + `/${gameId}`, params2).then((ret) => {
    if (!ret) {
      res.send([]);
    }
    //console.log("random ,", data, "end");
    res.send(ret);
  });
});

router.get("/app_and_reviews/:appId", function (req, res) {
  console.log("Here getApp review");
  //res.send("API is working properly");
  let gameId = req.params.appId;

  let input_params1 = { appids: gameId };
  var params1 = new URLSearchParams(input_params1);

  let input_params2 = { json: 1, language: "all" };
  var params2 = new URLSearchParams(input_params2);

  let URL1 = STEAM_DETAIL_URL;
  let URL2 = STEAM_REVIEW_URL + `/${gameId}`;

  fetchDataTwiceChain(res, URL1, params1, URL2, params2).then((ret) => {
    if (!ret) {
      res.send([]);
    }
    
    if(!typeof ret[Symbol.iterator] === 'function'){
      console.log('Error');
      res.send([])
    }
    else{
      const [firstResponse, secondResponse] = [...ret];
      let result = firstResponse.data;
      delete secondResponse.data["success"];

      result[`${gameId}`].data.customer_review = secondResponse.data;
      
      res.send(result);
    }
  });
});




module.exports = router;
