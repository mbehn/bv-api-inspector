function renderFields() {
    $("#product-info, #fields, #category-info, #product-header, #review-stats-info").empty();
    // $("#fields").empty();
    var env
    if ($("#staging-flag").attr('checked')) {
        var apihost = 'http://stg.api.bazaarvoice.com/data';
    } else {
        var apihost = 'http://api.bazaarvoice.com/data';
    }
    var passkey = document.getElementById('apikey').value;
    var productid = document.getElementById('productid').value;
    var displayCode = document.getElementById('display-code').value;
    if (!productid) {
        var productid = 'test1'
    }
    $.getJSON(apihost + '/submitreview.json?passkey=' + passkey + '&apiversion=5.4&productid=' + productid + '&displaycode=' + displayCode + '&userid=mbehntest1234&callback=?', function(json) {
        // console.log(json);
        if (json.HasErrors == true) {
            alert(json.Errors[0].Code);
        }
        var currentFieldNumber = 1;
        var ratingsSearch = []
        var cdvSearch = []
        $.each(json.Data.Fields, function(i, field) {
            var currentField = document.createElement("div");
            currentField.id = json.Data.Fields[i].Id;
            currentField.className = "field";
            if (json.Data.Fields[i].Type == "IntegerInput") {
                $(currentField).addClass("rating");
                var fieldLabel = json.Data.Fields[i].Label;
                if (fieldLabel == null) {
                    fieldLabel = "No Label Available"
                }
                ratingsSearch.push("Id: " + json.Data.Fields[i].Id + " - Label: " + json.Data.Fields[i].Label);
            }
            if (json.Data.Fields[i].Type == "SelectInput") {
                $(currentField).addClass("context-data-question");
                cdvSearch.push("Id: " + json.Data.Fields[i].Id + " - Label: " + json.Data.Fields[i].Label)
            }
            $("#fields").append(currentField);
            $(currentField).append('<h4>Submission Field</h4>' +
                '<li class="field-info required">Required: ' + json.Data.Fields[i].Required + '</li>' +
                '<li class="field-info bv-label">Label: ' + json.Data.Fields[i].Label + '</li>' +
                '<li class="field-info submissionid">Submission ID: ' + json.Data.Fields[i].Id + '</li>' +
                '<li class="field-info type">Type : ' + json.Data.Fields[i].Type + '</li>')
            if ((json.Data.Fields[i].Type == "TextInput") || (json.Data.Fields[i].Type == "TextAreaInput")) {
                $(currentField).append('<li class="field-info MinLength">MinLength : ' + json.Data.Fields[i].MinLength + '</li>' +
                    '<li class="field-info MaxLength">MaxLength : ' + json.Data.Fields[i].MaxLength + '</li>'
                )
            }
            if (json.Data.Fields[i].Type == "SelectInput") {
                var options = document.createElement("select");
                options.id = json.Data.Fields[i].Id + "_options"
                options.className = "options form-control";
                $(currentField).append(options);
                $(options).append('<h4>Options</h4>')
                $.each(json.Data.Fields[i].Options, function(o, option) {
                    $(options).append('<option class="option form-control">Submission ID ' + json.Data.Fields[i].Options[o].Value + ' - Label: ' + json.Data.Fields[i].Options[o].Label + '</option>')
                })
            }
        })
        $(".context-data-question").each(function(i, cdv) {
            $(this).parent().prepend(this);
            $("#ratings-search").autocomplete({
                source: ratingsSearch.sort()
            })
            $("#cdv-search").autocomplete({
                source: cdvSearch.sort()
            })
            $("#ratings-search").on("click", "blur", "keydown", (function() {
                var selectedRating = $("#ratings-search").val();
            }))
        });
    })
    $.getJSON(apihost + '/products.json?passkey=' + passkey + '&apiversion=5.4&filter=id:eq:' + productid + '&callback=?&include=categories&filter_Reviews=issyndicated:eq:true&stats=reviews', function(productsjson) {
        // console.log(productsjson);
        var productInfo = document.createElement("div");
        productInfo.className = "product";
        //Set Variables
        var productImageUrl, productPageUrl, productId, productName, productUPCs, productDescription, categoryName, categoryUrl
        if (!productsjson.Results[0].ImageUrl) {
            productImageUrl = 'images/no_image_avaliable.png';
        } else if (productsjson.Results[0].ImageUrl) {
            productImageUrl = productsjson.Results[0].ImageUrl;
        }
        if (!productsjson.Results[0].ProductPageUrl) {
            productPageUrl = "#No_Product_URL";
        } else if (productsjson.Results[0].ProductPageUrl) {
            productPageUrl = productsjson.Results[0].ProductPageUrl;
        }
        if (!productsjson.Results[0].Name) {
            productName = "No Product Name Provided";
        } else if (productsjson.Results[0].Name) {
            productName = productsjson.Results[0].Name;
        }
        if (!productsjson.Results[0].Id) {
            productId = "No Product ID Provided";
        } else if (productsjson.Results[0].Id) {
            productId = productsjson.Results[0].Id;
        }
        if (!productsjson.Results[0].Description) {
            productDescription = "No product description provided"
        } else if (productsjson.Results[0].Description) {
            productDescription = productsjson.Results[0].Description;
        }
        if (!productsjson.Results[0].UPCs) {
            productUPCs = "No UPCs provided";
        } else if (productsjson.Results[0].UPCs) {
            productUPCs = productsjson.Results[0].UPCs
        }
        var EANs = productsjson.Results[0].EANs
        var categoryId = productsjson.Results[0].CategoryId
        var productRatings = []

        // var categoryid=productsjson.Results[0].CategoryId;
        $(  "#product-info").append('<tr><td class="productname">Product Name: </td><td><a href="' + productPageUrl + '" target="_blank"><h1 id="product-name">' + productName + '</td></tr></a>' +
                                      '<tr><td class="productid" >Product ID: </td><td><code>' + productId + '</code></td></tr>'
            )
        if (productUPCs) {
            $.each(productUPCs, function(u, upcs) {
                $("#product-info").append('<tr><td class="upc">UPC: </td><td><code>' + productUPCs[u] + '</code></td></tr>');
            })
        }
        if (EANs) {
            $.each(EANs, function(e, eans) {
                $("#product-info").append('<tr><td class="upc">EAN: </td><td><code>' + EANs[e] + '</code></td></tr>');
            })
        }
        $("#product-info").append(
            '<tr><td>Description:</td><td>' + productDescription + '</td></tr><br />' +
            '<tr><td>Image URL:</td><td><code>' + productImageUrl + '</code></td></tr><br />' +
            '<tr><td>Image:</td><td><a href = "' + productPageUrl + '" target="_blank"><img id="product-image" src="' + productImageUrl + '" /></a></td></tr><br />' +
            '<tr><td>Product Page URL:</td><td><code>' + productPageUrl + '</code></td></tr><br />' +
            '<tr><td>&nbsp;</td><td>&nbsp;</td></tr>'
        );
        //Get Product Statistics
    $.getJSON(apihost + '/categories.json?passkey=' + passkey + '&apiversion=5.4&filter=id:eq:' + categoryId, function(categoriesjson) {
        console.log(categoriesjson)
        $("#category-info").append('<tr><td>Category Name: </td><td><a href="' + categoriesjson.Results[0].CategoryPageUrl + '" target="_blank">' + categoriesjson.Results[0].Name + '</a></td></tr>' +
                                   '<tr><td>CategoryId: </td><td><code>' + categoriesjson.Results[0].Id + '</code></td></tr>' +
                                   '<tr><td>Category URL: </td><td><code>' + categoriesjson.Results[0].CategoryPageUrl + '</code></td></tr>'
                                    


            )

    })
    })
    $.getJSON(apihost + '/statistics.json?passkey=' + passkey + '&apiversion=5.4&stats=reviews,nativereviews&filter=productid:eq:' + productid, function(statistics) {
            var nativeReviews = statistics.Results[0].ProductStatistics.NativeReviewStatistics.TotalReviewCount;
            if (isNaN(nativeReviews)) {
                nativeReviews = 0
            }
            var avgRatingNativeReviews = statistics.Results[0].ProductStatistics.NativeReviewStatistics.AverageOverallRating
            var totalReviews = statistics.Results[0].ProductStatistics.ReviewStatistics.TotalReviewCount;
            var avgRatingTotalReviews = statistics.Results[0].ProductStatistics.ReviewStatistics.AverageOverallRating
            var syndicatedReviews = totalReviews - nativeReviews;
            if (!avgRatingNativeReviews) {
                avgRatingNativeReviews = '0';
            }
            if (!avgRatingTotalReviews) {
                avgRatingTotalReviews = '0';
            }
            $("#review-stats-info").append(
                '<tr class="review-statistics"><td >Native Approved Reviews: </td><td>' + nativeReviews + '</td></tr>' +            
                '<tr class="review-statistics"><td >Syndicated Reviews:  </td><td>' + syndicatedReviews + '</td></tr>' +
                '<tr class="review-statistics"><td >Total Reviews: </td><td>' + totalReviews + '</td></tr>' +
                '<tr class="review-statistics"><td >Avg Rating: </td><td><b>' + avgRatingTotalReviews + '</b></td></tr></table>'

            )
        })
    $("#product-content").show()
}



