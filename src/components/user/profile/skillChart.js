import React from 'react';
import Chart from 'react-apexcharts';

export default function SkillChart({ title, value, color }) {
  return (
    <Chart
      className="w-80 h-80"
      options={{
        plotOptions: {
          radialBar: {
            hollow: {
              margin: 15,
              size: "60%"
            },
            dataLabels: {
              showOn: "always",
              name: {
                offsetY: -10,
                show: true,
                color: "#888",
                fontSize: "13px"
              },
              value: {
                color: "#111",
                fontSize: "30px",
                show: true
              }
            }
          }
        },
        stroke: {
          lineCap: "round"
        },
        fill: {
          colors: color
        },
        labels: [title] // Wrap title inside square brackets to create an array
      }}
      series={value}
      type="radialBar"
      width="320px"
      height="320px"
    />
  );
}
