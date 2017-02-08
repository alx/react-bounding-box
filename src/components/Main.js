require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

import BoundingboxComponent from './BoundingboxComponent.js'

class AppComponent extends React.Component {
  render() {

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
        //showLabels: false,
        //hoverColor: '#0fc'
      }
    };

    return (
      <div className='index'>

        <pre>
          &lt;BoundingboxComponent image=params.image<br/>
                                   boxes=params.boxes<br/>
                                   options=params.options
          /&gt;
        </pre>

        <BoundingboxComponent image={params.image}
                              boxes={params.boxes}
                              options={params.options}
        />

        <p>Params object:</p>

        <pre>{JSON.stringify(params, null, 2)}</pre>

      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
