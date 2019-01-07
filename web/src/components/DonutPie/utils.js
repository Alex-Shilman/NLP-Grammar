
export const pieTop = (d, rx, ry, ir ) => {
  if(d.endAngle - d.startAngle === 0 ) return "M 0 0";
  const sx = rx*Math.cos(d.startAngle),
    sy = ry*Math.sin(d.startAngle),
    ex = rx*Math.cos(d.endAngle),
    ey = ry*Math.sin(d.endAngle);
  
  const ret =[];
  ret.push("M",sx,sy,"A",rx,ry,"0",(d.endAngle-d.startAngle > Math.PI? 1: 0),"1",ex,ey,"L",ir*ex,ir*ey);
  ret.push("A",ir*rx,ir*ry,"0",(d.endAngle-d.startAngle > Math.PI? 1: 0), "0",ir*sx,ir*sy,"z");
  return ret.join(" ");
}

export const pieOuter = (d, rx, ry, h ) => {
  const startAngle = (d.startAngle > Math.PI ? Math.PI : d.startAngle);
  const endAngle = (d.endAngle > Math.PI ? Math.PI : d.endAngle);
  
  const sx = rx*Math.cos(startAngle),
    sy = ry*Math.sin(startAngle),
    ex = rx*Math.cos(endAngle),
    ey = ry*Math.sin(endAngle);
  
  const ret =[];
  ret.push("M",sx,h+sy,"A",rx,ry,"0 0 1",ex,h+ey,"L",ex,ey,"A",rx,ry,"0 0 0",sx,sy,"z");
  return ret.join(" ");
}

export const pieInner = (d, rx, ry, h, ir ) => {
  const startAngle = (d.startAngle < Math.PI ? Math.PI : d.startAngle);
  const endAngle = (d.endAngle < Math.PI ? Math.PI : d.endAngle);
  
  const sx = ir*rx*Math.cos(startAngle),
    sy = ir*ry*Math.sin(startAngle),
    ex = ir*rx*Math.cos(endAngle),
    ey = ir*ry*Math.sin(endAngle);
  
  const ret =[];
  ret.push("M",sx, sy,"A",ir*rx,ir*ry,"0 0 1",ex,ey, "L",ex,h+ey,"A",ir*rx, ir*ry,"0 0 0",sx,h+sy,"z");
  return ret.join(" ");
}

export const getPercent = (d) => {
  return (d.endAngle-d.startAngle > 0.2 ?
    Math.round(1000*(d.endAngle-d.startAngle)/(Math.PI*2))/10+'%' : '');
}

export const generateRandomData = data => data.map(d => ({
  label: d.label,
  value: 1000*Math.random(),
  color: d.color
}));