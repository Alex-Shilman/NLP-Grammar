import React, { Component } from 'react';
import * as d3 from 'd3';
import { pieTop, pieOuter, pieInner, getPercent, generateRandomData } from './utils';

class Slices extends Component {
  state = {
    selected: null
  }
  
  donutSlices = React.createRef();
  
  componentDidMount() {
    this.draw(150, 150, 130, 100, 30, 0.4);
  }
  
  generateLayoutPieData = () => {
    const { data } = this.props;
    return d3.layout.pie().sort(null).value(function(d) {return d.value;})(generateRandomData(data));
  };
  
  draw = (x /*center x*/, y/*center y*/, rx/*radius x*/, ry/*radius y*/, h/*height*/, ir/*inner radius*/) => {
    const { setCurrentData } = this.props;
    const _data = this.generateLayoutPieData();
    const slices = d3.select(this.donutSlices.current);
    const innerSlices = slices.selectAll(".innerSlice");
    const topSlices = slices.selectAll(".topSlice");
    const outerSlices = slices.selectAll(".outerSlice");
    const percentSlices = slices.selectAll(".percent");
    
    innerSlices.data(_data).enter().append("path").attr("class", "innerSlice")
      .style("fill", function(d) { return d3.hsl(d.data.color).darker(0.7); })
      .attr("d",function(d){ return pieInner(d, rx+0.5,ry+0.5, h, ir);})
      .each(function(d){setCurrentData(d);});
  
    topSlices.data(_data).enter().append("path").attr("class", "topSlice")
      .style("fill", function(d) { return d.data.color; })
      .style("stroke", function(d) { return d.data.color; })
      .attr("d",function(d){ return pieTop(d, rx, ry, ir);})
      .each(function(d){setCurrentData(d)});
  
    outerSlices.data(_data).enter().append("path").attr("class", "outerSlice")
      .style("fill", function(d) { return d3.hsl(d.data.color).darker(0.7); })
      .attr("d",function(d){ return pieOuter(d, rx-.5,ry-.5, h);})
      .each(function(d){setCurrentData(d)});
  
    percentSlices.data(_data).enter().append("text").attr("class", "percent")
      .attr("x",function(d){ return 0.6*rx*Math.cos(0.5*(d.startAngle+d.endAngle));})
      .attr("y",function(d){ return 0.6*ry*Math.sin(0.5*(d.startAngle+d.endAngle));})
      .text(getPercent).each(function(d){setCurrentData(d)});
  };
  
  transition = (rx, ry, h, ir) => {
    const { setCurrentData, getCurrentData } = this.props;
    
    function arcTweenInner(a) {
      const i = d3.interpolate(getCurrentData(), a);
      setCurrentData(i(0));
      return function(t) { return pieInner(i(t), rx+0.5, ry+0.5, h, ir);  };
    }
    
    function arcTweenTop(a) {
      const i = d3.interpolate(getCurrentData(), a);
      setCurrentData(i(0));
      return function(t) { return pieTop(i(t), rx, ry, ir);  };
    }
    function arcTweenOuter(a) {
      const i = d3.interpolate(getCurrentData(), a);
      setCurrentData(i(0));
      return function(t) { return pieOuter(i(t), rx-.5, ry-.5, h);  };
    }
    
    function textTweenX(a) {
      const i = d3.interpolate(getCurrentData(), a);
      setCurrentData(i(0));
      return function(t) { return 0.6*rx*Math.cos(0.5*(i(t).startAngle+i(t).endAngle));  };
    }
    
    function textTweenY(a) {
      const i = d3.interpolate(getCurrentData(), a);
      setCurrentData(i(0));
      return function(t) { return 0.6*rx*Math.sin(0.5*(i(t).startAngle+i(t).endAngle));  };
    }

    const _data = this.generateLayoutPieData();
    const slices = d3.select(this.donutSlices.current);
    const innerSlices = slices.selectAll(".innerSlice");
    const topSlices = slices.selectAll(".topSlice");
    const outerSlices = slices.selectAll(".outerSlice");
    const percentSlices = slices.selectAll(".percent");
  
    innerSlices.data(_data)
      .transition().duration(750).attrTween("d", arcTweenInner);
  
    topSlices.data(_data)
      .transition().duration(750).attrTween("d", arcTweenTop);
  
    outerSlices.data(_data)
      .transition().duration(750).attrTween("d", arcTweenOuter);
  
    percentSlices.data(_data).transition().duration(750)
      .attrTween("x",textTweenX).attrTween("y",textTweenY).text(getPercent);
  };
  
  handleClick = (e) => {
    e.preventDefault();
    const selectedData = e.target.__data__;
    if (selectedData) {
      this.setState({ selected: selectedData});
      this.props.navigateTo(selectedData.data.label);
    }
    // this.transition(130, 100, 30, 0.4);
  };
  
  render() {
    return (
      <g
        transform="translate(150,150)"
        ref={this.donutSlices}
        onClick={this.handleClick}
        style={{cursor:'pointer'}}
      />
    )
  }
}

export default Slices;