'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _seedrandom = require('seedrandom');

var _seedrandom2 = _interopRequireDefault(_seedrandom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Boundingbox = function (_Component) {
  (0, _inherits3.default)(Boundingbox, _Component);

  function Boundingbox(props) {
    (0, _classCallCheck3.default)(this, Boundingbox);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Boundingbox.__proto__ || (0, _getPrototypeOf2.default)(Boundingbox)).call(this, props));

    _this.state = {
      canvasCreated: false,
      hoverIndex: -1,
      segmentColors: []
    };

    if (props.segmentationJsonUrl) {
      fetch(props.segmentationJsonUrl).then(function (response) {
        return response.json();
      }).then(function (response) {

        if (response.body && response.body.predictions && response.body.predictions[0] && response.body.predictions[0].vals && response.body.predictions[0].vals.length > 0) {

          _this.setState({ isSegmented: false });
          _this.renderSegmentation(response.body.predictions[0].vals);
        }
      });
    }
    return _this;
  }

  (0, _createClass3.default)(Boundingbox, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var ctx = this.canvas.getContext('2d');

      var background = new Image();
      background.src = this.props.options.base64Image ? 'data:image/png;base64,' + this.props.image : this.props.image;

      // Make sure the image is loaded first otherwise nothing will draw.
      background.onload = function () {
        _this2.canvas.width = background.width;
        _this2.canvas.height = background.height;

        ctx.drawImage(background, 0, 0);
        _this2.renderBoxes();

        var hasSegmentedState = _this2.state.pixelSegmentation && _this2.state.pixelSegmentation.length > 0 && !_this2.state.isSegmented;

        var hasSegmentedProps = _this2.props.pixelSegmentation && _this2.props.pixelSegmentation.length > 0 && !_this2.state.isSegmented;

        var hasSegmentionMasks = _this2.props.segmentationMasks && _this2.props.segmentationMasks.length > 0 && !_this2.state.isSegmented;

        if (hasSegmentedState) _this2.renderSegmentation(_this2.state.pixelSegmentation);

        if (hasSegmentedProps) _this2.renderSegmentation(_this2.props.pixelSegmentation);

        if (hasSegmentionMasks) _this2.renderSegmentationMasks();

        _this2.canvas.onmousemove = function (e) {
          // Get the current mouse position
          var r = _this2.canvas.getBoundingClientRect();
          var scaleX = _this2.canvas.width / r.width;
          var scaleY = _this2.canvas.height / r.height;
          var x = (e.clientX - r.left) * scaleX;
          var y = (e.clientY - r.top) * scaleY;

          // ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

          var selectedBox = { index: -1, dimensions: null };

          if (_this2.props.boxes && _this2.props.boxes.length > 0) {

            _this2.props.boxes.forEach(function (box, index) {

              if (!box || typeof box === 'undefined') return null;

              var coord = box.coord ? box.coord : box;

              var bx = 0,
                  by = 0,
                  bw = 0,
                  bh = 0;


              if (typeof coord.xmin !== 'undefined' && typeof coord.xmax !== 'undefined' && typeof coord.ymin !== 'undefined' && typeof coord.ymax !== 'undefined') {
                var _ref = [Math.min(coord.xmin, coord.xmax), Math.min(coord.ymin, coord.ymax), Math.max(coord.xmin, coord.xmax) - Math.min(coord.xmin, coord.xmax), Math.max(coord.ymin, coord.ymax) - Math.min(coord.ymin, coord.ymax)];

                // coord is an object containing xmin, xmax, ymin, ymax attributes
                // width is absolute value of (xmax - xmin)
                // height is absolute value of (ymax - ymin)
                // absolute value takes care of various possible referentials:
                //   - sometimes 0,0 is top-left corner
                //   - sometimes 0,0 is bottom-left corner

                bx = _ref[0];
                by = _ref[1];
                bw = _ref[2];
                bh = _ref[3];
              } else {
                var _coord = (0, _slicedToArray3.default)(coord, 4);

                // coord is an array containing [x, y, width, height] values


                bx = _coord[0];
                by = _coord[1];
                bw = _coord[2];
                bh = _coord[3];
              }

              if (x >= bx && x <= bx + bw && y >= by && y <= by + bh) {
                // The mouse honestly hits the rect
                var insideBox = !selectedBox.dimensions || bx >= selectedBox.dimensions[0] && bx <= selectedBox.dimensions[0] + selectedBox.dimensions[2] && by >= selectedBox.dimensions[1] && by <= selectedBox.dimensions[1] + selectedBox.dimensions[3];
                if (insideBox) {
                  selectedBox.index = index;
                  selectedBox.dimensions = box;
                }
              }
            });
          } else if (_this2.state.pixelSegmentation && _this2.state.pixelSegmentation.length > 0) {
            selectedBox.index = _this2.state.pixelSegmentation[x + _this2.canvas.width * y];
          }

          _this2.props.onSelected(selectedBox.index);
          _this2.setState({ hoverIndex: selectedBox.index });
        };

        _this2.canvas.onmouseout = function () {
          _this2.props.onSelected(-1);
          _this2.setState({ hoverIndex: -1 });
          // this.renderBoxes();
        };
      };
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this3 = this;

      var ctx = this.canvas.getContext('2d');
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      if (this.segCanvas) {
        // Clean segCanvas when receiving new props
        var segCtx = this.segCanvas.getContext('2d');
        segCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }

      var background = new Image();
      background.src = nextProps.options.base64Image ? 'data:image/png;base64,' + this.props.image : nextProps.image;

      // Check canvas dimension with loaded image dimension
      // in order to change canvas dimension if needed
      background.onload = function () {

        if (_this3.canvas.width !== background.width && _this3.canvas.height !== background.height) {
          _this3.canvas.width = background.width;
          _this3.canvas.height = background.height;
          ctx.drawImage(background, 0, 0);
          _this3.renderBoxes(nextProps.boxes);
        }
      };

      ctx.drawImage(background, 0, 0);
      this.renderBoxes(nextProps.boxes);

      this.setState({ hoverIndex: nextProps.selectedIndex });

      var hasSegmentedProps = nextProps.pixelSegmentation && nextProps.pixelSegmentation.length > 0;

      if (hasSegmentedProps) {
        this.setState({ isSegmented: false });
        this.renderSegmentation(nextProps.pixelSegmentation);
      }

      return true;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.renderBoxes();
    }
  }, {
    key: 'segmentColor',
    value: function segmentColor(classIndex) {

      var segmentColors = this.state.segmentColors;

      if (segmentColors[classIndex] && segmentColors[classIndex].length === 3) {
        return segmentColors[classIndex];
      }

      var r = void 0;
      var g = void 0;
      var b = void 0;

      if (this.props.segmentationColors && this.props.segmentationColors[classIndex]) {
        var hex = this.props.segmentationColors[classIndex];
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        r = parseInt(result[1], 16);
        g = parseInt(result[2], 16);
        b = parseInt(result[3], 16);
      } else {
        var random = (0, _seedrandom2.default)(classIndex);
        r = Math.floor(random() * 255);
        g = Math.floor(random() * 255);
        b = Math.floor(random() * 255);
      }

      segmentColors[classIndex] = [r, g, b];
      this.setState({ segmentColors: segmentColors });

      return [r, g, b];
    }
  }, {
    key: 'renderBox',
    value: function renderBox(box, index) {

      if (!box || typeof box === 'undefined') return null;

      var color = this.props.options.colors.normal;
      if (this.state.hoverIndex >= 0) {
        color = this.props.options.colors.unselected;
      }
      if (index === this.state.hoverIndex) {
        color = this.props.options.colors.selected;
      }

      var lineWidth = 2;
      if (this.canvas.width > 600) {
        lineWidth = 3;
      }
      if (this.canvas.width > 1000) {
        lineWidth = 5;
      }

      this.props.drawBox(this.canvas, box, color, lineWidth);
      if (box.label) {
        this.props.drawLabel(this.canvas, box);
      };
    }
  }, {
    key: 'renderBoxes',
    value: function renderBoxes(boxes) {
      var _this4 = this;

      if (typeof boxes === 'undefined') boxes = this.props.boxes;

      if (boxes === null) boxes = [];

      boxes.map(function (box, index) {
        var selected = index === _this4.state.hoverIndex;
        return { box: box, index: index, selected: selected };
      }).sort(function (a) {
        return a.selected ? 1 : -1;
      }).forEach(function (box) {
        return _this4.renderBox(box.box, box.index);
      });
    }
  }, {
    key: 'renderSegmentation',
    value: function renderSegmentation(segmentation) {

      var ctx = null;
      var imgd = null;

      if (this.props.separateSegmentation && this.segCanvas) {

        this.segCanvas.width = this.canvas.width;
        this.segCanvas.height = this.canvas.height;
        ctx = this.segCanvas.getContext('2d');
        imgd = ctx.getImageData(0, 0, this.segCanvas.width, this.segCanvas.height);
        var pix = imgd.data;

        for (var i = 0, j = 0, n = pix.length; i < n; i += 4, j += 1) {
          var segmentClass = segmentation[j];
          var segmentColor = this.segmentColor(segmentClass);
          pix[i] = segmentColor[0];
          pix[i + 1] = segmentColor[1];
          pix[i + 2] = segmentColor[2];
          pix[i + 3] = 255;
        }
      } else {

        ctx = this.canvas.getContext('2d');
        imgd = ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        var _pix = imgd.data;

        for (var i = 0, j = 0, n = _pix.length; i < n; i += 4, j += 1) {
          var _segmentClass = segmentation[j];
          var _segmentColor = this.segmentColor(_segmentClass);
          _pix[i] = Math.round((_pix[i] + _segmentColor[0]) / 2);
          _pix[i + 1] = Math.round((_pix[i + 1] + _segmentColor[1]) / 2);
          _pix[i + 2] = Math.round((_pix[i + 2] + _segmentColor[2]) / 2);
          _pix[i + 3] = 200;
        }
      }

      ctx.putImageData(imgd, 0, 0);
      this.setState({ isSegmented: true });
    }
  }, {
    key: 'renderSegmentationMasks',
    value: function renderSegmentationMasks() {
      var _this5 = this;

      var _props = this.props,
          boxes = _props.boxes,
          segmentationMasks = _props.segmentationMasks,
          segmentationTransparency = _props.segmentationTransparency;


      this.segCanvas.width = this.canvas.width;
      this.segCanvas.height = this.canvas.height;
      var ctx = this.segCanvas.getContext('2d');

      segmentationMasks.forEach(function (mask, index) {

        // Fetch segment color,
        // using box label or current mask index
        var segmentColor = _this5.segmentColor(boxes[index].label ? boxes[index].label : index);

        // Fetch image data
        // using the box coordinates
        // and the mask dimensions
        var maskData = ctx.getImageData(parseInt(boxes[index].xmin, 10), parseInt(boxes[index].ymin, 10), mask.width, mask.height);

        // Fill image data with new mask color
        for (var i = 0, j = 0; i < maskData.data.length; j++, i += 4) {
          if (mask.data[j] > 0) {
            maskData.data[i] = segmentColor[0];
            maskData.data[i + 1] = segmentColor[1];
            maskData.data[i + 2] = segmentColor[2];
            maskData.data[i + 3] = segmentationTransparency;
          }
        }

        // Put new mask data on displayed canvas
        ctx.putImageData(maskData, parseInt(boxes[index].xmin, 10), parseInt(boxes[index].ymin, 10), 0, 0, mask.width, mask.height);
      });

      this.setState({ isSegmented: true });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this6 = this;

      return _react2.default.createElement(
        'div',
        { className: this.props.className },
        _react2.default.createElement('canvas', {
          className: 'boundingBoxCanvas',
          style: this.props.options.style,
          ref: function ref(canvas) {
            _this6.canvas = canvas;
          }
        }),
        this.props.separateSegmentation ? _react2.default.createElement('canvas', {
          className: 'boundingSegmentationCanvas',
          style: this.props.options.styleSegmentation,
          ref: function ref(canvas) {
            _this6.segCanvas = canvas;
          }
        }) : null
      );
    }
  }]);
  return Boundingbox;
}(_react.Component); /* global Image */

