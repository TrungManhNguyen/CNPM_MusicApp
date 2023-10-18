import React, { useEffect, useRef } from 'react';
import { Application } from '@splinetool/runtime';
import classNames from 'classnames/bind';
import styles from './Type.module.scss';
function MyComponent() {
    const cx = classNames.bind(styles);

    const canvasRef = useRef(null);
    const canvasRef1 = useRef(null);


    useEffect(() => {
        const canvas = canvasRef.current;
        const canvas1 = canvasRef1.current;


        if (canvas) {
            const app = new Application(canvas);
            app.load('https://prod.spline.design/MlxJGnVKWSU6DFTQ/scene.splinecode');
        }

        if (canvas1) {
            const app = new Application(canvas1);
            app.load('https://prod.spline.design/b2-k0CX5aed7cuXr/scene.splinecode');
        }
    }, []);

    return (
        <div >
            <div
                style={{
                    marginTop: '80px',
                    marginBottom: '40px',
                    marginLeft: '30px',
                    color: 'rgb(45, 170, 237)'
                }}
            >
                Chức năng này đang hoàn thiện!!!
            </div>
            <canvas ref={canvasRef} id="canvas3d"></canvas>
            <canvas ref={canvasRef1} id="canvas3d"></canvas>


        </div>
    );
}

export default MyComponent;
