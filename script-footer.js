function loadProductNames(){if($("#product-name").val(""),$("#apikey").attr("readonly",!0),$("#staging-flag").attr("checked"))var e="http://stg.api.bazaarvoice.com/data",t=document.getElementById("stgapikey").value;else var e="http://api.bazaarvoice.com/data",t=document.getElementById("apikey").value;$.getJSON(e+"/products.json?passkey="+t+"&apiversion=5.4&filter=isactive:eq:true&limit=100",function(s){var a,u=[],o=[];$.each(s.Results,function(e,t){s.Results[e].Name||(a="No Product Name - "+s.Results[e].Id,u.push(a)),s.Results[e].Name&&u.push(s.Results[e].Name)}),s.TotalResults>100&&$.getJSON(e+"/products.json?passkey="+t+"&apiversion=5.4&filter=isactive:eq:true&limit=100&offset=100",function(e){$.each(e.Results,function(t,s){e.Results[t].Name||(a="No Product Name - "+e.Results[t].Id,u.push(a)),e.Results[t].Name&&u.push(e.Results[t].Name)})}),s.TotalResults>200&&$.getJSON(e+"/products.json?passkey="+t+"&apiversion=5.4&filter=isactive:eq:true&limit=100&offset=100",function(e){$.each(e.Results,function(t,s){e.Results[t].Name||(a="No Product Name - "+e.Results[t].Id,u.push(a)),e.Results[t].Name&&u.push(e.Results[t].Name)})}),s.TotalResults>300&&$.getJSON(e+"/products.json?passkey="+t+"&apiversion=5.4&filter=isactive:eq:true&limit=100&offset=100",function(e){$.each(e.Results,function(t,s){e.Results[t].Name||(a="No Product Name - "+e.Results[t].Id,u.push(a)),e.Results[t].Name&&u.push(e.Results[t].Name)})}),s.TotalResults>400&&$.getJSON(e+"/products.json?passkey="+t+"&apiversion=5.4&filter=isactive:eq:true&limit=100&offset=100",function(e){$.each(e.Results,function(t,s){e.Results[t].Name||(a="No Product Name - "+e.Results[t].Id,u.push(a)),e.Results[t].Name&&u.push(e.Results[t].Name)})}),$("#product-name").autocomplete({source:u.sort()})}),$("#product-name").attr("placeholder","Products loaded")}function loadProductId(){if($("#staging-flag").attr("checked"))var e="http://stg.api.bazaarvoice.com/data",t=document.getElementById("stgapikey").value;else var e="http://api.bazaarvoice.com/data",t=document.getElementById("apikey").value;$.getJSON(e+"/products.json?passkey="+t+"&apiversion=5.4&filter=name:eq:"+encodeURIComponent(document.getElementById("product-name").value),function(e){$("#productid").val(e.Results[0].Id)})}function appendCDV(){$(".context-data-question .submissionid").append(option.value)}$.getJSON("apikeys.json",function(e){var t=[],s=[],a=[];$.each(e.Results,function(a,u){t.push(e.Results[a].clientName),s.push(e.Results[a].prodPasskey),s.push(e.Results[a].stgPasskey)}),$("#client-name").autocomplete({source:t}),$("#client-name").keydown(function(){var t=$("#client-name").val();$.each(e.Results,function(s,a){t==e.Results[s].clientName&&(document.getElementById("apikey").value=e.Results[s].prodPasskey,document.getElementById("stgapikey").value=e.Results[s].stgPasskey,document.getElementById("cluster").innerHTML=e.Results[s].cluster)})})}),$("#custom-id").click(function(){$("#productid").val(""),$("#productid").attr("readonly",!1)}),$("#custom-apikey").click(function(){$("#apikey").val(""),$("#apikey, #stgapikey").attr("readonly",!1)}),$(".products-productid").click(function(){document.getElementById("productid").value=this.value}),$("#clear").click(function(){$("#fields-link").html("Show available review submission fields for: "),$("#product-content").hide(),$("#product-info, #fields, #category-info, #product-header, #review-stats-info").empty(),document.getElementById("client-name").value="",document.getElementById("apikey").value="",document.getElementById("product-name").value="",document.getElementById("productid").value="",document.getElementById("product-name").placeholder="",document.getElementById("stgapikey").value="",document.getElementById("cluster").innerHTML=""}),$("#staging-flag").change(function(){this.checked?$("#staging-indiicator").css("opacity","1"):$("#staging-indiicator").css("opacity","0")});