Boundingbox.propTypes = {
  image: _propTypes2.default.string,
  boxes: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.array), _propTypes2.default.arrayOf(_propTypes2.default.object)]),
  separateSegmentation: _propTypes2.default.bool,
  segmentationJsonUrl: _propTypes2.default.string,
  segmentationColors: _propTypes2.default.array,
  segmentationMasks: _propTypes2.default.array,
  segmentationTransparency: _propTypes2.default.number,
  selectedIndex: _propTypes2.default.number,
  drawBox: _propTypes2.default.func,
  drawLabel: _propTypes2.default.func,
  onSelected: _propTypes2.default.func,
  options: _propTypes2.default.shape({
    colors: _propTypes2.default.shape({
      normal: _propTypes2.default.string,
      selected: _propTypes2.default.string,
      unselected: _propTypes2.default.string
    }),
    style: _propTypes2.default.object,
    styleSegmentation: _propTypes2.default.object,
    base64Image: _propTypes2.default.bool
  })
};

Boundingbox.defaultProps = {

  boxes: [],
  separateSegmentation: false,
  segmentationTransparency: 190,
  onSelected: function onSelected() {},
  drawBox: function drawBox(canvas, box, color, lineWidth) {

    if (!box || typeof box === 'undefined') return null;

    var ctx = canvas.getContext('2d');

    var coord = box.coord ? box.coord : box;

    var x = 0,
        y = 0,
        width = 0,
        height = 0;


    if (typeof coord.xmin !== 'undefined' && typeof coord.xmax !== 'undefined' && typeof coord.ymin !== 'undefined' && typeof coord.ymax !== 'undefined') {
      var _ref2 = [Math.min(coord.xmin, coord.xmax), Math.min(coord.ymin, coord.ymax), Math.max(coord.xmin, coord.xmax) - Math.min(coord.xmin, coord.xmax), Math.max(coord.ymin, coord.ymax) - Math.min(coord.ymin, coord.ymax)];

      // coord is an object containing xmin, xmax, ymin, ymax attributes
      // width is absolute value of (xmax - xmin)
      // height is absolute value of (ymax - ymin)
      // absolute value takes care of various possible referentials:
      //   - sometimes 0,0 is top-left corner
      //   - sometimes 0,0 is bottom-left corner

      x = _ref2[0];
      y = _ref2[1];
      width = _ref2[2];
      height = _ref2[3];
    } else {
      var _coord2 = (0, _slicedToArray3.default)(coord, 4);

      // coord is an array containing [x, y, width, height] values


      x = _coord2[0];
      y = _coord2[1];
      width = _coord2[2];
      height = _coord2[3];
    }

    if (x < lineWidth / 2) {
      x = lineWidth / 2;
    }
    if (y < lineWidth / 2) {
      y = lineWidth / 2;
    }

    if (x + width > canvas.width) {
      width = canvas.width - lineWidth - x;
    }
    if (y + height > canvas.height) {
      height = canvas.height - lineWidth - y;
    }

    // Left segment
    var tenPercent = width / 10;
    var ninetyPercent = 9 * tenPercent;
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
  drawLabel: function drawLabel(canvas, box) {

    if (!box || typeof box === 'undefined') return null;

    var ctx = canvas.getContext('2d');

    var coord = box.coord ? box.coord : box;

    var x = 0,
        y = 0,
        width = 0,
        height = 0;


    if (typeof coord.xmin !== 'undefined' && typeof coord.xmax !== 'undefined' && typeof coord.ymin !== 'undefined' && typeof coord.ymax !== 'undefined') {
      var _ref3 = [Math.min(coord.xmin, coord.xmax), Math.min(coord.ymin, coord.ymax), Math.max(coord.xmin, coord.xmax) - Math.min(coord.xmin, coord.xmax), Math.max(coord.ymin, coord.ymax) - Math.min(coord.ymin, coord.ymax)];

      // coord is an object containing xmin, xmax, ymin, ymax attributes
      // width is absolute value of (xmax - xmin)
      // height is absolute value of (ymax - ymin)
      // absolute value takes care of various possible referentials:
      //   - sometimes 0,0 is top-left corner
      //   - sometimes 0,0 is bottom-left corner

      x = _ref3[0];
      y = _ref3[1];
      width = _ref3[2];
      height = _ref3[3];
    } else {
      var _coord3 = (0, _slicedToArray3.default)(coord, 4);

      // coord is an array containing [x, y, width, height] values


      x = _coord3[0];
      y = _coord3[1];
      width = _coord3[2];
      height = _coord3[3];
    }

    ctx.font = '60px Arial';
    ctx.fillStyle = 'rgba(225,0,0,1)';
    ctx.fillText(box.label, x, y + height);
  },

  options: {
    colors: {
      normal: 'rgba(255,225,255,1)',
      selected: 'rgba(0,225,204,1)',
      unselected: 'rgba(100,100,100,1)'
    },
    style: {
      maxWidth: '100%',
      maxHeight: '90vh'
    },
    styleSegmentation: {
      maxWidth: '100%',
      maxHeight: '90vh',
      pointerEvents: 'none'
    },
    base64Image: false
  }
};

exports.default = Boundingbox;
module.exports = exports['default'];