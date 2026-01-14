/* Node.js modules */
import path from 'path'
import fs from 'fs'

/* Third-party libraries */
import matter from 'gray-matter'

/* Constants */
const postsDirectory = path.join(process.cwd(), '_posts')

export function getPostFiles() {
	console.log(postsDirectory)
	const fileNames = fs.readdirSync(postsDirectory)
	const allPostsData = fileNames.map((fileName) => {
		const id = fileName.slice(0, -3) 
		return {
			id: id
		}
	}) 

	return allPostsData
}

export function getSinglePost(id) { 
	const fileName = id + ".md" 
	const fileDirectory = path.join(postsDirectory, fileName)
	const fileContent = fs.readFileSync(fileDirectory, { encoding: 'utf8', flag: 'r' }) 
	const resultObject = matter(fileContent) 
	resultObject.id = id

	console.log(resultObject)
	
	return resultObject
}


