const submitForm = document.getElementById('myForm');
const gifBtn = document.getElementById('gifBtn');
const emojiBtn = document.getElementById('emojiBtn');
const viewArea = document.getElementById('viewArea');
const gifContainer = document.getElementById('gifContainer');
const writeArea = document.getElementById('writeArea');


//remove api key when deploy
const apiKey = "lorR02f1t3GsnOIRMqaypO29cx2GBUVA";

let gifContainerOpen = false;
let wantedGif = "";

const img = document.createElement('img');
function selectedGif(url){
    img.setAttribute('src', `${url}`);
    if(writeArea.childNodes.length === 4){
        writeArea.appendChild(img);
    }
    wantedGif = url;
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

        const noteEmoji = document.createElement('img');
        noteEmoji.setAttribute('src', data[post].emoji);
        stickyNote.appendChild(noteEmoji);

        const noteGif = document.createElement('img');
        noteGif.setAttribute('src', data[post].gif);
        stickyNote.appendChild(noteGif);

        const noteComment = document.createElement('div');
        const commentHead = document.createElement('h4');
        commentHead.textContent = "Comments";
        noteComment.appendChild(commentHead);

        const commentArray = data[post].comments;
        const commentName = document.createElement('p');
        const commentBody = document.createElement('p');
        
        if(commentArray.length > 0){
            commentArray.forEach(comment =>{
                commentName.textContent = comment.name;
                commentBody.textContent = comment.comment;
    
                noteComment.appendChild(commentName);
                noteComment.appendChild(commentBody);
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
        commentInput.setAttribute('placeHolder', "Enter a comment");
        commentForm.appendChild(commentInput);

        const commentEmoji = document.createElement('input');
        commentEmoji.setAttribute('type', "button");
        commentEmoji.setAttribute('value', "Emoji");
        commentForm.appendChild(commentEmoji); 

        const commentBtn = document.createElement('input');
        commentBtn.setAttribute('type', "button");
        commentBtn.setAttribute('name', "button");
        commentBtn.setAttribute('value', "Post Comment");
        commentBtn.addEventListener("click", ()=> postComment(commentInput.value));
        commentForm.appendChild(commentBtn); 

        stickyNote.appendChild(noteComment);

    }
}


//console.log(commentFormArray);
async function postComment(e){
    console.log(e);
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