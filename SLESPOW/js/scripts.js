var toolList

var tmp_roles = [  // (15 roles)
  "Energy Officer",
  "Grant funder",
  "Planning Manager",
  "Commercial Consultant",
  "Community manager",
  "Investment Manager",
  "Finance Team",
  "Investment Manager",
  "Projects director",
  "Financial director",
  "Ward member/s",
  "Energy/carbon director",
  "Council Leader",
  "Portfolio Manager",
  "Cabinet Members"
]


$(document).ready(function () {
  getTools();
});// document ready

function getTools() {
  $.getJSON("js/tools.json", function (data) {
    toolList = data;
    organiseToolsList(toolList);    //organise tools
    getBoard();
  });
}


function organiseToolsList(List) {
  //for each tool add to array for each card
  //sort by card
  var tools = []

  $.each(List, function (i, v) {

    tools[v.Pow] ? "" : tools[v.Pow] = {};
    tools[v.Pow][v.Aoi] ? "" : tools[v.Pow][v.Aoi] = [];
    tools[v.Pow][v.Aoi].push(v)
  });
  toolList = tools
  console.log(toolList)
}

// function getToolsonCard(cardName,aTools,stage){
// //return array of tools refered to card.
// var aRtn =[]
// //console.log(cardName,aTools)
//   //loop through tools loop for 
//  $.each(aTools,function(i,v){
//     console.log(v.Pow)


//  });
// }

function lookup(value, array, lucol, rcol) {//lookup in array 
  //could use arrow function ...find
  out = "";
  $.each(array, function (i, v) {
    if (v[lucol] === value) { out = v[rcol] };
  });
  return out;
}

var aContent = []; //card array


function getBoard() {

  $.getJSON("js/trello2.json", function (data) {

    // console.log(data)
    //list columns

    var tabs = "<ul class='nav nav-tabs no-print'>"
    $.each(data.lists, function (i, v) {
      // console.log(v)
      aContent.push({ "stage": i, "stageName": v.name, "stageCode": v.id, decisions:[], instructions: [], experience: [], skills: [], cards: [] });   //make stage entry in content array

      tabs += "<li class='nav-item'>"
      tabs += "<a class='nav-link' aria-current='page' href='#' data-bs-toggle='tab' data-bs-target='#contenttab" + i + "'>" + v.name + "</a>"
      tabs += "</li>"
    });//end each;

    tabs += "</ul>"
    $("#lists").append(tabs)

    //labels

    //loop through all cards and place card in correct array..
    $.each(data.cards, function (i, v) {
      v.idListname = lookup(v.idList, data.lists, "id", "name")
      let index = aContent.findIndex((item) => item.stageName === v.idListname);

      switch (v.name) {
        case "Learning from Experience":
          aContent[index].experience.push(v)
          break;
        case "Skills, Relationships, Responsibilities Matrix":
          aContent[index].skills.push(v)
          break;
        case "Decision Points":
          aContent[index].decisions.push(v)
        break;
        default:
          v.name.includes("Instructions") ? aContent[index].instructions.push(v) : aContent[index].cards.push(v);
      }
    });

    var tabsContent = '<div class="tab-content" id="nav-tabContent">';
    //write out into a div that can be navigated
    $.each(aContent, function (i, v) {
      //console.log(v)

      tabsContent += '<div class="tab-pane fade m-3 " id="contenttab' + v.stage + '" role="tabpanel" aria-labelledby="nav-home-tab">'
      //stage header
      tabsContent += '<div class="card mb-3"><h3 class="card-header red">' + v.stageName + '</h3>'
      tabsContent += '<div class="card-body">'
      $.each(v.instructions, function (n, instr) { tabsContent += "<p>" + instr.desc + "</p>" })
      $.each(v.experience, function (n, instr) { tabsContent += "<p>" + instr.desc.replace(new RegExp('\r?\n', 'g'), '<br>') + "</p>" })
      $.each(v.skills, function (n, instr) { tabsContent += "<p>" + instr.desc + "</p>" })
      tabsContent += "<h5 class='card-title'>" + "Case Studies" + "</h5>"
      tabsContent += "<p>This list should contian case studies that have information relevant to this stage - This will need to be captured in the case study data</p>"
      tabsContent += "<ul><li>Case study 1</li><li>Case study 2</li><li>Case study 3</li></ul>"
      tabsContent += "<h5 class='card-title'>" + "Roles" + "</h5>"
      tabsContent += "<p>This table will have a list of roles required at each stage. These will aggregate up from the card data </p>"
      tabsContent += "<table class='table'>"
      tabsContent +="<tr><th>Activity Card</th><th>Role 1</th><th>Role 2</th><th>Role 3</th><th>Role 4</th><th>Role 5</th><th>Role 6</th></tr>"

      $.each(v.cards, function (j, w) {
        tabsContent +="<tr><td><a href='#"+encodeURI(w.name)+"'>"+ w.name +"</a></td><td>3</td><td>3</td><td>1</td><td>0</td><td>2</td><td>2</td></tr>"
      });
      tabsContent +="</table>"
      tabsContent += '</div></div>'//stage header

      //content cards
      tabsContent += '<div class="row row-cols-1 row-cols-md-2 g-4">'

      $.each(v.cards, function (j, w) {
        //console.log(w.name)
        tabsContent += '<div class="col">'
        tabsContent += '<div class="card">'
        tabsContent += '<h5 class="card-header red"><a name="'+encodeURI(w.name)+'"></a>' + w.name + '</h5>'

        tabsContent += '<ul class="pipelist">'
        $.each(w.labels, function (k, label) {
          tabsContent += '<li >' + label.name + '</li>'
        });//labels
        tabsContent += '</ul>'
        tabsContent += '<div class="card-body">'
        tabsContent += w.desc
       // tabsContent += '<h5 class="card-title p-2">Tools</h5>'
        $.each(toolList[w.name], function (l, aTool) {
          tabsContent += '<h5 class="card-title p-2">' + l + '</h5>'
          $.each(aTool, function (t, tool) {
            tabsContent += '<span class="list-group-item"><strong>'+tool.Org +'</strong> | <a href="' + tool.Link + '">' + tool.Name + '</a> | ' + tool.Type + '<br>' + tool.Summary + '</span>'
          });
        });


        // $.each(toolList[w.name],function(l,tool){//find tools that belong here 

        //   console.log(tool)
        //   tabsContent += '<h5 class="card-title p-2">'+'""'+'</h5>'
        //   tabsContent += '<span class="list-group-item"><a href="'+tool.Link+'">'+tool.Name+'</a></span>'
        // })
        tabsContent += '</div>'//body
        tabsContent += '</div>'//card
        tabsContent += '</div>'//col
      });
      tabsContent += '</div>'//wrap
      tabsContent += '</div>'//content tab



    });
    tabsContent += "</div>";//end all
    //writeout

    $("#lists").append(tabsContent)
    // 


  });

}
