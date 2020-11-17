const submitForm = document.getElementById('myForm');
const gifBtn = document.getElementById('gifBtn');
const emojiBtn = document.getElementById('emojiBtn');
const viewArea = document.getElementById('viewArea');
const gifContainer = document.getElementById('gifContainer');
const writeArea = document.getElementById('writeArea');
const emojiContainer = document.getElementById('emojiContainer');
const emoji = document.querySelectorAll('.emoji');


//remove api key when deploy
const apiKey = "lorR02f1t3GsnOIRMqaypO29cx2GBUVA";

let gifContainerOpen = false;
let emojiContainerOpen = false;
let wantedGif = "";
let wanterEmoji = [];

const img = document.createElement('img');

function selectedGif(url){
    const checkGif = document.querySelector('.selectedGif') === null;
    img.setAttribute('class', "selectedGif");
    img.setAttribute('src', `${url}`);

    if(checkGif){
        writeArea.appendChild(img);
    }
    wantedGif = url;
    gifContainer.style.display = "none";
    gifContainerOpen = false;
}

function selectedEmoji(url){
    const emojiImg = document.createElement('img');
    emojiImg.setAttribute('class', "selectedEmoji");
    emojiImg.setAttribute("src", `${url}`);
    writeArea.appendChild(emojiImg);
    wanterEmoji.push(url);
    console.log(wanterEmoji);

    emojiContainer.style.display = "none";
    emojiContainerOpen = false;
}

emoji.forEach(em => {
    em.addEventListener('click', ()=> selectedEmoji(em.src));
})
function openEmojiMenu(){
    if(emojiContainerOpen){
        emojiContainer.style.display = "none";
        emojiContainerOpen = false;
    } else {
        emojiContainer.style.display = "flex";
        emojiContainerOpen = true;
       
    }
}

async function openGifMenu(){
    if(gifContainerOpen){
        gifContainer.style.display = "none";
        gifContainerOpen = false
    }else{
        gifContainer.style.display = "flex";
        gifContainerOpen = true;
        
        const url = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=16`);
        const res = await url.json();
        const gifData =  res.data;
        
        gifData.forEach(gif => {
            const img = document.createElement('img');
            img.setAttribute('class', 'gif');
            img.setAttribute('src', `${gif.images.fixed_height_small.url}`);
            img.addEventListener('click', ()=>{
                selectedGif(gif.images.fixed_height.url);
            })
            if(gifContainer.childNodes.length <= 15){
                gifContainer.appendChild(img);
            }
    
        })
    }
}

emojiBtn.addEventListener('click', openEmojiMenu);
gifBtn.addEventListener('click', openGifMenu)

const commentFormArray = [];

function enterData(data){
    for(post in data){
        const stickyNote = document.createElement('div');
        viewArea.appendChild(stickyNote);

        const noteUser = document.createElement('h3');
        noteUser.textContent = data[post].name;
        stickyNote.appendChild(noteUser);

        const notePost = document.createElement('p');
        notePost.textContent = data[post].post;
        stickyNote.appendChild(notePost);

        const emojiArray = data[post].emoji;
        emojiArray.forEach(emoji => {
            const noteEmoji = document.createElement('img');
            noteEmoji.setAttribute("class", "selectedEmoji");
            noteEmoji.setAttribute('src', emoji);
            stickyNote.appendChild(noteEmoji);
        })

        const noteGif = document.createElement('img');
        noteGif.setAttribute('src', data[post].gif);
        stickyNote.appendChild(noteGif);

        const noteComment = document.createElement('div');
        const commentHead = document.createElement('h4');
        commentHead.textContent = "Comments";
        noteComment.appendChild(commentHead);

        const commentArray = data[post].comments;
        
        const commentBody = document.createElement('p');
        
        if(commentArray.length > 0){
            commentArray.forEach(comment =>{
                const commentName = document.createElement('p');
                commentName.textContent = `${comment.name}: ${comment.comment}`;
    
                noteComment.appendChild(commentName);
            });
        } else {
            commentBody.textContent = "No comments";
            noteComment.appendChild(commentBody);
        }
        //input for new comment with buttons for emojis
        const commentForm = document.createElement('form');
        commentForm.setAttribute('class', "commentForm");
        noteComment.appendChild(commentForm);

        const commentInput = document.createElement('input');
        commentInput.setAttribute('type', "text");
        commentInput.setAttribute('name', "commentName")
        commentInput.setAttribute('placeHolder', "Enter a name: Enter a comment");
        commentForm.appendChild(commentInput);

        const commentEmoji = document.createElement('input');
        commentEmoji.setAttribute('type', "button");
        commentEmoji.setAttribute('value', "Emoji");
        commentForm.appendChild(commentEmoji); 

        const commentBtn = document.createElement('input');
        commentBtn.setAttribute('type', "button");
        commentBtn.setAttribute('name', "button");
        commentBtn.setAttribute('value', "Post Comment");
        const postId = post
        commentBtn.addEventListener("click", ()=> postComment(commentInput.value, postId));
        commentForm.appendChild(commentBtn); 

        stickyNote.appendChild(noteComment);

    }
}


//console.log(commentFormArray);
async function postComment(comment, postId){
    const splitComment = comment.split(': ');
    let commentName;
    let commentText;
    if(splitComment.length === 1){
        commentName = 'Anonymous';
        commentText = splitComment[0];
    }else{
        commentName = splitComment[0];
        commentText = splitComment[1];
    }
    console.log(splitComment, postId);
    const option = {
        method: 'POST',
        headers: {"content-type": "application/json"},
        body: JSON.stringify({
            name: commentName,
            comment: commentText
        })
    }

    const url = await fetch(`http://localhost:3000/posts/${postId}`, option);
    const res = await url.json();
    
    location.reload();
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
    const gif = wantedGif;
    const emoji = wanterEmoji;

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
    }catch(err){
        console.log(err);
    };
    location.reload();
}

submitForm.addEventListener('submit', postData);
getPosts();