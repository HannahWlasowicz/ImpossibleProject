<script>
	// This beeswarm plot uses the accurate-beeswarm-plot
	// library (https://github.com/jtrim-ons/accurate-beeswarm-plot)
	// to choose positions for the circles.
	//
	// The Svelte code is based on the Layer Cake example at
	// https://layercake.graphics/example/Beeswarm, which is itself
	// adapted from Mike Bostock's beeswarm plot at
	// https://observablehq.com/@d3/beeswarm .

	import { LayerCake, Svg, Html } from 'layercake';
	import { format } from 'd3-format';
	import { scaleOrdinal } from 'd3-scale';

	import Key from './Key.svelte';
	import AxisX from './AxisX.svelte';
	import Beeswarm from './Beeswarm.svelte';

	import data from './cars-2.json';


	const xKey = 'Weight_in_lbs';
	const zKey = 'Origin';
	const titleKey = 'Name';

	const r = 4;

	const seriesNames = new Set();
	const seriesColors = ['#ccc', '#fc0', '#000'];

	const dataTransformed = data.map(d => {
		seriesNames.add(d[zKey]);
		return {
			title: d[titleKey],
			[xKey]: +d[xKey],
			[zKey]: d[zKey]
		};
	});

	const addCommas = format(',');
</script>

<style>
	/*
		The wrapper div needs to have an explicit width and height in CSS.
		It can also be a flexbox child or CSS grid element.
		The point being it needs dimensions since the <LayerCake> element will
		expand to fill it.
	*/
	.chart-container {
		width: 100%;
		height: 100%;
	}
</style>

<div class='chart-container'>
	<LayerCake
		x={xKey}
		z={zKey}
		zScale={scaleOrdinal()}
		zDomain={[...seriesNames].sort()}
		zRange={seriesColors}
		data={dataTransformed}
		custom={{ getTitle: d => d.data.title }}
		let:width
	>

		<Svg>
			<AxisX
				baseline={true}
				formatTick={addCommas}
				tickMarks={true}
			/>
			<Beeswarm
				r={width < 400 ? r / 1.6 : r}
				spacing={1}
			/>
		</Svg>

		<Html pointerEvents={false}>
			<Key
				align='end'
				shape='circle'
				lookup={{
					USA: 'U.S.'
				}}
			/>
		</Html>

	</LayerCake>
</div>
