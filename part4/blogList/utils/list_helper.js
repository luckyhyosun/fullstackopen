const dummy = (blogs) => {
  if (blogs) {
    return 1
  }
}

const totalLikes = (blogs) => {
  let sum = []

  if (blogs.length === 0) {
    return 0
  } else if (blogs.length === 1) {
    const result = blogs[0].likes
    return result
  } else {
    blogs.forEach((blog) => {
      sum.push(blog.likes)
    })
    const result = sum.reduce((accumulator, currentValue) => {
      return accumulator + currentValue
    })
    return result
  }
}

const favoriteBlog = (blogs) => {
  // const result = Math.max(...blogs.map(blog => blog.likes))

  const result = blogs.reduce(function(prev, current) {
    return (prev && prev.likes > current.likes) ? prev : current
  })
  return result
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
