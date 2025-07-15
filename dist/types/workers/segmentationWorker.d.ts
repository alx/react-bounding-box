interface SegmentationMessage {
    type: 'PROCESS_SEGMENTATION';
    payload: {
        segmentationData: number[];
        colors: Record<number, [number, number, number]>;
        imageWidth: number;
        imageHeight: number;
        transparency: number;
        blendMode: 'overlay' | 'separate';
    };
}
interface SegmentationResponse {
    type: 'SEGMENTATION_PROCESSED';
    payload: {
        processedData: ImageData;
        processingTime: number;
    };
}
export type { SegmentationMessage, SegmentationResponse };
//# sourceMappingURL=segmentationWorker.d.ts.map