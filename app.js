const submitForm = document.getElementById('myForm');
const gifBtn = document.getElementById('gifBtn');
const emojiBtn = document.getElementById('emojiBtn');
const viewArea = document.getElementById('viewArea');

function enterData(data){
    for(post in data){
        const stickyNote = document.createElement('div');
        viewArea.appendChild(stickyNote);

        const noteUser = document.createElement('h3');
        noteUser.textContent = post.name;
        stickyNote.appendChild(noteUser);

        const notePost = document.createElement('p');
        notePost.textContent = post.post;
        stickyNote.appendChild(notePost);

        const noteEmoji = document.createElement('img');
        noteEmoji.textContent = post.emoji;
        stickyNote.appendChild(noteEmoji);

        const noteGif = document.createElement('img');
        noteGif.textContent = post.gif;
        stickyNote.appendChild(noteGif);

        const noteComment = document.createElement('div');
        noteComment.textContent = post.comment;
        stickyNote.appendChild(noteComment);

    }
}

function getPosts(){
    fetch('http://localhost:3000/posts')
        .then(res => res.json())
        .then(data => enterData(data));
}

async function postData(e){
    e.preventDefault();
    const name = e.target.name.value;
    const post = e.target.post.value;
    const gif = "";
    const emoji = "";

    console.log(name, post);

    const option = {
        method: 'POST',
        headers: {"content-type": "application/json"},
        body: JSON.stringify({
            name: name, 
            post: post,
            gif: gif,
            emoji: emoji
        })
    };

    try{
        const postRequest = await fetch('http://localhost:3000/posts', option);
        const postReply = await postRequest.json();
        console.log(postReply)
    }catch(err){
        console.log(err);
    };

}

submitForm.addEventListener('submit', postData);
getPosts();