/** @type {import('tailwindcss').Config} */
module.exports = {
	// 1. Apply the dark mode class setting:
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		// 2. Append the path for the Skeleton NPM package and files:
		require('path').join(require.resolve(
			'@skeletonlabs/skeleton'),
			'../**/*.{html,js,svelte,ts}'
		)
	],
	theme: {
		extend: {
			colors: {
				sepia: {
					900: '#2b1a11',
					800: '#3d2517',
					700: '#543322',
					600: '#6d4530',
					400: '#9b7155',
					200: '#cdb29b'
				}
			},
			fontFamily: {
				script: ['"Pinyon Script"', 'cursive'],
				cormorant: ['"Cormorant Garamond"', 'serif']
			}
		},
	},
	plugins: [
		// 3. Append the Skeleton plugin to the end of this list
		...require('@skeletonlabs/skeleton/tailwind/skeleton.cjs')()
	]
}
