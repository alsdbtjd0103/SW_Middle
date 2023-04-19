export async function Centroid_Algorithm(locations) {
    if (locations.length<3){
        return {
            x:(locations[0][0]+locations[1][0])/2,
            y:(locations[0][1]+locations[1][1])/2
        }
    }
    
  var area = 0,
    cx = 0,
    cy = 0;

  for (var i = 0; i < locations.length; i++) {
    var j = (i + 1) % locations.length;
    var loc1 = locations[i];
    var loc2 = locations[j];

    var x1 = loc1[0],
      x2 = loc2[0];

    var y1 = loc1[1],
      y2 = loc2[1];

    area += x1 * y2;
    area -= y1 * x2;

    cx += (x1 + x2) * (x1 * y2 - x2 * y1);
    cy += (y1 + y2) * (x1 * y2 - x2 * y1);
  }
  area /= 2;
  area = Math.abs(area);

  cx = cx / (locations.length* area);
  cy = cy / (locations.length* area);

  return {
    x: Math.abs(cx)/2,
    y: Math.abs(cy)/2,
  };
}

export async function Average_Algorithm(locations){
  var x=0,y=0;
  locations.map((location) => {
    x+=location[0];
    y+=location[1]
  });
  return{
    x:Math.abs(x/locations.length),
    y:Math.abs(y/locations.length),
  }
}




