// Declare months and year
var dynamic_year = [2007, 2008, 2009, 2010]; 
var dynamic_unemployment = [5, 7.5, 10, 12.5, 15, 17.5, 20, 22.5, 25];


//Population Scale
var population_scale = 10000;

//Co-ordinates for placing local min-max in Y direction

var local_miny = 0;
var local_maxy = 0;


// Implicit global declarations
var mm_year= 2007;
var mm_unemployment = 5;
var navg = 0;
var county = [];
var viz_final = [];
var viz_set = [];
var county_names = [];
var meal_count = [];
var texture_county = [];
var education_county = [];

var largest=67;
var smallest=11;
var diff = largest - smallest;

// global variables added by slankas to store results of data loads
var countyMapShapeData;
var foodData;
var csvPopulationData;
var textureData

// global variables tied to d3 objects for the map and legend
var svg; 
var svg_legend;	   
var counties;
var texcounties;
var path;
var pro;
var local_minval;
var local_maxval;

//Local max and min variable for legends

var max_value = 0;
var min_value = 99999;

var x = 0;




function initializeVisualization() {
	loadRemoteData();
        detectIE();
}

function detectIE() {
    var tag =document.getElementsByTagName('html')[0].className;
    var ver = tag.split(" ");
    if (ver[0].search("ie") != -1) {
        alert("Visualization not supported on this browser. Please upgrade!")
    }
}

// This functions calls and stores the data used for the visualization
// into the variable countyMapShapeData and foodData
// these calls are chained together through their callbacks to load
// data sequentially.  at the last step, initalizeAfterRemoteDataLoad() is called.
function loadRemoteData() {
	d3.csv("food.csv",  function(remoteAggregatedData) {
		foodData = remoteAggregatedData;
		d3.json("nc_county.json", function (shapeData) {
			countyMapShapeData = shapeData; 
			d3.csv("nc_pop.csv", function(csvData) {
				csvPopulationData = csvData;
					d3.csv("edu.csv", function(texData) {
						textureData = texData;
							initalizeAfterRemoteDataLoad();
				});
			});

		});
	});

}

// this is called in the callback of the last load remote data
function initalizeAfterRemoteDataLoad() {
	initializePopulationData();
	initializeSliders();
	initializeMap();
	
	visualization_redraw(2007,5);
}

function initializePopulationData() {
	csvPopulationData.map(function(d) {
		var countyNameUpper = d.name.toUpperCase();
		viz_set[countyNameUpper] = +d.popu;
		county_names.push(countyNameUpper);
		
		
	});
}



function initializeSliders() {
	YUI( { gallery: 'gallery-2011.11.30-20-58' } ).use('gallery-array-slider', function( Y ) {
		  //  Update the slider label and the elevation canvas when the slider is changed
          //
          //  e:  valueChange event struture
		  function update_input_year( e ) {
			this.set( "text", e.newVal );
            visualization_redraw(e.newVal,mm_unemployment);
          }
 
		  //  Definition for tick slider
		  var tick_slider_year = new Y.ArraySlider( {  axis: 'x', value: 2007, values: dynamic_year } );


          //Mainline starts here
		  var tick_lbl_year;				// Reference to tick slider's label
				  
		  tick_lbl_year = Y.one( '#x-tick-lbl_year' );
		  tick_lbl_year.setData( { slider: tick_slider_year } );
		  
		  tick_slider_year.render( '#slider-tick-parent_year' );
		  tick_slider_year.addTickMarks();
		  
		  //  Setup callback when slider's value changes to update slider label
		  //  and elevation canvas
		  
		  tick_slider_year.after( "valueChange", update_input_year, tick_lbl_year );
		  
		  //  Set initial slider label text
		  tick_lbl_year.set( "text", tick_slider_year.getValue());



		  // Second Slider=================================
		  function update_input_month( e ) {
			   this.set( "text", e.newVal.toFixed( 1 ) + "%" );
			  visualization_redraw(mm_year,e.newVal);
		  }

		  //  Definition for tick slider
		  var tick_slider_month = new Y.ArraySlider( {axis: 'x', value: 5, values: dynamic_unemployment } );
		  
		  //  Mainline starts here
		  var tick_lbl_month;				// Reference to tick slider's label
		  
		  tick_lbl_month = Y.one( '#x-tick-lbl_month' );
		  tick_lbl_month.setData( { slider: tick_slider_month } );
		  
		  tick_slider_month.render( '#slider-tick-parent_month' );
		  tick_slider_month.addTickMarks();
		  
		  //  Setup callback when slider's value changes to update slider label
		  //  and elevation canvas
		  tick_slider_month.after( "valueChange", update_input_month, tick_lbl_month );
		  
		  //  Set initial slider label text
		  tick_lbl_month.set( "text", tick_slider1.getValue().toFixed( 1 ) + "%");
			});   // End of YUI call
} // end of initialize sliders

