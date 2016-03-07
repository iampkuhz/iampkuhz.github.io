function UpdateBlogVisit(title)
{
    $.ajax({
        url:"http://106.187.54.215/php/BlogVisitCount/BlogCounterUpdate.php?page=" + title,
        type:"post",
        sucess: function () {}
    })
    GetBlogVisitCount(title)
}

function GetBlogVisitCount(title)
{
    GetBlogVisitCount3(title, "all", "allVisit");
    GetBlogVisitCount3(title, "lastDay", "lastVisit");
    GetBlogVisitCount3(title, "today", "todaylVisit");
}
function GetBlogVisitCount3(title, rg, fd){
    $.ajax({
        url:"http://106.187.54.215/php/BlogVisitCount/BlogCounterGet.php?page=" + title + "&range=" + rg,
        type:"post",
        success: function(triple){
            var node = document.getElementById(fd);
            if(node != null)
                node.innerHTML= triple;
        }
    })

}

