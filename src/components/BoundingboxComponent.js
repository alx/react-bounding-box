'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

require('styles//Boundingbox.css');

class BoundingboxComponent extends React.Component {

  state = {
    canvasCreated: false,
    hoverIndex: -1
  };

  renderBox(index, box, selected) {

    let canvas = ReactDOM.findDOMNode(this.refs.canvasImage);
    let ctx = canvas.getContext('2d');

    let [x, y, width, height] = box;

    let colorStyle = this.props.options.color_normal;
    if(this.state.hoverIndex >= 0) {
      colorStyle = this.props.options.color_unselected;
    }
    if(selected) {
      colorStyle = this.props.options.color_selected;
    }

    let lineWidth = 2;
    if(canvas.width > 600)
      lineWidth = 3;
    if(canvas.width > 1000)
      lineWidth = 5;

    if(x < lineWidth / 2)
      x = lineWidth / 2;
    if(y < lineWidth / 2)
      y = lineWidth / 2;

    /* TODO: re-implement item.meta.size with canvas size
    const item = this.props.item;
    if((x + width) > item.meta.width)
      width = item.meta.width - lineWidth - x;
    if((y + height) > item.meta.height)
      height = item.meta.height - lineWidth - y;
    */

    // Left segment
    ctx.strokeStyle = colorStyle;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(x + width / 10, y);
    ctx.lineTo(x, y);
    ctx.lineTo(x, y + height);
    ctx.lineTo(x + width / 10, y + height);
    ctx.stroke();

    // Right segment
    ctx.beginPath();
    ctx.moveTo(x + 9 * width / 10, y);
    ctx.lineTo(x + width, y);
    ctx.lineTo(x + width, y + height);
    ctx.lineTo(x + 9 * width / 10, y + height);
    ctx.stroke();

    /* uncomment to DEBUG
    ctx.font = "30px Arial";
    ctx.fillStyle = 'rgba(225,0,0,1)';
    ctx.fillText(this.props.boxids[index].map(i => i.slice(0, 2)).join(','), x,y+height);
    ctx.fillStyle = 'rgba(0,0,225,1)';
    ctx.fillText(index,x+width,y);
    */
  }

  renderBoxes() {
    this.props.boxes
      .map((box, index) => {
        const selected = index == this.state.hoverIndex;
        return {box: box, index: index, selected: selected};
      })
      .sort((a) => {
        return a.selected ? 1 : -1;
      })
      .forEach(box => this.renderBox(box.index, box.box, box.selected));
  }

  componentWillReceiveProps() {
    let canvas = ReactDOM.findDOMNode(this.refs.canvasImage);
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let background = new Image();
    background.src = this.props.image.url;
    ctx.drawImage(background,0,0);
    return true;
  }

  shouldComponentUpdate() {
      return true;
  }

  componentDidMount() {
    let canvas = ReactDOM.findDOMNode(this.refs.canvasImage);
    let ctx = canvas.getContext('2d');

    canvas.width = this.props.image.width;
    canvas.height = this.props.image.height;

    let background = new Image();
    background.src = this.props.image.url;

    // Make sure the image is loaded first otherwise nothing will draw.
    background.onload = (() => {
      ctx.drawImage(background,0,0);
      this.renderBoxes();

      canvas.onmousemove = ((e) => {

        this.setState({hoverIndex: -1});

        // Get the current mouse position
        const r = canvas.getBoundingClientRect();
        const scaleX = canvas.width / r.width;
        const scaleY = canvas.height / r.height;
        const x = (e.clientX - r.left) * scaleX;
        const y = (e.clientY - r.top) * scaleY;

        //ctx.clearRect(0, 0, canvas.width, canvas.height);

        let selectedBox = {index: -1, dimensions: null};
        for(var i = this.props.boxes.length - 1, b; b = this.props.boxes[i]; i--) {
          const [bx, by, bw, bh] = b;

          if(x >= bx && x <= bx + bw &&
             y >= by && y <= by + bh) {
              // The mouse honestly hits the rect
              const insideBox = !selectedBox.dimensions || (
                bx >= selectedBox.dimensions[0] &&
                bx <= selectedBox.dimensions[0] + selectedBox.dimensions[2] &&
                by >= selectedBox.dimensions[1] &&
                by <= selectedBox.dimensions[1] + selectedBox.dimensions[3]
              );
              if(insideBox) {
                selectedBox.index = i;
                selectedBox.dimensions = b;
              }
          }
        }

        this.setState({hoverIndex: selectedBox.index});

        // Draw the rectangles by Z (ASC)
        this.renderBoxes();
      });

      canvas.onmouseout = () => {
        this.setState({hoverIndex: -1});
        //this.renderBoxes();
      };
    });
  }

  componentDidUpdate() {
    this.renderBoxes();
  }

  render() {
    return (
      <div className="boundingbox-component">
        <canvas ref="canvasImage"/>
      </div>
    );
  }
}

//BoundingboxComponent.displayName = 'BoundingboxComponent';

// Uncomment properties you need
BoundingboxComponent.propTypes = {
  image: React.PropTypes.shape({
    url: React.PropTypes.string,
    width: React.PropTypes.number,
    height: React.PropTypes.number
  }),
  boxes: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.array),
    React.PropTypes.arrayOf(React.PropTypes.object)
  ]),
  options: React.PropTypes.shape({
    color_normal: React.PropTypes.string,
    color_selected: React.PropTypes.string,
    color_unselected: React.PropTypes.string
  })
};
// BoundingboxComponent.defaultProps = {};

export default BoundingboxComponent;
