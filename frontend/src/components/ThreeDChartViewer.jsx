import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const ThreeDChartViewer = ({ data, xKey, yKey }) => {
    const containerRef = useRef();

    useEffect(() => {
        if (!data || !xKey || !yKey || !containerRef.current) return;

        // Clear previous contents
        containerRef.current.innerHTML = '';

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / 400, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(containerRef.current.clientWidth, 400);
        containerRef.current.appendChild(renderer.domElement);

        // Controls
        const controls = new OrbitControls(camera, renderer.domElement);

        // Axes
        const axisMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
        const axisHelper = new THREE.AxesHelper(20);
        scene.add(axisHelper);

        // Bars
        const barWidth = 0.5;
        const maxBarHeight = 10;
        const spacing = 1.5;
        const maxValue = Math.max(...data.map(item => parseFloat(item[yKey])));

        data.forEach((item, i) => {
            const value = parseFloat(item[yKey]);
            const height = (value / maxValue) * maxBarHeight;
            const geometry = new THREE.BoxGeometry(barWidth, height, barWidth);
            const material = new THREE.MeshStandardMaterial({ color: new THREE.Color(`hsl(${(i * 360) / data.length}, 70%, 50%)`) });
            const cube = new THREE.Mesh(geometry, material);
            cube.position.set(i * spacing, height / 2, 0);
            scene.add(cube);

            // Add axis labels
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            ctx.font = '16px Arial';
            ctx.fillStyle = 'white';
            ctx.fillText(item[xKey], 0, 20);
            const texture = new THREE.CanvasTexture(canvas);
            const labelMaterial = new THREE.SpriteMaterial({ map: texture });
            const label = new THREE.Sprite(labelMaterial);
            label.scale.set(2, 1, 1);
            label.position.set(i * spacing, -0.5, 0);
            scene.add(label);
        });

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(0, 20, 10);
        scene.add(ambientLight, directionalLight);

        camera.position.set(data.length, 10, 20);
        controls.update();

        // Render loop
        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };
        animate();

        // Export PNG function (triggered manually)
        const exportPNG = () => {
            const link = document.createElement('a');
            link.download = '3d-chart.png';
            link.href = renderer.domElement.toDataURL('image/png');
            link.click();
        };

        // Save function on window for external access
        window.export3DChartAsPNG = exportPNG;

        return () => {
            renderer.dispose();
        };
    }, [data, xKey, yKey]);

    return (
        <div>
            <div ref={containerRef} style={{ width: '100%', height: '400px', background: '#111' }} />
            <button
                onClick={() => window.export3DChartAsPNG()}
                style={{
                    marginTop: '10px',
                    padding: '8px 16px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
            >
                Export 3D Chart as PNG
            </button>
        </div>
    );
};

export default ThreeDChartViewer;
