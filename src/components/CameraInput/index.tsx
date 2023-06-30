import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import * as Styled from './styles';

interface CameraInputProps {
    onCapture: (imageData: string) => void;
}

const CameraInput: React.FC<CameraInputProps> = ({ onCapture }) => {
    const webcamRef = useRef<Webcam>(null);
    const [numPhotosTaken, setNumPhotosTaken] = useState(0);

    console.log(numPhotosTaken)

    const capturePhoto = () => {
        const imageData = webcamRef.current?.getScreenshot();
        if (imageData) {
            onCapture(imageData);
            setNumPhotosTaken(numPhotosTaken + 1);
        }
    };

    return (
        <Styled.Webcam>
            <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" style={{
                borderRadius: '10%',
                width: '300px',
            }} />
            <Styled.Button onClick={capturePhoto} disabled={numPhotosTaken >= 3}>
                Capture Photo ({numPhotosTaken}/3)
            </Styled.Button>
        </Styled.Webcam>
    );
};

export default CameraInput;
