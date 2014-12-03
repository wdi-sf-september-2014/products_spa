var productSource;
var productShowTemplate;
var editProductSource;
var editProductTemplate;

$(document).ready(function() {
	//Product display template
	productSource = $("#show-products-template").html();
	productShowTemplate = Handlebars.compile(productSource);

	//Edit product template
	editProductSource = $("#edit-product-template").html();
	editProductTemplate = Handlebars.compile(editProductSource);


	//Pull all products from the API
	$.ajax({
		url: "https://ga-wdi-products-inventory-api.herokuapp.com/products",
		type: "GET",
		success: function(data) {
			var html = productShowTemplate({productData: data});
			$("#content").html(html);
		},
		error: function() {
			alert("Something went wrong here...");
		}
	});
});

//When user clicks edit button get the product information
//in preparation for editing
$(document).on("click", ".edit-button", function(){
	$.ajax({
		url: "https://ga-wdi-products-inventory-api.herokuapp.com/products/" + $(this).attr("id"),
		type: "GET",
		success: function(data) {
			var html = editProductTemplate(data);
			$("#content").html(html);
		},
		error: function(){
			alert("you have problems man!");
		}
	});
});

$(document).on("click", "#submit-edits", function(){
	$.ajax({
		url: "https://ga-wdi-products-inventory-api.herokuapp.com/products/" + $(this).attr("edit_id"),
		type: "PUT",
		data: { 
			product: {
				title: $("input[name=title]").val(),
				desc: $("input[name=desc]").val(),
				count: $("input[name=count]").val()
			}
		},
		success: function(data) {
			location.reload();
		},
		error: function(){
			alert("Something went wrong...");
		} 
	});
});

$(document).on("click", "#add-product", function(){
	$.ajax({
		url: "https://ga-wdi-products-inventory-api.herokuapp.com/products/",
		type: "POST",
		data: {
			product: {
				title: $("#add-title").val(),
				desc:  $("#add-desc").val(),
				count:  $("#add-count").val()
			}
		},
		success: function(){
			location.reload();
		},
		error: function() {
			alert("Something wrong adding a product");
		}
	});
});
