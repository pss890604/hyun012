// Function to initialize the Google Maps API and create a map
window.initMap=function(){
}
function initMap() {
  // Get the current location
  getCurrentLocation().then(coords => {
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: coords.latitude, lng: coords.longitude },
      zoom: 12
    });
    // Add markers for each power plant
    const powerPlants = [
      {
        name: "Cheongju Solar Power Station",
        capacity: "50MW",
        location: { lat: 36.59523684680106, lng: 127.43042261331203 }
      },
      {
        name: "Seoul Solar Power Station",
        capacity: "30MW",
        location: { lat: 37.566677, lng: 126.978419 }
      },
      {
        name: "Busan Solar Power Station",
        capacity: "20MW",
        location: { lat: 35.179815, lng: 129.075022 }
      },
      {
        name: "Daegu Solar Power Plant",
        capacity: "10MW",
        location: { lat: 35.87222, lng: 128.602503 }
      },
      {
        name: "Incheon Solar Power Plant",
        capacity: "5MW",
        location: { lat: 37.45639, lng: 126.70528 }
      }
    ];
    const markers = [];
    powerPlants.forEach(powerPlant => {
      const marker = new google.maps.Marker({
        position: powerPlant.location,
        map: map,
        title: powerPlant.name
      });
      markers.push(marker);
      // Click on the marker to display a popup displaying power plant information
      marker.addListener("click", () => {
        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div>
              <h3>${powerPlant.name}</h3>
              <ul>
                <li>Capacity: ${powerPlant.capacity}</li>
                <li>Check date: <input type="date"></li>
                <li>Checked by: <input type="text"></li>
                <li>Meter value (KW): <input type="number"></li>
              </ul>
              <button onclick="submitForm()">Submit</button>
            </div>
          `
        });
        infoWindow.open(map, marker);
      });
    });
    // Set the bounds of the map to include all markers
    const bounds = new google.maps.LatLngBounds();
    markers.forEach(marker => {
      bounds.extend(marker.getPosition());
    });
    map.fitBounds(bounds);
  }).catch(error => {
    console.error(error);
  });
}

