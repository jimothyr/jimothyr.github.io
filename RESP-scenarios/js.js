let data = {
  LAEP: {
    name: "LAEP",
    scale: 1,
    data: 1,
    time: 1,
    scope: 1,
    approach: 1,
  },
  "LAEP+": {
    name: "LAEP+",
    scale: 2,
    data: 2,
    time: 2,
    scope: 2,
    approach: 2,
  },
  Option3: {
    name: "LAEP+",
    scale: 3,
    data: 2,
    time: 4,
    scope: 2,
    approach: 1,
  },
};

 let sliders = {
    scale: {
      number: 3,
      icon: "https://netzerogo.org.uk/wp-content/uploads/Policy-and-strategy_in-cirlce-1.png",
    },
    data: {
      number: 3,
      icon: "https://netzerogo.org.uk/wp-content/uploads/Strategic-Case_in-cirlce-1.png",
    },
    time: { 
        number: 4,
         icon: "" },
    scope: {
      number: 3,
      icon: "https://netzerogo.org.uk/wp-content/uploads/Management-Case_in-cirlce.png",
    },
    approach: {
      number: 3,
      icon: "https://netzerogo.org.uk/wp-content/uploads/Policy-and-strategy_in-cirlce-1.png",
    },
  };


function widthoffirstcolumn(position, nspaces) {
  var spaces = nspaces * 2; //eg 3 section is 6 spaces
  var posout = position + position - 1;
  return (posout / spaces) * 100;
}

function changeme(val) {


//remove all existing highlights
Array.from(document.getElementsByClassName("box_label_item")).forEach(element => {
   element.classList.remove("box_label_item_highlight")
  });

selectitems("Scalebox","#box_scale",data[val.value].scale,3)
selectitems("Databox","#box_data",data[val.value].data,3)
selectitems("Timebox","#box_time",data[val.value].time,4)
selectitems("Scopebox","#box_scope",data[val.value].scope,3)
selectitems("Approachbox","#box_approach",data[val.value].approach,4)

}

function selectitems(id,iditems,value,number){
   /*Scale*/
  document.getElementById(id).style.width = widthoffirstcolumn(value, number) + "%";
  document.querySelectorAll(iditems)[0].children[value-1].classList.add("box_label_item_highlight");

}