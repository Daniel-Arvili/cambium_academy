import { cache } from "react"

// Types
export type Category = {
  id: string
  name: string
  slug: string
  description: string
  count: number
  icon: string
}

export type Video = {
  id: string
  title: string
  description: string
  thumbnailUrl: string
  videoUrl: string
  publishedAt: string
  presenter: string
  categoryId: string
  categoryName: string
  categorySlug: string
}

// Mock data for development (replace with Google Sheets API)
const categories: Category[] = [
  {
    id: "1",
    name: "Web Development",
    slug: "web-development",
    description: "Learn modern web development techniques",
    count: 12,
    icon: "code",
  },
  {
    id: "2",
    name: "Data Science",
    slug: "data-science",
    description: "Explore data analysis and machine learning",
    count: 8,
    icon: "microscope",
  },
  {
    id: "3",
    name: "Design",
    slug: "design",
    description: "Master UI/UX and graphic design principles",
    count: 6,
    icon: "pen",
  },
  {
    id: "4",
    name: "Business",
    slug: "business",
    description: "Develop business and entrepreneurship skills",
    count: 9,
    icon: "lightbulb",
  },
  {
    id: "5",
    name: "Personal Development",
    slug: "personal-development",
    description: "Improve productivity and soft skills",
    count: 7,
    icon: "rocket",
  },
  {
    id: "6",
    name: "Academic",
    slug: "academic",
    description: "Educational content for academic subjects",
    count: 10,
    icon: "book",
  },
]

const videos: Video[] = [
  {
    id: "1",
    title: "Introduction to React Hooks",
    description: "Learn how to use React Hooks to build functional components with state and side effects.",
    thumbnailUrl: "/placeholder.svg?height=200&width=300",
    videoUrl: "https://www.youtube.com/watch?v=dpw9EHDh2bM",
    publishedAt: "2023-01-15T10:00:00Z",
    presenter: "Sarah Johnson",
    categoryId: "1",
    categoryName: "Web Development",
    categorySlug: "web-development",
  },
  {
    id: "2",
    title: "Data Visualization with Python",
    description: "Explore various data visualization libraries in Python to create compelling charts and graphs.",
    thumbnailUrl: "/placeholder.svg?height=200&width=300",
    videoUrl: "https://www.youtube.com/watch?v=a9UrKTVEeZA",
    publishedAt: "2023-02-20T14:30:00Z",
    presenter: "Michael Chen",
    categoryId: "2",
    categoryName: "Data Science",
    categorySlug: "data-science",
  },
  {
    id: "3",
    title: "UI Design Principles for Beginners",
    description: "Learn the fundamental principles of UI design to create beautiful and functional interfaces.",
    thumbnailUrl: "/placeholder.svg?height=200&width=300",
    videoUrl: "https://www.youtube.com/watch?v=c9Wg6Cb_YlU",
    publishedAt: "2023-03-05T09:15:00Z",
    presenter: "Emma Rodriguez",
    categoryId: "3",
    categoryName: "Design",
    categorySlug: "design",
  },
  {
    id: "4",
    title: "Building a Startup from Scratch",
    description: "A comprehensive guide to launching your own startup, from idea validation to execution.",
    thumbnailUrl: "/placeholder.svg?height=200&width=300",
    videoUrl: "https://www.youtube.com/watch?v=ZVlUwwgb9_o",
    publishedAt: "2023-04-10T16:45:00Z",
    presenter: "David Kim",
    categoryId: "4",
    categoryName: "Business",
    categorySlug: "business",
  },
  {
    id: "5",
    title: "Effective Time Management Strategies",
    description: "Discover practical techniques to manage your time more effectively and boost productivity.",
    thumbnailUrl: "/placeholder.svg?height=200&width=300",
    videoUrl: "https://www.youtube.com/watch?v=VfBxGEbg7vk",
    publishedAt: "2023-05-18T11:20:00Z",
    presenter: "Lisa Thompson",
    categoryId: "5",
    categoryName: "Personal Development",
    categorySlug: "personal-development",
  },
  {
    id: "6",
    title: "Advanced Calculus: Integration Techniques",
    description: "A deep dive into various integration techniques used in advanced calculus.",
    thumbnailUrl: "/placeholder.svg?height=200&width=300",
    videoUrl: "https://www.youtube.com/watch?v=UteyX7X_Vu4",
    publishedAt: "2023-06-22T13:10:00Z",
    presenter: "Professor Robert Wilson",
    categoryId: "6",
    categoryName: "Academic",
    categorySlug: "academic",
  },
]

// Google Sheets API setup (commented out for now, replace mock data when ready)
/*
async function getGoogleSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  })

  const sheets = google.sheets({ version: 'v4', auth })
  return sheets
}

async function fetchFromGoogleSheets(sheetName: string, range: string) {
  const sheets = await getGoogleSheetsClient()
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
    range: `${sheetName}!${range}`,
  })
  
  return response.data.values
}
*/

// Data fetching functions
export const fetchCategories = cache(async () => {
  // Replace with Google Sheets API call when ready
  // const data = await fetchFromGoogleSheets('Categories', 'A2:F100')
  // Process data...

  return categories
})

export const fetchCategoryBySlug = cache(async (slug: string) => {
  // Replace with Google Sheets API call when ready
  return categories.find((category) => category.slug === slug)
})

export const fetchFeaturedVideos = cache(async () => {
  // Replace with Google Sheets API call when ready
  // Could filter by a "featured" flag in the spreadsheet
  return videos.slice(0, 6)
})

export const fetchVideosByCategory = cache(async (categorySlug: string) => {
  // Replace with Google Sheets API call when ready
  return videos.filter((video) => video.categorySlug === categorySlug)
})

export const fetchVideoById = cache(async (id: string) => {
  // Replace with Google Sheets API call when ready
  return videos.find((video) => video.id === id)
})

export const fetchRelatedVideos = cache(async (categoryId: string, currentVideoId: string) => {
  // Replace with Google Sheets API call when ready
  return videos.filter((video) => video.categoryId === categoryId && video.id !== currentVideoId).slice(0, 5)
})

export const fetchVideosBySearch = cache(async (query: string) => {
  // Replace with Google Sheets API call when ready
  const lowercaseQuery = query.toLowerCase()
  return videos.filter(
    (video) =>
      video.title.toLowerCase().includes(lowercaseQuery) ||
      video.description.toLowerCase().includes(lowercaseQuery) ||
      video.presenter.toLowerCase().includes(lowercaseQuery) ||
      video.categoryName.toLowerCase().includes(lowercaseQuery),
  )
})

// Additional function to fetch all videos
export const fetchVideos = cache(async () => {
  // Replace with Google Sheets API call when ready
  return videos
})
