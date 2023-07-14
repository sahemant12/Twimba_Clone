
const tweetInput = document.getElementById('tweet-input');
const btn = document.getElementById('tweet-btn');

btn.addEventListener('click',()=>{
    console.log(tweetInput.value);
    tweetInput.value=""
})