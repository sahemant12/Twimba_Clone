import tweetsData from './data.js'
const tweetInput = document.getElementById('tweet-input')
const btn = document.getElementById('tweet-btn')

btn.addEventListener('click',()=>{
    console.log(tweetInput.value)
    tweetInput.value=""
})

function feedHTML(){

    let bodyHtml =""
    tweetsData.forEach(tweet => {
        
        bodyHtml +=`
        <div class="tweet">
            <div class="tweet-inner">
                <img src="${tweet.profilePic}" class="profile-pic">
                <div>
                    <p class="handle">${tweet.handle}</p>
                    <p class="tweet-text">${tweet.tweetText}</p>
                    <div class="tweet-details">
                        <span class="tweet-detail" id="isWorking"><i class="fa-solid fa-comment" data-reply=${tweet.uuid}></i>
                            ${tweet.replies.length}
                        </span>
                        <span class="tweet-detail "><i class="fa-solid fa-heart" data-like=${tweet.uuid}></i>
                            ${tweet.likes}
                        </span>
                        <span class="tweet-detail "><i class="fa-solid fa-retweet" data-retweet=${tweet.uuid}></i>
                            ${tweet.retweets}
                        </span>
                    </div>   
                </div>            
        </div>`

    });

    return bodyHtml
}

function render(data){
    
    console.log(data);

}

document.addEventListener('click',(e)=>{
    if(e.target.dataset.like){
        render(e.target.dataset.like)
    }else if(e.target.dataset.retweet){
        render(e.target.dataset.retweet)
    }else if(e.target.dataset.reply){
        render(e.target.dataset.reply)
    }
});

const feed = document.getElementById('feed');
feed.innerHTML = feedHTML();