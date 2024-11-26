'use client'

import { Background } from '@/components/background'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { ArrowUpRight, LinkIcon } from 'lucide-react'
import Link from 'next/link'
import { useQueryState } from 'nuqs'
import { Suspense, useEffect, useState } from 'react'

export default function page() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<BranchUrlGenerator />
		</Suspense>
	)
}

function BranchUrlGenerator() {
	const [branchName, setBranchName] = useState('')
	const [url, setUrl] = useState('')
	const [projectName, setProjectName] = useQueryState('project-name', {
		defaultValue: 'project-name',
	})
	const [showProjectName, setShowProjectName] = useState(false)

	useEffect(() => {
		if (branchName) {
			setUrl(
				`https://${projectName}-git-${branchName
					.toLowerCase()
					.replace(/[^a-z0-9-]/g, '-')}-${projectName}.vercel.app/`
			)
		} else {
			setUrl('')
		}
	}, [branchName, projectName])

	useEffect(() => {
		setShowProjectName(projectName === 'project-name')
	}, [])

	return (
		<div className="min-h-screen relative bg-transparent flex flex-col items-center justify-center p-4 overflow-hidden">
			<Background />
			<Card className="w-full max-w-2xl shadow-lg bg-white relative z-10">
				<CardHeader className="space-y-1 border-b border-border pb-4">
					<div className="flex items-center space-x-2">
						<LinkIcon className="w-6 h-6 text-primary" />
						<CardTitle className="text-2xl font-bold text-foreground">Branch URL Generator</CardTitle>
					</div>
					<CardDescription className="text-foreground-accent">
						{"Enter your branch name to generate the vercel's preview url"}
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4 pt-6">
					{showProjectName && (
						<div className="space-y-2">
							<label htmlFor="project-name" className="text-sm font-medium text-foreground">
								Project Name
							</label>
							<Input
								type="text"
								id="project-name"
								placeholder="e.g., tech-website"
								value={projectName}
								onChange={(e) => setProjectName(e.target.value)}
								className="w-full transition duration-200 ease-in-out focus:ring-2 focus:ring-primary border-ring"
							/>
						</div>
					)}
					<div className="space-y-2">
						<label htmlFor="branch-name" className="text-sm font-medium text-foreground">
							Branch Name
						</label>
						<Input
							type="text"
							id="branch-name"
							placeholder="e.g., feat-JIR-2147-edit-content"
							value={branchName}
							onChange={(e) => setBranchName(e.target.value)}
							className="w-full transition duration-200 ease-in-out focus:ring-2 focus:ring-primary border-ring"
						/>
					</div>
					<div className="space-y-2 flex flex-col gap-2">
						<label className="text-sm font-medium text-foreground">Generated URL</label>
						{url && (
							<Link
								href={url}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center text-primary hover:text-accent transition-colors duration-200">
								{url}
								<ArrowUpRight className="ml-1 w-4 h-4" />
							</Link>
						)}
						{!url && <p className="text-muted-foreground">Generated URL will appear here</p>}
					</div>
				</CardContent>
				<CardFooter className="flex justify-between items-center border-t border-border pt-4">
					<p className="text-sm text-muted-foreground">
						{url
							? 'Click the generated URL to open it in a new tab.'
							: 'Enter a branch name to generate a URL.'}
					</p>
					<div className="w-2 h-2 bg-success rounded-full animate-pulse" />
				</CardFooter>
			</Card>
			<footer className={cn('mt-8 text-center text-sm text-foreground-accent', projectName && 'hidden')}>
				&copy; {new Date().getFullYear()} Yonatan Lavy. All rights reserved.
			</footer>
		</div>
	)
}
