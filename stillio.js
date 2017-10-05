$(document).on('ready', function() {
	addButtons();
});

var slide,slideTotal,slideCurrent,right,left;

function slideInitial() {
  slide.addClass('proactivede');
  setTimeout(function() {
	slideRight();
  }, 1000);
}

function slideRight() {
  if (slideCurrent < slideTotal) {
	slideCurrent++;
  } else {
	slideCurrent = 0;
  }

  if (slideCurrent > 0) {
	var preactiveSlide = slide.eq(slideCurrent - 1);
  } else {
	var preactiveSlide = slide.eq(slideTotal);
  }
  var activeSlide = slide.eq(slideCurrent);
  if (slideCurrent < slideTotal) {
	var proactiveSlide = slide.eq(slideCurrent + 1);
  } else {
	var proactiveSlide = slide.eq(0);

  }

  slide.each(function() {
	var thisSlide = $(this);
	if (thisSlide.hasClass('preactivede')) {
	  thisSlide.removeClass('preactivede preactive active proactive').addClass('proactivede');
	}
	if (thisSlide.hasClass('preactive')) {
	  thisSlide.removeClass('preactive active proactive proactivede').addClass('preactivede');
	}
  });
  preactiveSlide.removeClass('preactivede active proactive proactivede').addClass('preactive');
  activeSlide.removeClass('preactivede preactive proactive proactivede').addClass('active');
  proactiveSlide.removeClass('preactivede preactive active proactivede').addClass('proactive');
}

function slideLeft() {
  if (slideCurrent > 0) {
	slideCurrent--;
  } else {
	slideCurrent = slideTotal;
  }

  if (slideCurrent < slideTotal) {
	var proactiveSlide = slide.eq(slideCurrent + 1);
  } else {
	var proactiveSlide = slide.eq(0);
  }
  var activeSlide = slide.eq(slideCurrent);
  if (slideCurrent > 0) {
	var preactiveSlide = slide.eq(slideCurrent - 1);
  } else {
	var preactiveSlide = slide.eq(slideTotal);
  }
  slide.each(function() {
	var thisSlide = $(this);
	if (thisSlide.hasClass('proactivede')) {
	  thisSlide.removeClass('preactive active proactive proactivede').addClass('preactivede');
	}
	if (thisSlide.hasClass('proactive')) {
	  thisSlide.removeClass('preactivede preactive active proactive').addClass('proactivede');
	}
  });
  preactiveSlide.removeClass('preactivede active proactive proactivede').addClass('preactive');
  activeSlide.removeClass('preactivede preactive proactive proactivede').addClass('active');
  proactiveSlide.removeClass('preactivede preactive active proactivede').addClass('proactive');
}

var slider_template = '<div class="slider-single"><a class="slider-single-download" href="javascript:void(0);">Download <i class="fa fa-download"></i></a></div>';

function loadScreenshot(data) {
	var json = JSON.parse(data);
	var screenshots = json.screenshots;
	var slider_images="";
	
	$('.slider-content').empty();
	
	for(var i = 0; i < screenshots.length; i++){
		slider_images+='<div class="slider-single" id="slider'+(i)+'"><a class="slider-single-likes" href="javascript:void(0);"></a></div>';
	}
	
	$('.slider-content').append(slider_images);
	
	slide = $('.slider-single');
	slideTotal = slide.length - 1;
	slideCurrent = -1;

	for(var i= 0; i < screenshots.length; i++) {	//for loop parses individual screenshots from json object, appends img tags, download with screenshot href, date created
		var imgSrc = screenshots[i].screenshot_image; //sets paresed images to a variable for reuse
		
		console.log(imgSrc);//checking the obj
		
	image = $('<img id="image'+i+'" class="slider-single-image" alt="" />'); //parses screenshot image from JSON object and sets to variable
	image.attr('src', imgSrc); //adds screenshot image to src attr of <img> tag
	$('#slider'+(i)).append(image); //appends <img> tag to page 

	zoomImage = $('<a class="slider-single-title" target="_blank">Zoom In <i class="fa fa-plus-square"></i></a>');
	zoomImage.attr('href', imgSrc);
	$('#slider'+(i)).append(zoomImage);

	download = $('<a class="slider-single-download" href="" download="">Download <i class="fa fa-download"></i></a>'); //parses image URL from JSON object and sets to variable
	download.attr('href', imgSrc);
	download.attr('download', imgSrc); //adds link to screenshot to href attr of <a> tag as a "zoom" feature
	$('#slider'+(i)).append(download); //appends <a> tag to page and adds href attr with each screenshot URL parsed from JSON to allow user to view zoomed-in version of image	

	var created = screenshots[i].created; //parses date from JSON object and sets to variable
	date = $('<div class="slider-single-likes">'+created+'</div>'); //adds date to download div tag
	$('#slider'+(i)).append(date); //appends date from object to the page next to each image in slider
	}
    left = $('.slider-left');
    right = $('.slider-right');
	
    left.on('click', function() {
      slideLeft();
    });
    right.on('click', function() {
      slideRight();
    });
	slideInitial();
}

