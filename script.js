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
                        <span class="tweet-detail" id="isWorking"><i class="fa-solid fa-comment"></i>
                            ${tweet.replies.length}
                        </span>
                        <span class="tweet-detail "><i class="fa-solid fa-heart"></i>
                            ${tweet.likes}
                        </span>
                        <span class="tweet-detail "><i class="fa-solid fa-retweet"></i>
                            ${tweet.retweets}
                        </span>
                    </div>   
                </div>            
        </div>`

    });

    return bodyHtml
}

const feed = document.getElementById('feed');
feed.innerHTML = feedHTML();