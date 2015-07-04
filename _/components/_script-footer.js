            $.getJSON('prod-apikeys.json', function(apiKeys) {
            var clients = []
            var prodPasskey = []
            $.each(apiKeys.Results, function(c, client) {
                clients.push(apiKeys.Results[c].clientName);
                prodPasskey.push(apiKeys.Results[c].prodPasskey);
            })
            $("#client-name").autocomplete({
                source: clients
            });
            $("#client-name").keydown(function() {
                var selectedClient = $("#client-name").val();
                $.each(apiKeys.Results, function(cn, clientname) {
                    if (selectedClient == apiKeys.Results[cn].clientName) {
                        document.getElementById('apikey').value = apiKeys.Results[cn].prodPasskey
                            // apiKeys.Results[cn].passkey = $("#apikey").val();
                    }
                })
            })
        })
        $("#custom-id").click(function(){
          $("#productid").val('')
          $("#productid").attr("readonly", false);
        })
        $("#custom-apikey").click(function(){
          $("#apikey").val('')
          $("#apikey").attr("readonly", false);
        })
        $(".products-productid").click(function() {
            document.getElementById("productid").value = this.value
        })
        function loadProductNames() {
          $("#product-name").val('');
          $("#apikey").attr("readonly", true)
            var currentApiKey = document.getElementById('apikey').value;
            $.getJSON('http://api.bazaarvoice.com/data/products.json?passkey=' + currentApiKey + '&apiversion=5.4&filter=isactive:eq:true&limit=100', function(productAutoFill) {
                var productName
                var productNameArray = [];
                var productIdArray = [];
                $.each(productAutoFill.Results, function(p, product) {
                    if (!productAutoFill.Results[p].Name) {
                        productName = "No Product Name" + ' - ' + productAutoFill.Results[p].Id;
                        productNameArray.push(productName);
                    }
                    if (productAutoFill.Results[p].Name) {
                        productNameArray.push(productAutoFill.Results[p].Name.toLowerCase());
                    }                  
                })
                if (productAutoFill.TotalResults > 100) {
                  $.getJSON('http://api.bazaarvoice.com/data/products.json?passkey=' + currentApiKey + '&apiversion=5.4&filter=isactive:eq:true&limit=100&offset=100', function(productAutoFill){
                    $.each(productAutoFill.Results, function(p, product) {
                      if (!productAutoFill.Results[p].Name) {
                        productName = "No Product Name" + ' - ' + productAutoFill.Results[p].Id;
                        productNameArray.push(productName);
                    }
                    if (productAutoFill.Results[p].Name) {
                        productNameArray.push(productAutoFill.Results[p].Name.toLowerCase());
                    }                  
                    })
                  })
                }
                if (productAutoFill.TotalResults > 200) {
                  $.getJSON('http://api.bazaarvoice.com/data/products.json?passkey=' + currentApiKey + '&apiversion=5.4&filter=isactive:eq:true&limit=100&offset=200', function(productAutoFill){
                    $.each(productAutoFill.Results, function(p, product) {
                      if (!productAutoFill.Results[p].Name) {
                        productName = "No Product Name" + ' - ' + productAutoFill.Results[p].Id;
                        productNameArray.push(productName);
                    }
                    if (productAutoFill.Results[p].Name) {
                        productNameArray.push(productAutoFill.Results[p].Name.toLowerCase());
                    }                   
                    })
                  })
                }
                $("#product-name").autocomplete({
                    source: productNameArray.sort()
                })
            })
          
          $("#product-name").attr("placeholder","Products loaded");
        }

        function loadProductId() {
            var currentApiKey = document.getElementById('apikey').value;
            $.getJSON('http://api.bazaarvoice.com/data/products.json?passkey=' + currentApiKey + '&apiversion=5.4&filter=name:eq:' + encodeURIComponent(document.getElementById('product-name').value), function(productAutoFill) {
                $("#productid").val(productAutoFill.Results[0].Id)
            })
        }
            $("#clear").click(function() {
            $("#fields-link").html('Show available review submission fields for: ')
            $("#product-content").hide()
            $("#product-info, #fields, #category-info, #product-header, #review-stats-info").empty();
            // $("#fields").empty();
            document.getElementById('client-name').value = '';
            document.getElementById('apikey').value = '';
            document.getElementById('product-name').value = '';
            document.getElementById('productid').value = '';
            document.getElementById('product-name').placeholder = '';
        });

function appendCDV(){
    $('.context-data-question .submissionid').append(option.value)
}


    