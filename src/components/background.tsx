export function Background() {
	return (
		<div className="absolute inset-0 -z-10 bg-background">
			<svg className="w-full h-full opacity-50" xmlns="http://www.w3.org/2000/svg">
				<defs>
					<pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
						<path
							d="M 40 0 L 0 0 0 40"
							fill="none"
							stroke="currentColor"
							strokeOpacity="0.2"
							strokeWidth="1"
						/>
					</pattern>
				</defs>
				<rect width="100%" height="100%" fill="url(#grid)" />
			</svg>
		</div>
	)
}
