/* global Image */

import React from 'react';

class Boundingbox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      canvasCreated: false,
      hoverIndex: -1,
    };
  }

  componentDidMount() {
    const ctx = this.canvas.getContext('2d');

    const background = new Image();
    background.src = this.props.image;

    // Make sure the image is loaded first otherwise nothing will draw.
    background.onload = (() => {
      this.canvas.width = background.width;
      this.canvas.height = background.height;

      ctx.drawImage(background, 0, 0);
      this.renderBoxes();

      this.canvas.onmousemove = ((e) => {
        // Get the current mouse position
        const r = this.canvas.getBoundingClientRect();
        const scaleX = this.canvas.width / r.width;
        const scaleY = this.canvas.height / r.height;
        const x = (e.clientX - r.left) * scaleX;
        const y = (e.clientY - r.top) * scaleY;

        // ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const selectedBox = { index: -1, dimensions: null };
        this.props.boxes.forEach((box, index) => {
          const [bx, by, bw, bh] = box;

          if (x >= bx && x <= bx + bw &&
             y >= by && y <= by + bh) {
              // The mouse honestly hits the rect
            const insideBox = !selectedBox.dimensions || (
                bx >= selectedBox.dimensions[0] &&
                bx <= selectedBox.dimensions[0] + selectedBox.dimensions[2] &&
                by >= selectedBox.dimensions[1] &&
                by <= selectedBox.dimensions[1] + selectedBox.dimensions[3]
              );
            if (insideBox) {
              selectedBox.index = index;
              selectedBox.dimensions = box;
            }
          }
        });

        this.props.onSelected(selectedBox.index);
        this.setState({ hoverIndex: selectedBox.index });
      });

      this.canvas.onmouseout = () => {
        this.props.onSelected(-1);
        this.setState({ hoverIndex: -1 });
        // this.renderBoxes();
      };
    });
  }

  componentWillReceiveProps(nextProps) {
    const ctx = this.canvas.getContext('2d');
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const background = new Image();
    background.src = this.props.image;
    ctx.drawImage(background, 0, 0);
    this.setState({hoverIndex: nextProps.selectedIndex});
    return true;
  }

  componentDidUpdate() {
    this.renderBoxes();
  }


  renderBox(index, box, selected) {
    const ctx = this.canvas.getContext('2d');

    let [x, y, width, height] = box;

    let colorStyle = this.props.options.colors.normal;
    if (this.state.hoverIndex >= 0) {
      colorStyle = this.props.options.colors.unselected;
    }
    if (selected) {
      colorStyle = this.props.options.colors.selected;
    }

    let lineWidth = 2;
    if (this.canvas.width > 600) { lineWidth = 3; }
    if (this.canvas.width > 1000) { lineWidth = 5; }

    if (x < lineWidth / 2) { x = lineWidth / 2; }
    if (y < lineWidth / 2) { y = lineWidth / 2; }

    if ((x + width) > this.canvas.width) { width = this.canvas.width - lineWidth - x; }
    if ((y + height) > this.canvas.height) { height = this.canvas.height - lineWidth - y; }

    // Left segment
    const tenPercent = width / 10;
    const ninetyPercent = 9 * tenPercent;
    ctx.strokeStyle = colorStyle;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(x + tenPercent, y);
    ctx.lineTo(x, y);
    ctx.lineTo(x, y + height);
    ctx.lineTo(x + tenPercent, y + height);
    ctx.stroke();

    // Right segment
    ctx.beginPath();
    ctx.moveTo(x + ninetyPercent, y);
    ctx.lineTo(x + width, y);
    ctx.lineTo(x + width, y + height);
    ctx.lineTo(x + ninetyPercent, y + height);
    ctx.stroke();

    /* uncomment to DEBUG
    ctx.font = "30px Arial";
    ctx.fillStyle = 'rgba(225,0,0,1)';
    //ctx.fillText(this.props.boxids[index].map(i => i.slice(0, 2)).join(','), x,y+height);
    ctx.fillStyle = 'rgba(0,0,225,1)';
    ctx.fillText(index,x+width,y);
  */
  }

  renderBoxes() {
    this.props.boxes
      .map((box, index) => {
        const selected = index === this.state.hoverIndex;
        return {box: box, index: index, selected: selected};
      })
      .sort((a) => {
        return a.selected ? 1 : -1;
      })
      .forEach(box => this.renderBox(box.index, box.box, box.selected));
  }


  render() {
    return (
      <canvas
        style={this.props.options.style}
        ref={(canvas) => {
          this.canvas = canvas;
        }}
      />
    );
  }
}

Boundingbox.displayName = 'Boundingbox';

// Uncomment properties you need
Boundingbox.propTypes = {
  image: React.PropTypes.string,
  boxes: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.array),
    React.PropTypes.arrayOf(React.PropTypes.object),
  ]),
  selectedIndex: React.PropTypes.number,
  onSelected: React.PropTypes.func,
  options: React.PropTypes.shape({
    colors: React.PropTypes.shape({
      normal: React.PropTypes.string,
      selected: React.PropTypes.string,
      unselected: React.PropTypes.string,
    }),
    style: React.PropTypes.object,
  }),
};

Boundingbox.defaultProps = {
  options: {
    colors: {
      normal: 'rgba(255,225,255,1)',
      selected: 'rgba(0,225,204,1)',
      unselected: 'rgba(100,100,100,1)',
    },
    style: {
      maxWidth: '100%',
      maxHeight: '90vh',
    },
  },
};

export default Boundingbox;
