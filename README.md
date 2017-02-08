# react-bounding-box
HTML Canvas to display bounding boxes on an image

![Screenshot](https://raw.githubusercontent.com/alx/react-bounding-box/master/dist/screenshot.png)

Demo: [https://alx.github.io/react-bounding-box/](https://alx.github.io/react-bounding-box/)

## Usage

```
<BoundingboxComponent image={params.image}
                      boxes={params.boxes}
                      options={params.options}
/>
```

Complete example: [src/components/Main.js](https://github.com/alx/react-bounding-box/blob/master/src/components/Main.js)

## Params

Commented options are not yet implemented.

```
    const params = {
      image: {
        url: 'http://i.imgur.com/gF7QYwa.jpg',
        width: 1536,
        height: 1535
      },
      boxes: [
        // coord(0,0) = top left corner of image
        //[x, y, width, height]
        [0, 0, 250, 250],
        [300, 0, 250, 250],
        [700, 0, 300, 25],
        [1100, 0, 25, 300]
        //{ xmin: 10, xmax: 50, ymin: 10, ymax: 100},
        //{ xmin: 150, ymin: 150, with: 100, height: 100, color: '#4a4a4a'},
        //{ size: [350, 350, 50, 50], label: 'hello'}
      ],
      options: {
        color_normal: 'rgba(255,225,255,1)',
        color_selected: 'rgba(0,225,204,1)',
        color_unselected: 'rgba(100,100,100,1)'
        //showLabels: false
      }
    };
```

## Changelog

### v0.0.1 - 08/02/2917
* First commit
* Simple example with mouse hover on boxes

## History

* 06/2016 - Inspiration: [DenseCap](http://cs.stanford.edu/people/karpathy/densecap/)
* 09/2016 - First prototype in production: [recognition.tate.org.uk](http://recognition.tate.org.uk/)
