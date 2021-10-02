import React, { useState } from 'react'
import './App.css'

function App() {
	const [imageLink, setImageLink] = useState('')
	const [emotions, setEmotions] = useState({})
	const [isLoading, setIsLoading] = useState(true)

	function fetchData() {
		fetch(process.env.REACT_APP_API_URL, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				'x-rapidapi-host': process.env.REACT_APP_API_HOST,
				'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
			},
			body: JSON.stringify({
				source: imageLink,
				sourceType: 'url',
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data)
				setEmotions(data.emotions[0])
				console.log(emotions)
				setIsLoading(false)
			})
			.catch((err) => {
				console.error(err)
			})
	}

	return (
		<div>
			<h1>Emotion Detector</h1>
			<div className="desc">
				<p>
					Detect emotions in any image. Find out the result by adding image URL
					below.😄
				</p>
			</div>
			<form
				onSubmit={(event) => {
					event.preventDefault()
					fetchData()
					setImageLink('')
					setIsLoading(true)
				}}
				action=""
			>
				<input
					onChange={(event) => setImageLink(event.target.value)}
					type="url"
					name="url"
					id="url"
					value={imageLink}
					className="search-input"
					placeholder="https://..."
				/>
				<input className="btn" type="submit" value="Send Request" />
			</form>
			{isLoading ? (
				''
			) : (
				<div className="data">
					<p>
						Joy 😄:{' '}
						<span>
							{emotions.joyLikelihood.replace(/_/g, ' ').toLowerCase()}
						</span>
					</p>
					<p>
						Anger 😠:{' '}
						<span>
							{emotions.angerLikelihood.replace(/_/g, ' ').toLowerCase()}
						</span>
					</p>
					<p>
						Suprise 😲:{' '}
						<span>
							{emotions.surpriseLikelihood.replace(/_/g, ' ').toLowerCase()}
						</span>
					</p>
					<p>
						Sorrow ☹️:{' '}
						<span>
							{emotions.sorrowLikelihood.replace(/_/g, ' ').toLowerCase()}
						</span>
					</p>
				</div>
			)}
		</div>
	)
}

export default App
