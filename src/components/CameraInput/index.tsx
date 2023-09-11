import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import * as Styled from './styles';
import { timeout } from 'workbox-core/_private';

interface CameraInputProps {
    onCapture: (imageData: string) => void;
}

const CameraInput: React.FC<CameraInputProps> = ({ onCapture }) => {
    const webcamRef = useRef<Webcam>(null);
    const [numPhotosTaken, setNumPhotosTaken] = useState<number>(0);
    const [disableInput, setDisableInput] = useState<boolean>(false);

    function delay(delay: number) {
        return new Promise(r => {
            setTimeout(r, delay);
        })
    }

    const capturePhoto = async () => {
        setDisableInput(true)
        for (let i = 1; i <= 10; i++) {
            const imageData = webcamRef.current?.getScreenshot();
            if (imageData) {
                onCapture(imageData)
                setNumPhotosTaken(i)
                await delay(900)
            }
        }

    };


    return (
        <Styled.Webcam>
            <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" style={{
                borderRadius: '10%',
                width: '300px',
            }} />
            <Styled.Button onClick={() => capturePhoto()} disabled={disableInput}>
                Capture Photo ({numPhotosTaken}/10)
            </Styled.Button>
        </Styled.Webcam>
    );
};

export default CameraInput;
