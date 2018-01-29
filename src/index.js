/* global Image */

import React from 'react';
import seedrandom from 'seedrandom';

class Boundingbox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      canvasCreated: false,
      hoverIndex: -1,
    };

    if(props.segmentationJson) {
      fetch(props.segmentationJson)
      .then(response => response.json())
      .then(response => {

        if(response.body &&
           response.body.predictions &&
           response.body.predictions[0] &&
           response.body.predictions[0].vals &&
           response.body.predictions[0].vals.length > 0) {

          this.setState({
            pixelSegmentation: response.body.predictions[0].vals,
            isSegmented: false
          });

        }
      });
    }
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

        if(this.props.boxes &&
           this.props.boxes.length > 0) {

          this.props.boxes.forEach((box, index) => {
            const coord = box.coord ? box.coord : box;
            const [bx, by, bw, bh] = coord;

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

        }
        else if(this.state.pixelSegmentation &&
                this.state.pixelSegmentation.length > 0) {
          selectedBox.index = this.state.pixelSegmentation[x + this.canvas.width * y];
        }

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
    this.setState({ hoverIndex: nextProps.selectedIndex });
    return true;
  }

  componentDidUpdate() {
    this.renderBoxes();
  }

  segmentColor(classIndex) {
    const random = seedrandom(classIndex);
    const r = Math.floor(random() * 255);
    const g = Math.floor(random() * 255);
    const b = Math.floor(random() * 255);
    return [r, g, b];
  };

  renderBox(box, index) {
    let color = this.props.options.colors.normal;
    if (this.state.hoverIndex >= 0) {
      color = this.props.options.colors.unselected;
    }
    if (index === this.state.hoverIndex) {
      color = this.props.options.colors.selected;
    }

    let lineWidth = 2;
    if (this.canvas.width > 600) { lineWidth = 3; }
    if (this.canvas.width > 1000) { lineWidth = 5; }

    this.props.drawBox(this.canvas, box, color, lineWidth);
    if(box.label) { this.props.drawLabel(this.canvas, box) };
  }

  renderBoxes() {
    if(this.props.boxes &&
       this.props.boxes.length > 0) {

      this.props.boxes
        .map((box, index) => {
          const selected = index === this.state.hoverIndex;
          return { box, index, selected };
        })
        .sort((a) => {
          return a.selected ? 1 : -1;
        })
        .forEach(box => this.renderBox(box.box, box.index));
    }
    else if(this.state.pixelSegmentation &&
            this.state.pixelSegmentation.length > 0 &&
            !this.state.isSegmented
           ) {

      const ctx = this.canvas.getContext('2d');
      var imgd = ctx.getImageData(0, 0, this.canvas.width, this.canvas.height),
          pix = imgd.data;

      for (var i = 0, j = 0, n = pix.length; i <n; i += 4, j += 1) {
          const segmentClass = this.state.pixelSegmentation[j];
          const segmentColor = this.segmentColor(segmentClass);
          pix[i] = Math.round((pix[i] + segmentColor[0]) / 2);
          pix[i + 1] = Math.round((pix[i + 1] + segmentColor[1]) / 2);
          pix[i + 2] = Math.round((pix[i + 2] + segmentColor[2]) / 2);
          pix[i + 3] = 200;
      }

      ctx.putImageData(imgd, 0, 0);
      this.setState({isSegmented: true});
    }
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
  segmentationJson: React.PropTypes.string,
  selectedIndex: React.PropTypes.number,
  drawBox: React.PropTypes.func,
  drawLabel: React.PropTypes.func,
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
  onSelected() {},
  drawBox(canvas, box, color, lineWidth) {
    const ctx = canvas.getContext('2d');

    const coord = box.coord ? box.coord : box;
    let [x, y, width, height] = coord;

    if (x < lineWidth / 2) { x = lineWidth / 2; }
    if (y < lineWidth / 2) { y = lineWidth / 2; }

    if ((x + width) > canvas.width) { width = canvas.width - lineWidth - x; }
    if ((y + height) > canvas.height) { height = canvas.height - lineWidth - y; }

    // Left segment
    const tenPercent = width / 10;
    const ninetyPercent = 9 * tenPercent;
    ctx.strokeStyle = color;
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
  },
  drawLabel(canvas, box) {
    const ctx = canvas.getContext('2d');

    let [x, y, width, height] = box.coord;

    ctx.font = '60px Arial';
    ctx.fillStyle = 'rgba(225,0,0,1)';
    ctx.fillText(box.label, x, y + height);
  },
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
