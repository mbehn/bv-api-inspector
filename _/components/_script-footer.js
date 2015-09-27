            $.getJSON('apikeys.json', function(apiKeys) {
            var clients = []
            var prodPasskey = []
            var stgPasskey =[]
            $.each(apiKeys.Results, function(c, client) {
                clients.push(apiKeys.Results[c].clientName);
                prodPasskey.push(apiKeys.Results[c].prodPasskey);
                prodPasskey.push(apiKeys.Results[c].stgPasskey);
            })
            $("#client-name").autocomplete({
                source: clients
            });
            $("#client-name").keydown(function() {

                var selectedClient = $("#client-name").val();
                $.each(apiKeys.Results, function(cn, clientname) {
                    if (selectedClient == apiKeys.Results[cn].clientName) {
                        document.getElementById('apikey').value = apiKeys.Results[cn].prodPasskey
                        document.getElementById('stgapikey').value = apiKeys.Results[cn].stgPasskey
                        document.getElementById('cluster').innerHTML = apiKeys.Results[cn].cluster
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
          if ($("#staging-flag").attr('checked')) {
            var apihost = 'http://stg.api.bazaarvoice.com/data';
            var passkey = document.getElementById('stgapikey').value;
        } else {
            var apihost = 'http://api.bazaarvoice.com/data';
            var passkey = document.getElementById('apikey').value;
        }
            // var currentApiKey = document.getElementById('apikey').value;
            $.getJSON(apihost + '/products.json?passkey=' + passkey + '&apiversion=5.4&filter=isactive:eq:true&limit=100', function(productAutoFill) {
                var productName
                var productNameArray = [];
                var productIdArray = [];
                $.each(productAutoFill.Results, function(p, product) {
                    if (!productAutoFill.Results[p].Name) {
                        productName = "No Product Name" + ' - ' + productAutoFill.Results[p].Id;
                        productNameArray.push(productName);
                    }
                    if (productAutoFill.Results[p].Name) {
                        productNameArray.push(productAutoFill.Results[p].Name);
                    }                  
                })
                if (productAutoFill.TotalResults > 100) {
                  $.getJSON(apihost + '/products.json?passkey=' + passkey + '&apiversion=5.4&filter=isactive:eq:true&limit=100&offset=100', function(productAutoFill){
                    $.each(productAutoFill.Results, function(p, product) {
                      if (!productAutoFill.Results[p].Name) {
                        productName = "No Product Name" + ' - ' + productAutoFill.Results[p].Id;
                        productNameArray.push(productName);
                    }
                    if (productAutoFill.Results[p].Name) {
                        productNameArray.push(productAutoFill.Results[p].Name);
                    }                  
                    })
                  })
                }
                if (productAutoFill.TotalResults > 200) {
                  $.getJSON(apihost + '/products.json?passkey=' + passkey + '&apiversion=5.4&filter=isactive:eq:true&limit=100&offset=100', function(productAutoFill){
                    $.each(productAutoFill.Results, function(p, product) {
                      if (!productAutoFill.Results[p].Name) {
                        productName = "No Product Name" + ' - ' + productAutoFill.Results[p].Id;
                        productNameArray.push(productName);
                    }
                    if (productAutoFill.Results[p].Name) {
                        productNameArray.push(productAutoFill.Results[p].Name);
                    }                   
                    })
                  })
                }
                if (productAutoFill.TotalResults > 300) {
                  $.getJSON(apihost + '/products.json?passkey=' + passkey + '&apiversion=5.4&filter=isactive:eq:true&limit=100&offset=100', function(productAutoFill){
                    $.each(productAutoFill.Results, function(p, product) {
                      if (!productAutoFill.Results[p].Name) {
                        productName = "No Product Name" + ' - ' + productAutoFill.Results[p].Id;
                        productNameArray.push(productName);
                    }
                    if (productAutoFill.Results[p].Name) {
                        productNameArray.push(productAutoFill.Results[p].Name);
                    }                   
                    })
                  })
                }
                if (productAutoFill.TotalResults > 400) {
                  $.getJSON(apihost + '/products.json?passkey=' + passkey + '&apiversion=5.4&filter=isactive:eq:true&limit=100&offset=100', function(productAutoFill){
                    $.each(productAutoFill.Results, function(p, product) {
                      if (!productAutoFill.Results[p].Name) {
                        productName = "No Product Name" + ' - ' + productAutoFill.Results[p].Id;
                        productNameArray.push(productName);
                    }
                    if (productAutoFill.Results[p].Name) {
                        productNameArray.push(productAutoFill.Results[p].Name);
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
            if ($("#staging-flag").attr('checked')) {
                var apihost = 'http://stg.api.bazaarvoice.com/data';
                var passkey = document.getElementById('stgapikey').value;
            } else {
                var apihost = 'http://api.bazaarvoice.com/data';
                var passkey = document.getElementById('apikey').value;
            }
            // var currentApiKey = document.getElementById('apikey').value;
            $.getJSON(apihost + '/products.json?passkey=' + passkey + '&apiversion=5.4&filter=name:eq:' + encodeURIComponent(document.getElementById('product-name').value), function(productAutoFill) {
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
            document.getElementById('stgapikey').value = '';
            document.getElementById('cluster').innerHTML = '';
        });

function appendCDV(){
    $('.context-data-question .submissionid').append(option.value)
}