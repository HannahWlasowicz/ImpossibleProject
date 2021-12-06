<script>
	import { getContext } from 'svelte';
	import { AccurateBeeswarm } from 'accurate-beeswarm-plot@1.0.7';

	const { data, xGet, zGet, padding, height, config, custom } = getContext('LayerCake');

	export let r = 3;
	export let strokeWidth = 0;
	export let strokeColor = '#fff';
	export let spacing = 1.5;

  $: circles = new AccurateBeeswarm($data, r + (spacing + strokeWidth) / 2, $xGet)
			.oneSided()
			.calculateYPositions()
			.map(d => ({x: d.x, [$config.z]: d.datum[$config.z], y: d.y, data: d.datum}));
</script>

<g class='bee-group'>
	{#each circles as d}
		<circle
			fill={$zGet(d)}
			stroke='{strokeColor}'
			stroke-width='{strokeWidth}'
			cx='{d.x}'
			cy='{$height - $padding.bottom - r - spacing - strokeWidth / 2 - d.y}'
			r='{r}'
		>
			<title>{$custom.getTitle(d)}</title>
		</circle>
	{/each}
</g>