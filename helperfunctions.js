//globals and defaults
var activeSelection = "";
var blobObject = null;

//load json per AJAX
var getJSON = function(url){
  var data;
  $.ajax({
    type: "GET",
    url: url,
    async: false,
    dataType: "json",
    success: function(result){
      console.log(result);
      data = result;
    }
  });
  return data;
};

//find parent Node
var getParent = function(data){
  var dispData = {};
  for (var i=0; i<data.length; i++){
    if (!data[i]["broader"] && data[i]["narrower"] && data[i]["prefLabel"]){
      dispData["id"] = data[i]["@id"];
    };
  };
  return dispData;
};

//get narrower Items
var getNarrowerItms = function (uri, rawData) {
  var narrowerItms = [];
  for (var i=0; i<rawData.length; i++){
    if(rawData[i]["@id"] === uri && rawData[i]["narrower"] != undefined){
      for(var j=0; j<rawData[i]["narrower"].length;j++){
        if(rawData[i]["narrower"][j].length >= 2){
          narrowerItms.push(rawData[i]["narrower"][j]);
        };
      };
    };
  };
  return narrowerItms;
};

//define 2nd level hierarchy
var define2ndlevel = function (data, rawData){
  var processedData = [];
  for (var i=0; i<data.length; i++){
    var item = {};
    var check;
    item["id"] = data[i];
    item["label"] = getlabelarray(data[i], rawData);
    check = getNarrowerItms(data[i], rawData);
    if(check.length >= 1){
      item["narrower"] = check;
    };
    processedData.push(item);
  };
  return processedData;
};

//define 3rd level hierarchy
var define3rdlevel = function(data,rawData){
  if(data["narrower"]){
    for (var i = 0; i < data["narrower"].length; i++) {
      if(data["narrower"][i]["narrower"]){
        var narrowerItms = data["narrower"][i]["narrower"];
        var items = [];
        for (var j = 0; j < narrowerItms.length; j++) {
          var item = {};
          var check;
          item["id"] = narrowerItms[j];
          item["label"] = getlabelarray(narrowerItms[j], rawData);
          check = getNarrowerItms(narrowerItms[j], rawData);
          if(check.length >= 1){
            item["narrower"] = check;
          }
          items.push(item);
          //console.log(items);
        };
        data["narrower"][i]["narrower"] = items;
      };
    };
  };
  return data;
};

//define 4th Level hierarchy
var define4thlevel = function(data,rawData){
  if(data["narrower"]){
    for (var i = 0; i < data["narrower"].length; i++) {
      if(data["narrower"][i]["narrower"]){
        for (var j = 0; j < data["narrower"][i]["narrower"].length; j++) {
          if(data["narrower"][i]["narrower"][j]["narrower"]){
            var narrowerItms = data["narrower"][i]["narrower"][j]["narrower"];
            var items = [];
            for (var k = 0; k < narrowerItms.length; k++) {
              var item = {};
              var check;
              item["id"] = narrowerItms[k];
              item["label"] = getlabelarray(narrowerItms[k], rawData);
              check = getNarrowerItms(narrowerItms[k], rawData);
              if(check.length >= 1){
                item["narrower"] = check;
              }
              items.push(item);
              //console.log(items);
            };
            data["narrower"][i]["narrower"][j]["narrower"] = items;
          };
        };
      };
    };
  };
  return data;
};

//define 5th level hierarchy
var define5thlevel = function(data,rawData){
  if(data["narrower"]){
    for (var i = 0; i < data["narrower"].length; i++) {
      if(data["narrower"][i]["narrower"]){
        for (var j = 0; j < data["narrower"][i]["narrower"].length; j++) {
          if(data["narrower"][i]["narrower"][j]["narrower"]){
            for (var k = 0; k < data["narrower"][i]["narrower"][j]["narrower"].length; k++) {
              if(data["narrower"][i]["narrower"][j]["narrower"][k]["narrower"]){
                var narrowerItms = data["narrower"][i]["narrower"][j]["narrower"][k]["narrower"];
                var items = [];
                for (var l = 0; l < narrowerItms.length; l++) {
                  var item = {};
                  var check;
                  item["id"] = narrowerItms[l];
                  item["label"] = getlabelarray(narrowerItms[l], rawData);
                  check = getNarrowerItms(narrowerItms[l], rawData);
                  if(check.length >= 1){
                    item["narrower"] = check;
                  }
                  items.push(item);
                  //console.log(items);
                };
                data["narrower"][i]["narrower"][j]["narrower"][k]["narrower"] = items;
              };
            };
          };
        };
      };
    };
  };
  return data;
};

