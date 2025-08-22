const dummy = (blogs) => {
  if(blogs){
    return 1
  }
}

const totalLikes = (blog) => {
  if(blog.length === 0){
    return 0
  }

  const result = blog[0].likes
  return result
}

module.exports = {
  dummy,
  totalLikes
}
