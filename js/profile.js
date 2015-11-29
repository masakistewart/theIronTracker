$('document').ready(function() {
	// Variables... need to make some of them global
	var localStorageGET = localStorage.getItem('user');
	var localStoragePARSE = JSON.parse(localStorageGET);
	var Username = localStoragePARSE.name;
	var img = localStoragePARSE.image;
	var bio = localStoragePARSE.bio;
	var lengthOfGoals = localStoragePARSE.goals.length;
	var chartData;
	var chartArray = []

	// add buttons for update progress, new goal and append to the dom
	var deleteButton = $("<button class='btn btn btn-warning'>Delete Goal</button>").click(function(){ window.location.href = 'deleteGoal.html'})
	var updatePage = $('<button class="btn btn-warning">Update Profile</button>').click(function(){ window.location.href = 'updateProfile.html'})
	var newGoalButton = $('<button class="btn btn-warning"> Add New Goal</button>').on('click', function(){ window.location.href = 'newGoal.html';})
	var updateProgressButton = $('<button class="btn btn-warning">Update Goal Progress</button>').on('click', function(){ window.location.href = 'addProgress.html'});
	$('#menuButtonTarget').prepend(newGoalButton, updateProgressButton, updatePage, deleteButton);

	//add name to dropdown Menu
	$('#nameTarget').append(Username);

	// display data in tables and charts
	function createTd(item, index, value) {
		var td = $("<tr id=" + index + " class="+value+"><td>"+ item.current +"</td><td>"+ item.currentDate +"</td></tr>");
		$("#tableTarget").append(td);
	}
	function createChartButton(id, value) {
		$("#goalButtonTarget").append('<button class="btn btn-success" id=' + id + '>' + localStoragePARSE.goals[id].title + '</button>');
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

	function makeChartID(varName, lengthOfGoalHistory, id) {
		for(var i = 0; i < lengthOfGoalHistory.length; i++) {
			var goalsArr = localStoragePARSE.goals[id].goalHistory;
			createTd(goalsArr[i], i, goalsArr[i].current);
			if(localStoragePARSE.goals[id].target2 !== undefined){
				$('h4').text('Target Goal: '+ localStoragePARSE.goals[id].target +' miles in ' + localStoragePARSE.goals[id].target2 +' mins')
			} else if(localStoragePARSE.goals[id].target === undefined){
				$('h4').text('Update Goal Progress First');
			} else {
				$('h4').text('Target Goal: '+ localStoragePARSE.goals[id].target);
			}
			varName.datasets[0].label = localStoragePARSE.goals[id].title;
			varName.labels.push(goalsArr[i].currentDate);
			varName.datasets[0].data.push(goalsArr[i].current);
		}
	}

	// calculate percentage increase between two goals
	function percentage(a, b){
	    var increase = b - a;
	    var step2 = increase / a;
	    return step2 * 100;
	}

	function totalPercentage() {
		var prev;
		var trJQ = $('tr');
		for (var i = 0; i < trJQ.length - 1; i++) {
			if(i === 0){
				var tr = document.getElementById(i);
				var node = document.createElement("TD");
				var textnode = document.createTextNode("0%");
				node.appendChild(textnode);
				tr.appendChild(node);
				prev = tr.className;
			} else {
				var tr = document.getElementById(i);
				var node = document.createElement('TD');
				console.log(tr.className)
				var className = tr.className;
				var percent = percentage(prev, tr.className);
				var floored = Math.floor(percent) + "%"
				var textnode = document.createTextNode(floored);
				node.appendChild(textnode);
				tr.appendChild(node);
				prev = tr.className;
			}
		};
	}

	function capitalizeFirstLetter(string) {
    	return string.charAt(0).toUpperCase() + string.slice(1);
	}

	for (var i = 0; i < localStoragePARSE.goals.length; i++) {
		createChartButton(i);
		$('#' + i).on('click', function(){
			var thisID = this.id;
			var historyArr = localStoragePARSE.goals[this.id].goalHistory;
			var goalTitle = $('h1#goalTitle');
			goalTitle.empty();
			$('#chartTarget').empty();
			$('#chartTarget').append('<canvas id="myChart" style="width: 400px; height: 450px;"></canvas>')

			goalTitle.append(localStoragePARSE.goals[this.id].title);
			goalTitle.append('<small>(' + capitalizeFirstLetter(localStoragePARSE.goals[this.id].goalType) + ')</small>')
			// reset chart
			$('#tableTarget').empty();
			// fill chart
			var ctx = document.getElementById("myChart").getContext("2d");
			chartData = new MakeChartData();
			makeChartID(chartData, historyArr, thisID);
			var myLineChart = new Chart(ctx).Line(chartData, {scaleLineColor: "white", scaleFontColor: "white", scaleGridLineColor : "white"});
			myLineChart.update();
			totalPercentage();
		})
	};
	// chuck norris quotes from the chuck norris db api
	var call = $.ajax({
		type: 'GET',
		url: 'http://api.icndb.com/jokes/random?limitTo=[nerdy]'

	})
	call.done(function(data){
		$('#chuck').text(data.value.joke);
	})
});