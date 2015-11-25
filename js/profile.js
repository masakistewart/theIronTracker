$('document').ready(function() {
	// Variables... need to make some of them global
	var localStorageGET = localStorage.getItem('user');
	var localStoragePARSE = JSON.parse(localStorageGET);
	var Username = localStoragePARSE.name;
	var img = localStoragePARSE.image;
	var bio = localStoragePARSE.bio;
	var lengthOfGoals = localStoragePARSE.goals.length;
	var goalsARRAY = localStoragePARSE.goals[0].goalHistory;
	var chartData;
	var chartData2;
	function randomNum() {
		return Math.floor(Math.random() * 12) + 1;
	}

	//set welcome of user and append bio
	$('#welcome').append('<h2 class="text-center">'+Username+'</h2>');
	$('#bioHere').append('<p id="bioText">' + bio + '</p>');
	// set profile Image to chosen or random;
	if(!img === ""){
		var bioHeadingDiv = $('#profilePicHere').append('<img id="profilePic" src="' + img + '" />');

	} else {
		var tmpImg = "img/img" + randomNum() + ".jpg"
		var bioHeadingDiv = $('#profilePicHere').append('<img id="profilePic" src="'+ tmpImg +'" />');
	}

	// add buttons for update progress, new goal and append to the dom
	var updatePage = $('<button class="btn btn-default"><a href="updateProfile.html">Update Profile</a></button>')
	var newGoalButton = $('<button>Add New Goal</button>').addClass('btn btn-default').on('click', function(){ window.location.href = 'newGoal.html';})
	var updateProgressButton = $('<button>Update Goal Progress</button>').addClass('btn btn-default').on('click', function(){ window.location.href = 'addProgress.html'});
	$('#buttonsHere').append(newGoalButton, updateProgressButton, updatePage);

	// display data in tables and charts
	function createTd(item) {
		var td = $("<tr><td>"+ item.current +"</td><td>"+ item.currentDate +"</td></tr>");
		$("#tableTarget").append(td);
	}
	function createChartButton(id) {
		$("#goalButtonTarget").append('<button class="btn btn-danger" id=' + id + '>' + localStoragePARSE.goals[id].title + '</button>');
	}
	function randomForChart() {
		return Math.floor(Math.random() * localStoragePARSE.goals.length);
	}
	function MakeChartData() {
		this.labels = [];
		this.datasets = [
			{
				label: null,
				fillColor: "rgba(66, 95, 156, .50)",
	            strokeColor: "rgba(255, 33, 23,,1)",
	            pointColor: "gray",
	            pointStrokeColor: "#fff",
	            pointHighlightFill: "red",
	            pointHighlightStroke: "rgba(220,220,220,1)",
	            data: []
			}
		]
	}

	chartData = new MakeChartData();
	function makeChart(name) {
		for(var i = 0; i < goalsARRAY.length; i++) {
			var goalsArr = localStoragePARSE.goals[0].goalHistory;
			createTd(goalsArr[i]);
			if(localStoragePARSE.goals[0].target2 !== undefined){
				$('h3').text('<h3>Target Goal: '+ localStoragePARSE.goals[0].target +' in ' + localStoragePARSE.goals[0].target2 +' mins')
			} else if(localStoragePARSE.goals[0].target === undefined){
				$('h3').text('Update Goal Progress');
			} else {
				$('h3').text('Target Goal: '+ localStoragePARSE.goals[0].target)
			}
			$('h1').text(localStoragePARSE.goals[0].title);
			name.datasets[0].label = localStoragePARSE.goals[0].goalType;
			name.labels.push(goalsArr[i].currentDate);
			name.datasets[0].data.push(goalsArr[i].current);
			console.log(name);
		}
	}

	function makeChartID(varName, lengthOfGoalHistory, id) {
		for(var i = 0; i < lengthOfGoalHistory.length; i++) {
			var goalsArr = localStoragePARSE.goals[id].goalHistory;
			createTd(goalsArr[i]);
			if(localStoragePARSE.goals[id].target2 !== undefined){
				$('h3').text('Target Goal: '+ localStoragePARSE.goals[id].target +' miles in ' + localStoragePARSE.goals[id].target2 +' mins')
			} else if(localStoragePARSE.goals[id].target === undefined){
				$('h3').text('Update Goal Progress First');
			} else {
				$('h3').text('Target Goal: '+ localStoragePARSE.goals[id].target)
			}
			varName.datasets[0].label = localStoragePARSE.goals[id].title;
			varName.labels.push(goalsArr[i].currentDate);
			varName.datasets[0].data.push(goalsArr[i].current);
		}
	}

	// makeChart(chartData);
	var ctx = document.getElementById("myChart").getContext("2d");
	// var myLineChart = new Chart(ctx).Line(chartData, {scaleFontColor: "white", scaleGridLineColor : "white"});

	for (var i = 0; i < localStoragePARSE.goals.length; i++) {
		createChartButton(i);
		$('#' + i).on('click', function(){
			var thisID = this.id;
			var historyArr = localStoragePARSE.goals[this.id].goalHistory;
			$('h1').text(localStoragePARSE.goals[this.id].title);
			// reset chart
			$('#tableTarget').empty();
			// fill chart
			chartData = new MakeChartData();
			makeChartID(chartData, historyArr, thisID);
			var myLineChart = new Chart(ctx).Line(chartData, {scaleFontColor: "white", scaleGridLineColor : "beige"});
			myLineChart.update();
		})

	};

	var call = $.ajax({
		type: 'GET',
		url: 'http://api.icndb.com/jokes/random?limitTo=[nerdy]'

	})

	call.done(function(data){
		$('h5').text(data.value.joke);
	})
})
