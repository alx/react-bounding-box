export default Boundingbox;
declare class Boundingbox extends React.Component<any, any, any> {
    constructor(props: any);
    state: {
        canvasCreated: boolean;
        hoverIndex: number;
        segmentColors: never[];
    };
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: any): boolean;
    componentDidUpdate(): void;
    segmentColor(classIndex: any): any;
    renderBox(box: any, index: any): null | undefined;
    renderBoxes(boxes: any): void;
    renderSegmentation(segmentation: any): void;
    renderSegmentationMasks(): void;
    render(): import("react/jsx-runtime").JSX.Element;
    canvas: HTMLCanvasElement | null | undefined;
    segCanvas: HTMLCanvasElement | null | undefined;
}
declare namespace Boundingbox {
    namespace propTypes {
        let image: PropTypes.Requireable<string>;
        let boxes: PropTypes.Requireable<(object | null | undefined)[]>;
        let separateSegmentation: PropTypes.Requireable<boolean>;
        let segmentationJsonUrl: PropTypes.Requireable<string>;
        let segmentationColors: PropTypes.Requireable<any[]>;
        let segmentationMasks: PropTypes.Requireable<any[]>;
        let segmentationTransparency: PropTypes.Requireable<number>;
        let selectedIndex: PropTypes.Requireable<number>;
        let drawBox: PropTypes.Requireable<(...args: any[]) => any>;
        let drawLabel: PropTypes.Requireable<(...args: any[]) => any>;
        let onSelected: PropTypes.Requireable<(...args: any[]) => any>;
        let options: PropTypes.Requireable<PropTypes.InferProps<{
            colors: PropTypes.Requireable<PropTypes.InferProps<{
                normal: PropTypes.Requireable<string>;
                selected: PropTypes.Requireable<string>;
                unselected: PropTypes.Requireable<string>;
            }>>;
            style: PropTypes.Requireable<object>;
            styleSegmentation: PropTypes.Requireable<object>;
            base64Image: PropTypes.Requireable<boolean>;
        }>>;
    }
    namespace defaultProps {
        let boxes_1: never[];
        export { boxes_1 as boxes };
        let separateSegmentation_1: boolean;
        export { separateSegmentation_1 as separateSegmentation };
        let segmentationTransparency_1: number;
        export { segmentationTransparency_1 as segmentationTransparency };
        export function onSelected(): void;
        export function drawBox(canvas: any, box: any, color: any, lineWidth: any): null | undefined;
        export function drawLabel(canvas: any, box: any): null | undefined;
        export namespace options_1 {
            namespace colors {
                let normal: string;
                let selected: string;
                let unselected: string;
            }
            namespace style {
                let maxWidth: string;
                let maxHeight: string;
            }
            namespace styleSegmentation {
                let maxWidth_1: string;
                export { maxWidth_1 as maxWidth };
                let maxHeight_1: string;
                export { maxHeight_1 as maxHeight };
                export let pointerEvents: string;
            }
            let base64Image: boolean;
        }
        export { options_1 as options };
    }
}
import React from 'react';
import PropTypes from 'prop-types';
//# sourceMappingURL=react-bounding-box.d.ts.map