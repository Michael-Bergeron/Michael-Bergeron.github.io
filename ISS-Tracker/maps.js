window.onload = function(){
var idIc = 1;
var boxId = 0;
var ISSTracker = document.querySelector(".ISSTracker");
var intervalISS = setInterval(trackISS, 3000);

map.loadImage('img/iss.png', function(error, image) {
  if (error) throw error; map.addImage('iss', image)});

map.loadImage('img/black.png', function(error1, image1) {
  if (error1) throw error1; map.addImage('box', image1)});

ISSTracker.addEventListener("click", graphedISS)

function graphedISS() {if (ISSTracker.checked){
  intervalISS;
}
else{
  clearInterval(intervalISS);
  map.removeLayer(idIc.toString());
}
}

function trackISS(){
  if (idIc > 1){
    map.removeLayer(idIc.toString());
  }
  idIc++;
  boxId--;
  fetch('http://api.open-notify.org/iss-now.json')
    .then(function(response) {
      return response.json();
    })
    .then(function(issData) {
      updateBox(issData.iss_position.longitude, issData.iss_position.latitude);
      updateLocation(issData.iss_position.longitude, issData.iss_position.latitude);
    });
}

function updateLocation(long, lat) {
      map.addLayer({
      "id": idIc.toString(),
      "type": "symbol",
      "source": {"type": "geojson",
                 "data": {"type": "FeatureCollection",
                          "features": [{"type": "Feature",
                          "geometry": {"type": "Point",
                                      "coordinates": [long, lat]}}]
      }
      },
      "layout": {
      "icon-image": "iss",
      "icon-size": 0.2
      }
    });
  };

  function updateBox(long, lat) {
        map.addLayer({
        "id": boxId.toString(),
        "type": "symbol",
        "source": {"type": "geojson",
                   "data": {"type": "FeatureCollection",
                            "features": [{"type": "Feature",
                            "geometry": {"type": "Point",
                                        "coordinates": [long, lat]}}]
        }
        },
        "layout": {
        "icon-image": "box",
        "icon-size": 0.01
        }
      });
    };
}