function compareProducts() {
	$("#source-results").empty();
    $("#destination-results").empty();
	var sourceClient,destinationClient,sourcePasskey,destinationPasskey,sourceProductId,DestinationProductId,sourceUPCs,DestinationUPCs,sourceEANs,destinationEANs,combinedUPCs,combinedEANs
	sourceClient = $("#source-client").val();
	destinationClient = $("#destination-client").val();
	sourcePasskey = $("#source-apikey").val();
	sourceProductId = $("#source-productid").val();
	destinationPasskey = $("#destination-apikey").val();
	destinationProductId = $("#destination-productid").val();

	var upcWarn = 'No UPC data';
	var eanWarn = 'No EAN data';

	$.getJSON('http://api.bazaarvoice.com/data/products.json?passkey=' + sourcePasskey + '&apiversion=5.4&filter=id:eq:' + sourceProductId , function(sourceData) {
		if (sourceData.TotalResults == 0) {
			$("#source-results").append('<h2>Source ProductId not found</h2>');
			console.log('Could not find source product')
		}
		if (sourceData.Results[0].UPCs) {
				$("#source-results").append('<br /><tr><td><b>Source: ' + sourceClient + ' - </b></td><td><span><a href="' + sourceData.Results[0].ProductPageUrl + '" target="_blank">' + sourceData.Results[0].Name + '</a></span></td></tr><br />');
				//set sourceUPCs array
				sourceUPCs = sourceData.Results[0].UPCs;
			$.each(sourceUPCs, function(su, supcs){
				$("#source-results").append('<tr><td>UPC: ' + sourceUPCs[su] + '</td><td>&nbsp;</td></tr>'
					);
			})
			console.log(sourceUPCs)
		}
		if (sourceData.Results[0].UPCs.length == 0) {
			$("#source-results").append('<tr><td>' + upcWarn + '</td><td>&nbsp;</td></tr>'
					);
			console.log(upcWarn);
		}
		if (sourceData.Results[0].EANs) {
			sourceEANs = sourceData.Results[0].EANs;
			$.each(sourceEANs, function(se, seans ){
				$("#source-results").append('<tr><td>EAN: ' + sourceEANs[se] + '</td><td>&nbsp;</td></tr>'
				)
			})
			console.log(sourceEANs);
		}
		if (sourceData.Results[0].EANs.length == 0) {
			$("#source-results").append('<tr><td>' + eanWarn + '</td><td>&nbsp;</td></tr>'
				)
			console.log(eanWarn);
		}
	})
	$.getJSON('http://api.bazaarvoice.com/data/products.json?passkey=' + destinationPasskey + '&apiversion=5.4&filter=id:eq:' + destinationProductId , function(destinationData) {
		if (destinationData.TotalResults == 0) {
			$("#destination-results").append('<h2>Destination ProductId not found</h2>');
			console.log('Could not find destination product')
		}
		if (destinationData.Results[0].UPCs) {
				$("#destination-results").append('<br /><tr><td><b>Destination: ' + destinationClient + ' - </b></td><td><span><a href="' + destinationData.Results[0].ProductPageUrl + '" target="_blank">' + destinationData.Results[0].Name + '</a></span></td></tr><br />' );
				//set sourceUPCs array
				destinationUPCs = destinationData.Results[0].UPCs;
			$.each(destinationUPCs, function(du,dupcs){
				$("#destination-results").append('<tr><td>UPC: ' + destinationUPCs[du] + '</td><td>&nbsp;</td></tr>'
					);
			})
			console.log(destinationUPCs);
		}
		if (destinationData.Results[0].UPCs.length == 0) {
			$("#destination-results").append('<tr><td>' + upcWarn + '</td><td>&nbsp;</td></tr>'
					);
			console.log(upcWarn);
		}
		if (destinationData.Results[0].EANs) {
			destinationEANs = destinationData.Results[0].EANs;
			$.each(destinationEANs, function(de, deans){
				$("#destination-results").append('<tr><td>EAN: ' + destinationEANs[de] + '</td><td>&nbsp;</td></tr>'
				)
			})
			console.log(destinationEANs);
		}
		if (destinationData.Results[0].EANs.length == 0) {
			$("#destination-results").append('<tr><td>' + eanWarn + '</td><td>&nbsp;</td></tr>'
				)
			console.log(eanWarn);
		}
		if ((sourceUPCs) && (destinationUPCs)) {
			combinedUPCs = (sourceUPCs + destinationUPCs).split(',');
			console.log(combinedUPCs);
		}
		if ((sourceEANs) && (destinationEANs)) {
			combinedEANs = (sourceEANs + destinationEANs).split(',');
			console.log(combinedEANs);
		}
	})
}

function loadSourceProductIds() {
	var currentApiKey = document.getElementById('source-apikey').value;
	$.getJSON('http://api.bazaarvoice.com/data/products.json?passkey=' + currentApiKey + '&apiversion=5.4&limit=100' , function(sourceProductAutoFill) {
		var sourceProductIdArray = [];
		$.each(sourceProductAutoFill.Results, function(sp, sourceProduct){
			sourceProductIdArray.push(sourceProductAutoFill.Results[sp].Id);
		})
		$("#source-productid").autocomplete({
               source: sourceProductIdArray
         })
	})
}
function loadDestinationProductIds() {
	var currentApiKey = document.getElementById('destination-apikey').value;
	$.getJSON('http://api.bazaarvoice.com/data/products.json?passkey=' + currentApiKey + '&apiversion=5.4&limit=100' , function(destinationProductAutoFill) {
		var destinationProductIdArray = [];
		$.each(destinationProductAutoFill.Results, function(dp, destinationProduct){
			destinationProductIdArray.push(destinationProductAutoFill.Results[dp].Id);
		})
		$("#destination-productid").autocomplete({
               source: destinationProductIdArray
         })
	})

}