function validYear(int){
    if((Number.isInteger(int) && int>1900) ){
        return true;
    }
    return false;
}
$("#search-button").on("click", function () {
    event.preventDefault();
    
    var searchTerm = $("#search-term").val().trim();
    var recordsNumber = parseInt($("#records-number").val().trim());
    var startYear = parseInt($("#start-year").val().trim());
    var endYear = parseInt($("#end-year").val().trim());
    var optionalStartYear;
    var optionalEndYear;

    var apiKey = "aed5cfb5d520414f92df2e7f602fa29e";
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key="+apiKey;
    if((!Number.isInteger(recordsNumber) || recordsNumber<1) || searchTerm===""){
        console.log("Invalid query");
        return;
    }
    
    url+="&q="+searchTerm;
    if(validYear(startYear)){
        optionalStartYear = startYear;
        url+="&begin_date="+startYear+"0101"
    }
    if(validYear(endYear)){
        optionalEndYear = endYear;
        url+="&end_date="+endYear+"1231"
    }
    if(validYear(endYear) && validYear(startYear)){
        if(startYear>endYear){
            alert("start year after end year");
            $("#search-results").empty();
            return;
        }
    }
    $.ajax({
        url: url,
        method: 'GET',
    }).done(function (result) {
        //console.log(result.response.docs.length);
        $("#search-results").empty();
        addXArticles(recordsNumber,result.response.docs);
    }).fail(function (err) {
        throw err;
    });
    function addXArticles(x,arr){
        for(i=0; i<x ; i++){
            //add articles
            var article = arr[i];

            //var articleCount = i+1;
            var listItem = $("<li>");
            listItem.text(article.headline.main);

            var articleList = $("<ul>");
            articleList.append(listItem)
            articleList.addClass("list-group");

            $("#search-results").append(articleList);
        }
    }
})
$("#clear-button").on("click",function(){
    event.preventDefault();
    $("#search-term").val("");
    $("#records-number").val("");
    $("#start-year").val("");
    $("#end-year").val("");
    $("#search-results").empty();
})