//
function visualization_redraw(newYear,newUnemp) { 
	mm_year  = newYear;                    
	mm_unemployment = newUnemp;
	
	navg = 0;
	
	county = [];

	viz_final = [];
	county_count = 0;
	
	meal_count = [];
	
	largest=66;
	smallest=11;
	
	min_value = 99999;
	max_value = 0;
	
	texture_county = [];
    education_county = [];
	// map the aggregated data into the Missing Meals / county arrays
	foodData.map(function(d) {
	
			
			if((d.year == mm_year) && (d.UnEmployRate ==mm_unemployment))
			{
			meal_count[d.County.toUpperCase()] = +d.MissingMeals;
			county.push(d.County.toUpperCase());
		   	}
	});
	
	//Initializa texture data
	
	textureData.map(function(d) {
	
	if(d.year == mm_year)
	{
		texture_county[d.County.toUpperCase()] = +d.viz_value;
		education_county[d.County.toUpperCase()] = +d.dnf;
	}
	});
		
	
	
	for (j=0; j< county.length; j++)
{
viz_final[county[j].toUpperCase()] = +(meal_count[county[j].toUpperCase()])/+(viz_set[county[j].toUpperCase()]);

if(max_value < viz_final[county[j].toUpperCase()])
 max_value = viz_final[county[j].toUpperCase()];
 
 if(min_value > viz_final[county[j].toUpperCase()])
 min_value = viz_final[county[j].toUpperCase()];

}

	
	t1= new Date();
	
	counties.selectAll("path")
				    .data(countyMapShapeData.features)
	                .attr('transform','rotate(10)translate(-2850,-1250)scale(5,5)')
                    .attr("d", path)
					.style("fill", function(d) { 
						x++; if( x == 100) { t2 = new Date(); }
						if (viz_final[d.properties.NAME.toUpperCase()] >= smallest)
						{
						
						return (d3.rgb(   213 + ((10/(diff))*(viz_final[d.properties.NAME.toUpperCase()]-smallest)),192 - ((178/(diff))*(viz_final[d.properties.NAME.toUpperCase()]-smallest)),192 - ((178/(diff))*(viz_final[d.properties.NAME.toUpperCase()]-smallest))        ));
}
						else return (d3.hsl(360,.05,.5));
						})
                    
					.selectAll("title")
      .text(function(d) { if ( (viz_final[d.properties.NAME.toUpperCase()] < navg) || (viz_final[d.properties.NAME.toUpperCase()] > navg))
	 
return d.properties.NAME + " Missing Meals: " + addc(meal_count[d.properties.NAME.toUpperCase()].toFixed(0)) +" Population: "+ addc(viz_set[d.properties.NAME.toUpperCase()]) + " Missing Meals per Person: "+ addc((viz_final[d.properties.NAME.toUpperCase()]*1.0).toFixed(1));


//Find location to place miny and maxy if there is data
	
	local_miny = 265 - (min_value-11)*4;
	
	local_maxy = 269 - (max_value-11)*4;
	
	local_minval
		.attr('transform', function(d) { return "translate(218," + local_miny + ")"; })
		.text((min_value).toFixed(2)+" Min");
		
	
	local_maxval
		.attr('transform', function(d) { return "translate(218," + local_maxy + ")"; })
		.text((max_value).toFixed(2)+" Max");

});

	texcounties.selectAll("path")
				    .data(countyMapShapeData.features)
	                .attr('transform','rotate(10)translate(-2850,-1250)scale(5,5)')
                    .attr("d", path)
					.style("fill", function(d) {
					
					if (viz_final[d.properties.NAME.toUpperCase()] >= smallest) 
					return 'url(#blur)';	
					else return (d3.hsl(360,.05,.5));
					})
					
					.style("opacity",function (d) {return texture_county[d.properties.NAME.toUpperCase()];})
                    
					.selectAll("title")
					.text(function(d) { if ( (viz_final[d.properties.NAME.toUpperCase()] < navg) || (viz_final[d.properties.NAME.toUpperCase()] > navg))
	 
					return d.properties.NAME + " Missing Meals: " + addc(meal_count[d.properties.NAME.toUpperCase()].toFixed(0)) +" Population: "+ addc(viz_set[d.properties.NAME.toUpperCase()]) + " Missing Meals per Person: "+ addc((viz_final[d.properties.NAME.toUpperCase()]*1.0).toFixed(1))+ " Did not finish: "+ education_county[d.properties.NAME.toUpperCase()]+ "%"
						
});

						
}  // end of visualization_redraw function



