import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import Speedometer from 'react-d3-speedometer';

const RealTimeVisualization = () => {
  const [speedometerValue, setSpeedometerValue] = useState(0);
  const [barGraphData, setBarGraphData] = useState([]);
  const [barGraphLabels, setBarGraphLabels] = useState([]);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8765'); // Replace with your WebSocket server URL

    socket.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      setSpeedometerValue(newData.value);
      setBarGraphData((prevData) => [...prevData, newData.value]);
      setBarGraphLabels((prevLabels) => [...prevLabels, new Date().toLocaleTimeString()]);
    };

    return () => {
      socket.close();
    };
  }, []);

  const chartData = {
    labels: barGraphLabels,
    datasets: [
      {
        label: 'Real-Time Data',
        data: barGraphData,
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'second',
          displayFormats: {
            second: 'h:mm:ss a',
          },
        },
        title: {
          display: true,
          text: 'Time',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Value',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return (
    <div>
      <h1>Real-Time Visualization</h1>
      <div>
        <h2>Speedometer</h2>
        <Speedometer
          value={speedometerValue}
          minValue={0}
          maxValue={100}
          needleColor="steelblue"
          startColor="green"
          segments={10}
          endColor="red"
        />
      </div>
      <div>
        <h2>Real-Time Bar Graph</h2>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default RealTimeVisualization;
