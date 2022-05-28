const links = [
    {
      label: "Week1 notes",
      url: "../week1/ch1/template.html"
    }
]

let linksList = "<ol>";
links.forEach(link => {
    linksList += "<li><a href='" +link.url+"'>"+link.label+"</a></li>" 
});
linksList +="</ol>";

document.querySelector('#place_links_here').innerHTML = linksList;