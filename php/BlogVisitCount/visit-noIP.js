
var xmlHttp
function UpdateBlogVisit(title)
{ 
xmlHttp=GetXmlHttpObject()
if (xmlHttp==null)
    {
    alert ("Browser does not support HTTP Request")
    return
    }
var url="http://XXX.XXX.XXX.XXX/php/BlogVisitCount/BlogCounterUpdate.php?page=" + title;
//alert(url);
xmlHttp.open("GET",url,true)
xmlHttp.send(null)
}

var wURL
function GetBlogVisitCount(title)
{
xmlHttp=GetXmlHttpObject()
if (xmlHttp==null)
    {
    alert ("Browser does not support HTTP Request")
    return
    }
var url="http://XXX.XXX.XXX.XXX/php/BlogVisitCount/BlogCounterGet.php?page=" + title + "&range=three";
//alert(url)
wURL = url
//alert(wURL)
xmlHttp.onreadystatechange=stateChanged
xmlHttp.open("GET",url,true)
xmlHttp.send(null)
}


function stateChanged()
{ 
//alert(xmlHttp.readyState + " " + xmlHttp.readyState)
if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete")
 { 
 var ints=new Array();
 ints=xmlHttp.responseText.split(" ");
 document.getElementById("allVisit").innerHTML= ints[0];
 document.getElementById("lastVisit").innerHTML= ints[1];
 document.getElementById("todaylVisit").innerHTML= ints[2];
//alert("respose tex:\"" + xmlHttp.responseText + "\"")
 } 
}

function GetXmlHttpObject()
{
var xmlHttp=null;
try
    {
    // Firefox, Opera 8.0+, Safari
    xmlHttp=new XMLHttpRequest();
    }
catch (e)
    {
    //Internet Explorer
    try
        {
        xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
        }
    catch (e)
        {
        xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
    }
return xmlHttp;
}