function initializeMap() {
	svg = d3.select("#visualization")
		    .append("svg")
            .attr("class","map")
            .attr("viewBox","300 0 800 500")
            .call(d3.behavior.zoom()
            .on("zoom", redraw))
            .append("g"); 

    svg_legend = d3.select("#visualization")
	               .append("svg")
                   .attr("class","legend")
                   .call(d3.behavior.zoom()
                   .on("zoom", redraw))
                   .append("g"); 
				   
	var pro =  svg.append("svg:pattern")
	    .attr("id", "blur")
		.attr('x', '2')
		.attr('y', '2')
		.attr('height','1.5')
		.attr('width','1.5')
		.attr("patternUnits","userSpaceOnUse")
	.append("svg:line")
		.attr('id','l1')
		.attr('x1', '0')
		.attr('y1', '0')
		.attr('x2', '0.5')
		.attr('y2', '0.5')
		.style("stroke", "rgb(64,64,64)")
		.style("stroke-width", .2);
		
	 counties = svg.append("g")
    .attr("id", "counties")
	
	
	texcounties = svg.append("g")
    .attr("id", "counties")
	
    path = d3.geo.path();
  

svg_legend.append('svg:text')
		.attr('class', 'notes')
		.attr('transform', 'translate(275, 20)')
		.attr('text-anchor', 'end')
		.attr('font-weight',"bold")
		.attr('font-size',16)
		.text('Missing Meals/Person');		


svg_legend.append('svg:text')
		.attr('class', 'notes')
		.attr('transform', 'translate(195, 45)')
		.attr('text-anchor', 'end')
		.attr('font-size',16)
		.attr('font-weight',"bold")
		.text(largest);


svg_legend.append('svg:text')
		.attr('class', 'notes')
		.attr('transform', 'translate(195, 265)')
		.attr('text-anchor', 'end')
		.attr('font-size',16)
		.attr('font-weight',"bold")
		.text(smallest);
		
svg_legend.append('svg:text')
		.attr('class', 'notes')
		.attr('transform', 'translate(195, 287)')
		.attr('text-anchor', 'end')
		.attr('font-weight',"bold")
		.attr('font-size',16)
		.text("No Data");

local_minval = svg_legend.append('svg:text')
		.attr('class', 'notes')
		.attr('text-anchor', 'start')
		.attr('font-size',14);
	
local_maxval = svg_legend.append('svg:text')
		.attr('class', 'notes')
		.attr('text-anchor', 'start')
		.attr('font-size',14);
		
svg_legend.selectAll("rect1")
		.data(d3.range(largest,smallest, -1))
		.enter()
		.insert('svg:rect')
		.attr('x', 1)
		.attr('y', function (d, i) {
			return i *4;
		})
		.attr('width', 10)
		.attr('height', 5)
		.style('fill', function (d, i) {
			return (d3.rgb(    213 + ((10/(diff))*(d-smallest)),192 - ((178/(diff))*(d-smallest)),192 - ((178/(diff))*(d-smallest))        ));

		})
	.attr('transform','translate(200,40)')
		
		.append("title")
        .text(function(d) { return d; });
	  
	svg_legend.selectAll("rect2")
		.data(d3.range(1, 0.09, -0.01))
		.enter()
		.insert('svg:rect')
		.attr('x', 1)
		.attr('y', function (d, i) {
			return i * 0.08;
		})
		.attr('width', 10)
		.attr('height', 5)
		.style('fill', function (d, i) {
			return d3.hsl(360, 0.05, 0.5)
		})
		.attr('transform','translate(200,275)');
		
	
	svg_legend.append('svg:text')
		.attr('class', 'notes')
		.attr('transform', 'translate(300, 365)')
		.attr('text-anchor', 'end')
		.attr('font-weight',"bold")
		.attr('font-size',16)
		.text("High School Graduates");
		
	svg_legend.append('svg:text')
		.attr('class', 'notes')
		.attr('transform', 'translate(250, 385)')
		.attr('text-anchor', 'end')
		.attr('font-weight',"bold")
		.attr('font-size',16)
		.text("High");
		
	svg_legend.append('svg:text')
		.attr('class', 'notes')
		.attr('transform', 'translate(245, 470)')
		.attr('text-anchor', 'end')
		.attr('font-weight',"bold")
		.attr('font-size',16)
		.text("Low");
	
        var pro1 =  svg.append("svg:pattern")
	    .attr("id", "blur1")
		.attr('x', '2')
		.attr('y', '2')
		.attr('height','1.5')
		.attr('width','1.5')
		.attr("patternUnits","userSpaceOnUse")
	.append("svg:line")
		.attr('id','l1')
		.attr('x1', '0')
		.attr('y1', '0')
		.attr('x2', '0.7')
		.attr('y2', '0.7')
		.style("stroke", "rgb(64,64,64)")
		.style("stroke-width", .4);
	
	svg_legend.selectAll("textures")
		.data(d3.range(0,1.1, 0.1))
		.enter()
		.insert('svg:rect')
		.attr('x', 2)
		.attr('y', function (d) {
			return d*18;
		})
		.attr('width', 4)
		.attr('height', 2)
		.style('fill', 'url(#blur1)')
		.style('opacity', function(d) { return d; })
		.attr('transform','translate(170,370)scale(5,5)')
		.append("title")
		.text(function(d) { return d; });
		
	/*	svg_legend.selectAll("clusters")
		.data(d3.range(3, 25, 2))
		.enter()
		.insert('svg:circle')			
		.attr("cx", 2)
		.attr("cy", function (d) { return d*12;})
		.attr("r", function (d) { return d;})
		.style("opacity", 0.8)
		.style("fill", function() {
				return d3.rgb(196, 196, 14);
			})
		.attr('transform','translate(23,180)');
		
		svg_legend.selectAll("alerts_points")
		.data(d3.range(0,1, 0.01))
		.enter()
		.insert('svg:rect')
		.attr('x', 1)
		.attr('y', function (d) {
			return d*100;
		})
		.attr('width', 10)
		.attr('height', 20)
		.style("opacity", function(d) {
						return d/10;
					})
		.style("fill", function(d) {
				return d3.rgb(196, 255, 14 + (241 * d) );
					})
		.attr('transform','translate(100,400)')
		.append("title")
      .text(function(d) { return d; }); */
	
	counties.selectAll("path")
			    .data(countyMapShapeData.features)
				.enter().append("path")
				.attr('transform','rotate(10)translate(-2850,-1250)scale(5,5)')
				.attr("d", path)
				.style("fill", function(d) { return (d3.hsl(360,.05,.5))} ) 
				.append("title")
				.text(function(d) { if ( (viz_final[d.properties.NAME.toUpperCase()] < navg) || (viz_final[d.properties.NAME.toUpperCase()] > navg)) 
				
				return d.properties.NAME + " Missing Meals: " + addc(meal_count[d.properties.NAME.toUpperCase()].toFixed(0)) +" Population: "+ addc(viz_set[d.properties.NAME.toUpperCase()]) + " Missing Meals per Person: "+ addc((viz_final[d.properties.NAME.toUpperCase()]*1.0).toFixed(1));
				});

	
				
	texcounties.selectAll("path")
			    .data(countyMapShapeData.features)
				.enter().append("path")
				.attr('transform','rotate(10)translate(-2850,-1250)scale(5,5)')
				.attr("d", path)
				.style("fill", function(d) { return (d3.hsl(360,.05,.5))} ) 
				.append("title")
				.text(function(d) { if ( (viz_final[d.properties.NAME.toUpperCase()] < navg) || (viz_final[d.properties.NAME.toUpperCase()] > navg)) 
				
				return d.properties.NAME + " Missing Meals: " + addc(meal_count[d.properties.NAME.toUpperCase()].toFixed(0)) +" Population: "+ addc(viz_set[d.properties.NAME.toUpperCase()]) + " Missing Meals per Person: "+ addc((viz_final[d.properties.NAME.toUpperCase()]*1.0).toFixed(1));
				});
				
}

function redraw() {
  counties.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
  
  texcounties.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}
		
//Adds Commas in big numbers, kept for use in later stages		
function addc(nStr)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

//To find unique values for tick slider (month and year)
Array.prototype.unique =
  function() {
    var a = [];
    var l = this.length;
    for(var i=0; i<l; i++) {
      for(var j=i+1; j<l; j++) {
        // If this[i] is found later in the array
        if (this[i] === this[j])
          j = ++i;
      }
      a.push(this[i]);
    }
    return a;
  };
  
//Input to sort function to sort in ascending order
function sortfunc(a,b) {
	return a - b;
}
