const mainEl = document.getElementById('blog-list')
const postBtnEl = document.getElementById('post-btn')
// const postTitle = document.getElementById('post-title')
// const postBody = document.getElementById('post-body') 
const form = document.getElementById('new-post')

let postsArray = []

//A function to render the items in the array postsArray[] onto mainEl's innerHTML
function renderPosts(posts){
    let innerHtml = ""
    posts.forEach((post)=>{
        innerHtml += `
            <h3>${post.title}</h3>
            <p>${post.body}</p>
            <hr/>
        `
    })
    mainEl.innerHTML = innerHtml
}

//Gets the first 5 elements from api and stores it in postsArray
fetch('https://apis.scrimba.com/jsonplaceholder/posts')
    .then(res=>res.json())
    .then(data=>{
        postsArray = data.slice(0, 5)
        renderPosts(postsArray)
    })


//Adds the object into postsArray array and calls the render array
postBtnEl.addEventListener('click', function(e){
    e.preventDefault()
    const postTitle = document.getElementById('post-title')
    const postBody = document.getElementById('post-body')
    const data = {
        title: postTitle.value,
        body: postBody.value
    }

    const options = {
        method: "POST",
        body: JSON.stringify(data),
        headers:{
            "Content-Type": "application/json"
        }
    }
    fetch('https://apis.scrimba.com/jsonplaceholder/posts', options)
        .then(res=>res.json())
        .then(data=>{
            postsArray.unshift(data)
            renderPosts(postsArray)
            // postTitle.value = ""
            // postBody.value = ""
            form.reset()
        })
})

