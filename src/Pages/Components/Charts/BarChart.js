import React, { useEffect, useState } from 'react';
import CanvasJSReact from '../../../assets/js/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;

const BarChart = function(props) {
	const [data, setData] = useState(props.data)
		useEffect(()=>{
			setData(props.data);
		},[data,props.data]);
		
		CanvasJS.addColorSet("greenShades",
                [//colorSet Array

                "#2F4F4F",
                "#008080",
                "#2E8B57",
                "#3CB371",
                "#90EE90"                
                ]);
		const options = {
			animationEnabled: true,
			theme: "light2",
			// title:{
			// 	text: "Most Popular Social Networking Sites"
			// },
			axisX: {
				// title: "Social Network",
				reversed: true,
			},
			// axisY: {
			// 	title: "Monthly Active Users",
			// },
			
			data: [{
				type: "bar",
				dataPoints: [
					{ y:  data.warmLeads, label:"Warm",color: "#FD8C04",},
					{ y:  data.hotLeads,  label:"Hot",color: "#EC5858" },
					{ y:  data.coldLeads, label:"Cold",color: "#93ABD3" },
				]
			}]
		}
		
		return (
		<div>
			<CanvasJSChart options = {options} />
			</div>
		);
	
}

export default BarChart;