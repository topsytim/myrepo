(function Avaana(args) {
	if (args && args.business_slug && args.business_token) {
		var button = document.createElement('a');
		button.href = "https://" + args.business_slug + ".avaana.com.au/step1?business_slug=" + args.business_slug + "&business_token=" + args.business_token;
		button.innerHTML = args.text || 'Book Online';
		args.style && (button.style.cssText = args.style);
		args.class && (button.className = args.class);
		document.querySelector(args.parent_name || 'body').append(button);
	} else {
		console.error("%c Failed to execute, business_slug and business_token required.", );
	}
})({
	"class": "class_name", //this is class name which is already available in css
	'style': "display:inline-block;padding:10px;text-align:center;text-decoration:none;background:#00bd71!important;color:#FFF;", // this is you custom css you want to implement over this button
	"text": "Book Online", //this is dynamic button text
	"business_slug": "pivotal-health-and-fitness", //this is subdomain
	"business_token": "dynamic business_token", //this is used to authenticate business
	"parent_name": "body", //this is container where button will be inserted body will be default

});
