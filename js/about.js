var aboutButton = d3.select('#about-button'),
    backButton = d3.select('#back-button'),
    aboutSection = d3.select('#about-section');

aboutButton.on('click', function() {

    aboutSection.transition()
        .duration(2000)
        .style('height', window.innerHeight + 'px');

    aboutSection.select('div')
        .transition()
        .delay(500)
        .duration(2000)
        .style('opacity', 1)
        .style('display', 'block');
    
    allArticleWrapper
        .transition()
        .delay(2000)
        .style('display', 'none');

})

backButton.on('click', function() {
    allArticleWrapper.style('display', 'block');

    aboutSection.select('div')
        .transition()
        .duration(1000)
        .style('opacity', 0)
        .transition()
        .delay(1000)
        .style('display', 'none');

    aboutSection.transition()
        .duration(2000)
        .style('height', '0px');
})