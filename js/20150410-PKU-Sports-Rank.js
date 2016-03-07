function showGroupComparison(){
	//alert("in js file");
	//var gender = $("#groupCompGender option:selected").val();
	var select = document.getElementById("groupCompGender");
   var index = select.selectedIndex;
   var gender = select.options[index].value;
	//var year = $("#groupCompYear option:selected").text();
	select = document.getElementById("groupCompYear");
	index = select.selectedIndex;
	var year = select.options[index].text;
	//var event = $("#groupCompEvent option:selected").text();
	select = document.getElementById("groupCompEvent");
	index = select.selectedIndex;
	var event = select.options[index].text;
	var chartType = "MSLine";
	if(event.indexOf("米")>=0){
		chartType = "InverseMSLine";
	}
   var file = "/json/PKUSportsRank/group/" + event + "_" + gender + "_" + year + ".json"
	FusionCharts.ready(function(){
		var revenueChart = new FusionCharts({
		type: chartType,
		renderAt: "fushionTestCase",
		width: "700",
		height: "400"
    });    
   revenueChart.setJSONUrl(file);

   revenueChart.render("chartContainer3");
   }); 
		$.getJSON(file, function (data) {
			var myhtml = "";
			myhtml = "<table class=\"table table-bordered table-striped table-hover\" width\"500px\"><tr><td></td>";
			for (var i = 1 ; i < 9; i ++) {
				myhtml += ("<td>第" + i + "名</td>");
			}
			var groups = ['甲组','乙组']
			for (var i = 0; i < 2; i ++) {
				myhtml += "</tr><tr><th>" + groups[i] + "</th>";
				$.each(data.dataset[i].data, function(a, item) {
					var score = parseFloat(item.value);
					var ss = parseFloat(item.value);
					var minu = Math.floor(score/60);
					if (event.indexOf("米") >= 0 && score > 60) {
						ss = minu + "'";
						if( (score - minu * 60) < 10){
							ss  += "0";
						}
						ss +=  (score - minu * 60).toFixed(2);
					}
				myhtml += ("<td>" + ss + "</td>");
			});
			}
			myhtml += ("</tr></table>");
			//alert(myhtml)
			document.getElementById('tableContainer3').innerHTML = myhtml
		})
};


function showyearComparison(){
	var gender = $("#yearCompGender option:selected").val();
	var group = $("#yearCompGroup option:selected").text();
	var event = $("#yearCompEvent option:selected").text();
	var chartType = "MSLine";
	if(event.indexOf("米")>=0){
		chartType = "InverseMSLine";
	}
	
   file = "/json/PKUSportsRank/event/" + event + "_" + gender + "_" + group + ".json"
	FusionCharts.ready(function(){
		var revenueChart = new FusionCharts({
		type: chartType,
		renderAt: "fushionTestCase",
		width: "700",
		height: "400"
    });    
   revenueChart.setJSONUrl(file);

   revenueChart.render("chartContainer2");
   }); 
		$.getJSON(file, function (data) {
			var myhtml = "";
			myhtml = "<table class=\"table table-bordered table-striped table-hover\" width\"500px\"><tr><td></td>";
			for (var i = 1 ; i < 9; i ++) {
				myhtml += ("<td>第" + i + "名</td>");
			}
			var year = [2012,2013,2014,2015];
			for (var i = 0; i < 4; i ++) {
				myhtml += "</tr><tr><th>" + year[i] + "</th>";
				$.each(data.dataset[i].data, function(a, item) {
					var score = parseFloat(item.value);
					var ss = parseFloat(item.value);
					var minu = Math.floor(score/60);
					if (event.indexOf("米") >= 0 && score > 60) {
						ss = minu + "'";
						if( (score - minu * 60) < 10){
							ss  += "0";
						}
						ss +=  (score - minu * 60).toFixed(2);
					}
				myhtml += ("<td>" + ss + "</td>");
			});
			}
			myhtml += ("</tr></table>")
			//alert(myhtml)
			document.getElementById('tableContainer2').innerHTML = myhtml
		})
}
