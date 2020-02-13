# React Bounding Box Component

React Bounding Box Component displays bounding boxes on an image inside and HTML Canvas.

![Screenshot](https://raw.githubusercontent.com/alx/react-bounding-box/master/dist/screenshot.png)

Demo: [https://alx.github.io/react-bounding-box/](https://alx.github.io/react-bounding-box/)

## Usage

```
<Boundingbox image={params.image}
             boxes={params.boxes}
             options={params.options}
/>
```

## Params

Commented options are not yet implemented.

```
    const params = {
      image: 'http://i.imgur.com/gF7QYwa.jpg',
      boxes: [
        // coord(0,0) = top left corner of image
        //[x, y, width, height]
        [0, 0, 250, 250],
        [300, 0, 250, 250],
        [700, 0, 300, 25],
        [1100, 0, 25, 300]
        // {coord: [0, 0, 250, 250], label: "test"},
        // {coord: [300, 0, 250, 250], label: "A"},
        // {coord: [700, 0, 300, 25], label: "B"},
        // {coord: [1100, 0, 25, 300], label: "C"}
      ],
      options: {
        colors: {
          normal: 'rgba(255,225,255,1)',
          selected: 'rgba(0,225,204,1)',
          unselected: 'rgba(100,100,100,1)'
        },
        style: {
          maxWidth: '100%',
          maxHeight: '90vh'
        }
        //showLabels: false
      }
    };
```

## Segmentation

![Segmentation](https://raw.githubusercontent.com/alx/react-bounding-box/master/public/assets/img/screenshot_segmentation.png)

```
<Boundingbox image={params.image}
             pixelSegmentation={params.segmentation}
/>
```

To load segmentation data from a json file generated by [deepdetect](http://deepdetect.com) :

```
<Boundingbox image={params.image}
             segmentationJson={'./ADE_val_00000761.json'}
/>
```

When you want to display the segmentation of an image not hosted in the same domain as your react app, you'll find the following error: **Unable to get image data from canvas because the canvas has been tainted by cross-origin data.**

To avoid this issue, the segmentation can be displayed side-by-side :

```
<Boundingbox
  image={'http://localhost/ADE_val_00000761.jpg'}
  segmentationJson={'./ADE_val_00000761.json'}
  separateSegmentation={true}
/>
```

![Segmentation Remote](https://raw.githubusercontent.com/alx/react-bounding-box/master/public/assets/img/screenshot_segmentation_separate.png)

## Changelog

### v0.5.11 - 13/02/2020

* FIX: Image is not redrawn on update 
  [#15](https://github.com/alx/react-bounding-box/issues/15) - Thanks [@testower](https://github.com/testower)

### v0.5.10 - 26/01/2020

* FIX: segmentation is redrawn when nextProps.pixelSegmentation is updated

### v0.5.9 - 23/01/2020

* FIX: add missing redraw when resizing canvas after loading a new image
* FIX: only resize canvas when loaded image change dimensions

### v0.5.7 - 21/01/2020

* FIX: use props.forceRedraw property to redraw canvas
* FIX: replace array.some() method by classic for() loop
* FIX: check new image dimension and data before to redraw it in canvas
* FIX: update background width and height after loading a new image

### v0.5.2 - 16/12/2019

* Use absolute value to compute width and height from coordinates

### v0.1.0 - 22/05/2018

* Fix deprecated `React.PropTypes`

### v0.0.14 - 30/01/2018
* add image segmentation display available in [deepdetect](https://github.com/beniz/deepdetect/)

### v0.0.11 - 14/03/2017
* specific drawLabel prop function

### v0.0.10 - 14/03/2017
* new object model available inside boxes prop
* change drawBox function prop to support box label

### v0.0.9 - 16/02/2017
* add drawBox function prop to customize how the box will be displayed

### v0.0.8 - 16/02/2017
* add selectedIndex and onSelected props to allow external modification/observation of selected bounding box

### v0.0.7 - 15/02/2017
* use react-cdk yeoman generator to make simple component and use storybook
* eslint on bounding box component

### v0.0.5 - 09/02/2017
* add missing Boundingbox displayName

### v0.0.4 - 09/02/2017
* fix issue with canvas width/height on firefox

### v0.0.3 - 09/02/2017
* review options colors structure
* options is optional, and defaultProps for colors

### v0.0.2 - 09/02/2017
* get image size with javascript

### v0.0.1 - 08/02/2017
* First commit
* Simple example with mouse hover on boxes

## History

* 06/2016 - Inspiration: [DenseCap](http://cs.stanford.edu/people/karpathy/densecap/)
* 09/2016 - First prototype in production: [recognition.tate.org.uk](http://recognition.tate.org.uk/)
