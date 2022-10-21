function LoadMap() {
    //Create and open InfoWindow.
    var infoWindow = new google.maps.InfoWindow();
    var geocoder = new google.maps.Geocoder();
    var markers = document.querySelectorAll('.corp');
    var icon1 = "images/pin1.png";
    var icon2 = "images/pin2.png";

   var mapOptions = {
       center: new google.maps.LatLng(42.0963462, -70.9686115),
       zoom: 10,
       // icon: icon2,
       mapTypeId: google.maps.MapTypeId.ROADMAP,
       zoomControl: true,
       zoomControlOptions: {
       position: google.maps.ControlPosition.TOP_LEFT,
       },
   };
   var map = new google.maps.Map(document.getElementById("cwMap"), mapOptions);

  
   // For Element Hover
   var listingRaw = document.querySelectorAll('#tbody01 .dnd-moved');
   for (let index = 0; index < listingRaw.length; index++) {
       
       listingRaw[index].addEventListener( "mouseover", function (e) {
           this.childNodes[11].classList.add('icon');
           var MapData = this.childNodes[11].textContent;
           geocoder.geocode({ 'address': this.childNodes[11].textContent }, function (results, status) {
   
               if (status == google.maps.GeocoderStatus.OK) {
                   var latitude = results[0].geometry.location.lat();
                   var longitude = results[0].geometry.location.lng();
   
                   // var data = markers[i];
                   var myLatlng = new google.maps.LatLng(latitude, longitude);
                   var marker = new google.maps.Marker({
                       position: myLatlng,
                       map: map,
                       // icon: icon2,
                   });
                   var content = "<div class='map_info_wrapper'>"+
                   "<div class='property_title'>"+
                   "<span>"+ MapData +"</span>"+
                   "</div>"+                
                   "</div>";

                   //Attach click event to the marker.
                   (function (marker) {
                       marker.setIcon(icon1);
                       infoWindow.setContent(content);
                       infoWindow.open(map, marker);
                   })(marker);
   
               }
           })
       });

   
       
       
   }

   // End element hover    
   for (var i = 0; i < markers.length; i++) {
       var markerAddress = markers[i].textContent;
       geocoder.geocode({
           'address': markers[i].textContent
       }, function (results, status) {

           if (status == google.maps.GeocoderStatus.OK) {
               var latitude = results[0].geometry.location.lat();
               var longitude = results[0].geometry.location.lng();

               var myLatlng = new google.maps.LatLng(latitude, longitude);
               var marker = new google.maps.Marker({
                   position: myLatlng,
                   map: map,
                   icon: icon1,
                   // title: data.title
               });

               //Attach click event to the marker.
               (function (marker) {
                   google.maps.event.addListener(marker, "mouseover", function (e) {
                       //Wrap the content inside an HTML DIV in order to set height and width of InfoWindow.
                       infoWindow.setContent(content);
                       infoWindow.open(map, marker);
                       // marker.setIcon(icon1);
                   });

                   google.maps.event.addListener(marker, 'mouseout', function() {
                       // marker.setIcon(icon2);
                   });
                   var content = "<div class='map_info_wrapper'>"+
                       "<div class='property_title'>"+
                       "<span>"+ markerAddress +"</span>"+
                       "</div>"+
                   
                       "</div>";
               })(marker);


           }
       })

   }
}

if(document.querySelectorAll('#map').length > 0){
    LoadMap();
}

// Map Sticky
// Map sticky Function
function stickyMap() {
    const MapSticky     = document.querySelector('.map-wrap-inner');
    const MapWidth      = document.querySelector('#cwMap');
    const MapHeight     = document.querySelector('.map-col');
    const Header        = document.querySelector('.header');
    const Breadcrumb    = document.querySelector('.breadcrumb');
    const SearchHeader  = document.querySelector('.searchHeader');
    const collapseSearch = document.querySelector('.collapse-search');
    var MapHeights      = MapWidth.offsetHeight;
    var topHeight       = Header.offsetHeight + Breadcrumb.offsetHeight + SearchHeader.offsetHeight;
    var collapseSearchHeight = collapseSearch.offsetHeight
    // console.log(collapseSearchHeight);

    // console.log(topHeight);
    if (window.innerWidth > 768) {
        setTimeout(function () {
        
            MapSticky.style.height = MapHeights + "px";
        }, 1000)
    }else{
        MapSticky.style.height = (window.innerHeight - 20) + "px";
    }

    if (MapSticky !== null) {
        // When the user scrolls the page, execute myFunction
        window.onscroll = function () {
            myFunction()
        };

        var MapWidths = MapWidth.offsetWidth;

        // console.log(MapHeights);
        if (window.innerWidth > 768) {
            MapSticky.style.width = MapWidths + "px";
        }

        // Get the header
        var header = MapSticky;

        // Get the offset position of the navbar
        var sticky = header.offsetTop + 220;


        // Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
        function myFunction() {
            if (window.getComputedStyle(collapseSearch).display === "none") {
                SitckTopHeight = topHeight - collapseSearchHeight;
                // console.log('none');
            }else{
                SitckTopHeight = topHeight ;
                //   console.log('Not none');
            }
            setTimeout(function(){
            },500)
            if (window.pageYOffset > SitckTopHeight) {
                header.classList.add("sticky");
            } else {
                header.classList.remove("sticky");
            }
        }
    }
}

if(document.querySelectorAll('#map').length > 0){
    stickyMap();
}