//define 6th level hierarchy
var define6thlevel = function(data,rawData){
  if(data["narrower"]){
    for (var i = 0; i < data["narrower"].length; i++) {
      if(data["narrower"][i]["narrower"]){
        for (var j = 0; j < data["narrower"][i]["narrower"].length; j++) {
          if(data["narrower"][i]["narrower"][j]["narrower"]){
            for (var k = 0; k < data["narrower"][i]["narrower"][j]["narrower"].length; k++) {
              if(data["narrower"][i]["narrower"][j]["narrower"][k]["narrower"]){
                for (var l = 0; l < data["narrower"][i]["narrower"][j]["narrower"][k]["narrower"].length; l++) {
                  if(data["narrower"][i]["narrower"][j]["narrower"][k]["narrower"][l]["narrower"]){
                    var narrowerItms = data["narrower"][i]["narrower"][j]["narrower"][k]["narrower"][l]["narrower"];
                    var items = [];
                    for (var m = 0; m < narrowerItms.length; m++) {
                      var item = {};
                      var check;
                      item["id"] = narrowerItms[m];
                      item["label"] = getlabelarray(narrowerItms[m], rawData);
                      check = getNarrowerItms(narrowerItms[m], rawData);
                      if(check.length >= 1){
                        item["narrower"] = check;
                      }
                      items.push(item);
                      //console.log(items);
                    };
                    data["narrower"][i]["narrower"][j]["narrower"][k]["narrower"][l]["narrower"] = items;
                  };
                };
              };
            };
          };
        };
      };
    };
  };
  return data;
};

//define 7th level hierarchy
//last level
var define7thlevel = function(data,rawData){
  if(data["narrower"]){
    for (var i = 0; i < data["narrower"].length; i++) {
      if(data["narrower"][i]["narrower"]){
        for (var j = 0; j < data["narrower"][i]["narrower"].length; j++) {
          if(data["narrower"][i]["narrower"][j]["narrower"]){
            for (var k = 0; k < data["narrower"][i]["narrower"][j]["narrower"].length; k++) {
              if(data["narrower"][i]["narrower"][j]["narrower"][k]["narrower"]){
                for (var l = 0; l < data["narrower"][i]["narrower"][j]["narrower"][k]["narrower"].length; l++) {
                  if(data["narrower"][i]["narrower"][j]["narrower"][k]["narrower"][l]["narrower"]){
                    for (var m = 0; m < data["narrower"][i]["narrower"][j]["narrower"][k]["narrower"][l]["narrower"].length; m++) {
                      if(data["narrower"][i]["narrower"][j]["narrower"][k]["narrower"][l]["narrower"][m]["narrower"]){
                        var narrowerItms = data["narrower"][i]["narrower"][j]["narrower"][k]["narrower"][l]["narrower"][m]["narrower"];
                        var items = [];
                        for (var n = 0; n < narrowerItms.length; n++) {
                          var item = {};
                          var check;
                          item["id"] = narrowerItms[n];
                          item["label"] = getlabelarray(narrowerItms[n], rawData);
                          //temporary end of hierarchy
                          //check = getNarrowerItms(narrowerItms[n], rawData);
                          //if(check.length >= 1){
                          //  item["narrower"] = check;
                          //}
                          items.push(item);
                          //console.log(items);
                        };
                        data["narrower"][i]["narrower"][j]["narrower"][k]["narrower"][l]["narrower"][m]["narrower"] = items;
                      };
                    };
                  };
                };
              };
            };
          };
        };
      };
    };
  };
  return data;
};

//get label for specific URI
var getlabelarray = function(uri, data){
  var dispname = [];
  for (var i = 0; i < data.length; i++) {
    if(uri === data[i]["@id"] && data[i]["prefLabel"] != undefined){
      for (var j = 0; j<data[i]["prefLabel"].length;j++){
        //availible languages
        switch(data[i]["prefLabel"][j].slice(35,37)){
          case "en":
          dispname.push({lang: "en",name: getName(data[i]["prefLabel"][j],data)});
          break;
          case "fr":
          dispname.push({lang: "fr",name: getName(data[i]["prefLabel"][j],data)});
          break;
          case "de":
          dispname.push({lang: "de",name: getName(data[i]["prefLabel"][j],data)});
          break;
          case "es":
          dispname.push({lang: "es",name: getName(data[i]["prefLabel"][j],data)});
          break;
          case "pt":
          dispname.push({lang: "pt",name: getName(data[i]["prefLabel"][j],data)});
          break;
          case "it":
          dispname.push({lang: "it",name: getName(data[i]["prefLabel"][j],data)});
          break;
          case "ru":
          dispname.push({lang: "ru",name: getName(data[i]["prefLabel"][j],data)});
          break;
        };
      };
    };
  };
  return dispname;
};

//get name-property for specific prefLabel
var getName = function(uri, data){
  var dispname;
  for (var i = 0; i < data.length; i++) {
    if(uri === data[i]["@id"]){
      if(data[i]["skosxl:literalForm"] != undefined){
        dispname = data[i]["skosxl:literalForm"]["@value"];
      };
    };
  };
  return dispname;
};

// writeJSON Data to file
var createDownloadLink = function(anchorSelector, str, fileName){

	if(window.navigator.msSaveOrOpenBlob) {
		var fileData = [str];
		blobObject = new Blob(fileData);
		$(anchorSelector).click(function(){
			window.navigator.msSaveOrOpenBlob(blobObject, fileName);
		});
	} else {
		var url = "data:text/plain;charset=utf-8," + encodeURIComponent(str);
		$(anchorSelector).attr("href", url);
	};
};
