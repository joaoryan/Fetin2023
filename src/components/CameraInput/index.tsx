import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

interface CameraInputProps {
    onCapture: (imageData: string) => void;
}

const CameraInput: React.FC<CameraInputProps> = ({ onCapture }) => {
    const webcamRef = useRef<Webcam>(null);
    const [numPhotosTaken, setNumPhotosTaken] = useState(0);

    const capturePhoto = () => {
        const imageData = webcamRef.current?.getScreenshot();
        if (imageData) {
            onCapture(imageData);
            setNumPhotosTaken(numPhotosTaken + 1);
        }
    };

    return (
        <div>
            <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
            <button onClick={capturePhoto} disabled={numPhotosTaken >= 15}>
                Capture Photo ({numPhotosTaken}/15)
            </button>
        </div>
    );
};

export default CameraInput;
