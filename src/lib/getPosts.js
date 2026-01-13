import path from 'path'
import fs from 'fs'

// Sets the post directory automatically
const postsDirectory = path.join(process.cwd(), '_posts')
import matter from 'gray-matter'

export function getPostFiles() {
	// Get sorted posts data
	console.log(postsDirectory)
	// Ask fs to look at postsDir to get list of filenames 
	// e.g. ['post1.md', 'post2.md']
	const fileNames = fs.readdirSync(postsDirectory)
	const allPostsData = fileNames.map((fileName) => {
		const id = fileName.slice(0, -3) 
		// Put the object { id: 'postX' } into the list
		return {
			id: id
		}
	}) 

	return allPostsData
}

export function getSinglePost(id) { 
	// Restore the filename 
	const fileName = id + ".md" 
	// Obtain the file's contents
	const fileDirectory = path.join(postsDirectory, fileName)
	const fileContent = fs.readFileSync(fileDirectory, { encoding: 'utf8', flag: 'r' }) 
	const resultObject = matter(fileContent) 
	// resultObject.data: { title: 'Blog Post Title', date: '2067-01-12', author: 'John Doe' } 
	// resultObject.content is the actual markdown content
	resultObject.id = id

	console.log(resultObject)
	
	return resultObject
}