var urlIds = []; //empty array for later use in function
function addButtons(){  //adds buttons to page
	var buttons = ['<button id="amazon" class="buttons">Amazon</button>', //button tags in array with unique ids, CSS class and names
	'<button id="ebates" class="buttons">Ebates</button>',
	'<button id="rmn" class="buttons space">RetailMeNot</button>', 
	'<button id="walmart_ebates" class="buttons">Ebates Walmart</button>',
	'<button id="amazon_ebates" class="buttons">Ebates Amazon</button>',
	'<button id="target_ebates" class="buttons">Ebates Target</button>',
	'<button id="babiesrus_ebates" class="buttons">Ebates BabiesRUs</button>',
	'<button id="toysrus_ebates" class="buttons space2">Ebates ToysRUs</button>',
	'<button id="walmart_rmn" class="buttons">RetailMeNot Walmart</button>', 
	'<button id="amazon_rmn" class="buttons">RetailMeNot Amazon</button>', 
	'<button id="target_rmn" class="buttons">RetailMeNot Target</button>'];
	for(i = 0; i < buttons.length-10; i++){//iterates through all <button> tags in buttons array
		$('.buttons-container').append(buttons)//appends each button in array to page
	}
	
	urlIds =[ //key value pair array includes url id's for unique id of each API call
	{url:'146eeac3-4ab2-48db-80d7-df0f1c75c2e0', id:'walmart_ebates'},
	{url: '212e608a-3929-4e65-810e-26fafe796f05', id:'amazon'},
	{url: '3c809f22-13f6-49db-bfd8-63d3df847bb9', id:'babiesrus_ebates'},
	{url: 'f3072ad1-0153-4d15-af6f-e5a0edc24646', id:'toysrus_ebates'},
	{url:'8b1c84a8-3dea-4e05-8f1b-d9aaa0abebeb', id:'amazon_ebates'},
	{url:'26140e33-c0cc-44ca-bb96-cc6dd9bf5eeb', id:'target_ebates'},
	{url: 'a29d2d9c-a087-4d27-8e22-251f525ecff6', id:'walmart'},
	{url: '981313b7-2d2a-47d4-8cdd-54f51ef20e06' , id: 'walmart_rmn'},
	{url: 'b73abc94-d8d0-492d-a12c-0a429b1ab8c8' , id: 'target_rmn'},
	{url: 'db310167-d49f-449c-9910-43b08ec6e6d6' , id: 'amazon_rmn'},
	{url: 'f3f1efae-7710-4bf5-97d4-1d686f840da0' , id: 'rmn'},
	{url: 'fabd06ba-7ead-4978-b3bd-f33f88b8bbfa' , id: 'ebates'}];
	
	for(var i=0; i < urlIds.length; i++) {//loop to append data-api-urlid to buttons
		$('#'+urlIds[i].id).attr('data-api-urlid', urlIds[i].url);//calls url value from each key value pair in array and appends to each button as attr
	}
	
	$('.buttons-container button').on('click', function(e) { getJsonText($(this).attr('data-api-urlid')); });//Apply button listener to all buttons in the button container
}

function getJsonText(api_Url_Ids) { //makes API call, param feeds unique IDs to be appeneded to each button on click and call that unique API
	var proxy = 'https://cors-anywhere.herokuapp.com/'; //proxy allows for CORS requests
	var base = 'https://app.stillio.com/api/screenshots?'; //base Stillio URL
	var apiKey = 'api_token=qi4P5981S1I0JAB3VWJp5KNKviEopedx8Z4HWINjv7LbdNaTbqX5PzE6RSJM&url_id='; //api token
	
	let url = proxy + base + apiKey + api_Url_Ids; //build URL
	console.log(api_Url_Ids);//checking to make sure data-api-urlid is being passed properly
	let options = { //options for API call
		method: 'get',
		headers: { //headers for API call
			'Access-Control-Allow-Origin': '*',
		}
	}

	fetch(url,options) //fetch method calls API
	  .then(handleResponse) 
	  .then(data => { loadScreenshot(data);console.log(data); })
	  .catch(error => console.log(error))
		
	//handles possible response from API
	function handleResponse(response) {
	  let contentType = response.headers.get('content-type')
	  if (contentType.includes('application/json')) {
		return handleJSONResponse(response)
	  } else if (contentType.includes('text/html')) {
		return handleTextResponse(response)
	  } else {
		// Other response types as necessary. I haven't found a need for them yet though.
		throw new Error(`Sorry, content-type ${contentType} not supported`)
	  }
	}
	function handleJSONResponse (response) {
	  return response.json()
		.then(json => {
		  if (response.ok) {
			return json
		  } else {
			return Promise.reject(Object.assign({}, json, {
			  status: response.status,
			  statusText: response.statusText
			}))
		  }
		})
	}
	function handleTextResponse (response) {
	  return response.text()
		.then(text => {
		  if (response.ok) {
			return text
		  } else {
			return Promise.reject({
			  status: response.status,
			  statusText: response.statusText,
			  err: text
			})
		  }
		})
	}
}
