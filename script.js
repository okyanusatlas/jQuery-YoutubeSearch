//Searchbar Handler 
$(function(){
    var searchField = $('#query');
    var icon = $('#searchBtn');

    //Focus Handler 
    $(searchField).on('focus',function(){
        $(this).animate({
            width:'100%'
        },400);
        $(icon).animate({
            right: '10px'
        },400);
    });

    //Blur Event Handler 
    $(searchField).on('blur',function(){
        if(searchField.val()==''){
            $(searchField).animate({
                width:'45%'
            },400,function(){});
             $(icon).animate({
                right:'360px'
            },400,function(){});

        }
    }); 
    $('#searchForm').submit(function(e){
        e.preventDefault();
    });
})

function myFunction(){
    //Clear Results ; 
    $('#results').html(' ');
    $('#buttons').html(' ');
    
    //Get form Input   
    q = $('#query').val();

    //Run GET request on API
    $.get(
        "https://www.googleapis.com/youtube/v3/search" , {
            part:'snippet, id',
            q: q,
            type:'video',
            key: 'AIzaSyAkbvyw9I-mEdQupAc-B03gbmWdDjeK5b8'},
            function(data){
                var nextPageToken = data.nextPageToken;
                var prevPageToken = data.prevPageToken;
                console.log(data);
                
                $.each(data.items,function(i,item){
                    //get Output
                    var output = getOutput(item);
                    //Display  results 
                    $('#results').append(output);
                });

                var buttons = getButtons(prevPageToken, nextPageToken);
                //Display Buttons 
                $('#buttons').append(buttons);
            }
    );
};

// Build Output function

function getOutput(item){
    var videoId =item.id.videoId;
    var title  = item.snippet.title;
    var description = item.snippet.description;
    var thumb = item.snippet.thumbnails.high.url;
    var channelTitle = item.snippet.channelTitle;
    var videoDate = item.snippet.publishedAt;
    //Build Output String

    var output = '<li>' + '<div class="list-left">'+'<img src = "'+ thumb +'">'+'</div>'+'<div class="list-right">'+
'<h3><a class="fancybox fancybox.iframe" href="http://www.youtube.com/embed/'+videoId+'">'+title+'</a></h3>'+'<small>By <span class ="cTitle">'+channelTitle+'</span>on'+videoDate+'</small>'+'<p>'+description+'</p>'+'</div>'+'</li>'+
                 '<div class="clearfix"></div>'+'';

    return output;
                
}
//Next Page Function

function nextPage(){
    
    var token =  $('#nextButton').data('token');
    var q =  $('#nextButton').data('query');

     //Clear Results ; 
    $('#results').html(' ');
    $('#buttons').html(' ');
    
    //Get form Input   
    q = $('#query').val();

    //Run GET request on API
    $.get(
        "https://www.googleapis.com/youtube/v3/search" , {
            part:'snippet, id',
            q: q,
            pageToken: token,
            type:'video',
            key: 'AIzaSyAkbvyw9I-mEdQupAc-B03gbmWdDjeK5b8'},
            function(data){
                var nextPageToken = data.nextPageToken;
                var prevPageToken = data.prevPageToken;
                console.log(data);
                
                $.each(data.items,function(i,item){
                    //get Output
                    var output = getOutput(item);
                    //Display  results 
                    $('#results').append(output);
                });

                var buttons = getButtons(prevPageToken, nextPageToken);
                //Display Buttons 
                $('#buttons').append(buttons);
            }
    );
}
//Previus Page Function

function prevPage(){
    
    var token =  $('#prevButton').data('token');
    var q =  $('#prevButton').data('query');

     //Clear Results ; 
    $('#results').html(' ');
    $('#buttons').html(' ');
    
    //Get form Input   
    q = $('#query').val();

    //Run GET request on API
    $.get(
        "https://www.googleapis.com/youtube/v3/search" , {
            part:'snippet, id',
            q: q,
            pageToken: token,
            type:'video',
            key: 'AIzaSyAkbvyw9I-mEdQupAc-B03gbmWdDjeK5b8'},
            function(data){
                var nextPageToken = data.nextPageToken;
                var prevPageToken = data.prevPageToken;
                console.log(data);
                
                $.each(data.items,function(i,item){
                    //get Output
                    var output = getOutput(item);
                    //Display  results 
                    $('#results').append(output);
                });

                var buttons = getButtons(prevPageToken, nextPageToken);
                //Display Buttons 
                $('#buttons').append(buttons);
            }
    );
}




// build the buttons function

function getButtons(prevPageToken, nextPageToken){
    if(!prevPageToken){
        var btnoutput = '<div class= "buttonContainer"> '+'<button id ="nextButton" class="pagingButton" data-token="'+nextPageToken+'" data-query="'+q+'"'+'onclick="nextPage();">Next Page</button></div>' ;
    }else {
         var btnoutput = '<div class= "buttonContainer"> '+'<button id ="prevButton" class="pagingButton" data-token="'+prevPageToken+'" data-query="'+q+'"'+'onclick="prevPage();">Prev Page</button>'+'<button id ="nextButton" class="pagingButton" data-token="'+nextPageToken+'" data-query="'+q+'"'+'onclick="nextPage();">Next Page</button></div>' ;
    }


    return btnoutput;
}
















