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
});

//Setting up Backbone's routes

var Router = Backbone.Router.extend({
	routes: {
		"index":"index",
		"edit/:id":"edit_product"
	}
});

var router = new Router;

function getProducts() {
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
}

router.on("route:index", getProducts);

router.on("route:edit_product", function(id) {
	$.ajax({
		url: "https://ga-wdi-products-inventory-api.herokuapp.com/products/" + id,
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

//Start Backbone history

Backbone.history.start();

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
			window.location.href = "#index";
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
			$("#add-product-modal").modal("hide");
			getProducts();
		},
		error: function() {
			alert("Something wrong adding a product");
		}
	});
});

$(document).on("click", ".delete-button", function() {
	$.ajax({
		url: "https://ga-wdi-products-inventory-api.herokuapp.com/products/" + $(this).attr("id"),
		type: "DELETE",
		success: function(){
			window.location.href = "#index";
		},
		error: function() {
			alert("everything's ruined");
		}
	});
});




