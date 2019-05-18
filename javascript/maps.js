var map, heatmap;
var markers = [];
var persons = [
    /* Name, Lat, Long, Weight, Sequence Num */
    ['Sandipan Deb', 28.653, 77.196, 1.0, 39],
    ['Dobrain Star', 24.807, 93.941, 1.0, 38],
    ['Anil Bhatia', 40.825, -73.513, 1.0, 37],
    ['Gappi', 22.316, 87.310, 1.0, 36],
    ['Siladitya Malakar', 26.123, 91.799, 1.0, 35],
    ['Biplab Mondal', 23.228, 77.453, 1.0, 34],
    ['Tapas Paul', 28.615, 77.180, 1.0, 33],
    ['Kalyan Samanta', 21.482, 86.918, 1.0, 32],
    ['Partha Bose', 43.774, -79.236, 1.0, 31],
    ['Sumit Sur', 40.012, -105.266, 1.0, 30],
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
    ['Kamal 0.5', -37.992, 145.234, 0.5, 10],
    ['Kamal 0.5', 39.116, -84.488, 0.5, 10],
    ['Ghatak', 1.381, 103.809, 1.0, 9],
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

var meets = [
    ['Shuja and Sumanta, May 18, 2019', // Description
     'images/Shuja_and_Sumanta.jpg',       // Image Location
     40.548, -74.638,                  // Coordinates
     '400', '225'                      // Display Resolution
    ],
    ['Sumanta and Surajit, May 12, 2019', // Description
     'images/Sumanta_Surajit.jpg',       // Image Location
     42.470, -71.451,                  // Coordinates
     '340', '192'                      // Display Resolution
    ],
    ['Sumit and Surajit, May 7, 2019', // Description
     'images/Sumit_Surajit.jpg',       // Image Location
     39.923, -105.064,                 // Coordinates
     '400', '300'                      // Display Resolution
    ],
    ['AGR, Ranadeep and Rajat, March, 2019',
     'images/AGR_Ranadeep_Rajat.jpg',
     33.540, -117.782,
     '400', '300'
    ]
];

// Sets the map on all markers in the array.
function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

// Removes the markers from the map, but keeps them in the array.
function clearPersons() {
    setMapOnAll(null);
}

// Shows any markers currently in the array.
function showPersons() {
    setMapOnAll(map);
      }

function toggleHeatmap() {
    heatmap.setMap(heatmap.getMap() ? null : map);
}

function changeGradient() {
    var gradient = [
        'rgba(0, 255, 255, 0)',
        'rgba(0, 255, 255, 1)',
        'rgba(0, 191, 255, 1)',
        'rgba(0, 127, 255, 1)',
        'rgba(0, 63, 255, 1)',
        'rgba(0, 0, 255, 1)',
        'rgba(0, 0, 223, 1)',
        'rgba(0, 0, 191, 1)',
        'rgba(0, 0, 159, 1)',
        'rgba(0, 0, 127, 1)',
        'rgba(63, 0, 91, 1)',
        'rgba(127, 0, 63, 1)',
        'rgba(191, 0, 31, 1)',
        'rgba(255, 0, 0, 1)'
    ]
    heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
}

function changeRadius() {
    heatmap.set('radius', heatmap.get('radius') ? null : 50);
}

function changeOpacity() {
    heatmap.set('opacity', heatmap.get('opacity') ? null : 0.2);
}

// Heatmap data: 500 Points
function getPoints() {
    return [
        new google.maps.LatLng(37.782551, -122.445368),
        new google.maps.LatLng(37.782745, -122.444586),
	{location: new google.maps.LatLng(36.099365, -115.173028), weight: 2},
	{location: new google.maps.LatLng(34.101561, -118.338319), weight: 15}
    ];
}

function drawCenterOfMass(name, lat, lng, color) {
  var infowindow = new google.maps.InfoWindow();
  var bounds = new google.maps.LatLngBounds();

  marker = new google.maps.Marker({
    position: new google.maps.LatLng(lat, lng),
    map: map,
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/" + color + "-dot.png"
    }
  });

//  bounds.extend(marker.position);

  google.maps.event.addListener(marker, 'click', (function(marker) {
    return function() {
      infowindow.setContent(name);
      infowindow.open(map, marker);
    }
  })(marker));
}

function initialize() {

  var centerOfMassLocus = [
      {lat: 0.0, lng: 0.0},
      {lat: 0.0, lng: -90.0},
      {lat: 0.0, lng: -180.0},
      {lat: 0.0, lng: 90.0},
      {lat: 0.0, lng: 0.0}
  ];
  var center = [0, 0];
  var totalweight = 0;

  window.map = new google.maps.Map(document.getElementById('map'), {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    streetViewControl: false,
    scaleControl: true
  });

  var infowindow = new google.maps.InfoWindow();

  var bounds = new google.maps.LatLngBounds();

  for (i = 0; i < persons.length; i++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(persons[i][1], persons[i][2]),
      map: map
    });

    center[0] += persons[i][1] * persons[i][3];
    center[1] += persons[i][2] * persons[i][3];
    totalweight += persons[i][3];

    bounds.extend(marker.position);

    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        infowindow.setContent(persons[i][0]);
        infowindow.open(map, marker);
      }
    })(marker, i));

    markers.push(marker);
  }

  center[0] /= totalweight;
  center[1] /= totalweight;

  drawCenterOfMass('Center of Mass Prime', center[0], center[1], 'blue');
  drawCenterOfMass('Center of Mass 180', center[0], center[1]+180, 'pink');
  drawCenterOfMass('Center of Mass USA', center[0], center[1]-77, 'green');
  drawCenterOfMass('Center of Mass LA', center[0], center[1]-118, 'purple');

  for (i = 0; i < centerOfMassLocus.length; i++) {
    centerOfMassLocus[i].lat = center[0];
  }
  var locus = new google.maps.Polyline({
      path: centerOfMassLocus,
      geodesic: false,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
  });
  locus.setMap(map);

  for (i = 0; i < meets.length; i++) {
    marker = new google.maps.Marker({
	position: new google.maps.LatLng(meets[i][2], meets[i][3]),
	map: map,
	icon: {
	    url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
	}
    });

    bounds.extend(marker.position);

    google.maps.event.addListener(marker, 'click', (function(marker, i) {
	return function() {
	    var text =
		`<div class="image-section">
                  <div class="section-style">
                    <img src="` + meets[i][1] +
		`" width="` + meets[i][4] +
		`" height="` + meets[i][5] +
                `"><p>` + meets[i][0] + `</p></div></div>`;
	    console.log(text);
            infowindow.setContent(text);
            infowindow.open(map, marker);
      }
    })(marker, i));
  }

  map.fitBounds(bounds);

  var listener = google.maps.event.addListener(map, "idle", function() {
    map.setZoom(2);
    google.maps.event.removeListener(listener);
  });

    heatmap = new google.maps.visualization.HeatmapLayer({
        data: getPoints(),
        map: map
    });
}

function loadScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBPiGF_amHt8-0fWOgkKQRKaAAcsDzv_L8&libraries=visualization&v=3.exp&' + 'callback=initialize';
//  script.src = 'https://maps.googleapis.com/maps/api/js?libraries=visualization&v=3.exp&' + 'callback=initialize';
  document.body.appendChild(script);
}

window.onload = loadScript;
