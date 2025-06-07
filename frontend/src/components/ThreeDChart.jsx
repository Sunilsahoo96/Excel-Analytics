// components/ThreeDChart.js
import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const ThreeDChart = forwardRef(({ data, xAxis, yAxis, zAxis, chartType }, ref) => {
    const mountRef = useRef(null);
    const rendererRef = useRef(null);

    useImperativeHandle(ref, () => ({
        downloadImage: (format = 'png') => {
            if (rendererRef.current) {
                const dataURL = rendererRef.current.domElement.toDataURL(`image/${format}`);
                const link = document.createElement('a');
                link.href = dataURL;
                link.download = `3d-chart.${format}`;
                link.click();
            }
        }
    }));

    useEffect(() => {
        if (!data || data.length === 0) return;

        const mount = mountRef.current;
        mount.innerHTML = '';

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);

        const camera = new THREE.PerspectiveCamera(
            75,
            mount.clientWidth / mount.clientHeight,
            0.1,
            1000
        );
        camera.position.set(100, 100, 100);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(mount.clientWidth, mount.clientHeight);
        mount.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;

        const axesHelper = new THREE.AxesHelper(100);
        scene.add(axesHelper);

        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(100, 100, 100).normalize();
        scene.add(light);

        const getValue = (row, key) => parseFloat(row[key]) || 0;

        data.forEach((item, index) => {
            const x = getValue(item, xAxis);
            const y = getValue(item, yAxis);
            const z = getValue(item, zAxis);

            if (chartType === 'scatter') {
                const geometry = new THREE.SphereGeometry(1.5, 16, 16);
                const material = new THREE.MeshBasicMaterial({ color: 0x00ffcc });
                const sphere = new THREE.Mesh(geometry, material);
                sphere.position.set(x, y, z);
                scene.add(sphere);
            }

            if (chartType === 'bar') {
                const barHeight = z;
                const geometry = new THREE.BoxGeometry(2, barHeight, 2);
                const material = new THREE.MeshStandardMaterial({ color: 0xff8844 });
                const cube = new THREE.Mesh(geometry, material);
                cube.position.set(x, barHeight / 2, y);
                scene.add(cube);
            }
        });

        if (chartType === 'line') {
            const points = data.map((item) => {
                const x = getValue(item, xAxis);
                const y = getValue(item, yAxis);
                const z = getValue(item, zAxis);
                return new THREE.Vector3(x, y, z);
            });

            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const material = new THREE.LineBasicMaterial({ color: 0x33ffcc });
            const line = new THREE.Line(geometry, material);
            scene.add(line);
        }

        if (chartType === 'pie') {
            const total = data.reduce((sum, item) => sum + getValue(item, yAxis), 0);
            let startAngle = 0;

            data.forEach((item, index) => {
                const value = getValue(item, yAxis);
                const angle = (value / total) * Math.PI * 2;
                const color = new THREE.Color(`hsl(${(index * 360) / data.length}, 70%, 50%)`);

                const geometry = new THREE.CylinderGeometry(10, 10, 5, 32, 1, false, startAngle, angle);
                const material = new THREE.MeshStandardMaterial({ color });
                const segment = new THREE.Mesh(geometry, material);
                segment.rotation.x = Math.PI / 2;
                scene.add(segment);

                startAngle += angle;
            });
        }

        const handleResize = () => {
            const { clientWidth, clientHeight } = mount;
            camera.aspect = clientWidth / clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(clientWidth, clientHeight);
        };
        window.addEventListener('resize', handleResize);

        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [data, xAxis, yAxis, zAxis, chartType]);

    return <div ref={mountRef} style={{ width: '100%', height: '500px' }} />;
});

export default ThreeDChart;
