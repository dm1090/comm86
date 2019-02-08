function initialize() {
    var locations = [
	['Sandipan Deb', 28.653, 77.196, 1.0, 39],
	['Dobrain Star', 24.807, 93.941, 1.0, 38],
	['Anil Bhatia', 45.739, -87.074, 1.0, 37],
	['Gappi', 22.316, 87.310, 1.0, 36],
	['Siladitya Malakar', 26.123, 91.799, 1.0, 35],
	['Biplab Mondal', 22.228, 77.453, 1.0, 34],
	['Tapas Paul', 28.615, 77.180, 1.0, 33],
	['Kalyan Samanta', 21.482, 86.918, 1.0, 32],
	['Partha Bose', 43.774, -79.236, 1.0, 31],
	['Sumit Sur', 39.722, -105.022, 1.0, 30],
	['Abhijit Ghosh', 37.767, -122.410, 1.0, 29],
	['Mangesh Chansarkar', 33.679, -117.772, 1.0, 28],
	['Rajat Sen', 39.922, -74.903, 1.0, 27],
	['Pushpak Sarkar', 40.884, -74.035, 1.0, 26],
	['P Paparao', 32.840, -96.844, 1.0, 25],
	['Ranadeep Dutta', 32.827, -117.196, 1.0, 24],
	['M Avanindra', 32.831, -117.148, 1.0, 23],
	['A Dash', 37.388, -121.820, 1.0, 22],
	['Maradona', 37.826, -121.973, 1.0, 21],
	['Jayanta Roy', 37.230, -121.968, 1.0, 20],
	['Deba Biswas', 37.305, -122.047, 1.0, 19],
	['Arindam Saha', 37.309, -122.035, 1.0, 18],
	['Rajesh Agrawal', 12.969, 77.518, 1.0, 17],
	['G Mohan', 25.599, 85.173, 1.0, 16],
	['Kacha', 42.319, -71.060, 1.0, 15],
	['Tathagata', -33.797, 151.178, 1.0, 14],
	['HP Sinha', 28.600, 77.062, 1.0, 13],
	['Sumanta', 38.403, -121.380, 1.0, 12],
	['Ghatu', 12.922, 77.585, 1.0, 11],
	['Kamal', -37.992, 145.234, 1.0, 10],
	['Ghatak', 1.381, 103.809, 1.0, 9],
	['Monisha', 41.846, -87.684, 1.0, 8],
	['Monisha 0.5', 41.807, -87.595, 0.5, 8],
	['Monisha 0.5', 38.801, -77.069, 0.5, 8],
	['Sarbari', 38.925, -77.077, 1.0, 7],
	['Deepen 0.75', 40.730, -74.170, 0.75, 6],
	['Deepen 0.25', 28.570, 77.360, 0.25, 6],
	['Shuja', 40.384, -74.520, 1.0, 5],
	['AGR', 32.751, -117.151, 1.0, 4],
	['Somnath M', 37.669, -121.899, 1.0, 3],
	['Somnath B', 34.424, -119.711, 1.0, 2],
	['Bedo 0.5', 19.103, 72.846, 0.5, 1],
	['Bedo 0.5', 34.117, -118.218, 0.5, 1]
  ];

  var center = [0, 0];

  window.map = new google.maps.Map(document.getElementById('map'), {
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var infowindow = new google.maps.InfoWindow();

  var bounds = new google.maps.LatLngBounds();

  for (i = 0; i < locations.length; i++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][1], locations[i][2]),
      map: map
    });

    center[0] += locations[i][1] * locations[i][3];
    center[1] += locations[i][2] * locations[i][3];


    bounds.extend(marker.position);

    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        infowindow.setContent(locations[i][0]);
        infowindow.open(map, marker);
      }
    })(marker, i));
  }

  center[0] /= locations.length;
  center[1] /= locations.length;

  marker = new google.maps.Marker({
    position: new google.maps.LatLng(center[0], center[1]),
    map: map,
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
    }
  });

  bounds.extend(marker.position);

  google.maps.event.addListener(marker, 'click', (function(marker) {
    return function() {
      infowindow.setContent('Center of Mass');
      infowindow.open(map, marker);
    }
  })(marker));

  map.fitBounds(bounds);

  var listener = google.maps.event.addListener(map, "idle", function() {
    map.setZoom(3);
    google.maps.event.removeListener(listener);
  });
}

function loadScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBPiGF_amHt8-0fWOgkKQRKaAAcsDzv_L8&v=3.exp&' + 'callback=initialize';
  document.body.appendChild(script);
}

window.onload = loadScript;