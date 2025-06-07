import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import DashboardAppBar from './UserDashboard';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    ArcElement,
    PointElement,
    RadialLinearScale,
    Filler,
    Tooltip,
    Legend,
    Title,
} from 'chart.js';
import { Bar, Pie, Line, Doughnut, Radar, Scatter } from 'react-chartjs-2';
import {
    MenuItem, Select, InputLabel, FormControl, Button, Grid, Box, Typography
} from '@mui/material';
import ThreeDChart from '../components/ThreeDChart';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    ArcElement,
    PointElement,
    RadialLinearScale,
    Filler,
    Tooltip,
    Legend,
    Title
);





const VisualizePage = () => {

    const threeDRef = useRef(null);

    let excelData = useSelector((state) => state.excel.data);
    const [xAxis, setXAxis] = useState('');
    const [yAxis, setYAxis] = useState('');
    const [zAxis, setZAxis] = useState('');
    const [chartType, setChartType] = useState('');
    const [is3D, setIs3D] = useState(false);
    const [chartColor, setChartColor] = useState('#36A2EB');
    const chartRef = useRef(null);

    // Format excel data if it's array of arrays
    if (Array.isArray(excelData) && excelData.length > 0 && !excelData[0].includes(',')) {
        const [headers, ...rows] = excelData;
        excelData = rows.map(row =>
            headers.reduce((acc, header, idx) => {
                acc[header] = row[idx];
                return acc;
            }, {})
        );
    }

    if (!Array.isArray(excelData) || excelData.length === 0) {
        return <div className="p-4 text-red-600">No Excel data found. Please upload a file first.</div>;
    }

    const keys = Object.keys(excelData[0]);

    const handleChartTypeChange = (value) => {
        setChartType(value);
        if (value.startsWith('3d-')) {
            setIs3D(true);
        } else {
            setIs3D(false);
        }
    };


    const get2DChart = () => {
        const labels = excelData.map((item) => item[xAxis]);
        const dataValues = excelData.map((item) => parseFloat(item[yAxis]));

        const data = {
            labels,
            datasets: [{
                label: `${yAxis} vs ${xAxis}`,
                data: dataValues,
                backgroundColor:
                    chartType === 'pie' || chartType === 'doughnut'
                        ? dataValues.map((_, i) => `hsl(${(i * 360) / dataValues.length}, 70%, 50%)`)
                        : chartColor,
                borderColor: '#333',
                borderWidth: 1,
                fill: chartType === 'radar' || chartType === 'line',
            }],
        };

        const options = {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 1000,
                easing: 'easeOutBounce',
            },
        };

        const commonProps = { data, options, ref: chartRef };

        switch (chartType) {
            case 'bar': return <Bar {...commonProps} />;
            case 'line': return <Line {...commonProps} />;
            case 'pie': return <Pie {...commonProps} />;
            case 'doughnut': return <Doughnut {...commonProps} />;
            case 'radar': return <Radar {...commonProps} />;
            case 'scatter':
                return (
                    <Scatter
                        {...commonProps}
                        data={{
                            datasets: [{
                                label: `${yAxis} vs ${xAxis}`,
                                data: excelData.map(item => ({
                                    x: parseFloat(item[xAxis]),
                                    y: parseFloat(item[yAxis]),
                                })),
                                backgroundColor: chartColor,
                            }],
                        }}
                    />
                );
            default: return null;
        }
    };

    const downloadChart = (format) => {
        if (!chartRef.current) return;
        const base64Image = chartRef.current.toBase64Image(`image/${format}`);
        const link = document.createElement('a');
        link.href = base64Image;
        link.download = `chart.${format}`;
        link.click();
    };

    return (
        <div>
            <DashboardAppBar />
            <div style={{ marginTop: '100px' }}>
                <Box sx={{
                    display: 'flex', justifyContent: 'center',
                    alignItems: 'center', marginBottom: 4, padding: 2,
                    border: '1px solid #ddd', borderRadius: '8px',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                }}>
                    <Grid container spacing={2} alignItems="center" justifyContent="center">
                        {/* X Axis */}
                        <Grid item xs={12} sm={3}>
                            <FormControl fullWidth>
                                <InputLabel id="x-axis-label">Select X Axis</InputLabel>
                                <Select labelId="x-axis-label" value={xAxis}
                                    onChange={(e) => setXAxis(e.target.value)} label="Select X Axis">
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    {keys.map((key) => <MenuItem key={key} value={key}>{key}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Y Axis */}
                        <Grid item xs={12} sm={3}>
                            <FormControl fullWidth>
                                <InputLabel id="y-axis-label">Select Y Axis</InputLabel>
                                <Select labelId="y-axis-label" value={yAxis}
                                    onChange={(e) => setYAxis(e.target.value)} label="Select Y Axis">
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    {keys.map((key) => <MenuItem key={key} value={key}>{key}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Z Axis for 3D */}
                        <Grid item xs={12} sm={3}>
                            <FormControl fullWidth>
                                <InputLabel id="z-axis-label">Select Z Axis (3D)</InputLabel>
                                <Select labelId="z-axis-label" value={zAxis}
                                    onChange={(e) => setZAxis(e.target.value)} label="Select Z Axis">
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    {keys.map((key) => <MenuItem key={key} value={key}>{key}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Chart Type */}
                        <Grid item xs={12} sm={3}>
                            <FormControl fullWidth>
                                <InputLabel id="chart-type-label">Select Chart Type</InputLabel>
                                <Select labelId="chart-type-label" value={chartType}
                                    onChange={(e) => handleChartTypeChange(e.target.value)} label="Select Chart Type">
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    <MenuItem value="bar">Bar</MenuItem>
                                    <MenuItem value="line">Line</MenuItem>
                                    <MenuItem value="pie">Pie</MenuItem>
                                    <MenuItem value="doughnut">Doughnut</MenuItem>
                                    <MenuItem value="radar">Radar</MenuItem>
                                    <MenuItem value="scatter">Scatter</MenuItem>
                                    <MenuItem value="3d-bar">3D Bar</MenuItem>
                                    <MenuItem value="3d-scatter">3D Scatter</MenuItem>
                                    <MenuItem value="3d-line">3D Line</MenuItem>
                                    <MenuItem value="3d-pie">3D Pie</MenuItem>

                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Color Picker */}
                        <Grid item xs={12} sm={2}>
                            <input
                                type="color"
                                value={chartColor}
                                onChange={(e) => setChartColor(e.target.value)}
                                className="w-10 h-10 p-0 border-2 rounded"
                                title="Pick Chart Color"
                            />
                        </Grid>
                    </Grid>
                </Box>
            </div>

            {/* Display Chart */}
            {(xAxis && yAxis && chartType) ? (
                is3D ? (
                    <div style={{ width: '100%', height: '500px', maxWidth: '900px', margin: '0 auto' }}>
                        <Typography align="center" variant="h6" mb={2}>
                            3D {chartType.replace('3d-', '')} Chart
                        </Typography>
                        <ThreeDChart
                            ref={threeDRef}
                            data={excelData}
                            xAxis={xAxis}
                            yAxis={yAxis}
                            zAxis={zAxis}
                            chartType={chartType.replace('3d-', '')}
                        />

                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ mt: 2 }}
                            onClick={() => threeDRef.current?.downloadImage('png')}
                        >
                            Download 3D Chart
                        </Button>

                    </div>
                ) : (
                    <div style={{ height: '300px', maxWidth: '800px', margin: '0 auto' }}>
                        {get2DChart()}
                        <div style={{
                            display: "flex", justifyContent: "center",
                            alignItems: "center", marginTop: "40px", gap: "20px"
                        }}>
                            <Button onClick={() => downloadChart('png')} variant="contained" color="primary">
                                Download as PNG
                            </Button>
                            <Button onClick={() => downloadChart('jpeg')} variant="contained" color="secondary">
                                Download as JPG
                            </Button>
                        </div>
                    </div>
                )
            ) : (
                <div className="text-center text-gray-500 mt-10">
                    Please select X, Y (and optionally Z) axes and chart type to visualize the data.
                </div>
            )}
        </div>
    );
};

export default VisualizePage;
