// Mock data for posts
let posts = [
    {
        id: 1,
        username: 'user123',
        userImage: 'https://via.placeholder.com/32',
        postImage: 'https://via.placeholder.com/600',
        caption: 'Beautiful day! #sunshine',
        likes: 42,
        comments: []
    }
];

// DOM Elements
const postsContainer = document.querySelector('.posts');
const createPostBtn = document.getElementById('create-post');
const modal = document.getElementById('create-post-modal');
const closeBtn = document.querySelector('.close');
const postForm = document.getElementById('post-form');

// Create Post HTML
function createPostElement(post) {
    const postElement = document.createElement('div');
    postElement.className = 'post';
    postElement.innerHTML = `
        <div class="post-header">
            <img src="${post.userImage}" alt="${post.username}">
            <p class="username">${post.username}</p>
        </div>
        <img src="${post.postImage}" alt="post" class="post-img">
        <div class="post-content">
            <div class="post-actions">
                <i class="far fa-heart" onclick="toggleLike(this, ${post.id})"></i>
                <i class="far fa-comment"></i>
                <i class="far fa-paper-plane"></i>
            </div>
            <p class="likes">${post.likes} likes</p>
            <p><span class="username">${post.username}</span> ${post.caption}</p>
            <div class="comments">
                ${post.comments.map(comment => `
                    <p><span class="username">${comment.username}</span> ${comment.text}</p>
                `).join('')}
            </div>
            <input type="text" placeholder="Add a comment..." class="comment-input" onkeypress="addComment(event, ${post.id}, this)">
        </div>
    `;
    return postElement;
}

// Render all posts
function renderPosts() {
    postsContainer.innerHTML = '';
    posts.forEach(post => {
        postsContainer.appendChild(createPostElement(post));
    });
}

// Toggle like
function toggleLike(element, postId) {
    const post = posts.find(p => p.id === postId);
    if (element.classList.contains('far')) {
        element.classList.replace('far', 'fas');
        element.style.color = '#ff3040';
        post.likes++;
    } else {
        element.classList.replace('fas', 'far');
        element.style.color = 'black';
        post.likes--;
    }
    element.parentElement.nextElementSibling.textContent = `${post.likes} likes`;
}

// Add comment
function addComment(event, postId, input) {
    if (event.key === 'Enter' && input.value.trim() !== '') {
        const post = posts.find(p => p.id === postId);
        post.comments.push({
            username: 'user123', // In a real app, this would be the logged-in user
            text: input.value.trim()
        });
        renderPosts();
        input.value = '';
    }
}

// Modal functionality
createPostBtn.onclick = () => modal.style.display = 'block';
closeBtn.onclick = () => modal.style.display = 'none';
window.onclick = (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// Handle new post creation
postForm.onsubmit = (e) => {
    e.preventDefault();
    const imageFile = document.getElementById('post-image').files[0];
    const caption = document.getElementById('post-caption').value;

    if (imageFile) {
        // In a real app, you would upload the image to a server
        // Here we're just creating a URL for the uploaded image
        const imageUrl = URL.createObjectURL(imageFile);
        
        const newPost = {
            id: posts.length + 1,
            username: 'user123', // In a real app, this would be the logged-in user
            userImage: 'https://via.placeholder.com/32',
            postImage: imageUrl,
            caption: caption,
            likes: 0,
            comments: []
        };

        posts.unshift(newPost);
        renderPosts();
        modal.style.display = 'none';
        postForm.reset();
    }
};

// Initial render
renderPosts();
