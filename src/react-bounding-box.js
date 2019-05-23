/* global Image */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import seedrandom from 'seedrandom';

class Boundingbox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      canvasCreated: false,
      hoverIndex: -1,
      segmentColors: []
    };

    if(props.segmentationJsonUrl) {
      fetch(props.segmentationJsonUrl)
      .then(response => response.json())
      .then(response => {

        if(response.body &&
           response.body.predictions &&
           response.body.predictions[0] &&
           response.body.predictions[0].vals &&
           response.body.predictions[0].vals.length > 0) {

          this.setState({isSegmented: false});
          this.renderSegmentation(response.body.predictions[0].vals);

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

      const hasSegmentedState = this.state.pixelSegmentation &&
         this.state.pixelSegmentation.length > 0 &&
         !this.state.isSegmented;

      const hasSegmentedProps = this.props.pixelSegmentation &&
         this.props.pixelSegmentation.length > 0 &&
         !this.state.isSegmented;

      const hasSegmentionMasks = this.props.segmentationMasks &&
         this.props.segmentationMasks.length > 0 &&
         !this.state.isSegmented;

      if(hasSegmentedState)
        this.renderSegmentation(this.state.pixelSegmentation);

      if(hasSegmentedProps)
        this.renderSegmentation(this.props.pixelSegmentation);

      if(hasSegmentionMasks)
        this.renderSegmentationMasks();

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

            if(!box || typeof box === 'undefined')
              return null;

            const coord = box.coord ? box.coord : box;

            let [bx, by, bw, bh] = [0, 0, 0, 0]
            if (coord.xmin) {
              [bx, by, bw, bh] = [coord.xmin, coord.ymax, coord.xmax - coord.xmin, coord.ymin - coord.ymax];
            } else {
              [bx, by, bw, bh] = coord;
            }

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
    if(nextProps.pixelSegmentation || nextProps.segmentationMasks) {
      this.setState({
        isSegmented: false
      });
    }
    return true;
  }

  componentDidUpdate() {
    this.renderBoxes();
  }

  segmentColor(classIndex) {

    let segmentColors = this.state.segmentColors;

    if(segmentColors[classIndex] &&
      segmentColors[classIndex].length === 3) {
      return segmentColors[classIndex];
    }

    let r;
    let g;
    let b;

    if(this.props.segmentationColors &&
       this.props.segmentationColors[classIndex]) {
      const hex = this.props.segmentationColors[classIndex];
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      r = parseInt(result[1], 16);
      g = parseInt(result[2], 16);
      b = parseInt(result[3], 16);
    } else {
      const random = seedrandom(classIndex);
      r = Math.floor(random() * 255);
      g = Math.floor(random() * 255);
      b = Math.floor(random() * 255);
    }

    segmentColors[classIndex] = [r, g, b];
    this.setState({segmentColors: segmentColors});

    return [r, g, b];
  };

  renderBox(box, index) {

    if(!box || typeof box === 'undefined')
      return null;

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
  }

  renderSegmentation(segmentation) {

    let ctx = null;
    let imgd = null;

    if(this.props.separateSegmentation && this.segCanvas) {

      this.segCanvas.width = this.canvas.width;
      this.segCanvas.height = this.canvas.height;
      ctx = this.segCanvas.getContext('2d');
      imgd = ctx.getImageData(0, 0, this.segCanvas.width, this.segCanvas.height);
      let pix = imgd.data;

      for (var i = 0, j = 0, n = pix.length; i <n; i += 4, j += 1) {
          const segmentClass = segmentation[j];
          const segmentColor = this.segmentColor(segmentClass);
          pix[i]     = segmentColor[0];
          pix[i + 1] = segmentColor[1];
          pix[i + 2] = segmentColor[2];
          pix[i + 3] = 255;
      }

    } else {

      ctx = this.canvas.getContext('2d');
      imgd = ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
      let pix = imgd.data;

      for (var i = 0, j = 0, n = pix.length; i <n; i += 4, j += 1) {
          const segmentClass = segmentation[j];
          const segmentColor = this.segmentColor(segmentClass);
          pix[i] = Math.round((pix[i] + segmentColor[0]) / 2);
          pix[i + 1] = Math.round((pix[i + 1] + segmentColor[1]) / 2);
          pix[i + 2] = Math.round((pix[i + 2] + segmentColor[2]) / 2);
          pix[i + 3] = 200;
      }

    }

    ctx.putImageData(imgd, 0, 0);
    this.setState({isSegmented: true});
  }

  renderSegmentationMasks() {

    const {
      boxes,
      segmentationMasks,
      segmentationTransparency
    } = this.props;

    this.segCanvas.width = this.canvas.width;
    this.segCanvas.height = this.canvas.height;
    const ctx = this.segCanvas.getContext('2d');

    segmentationMasks.forEach((mask, index) => {

      // Fetch segment color,
      // using box label or current mask index
      const segmentColor = this.segmentColor(boxes[index].label ? boxes[index].label : index);

      // Fetch image data
      // using the box coordinates
      // and the mask dimensions
      const maskData = ctx.getImageData(
        parseInt(boxes[index].xmin, 10),
        parseInt(boxes[index].ymin, 10),
        mask.width,
        mask.height
      );

      // Fill image data with new mask color
      for (let i = 0, j = 0; i < maskData.data.length; j++, i += 4) {
        if(mask.data[j] > 0) {
          maskData.data[i]     = segmentColor[0];
          maskData.data[i + 1] = segmentColor[1];
          maskData.data[i + 2] = segmentColor[2];
          maskData.data[i + 3] = segmentationTransparency;
        }
      }

      // Put new mask data on displayed canvas
      ctx.putImageData(
        maskData,
        parseInt(boxes[index].xmin, 10),
        parseInt(boxes[index].ymin, 10),
        0,
        0,
        mask.width,
        mask.height
      );
    });

    this.setState({isSegmented: true});
  }

  render() {

    return <div className={this.props.className}>
      <canvas
        className="boundingBoxCanvas"
        style={this.props.options.style}
        ref={(canvas) => {
          this.canvas = canvas;
        }}
      />
      { this.props.separateSegmentation ?
        <canvas
          className="boundingSegmentationCanvas"
          style={this.props.options.style}
          ref={(canvas) => {
            this.segCanvas = canvas;
          }}
        />
        : null
      }
    </div>;
  }
}

Boundingbox.propTypes = {
  image: PropTypes.string,
  boxes: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.array),
    PropTypes.arrayOf(PropTypes.object),
  ]),
  separateSegmentation: PropTypes.bool,
  segmentationJsonUrl: PropTypes.string,
  segmentationColors: PropTypes.array,
  segmentationMasks: PropTypes.array,
  segmentationTransparency: PropTypes.number,
  selectedIndex: PropTypes.number,
  drawBox: PropTypes.func,
  drawLabel: PropTypes.func,
  onSelected: PropTypes.func,
  options: PropTypes.shape({
    colors: PropTypes.shape({
      normal: PropTypes.string,
      selected: PropTypes.string,
      unselected: PropTypes.string,
    }),
    style: PropTypes.object,
  }),
};

Boundingbox.defaultProps = {

  separateSegmentation: false,
  segmentationTransparency: 190,
  onSelected() {},
  drawBox(canvas, box, color, lineWidth) {

    if(!box || typeof box === 'undefined')
      return null;

    const ctx = canvas.getContext('2d');

    const coord = box.coord ? box.coord : box;

    let [x, y, width, height] = [0, 0, 0, 0]
    if (coord.xmin) {
      [x, y, width, height] = [coord.xmin, coord.ymax, coord.xmax - coord.xmin, coord.ymin - coord.ymax];
    } else {
      [x, y, width, height] = coord;
    }

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

    if(!box || typeof box === 'undefined')
      return null;

    const ctx = canvas.getContext('2d');

    const coord = box.coord ? box.coord : box;

    let [x, y, width, height] = [0, 0, 0, 0]
    if (coord.xmin) {
      [x, y, width, height] = [coord.xmin, coord.ymax, coord.xmax - coord.xmin, coord.ymin - coord.ymax];
    } else {
      [x, y, width, height] = coord;
    }

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
  }
}

export default Boundingbox;
