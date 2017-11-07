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
	var json, screenshots, slider_images;
	
	try{
	 json = JSON.parse(data);
	 screenshots = json.screenshots;
	}catch (error){
	}finally{
		json = data;
		screenshots = json.screenshots;
	}
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
	
		left.off('click');
		right.off('click');

    left.on('click', function() {
      slideLeft();
    });
    right.on('click', function() {
      slideRight();
    });
	slideInitial();
}

var urlIds = []; //empty array for later use in function
function addButtons(){  //adds buttons to page  //button tags in array with unique ids, CSS class and names
	var buttons = ['<button id="dealsplus" class="buttons">Deals Plus</button>',
	'<button id="befrugal" class="buttons ">BeFrugal</button>', 
	'<button id="mrrebates" class="buttons">Mr. Rebates</button>',
    '<button id="slickdeals" class="buttons">Slick Deals</button>',
    '<button id="uprom" class="buttons">Upromise</button>',
	'<button id="ebates_hot" class="buttons space">Ebates Hot Deals</button>',
    '<button id="ebates_cat" class="buttons">Ebates Category</button>',
    '<button id="cybermonday" class="buttons">CyberMonday.com</button>',
    '<button id="reinvent" class="buttons">BlackFriday.com (Reinvent)</button>',
    '<button id="jones_deng" class="buttons space">BestBlackFriday (Jones-Deng)</button>',
    '<button id="bfads" class="buttons">BF Ads</button>',
	'<button id="bfads_target" class="buttons">BFAds Target BF Scan</button>',
	'<button id="bfads_walmart" class="buttons ">BFAds Walmart BF Scan</button>',
	'<button id="bfads_walmart_toybook" class="buttons">BF Ads Walmart Toy Book Leak</button>', 
	'<button id="bfads_target_toybook" class="buttons">BF Ads Target Toy Book Leak</button>'];
	for(i = 0; i < buttons.length-14; i++){//iterates through all <button> tags in buttons array
		$('.buttons-container').append(buttons)//appends each button in array to page
	}
	
	urlIds =[ //key value pair array includes url id's for unique id of each API call
	{url:'07e3d083-1772-49fe-a5d5-af5f70df7274', id:'dealsplus'},
	{url:'14f6c44c-c9d8-45f7-8af2-ac6a435aec2d', id:'bfads_target'},
	{url: '1bea9991-d8b9-4b0e-8ebf-a89caf0f3cd5', id:'bfads'},
	{url: '2bbeee72-3bf1-4183-8d03-de0a07c753db', id: 'jones_deng'},
	{url: '611675db-05d6-4c14-af99-586df941cec8', id: 'befrugal'},
	{url: '7a2b9905-3a8f-45ce-aa3a-1e7b97885bba', id: 'bfads_walmart'},
	{url: '9e98fa87-1317-4b49-a1f5-b681152874c4', id: 'cybermonday'},
	{url: '987c3580-e9a0-4be2-a290-0ec7bbdca54d', id:'mrrebates'},
	{url: 'a381a406-533d-496c-8b79-1b54b33337df', id:'uprom'},
	{url:'b6760909-b36b-4319-9b6b-4cced830420c', id:'reinvent'},
	{url:'b8d94ed0-4934-46fd-a634-5e1d9d24e39c', id:'bfads_walmart_toybook'},
	{url: 'bd21c963-63e5-400b-ade9-74e0400b0f24', id: 'bfads_target_toybook'},
	{url: 'bfc17967-a369-4e85-af32-6c651889153c', id: 'slickdeals'},
	{url: 'e08dc528-1c94-453f-b528-0008f89a0bca', id: 'ebates_hot'},
	{url: '731069f1-abd4-4c74-a10c-265b94859105', id: 'ebates_cat'}];
	
	for(var i=0; i < urlIds.length; i++) {//loop to append data-api-urlid to buttons
		$('#'+urlIds[i].id).attr('data-api-urlid', urlIds[i].url);//calls url value from each key value pair in array and appends to each button as attr
	}

	$('.buttons-container button').on('click', function(e) {getJsonText($(this).attr('data-api-urlid'));});//Apply button listener to all buttons in the button container
}

function getJsonText(url_id) { //makes API call, param feeds unique IDs to be appeneded to each button on click and call that unique API
	var api_token = 'api_token=qi4P5981S1I0JAB3VWJp5KNKviEopedx8Z4HWINjv7LbdNaTbqX5PzE6RSJM&url_id='; //api token
	var url = 'getURL.php?' + api_token + url_id;
	$.ajax({
	  url: url,
	  type: 'POST',
	 	success: function() {
	console.log(url_id);//checking to make sure data-api-urlid is being passed properly
	//console.log(datatype);
	let options = { //options for API call
		method: 'GET',
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
		}//end success function
	})//end ajax
 }//end getJSON

//}
// function addClass(url_id){
// if(url_id == 'fabd06ba-7ead-4978-b3bd-f33f88b8bbfa'){ 
// 		$('.slider-content').removeAttr('id', 'walmart_images' )
// 		$('.slider-content').attr('id', 'ebates_images')
// 	}
// else if(url_id == 'a29d2d9c-a087-4d27-8e22-251f525ecff6'){ //walmart id
// 	$('.slider-content').removeAttr('id', 'ebates_images')
// 	$('.slider-content').attr('id', 'walmart_images')
// 	}
// 	else{
// 		$('.slider-content').removeAttr('ebates_images groupon_images walmart_images')
// 		}
// }
