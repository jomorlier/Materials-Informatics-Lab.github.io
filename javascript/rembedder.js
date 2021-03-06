// Create PCA embeddings in a presentation

$(document).ready( function(){
var margin = {top: 40, right: 40, bottom: 40, left: 40};
w = 440 - margin.left - margin.right;
h = 440 - margin.top - margin.bottom;

$('.rembedder').each(function(){


var d3portal = d3.select(this).select("#embedding");

var pointname = $(this).find("#img-name");
var imageview = $(this).find("#stage img");


var tooltip = d3portal.append("div")
                  .attr("class", "tooltip")
                  .style("opacity", 0);

var svgembed = d3portal.append( "svg" )
        .attr("width", w + margin.left + margin.right)
        .attr("height", h + margin.top + margin.bottom)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")


var gembed = svgembed.append("g")
                  .attr("width", w)
                  .attr("height", h)
                  .attr("fill","black")
                  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                  .append("g")

d3.json( $(this).select("#embed-name").text().trim(), function( error, datain ){


  data = datain

    var colorlim = d3.scale.category10();

    var xscale = d3.scale.linear()
      .domain([d3.min(datain["embed"]["X"], function(d){return parseFloat(d);}) ,
        d3.max(datain["embed"]["X"], function(d){return parseFloat(d);}) ])
      .range([0,w])

    var yscale = d3.scale.linear()
      .domain([d3.min(datain["embed"]["Y"], function(d){return parseFloat(d);}) ,
        d3.max(datain["embed"]["Y"], function(d){return parseFloat(d);}) ])
      .range([0,h])

    gembed.append("g")
      .attr("class","x axis")
      .attr("transform", "translate(0," + yscale(0)+ ")")
      .attr("stroke-width",1.5)
      .attr("opacity",0.7)
      .call( d3.svg.axis().scale(xscale).orient("bottom") )

    gembed.append("g")
      .attr("class","y axis")
      .attr("transform","translate("+ yscale(0)+",0)")
      .attr("stroke-width",1.5)
      .attr("opacity",0.7)
      .call( d3.svg.axis().scale(yscale).orient("right") )


    gembed.selectAll(".dot")
        .data( datain["embed"]["X"] )
        .enter()
        .append("circle")
        .attr("r",10)
        .attr("cx", function( d,i ){
          return xscale( datain["embed"]["X"][i] )
        })
        .attr("cy", function( d,i ){
          return yscale( datain["embed"]["Y"][i] )
        })
        .attr("fill",function( d,i){
          return colorlim( datain["embed"]["C"][i])
        })
        .attr("stroke","black")
        .style("opacity",.7)
        .on("mouseover", function(d,i) {
          tooltip.transition()
          .duration(200)
          .style("opacity", .9);

          if (datain['embed'].hasOwnProperty('name')){
            $(pointname).text(datain["embed"]["name"][i]);
          }
          if (datain['embed'].hasOwnProperty('src')){
          $(imageview).attr("src",datain["embed"]["src"][i]);
        }
        })
        .on("mouseout", function(d) {
          tooltip.transition()
          .duration(500)
          .style("opacity", 0);
          // Place image removing function here;
        })
        .on("click", function(){
          $(this).attr("stroke-width", 3);
        });


}
)
});

});


function ArrangeBootStrap(){

  $('.rembedder').each(function(){
    $(this).find("#embedding").unwrap().wrap('<div class="col-sm-12 col-md-6 col-lg-6"></div>');
    $(this).find(".panel").unwrap().wrap('<div class="col-sm-12 col-md-6 col-lg-6" id="stage">');
  });

  $(".remove").each( function(){
    $(this).remove();
  })

}
/**
tooltip.html(datain["embed"]["src"][i])
.style("left",(d3.event.pageX + 5) + "px")
.style("top", (d3.event.pageY - 28) + "px");
**/
