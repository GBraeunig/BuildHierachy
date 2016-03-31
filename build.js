$(document).ready(function(){
  var updatetree = function(){
    //loadJSONData
    var data = getJSON("data/skos_resources.json");
    data = data["@graph"];
    var structData = getParent(data);


    //process hierarchy
    structData["label"] = getlabelarray(structData["id"],data);
    structData["narrower"] = getNarrowerItms(structData["id"],data);
    structData["narrower"] = define2ndlevel(structData["narrower"],data);
    structData = define3rdlevel(structData,data);
    structData = define4thlevel(structData,data);
    structData = define5thlevel(structData,data);
    structData = define6thlevel(structData,data);
    structData = define7thlevel(structData,data);

    //output handlers
    stringdata = JSON.stringify(structData);
    createDownloadLink("#export",stringdata,"export.json");
    console.log(structData);
  }();
});
