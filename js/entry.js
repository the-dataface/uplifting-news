//parsing functions
var parseTime = d3.timeParse('%m/%d/%y'),
    formatTime = d3.timeFormat('%b %d, %Y');

function getData() {
	// Load data sources
    var dataUnresolved = d3.csv('assets/test_data.csv').then(function(data) { return data; });
    Promise.all([dataUnresolved]).then(function(response) {
        var data = formatData(response[0]);

        data.sort(function(a, b) {
            return b.score - a.score;
        })

        data.forEach(function(d) {
            buildArticle(d);
        })

	});
}

getData();

function formatData(data) {
    data.forEach(function(d) {
        console.log(d.date)
        d.date = formatTime(parseTime(d.date))
    })
    
    return data;
}