function getProductInformation() {
    if ($("#staging-flag").attr('checked')) {
        var apihost = 'http://stg.api.bazaarvoice.com/data';
    } else {
        var apihost = 'http://api.bazaarvoice.com/data';
    }
    if ($("#secondary-ratings").attr('checked')) {

    }
    var passkey = document.getElementById('apikey').value;
    $("#product-info, #fields, #category-info, #product-header, #review-stats-info").empty();
    $.getJSON(apihost + '/products.json?passkey=' + passkey + '&apiversion=5.4&callback=?&include=categories&limit=100&filter=isactive:eq:true', function(products) {
        $("#product-info").empty();
        $("#fields").empty();
        if (products.HasErrors == true) {
            alert(products.Errors[0].Message);

        }

        $("#product-info").append('<tr><th>ProductId</th><th>ProductName</th></tr>');
        var productArray = products.Results;
        var currentProductNumber = 1
        $.each(productArray, function(i, products) {
            var productPageUrl = productArray[i].ProductPageUrl
            $("#product-info").append('<tr><td class="products-productid" value="' + productArray[i].Id + '"><code><b>' + productArray[i].Id + '</b></code></td><td class="products-product-name"><a href="' + productPageUrl + '" target=_blank>' + productArray[i].Name + '</a></td></tr>');
            currentProductNumber++
        });
    });
}
$.getJSON('prod-apikeys.json', function(apiKeys) {
            var clients = []
            var prodPasskey = []
            $.each(apiKeys.Results, function(c, client) {
                clients.push(apiKeys.Results[c].clientName);
                prodPasskey.push(apiKeys.Results[c].prodPasskey);
            })
            $("#client-name").autocomplete({
                source: clients,
                open: function(){
                    $('#client-name ul.ui-autocomplete').fadeIn('slow')
                }
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

