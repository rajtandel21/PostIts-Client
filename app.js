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
const commentFormArray = [];

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
    emojiImg.setAttribute('class', "emoji");
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


function enterData(data){
    for(post in data){
        const stickyNote = document.createElement('div');
        stickyNote.setAttribute("class", "stickyNote container");
        viewArea.appendChild(stickyNote);

        const noteUser = document.createElement('h3');
        noteUser.setAttribute("class", "card-title");
        noteUser.textContent = data[post].name;
        stickyNote.appendChild(noteUser);

        const notePost = document.createElement('p');
        notePost.setAttribute("class", "card-text");
        notePost.textContent = data[post].post;
        stickyNote.appendChild(notePost);

        const emojiArray = data[post].emoji;
        emojiArray.forEach(emoji => {
            const noteEmoji = document.createElement('img');
            noteEmoji.setAttribute("class", "emoji");
            noteEmoji.setAttribute('src', emoji);
            stickyNote.appendChild(noteEmoji);
        })

        const noteGif = document.createElement('img');
        noteGif.setAttribute('src', data[post].gif);
        stickyNote.appendChild(noteGif);

        const noteComment = document.createElement('div');
        noteComment.setAttribute("class", "card-text");
        const commentHead = document.createElement('h5');
        commentHead.setAttribute("class", "card-title");
        commentHead.textContent = "Comments";
        noteComment.appendChild(commentHead);


        //input for new comment with buttons for emojis
        const commentForm = document.createElement('form');
        commentForm.setAttribute('class', "commentForm");
        noteComment.appendChild(commentForm);
        
        //comment text field
        const commentArea = document.createElement('div');
        commentForm.appendChild(commentArea);

        const commentInput = document.createElement('input');
        commentInput.setAttribute('type', "text");
        commentInput.setAttribute('name', "commentName")
        commentInput.setAttribute('placeHolder', "Name: Comment");
        commentInput.setAttribute('class', `comment-${post} form-control form-control-sm`);
        commentArea.appendChild(commentInput);
        let commentEmojiArray = [];
        

        //emoji selection div
        const replyEmoji = document.createElement('div');
        replyEmoji.setAttribute("class", "replyEmoji");
        let replyEmojiShow = false;
        replyEmoji.style.display= "none";

        const imgEmoji = [
            "https://img.pngio.com/-download-tears-iphone-emoji-jpg-emoji-png-640_584.png", 
            "https://i.pinimg.com/originals/85/65/50/856550aa773911d00b76b24aaa4bc467.png", 
            "https://cdn.shopify.com/s/files/1/1061/1924/products/Sad_Face_Emoji_large.png?v=1571606037"
        ];

        imgEmoji.forEach(img => {
            const createEmoji = document.createElement('img');
            createEmoji.setAttribute('class', "emoji");
            createEmoji.setAttribute('src', `${img}`);

            createEmoji.addEventListener('click', ()=>{
                const addEmoji = document.createElement('img');
                addEmoji.setAttribute("class", "emoji");
                addEmoji.setAttribute('src', `${img}`);
                commentArea.appendChild(addEmoji);
                commentEmojiArray.push(img);
            })

            replyEmoji.appendChild(createEmoji);
        })

        commentForm.appendChild(replyEmoji);
        

        const commentEmoji = document.createElement('input');
        commentEmoji.setAttribute('type', "button");
        commentEmoji.setAttribute('value', "😀");
        commentEmoji.setAttribute('class', "btn btn-warning btn-sm");
        commentEmoji.addEventListener("click", ()=>{
            if(replyEmojiShow){
                replyEmoji.style.display = "none";
                replyEmojiShow = false;
            } else{
                replyEmoji.style.display = "flex";
                replyEmojiShow = true;
            }
        })
        commentForm.appendChild(commentEmoji); 

        const commentBtn = document.createElement('input');
        commentBtn.setAttribute('type', "button");
        commentBtn.setAttribute('name', "button");
        commentBtn.setAttribute('value', "Post Comment");
        commentBtn.setAttribute('class', "btn btn-success btn-sm");
        const postId = post
        commentBtn.addEventListener("click", ()=> postComment(commentInput.value, postId, commentEmojiArray));
        commentForm.appendChild(commentBtn); 


        const commentArray = data[post].comments;
        
        const commentBody = document.createElement('p');
        
        if(commentArray.length > 0){
            commentArray.forEach(comment =>{
                const commentName = document.createElement('p');
                commentName.textContent = `${comment.name}: ${comment.comment}`;
                noteComment.appendChild(commentName);
                
                if(comment.emoji.length > 0){
                    (comment.emoji).forEach(emoji=>{
                        const dataEmoji = document.createElement('img');
                        dataEmoji.setAttribute('class', 'emoji');
                        dataEmoji.setAttribute('src', `${emoji}`);
                        noteComment.appendChild(dataEmoji);
                    })
                }
    
            });
        } else {
            commentBody.textContent = "No comments";
            noteComment.appendChild(commentBody);
        }

        stickyNote.appendChild(noteComment);

    }
}


//console.log(commentFormArray);
async function postComment(comment, postId, emojis){
    const splitComment = comment.split(': ');
    let commentName;
    let commentText;
    const invalidComment = document.getElementsByClassName(`comment-${postId}`)[0];
    if(splitComment.length === 1){
        return invalidComment.placeholder = 'Please enter a name: comment';
    } else {
        commentName = (splitComment[0] === "") ? 'Anonymous' : splitComment[0]
        commentText = splitComment[1];       
    }
    console.log(splitComment, postId);
    const option = {
        method: 'POST',
        headers: {"content-type": "application/json"},
        body: JSON.stringify({
            name: commentName,
            comment: commentText,
            emoji: emojis
        })
    }

    const url = await fetch(`https://postits-site.herokuapp.com/posts/${postId}`, option);
    const res = await url.json();
    
    location.reload();
}

function getPosts(){
    fetch('https://postits-site.herokuapp.com/posts')
        .then(res => res.json())
        .then(data => enterData(data));
}

async function postData(e){
    e.preventDefault();
    let name = e.target.name.value;
    let post = e.target.post.value;
    const gif = wantedGif;
    const emoji = wanterEmoji;

    if(name === ""){
        name = "Anonymous";
        e.target.name.value = "Anonymous";
    }
    console.log(name);
    if(post === ""){
        console.log(e.target.post);
        return e.target.post.placeholder = "Cannot post without comment";
    }
    
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
        const postRequest = await fetch('https://postits-site.herokuapp.com/posts', option);
        const postReply = await postRequest.json();
    }catch(err){
        console.log(err);
    };
    
    e.target.name.value = "";
    e.target.post.value = "";
    location.reload();
}

submitForm.addEventListener('submit', postData);
getPosts();
