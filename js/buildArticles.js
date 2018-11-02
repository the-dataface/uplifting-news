
//article wrapper
var allArticleWrapper = d3.select('#all-article-wrapper');

function buildArticle(article) {
    var thisArticleWrapper = allArticleWrapper.append('div')
        .attr('class', 'article-wrapper')
        .html(buildHTML(article));

    var scoreContainer = thisArticleWrapper.select('.score-wrapper');
    buildScore(scoreContainer, article.score);

    thisArticleWrapper.on('click', function() {
        window.open(article.link, '_blank');
    })
}

function buildHTML(article) {
    var score = article.score,
        topic = article.topic,
        title = article.title,
        source = article.source,
        summary = article.summary,
        link = article.link,
        date = article.date;

    var html = "<div class='score-wrapper'><p>" + score + "</p></div><div class='content-wrapper'><div class='topic-date-container'><p class='topic'>" + topic + "</p><p class='date'>" + date + "</p></div><p class='title'>" + title + "</p><p class='source'>" + source + "</p><p class='description'>" + summary + "</p></div>";

    return html;
}

function buildScore(container, score) {
    var containerWidth = container.node().offsetWidth,
        containerHeight = container.node().offsetHeight,
        radius = containerWidth / 2,
        circleWidth = 8;

    var arc = d3.arc()
            .innerRadius(radius - circleWidth)
            .outerRadius(radius)
            .startAngle(0);

    var scoreSvg = container.append('svg')
        .attr('width', containerWidth)
        .attr('height', containerHeight);

    var scoreArc = scoreSvg.append("path")
        .attr('transform', 'translate(' + (radius) + ',' + (radius) + ')')
        .attr('class', 'score-arc')
        .datum({endAngle: 0})
        .attr("fill", '#FFD700')
        .attr("d", arc);

    var endMultiplier = 2 * (score / 100);

    scoreArc.transition()
        .duration(2000)
        .attrTween("d", arcTween(Math.PI * endMultiplier));

    function arcTween(newAngle) {
        return function(d) {
            var interpolate = d3.interpolate(d.endAngle, newAngle);
    
            return function(t) {
    
            d.endAngle = interpolate(t);
    
                return arc(d);
            };
        };
    }   
}

