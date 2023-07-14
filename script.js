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
       
        let likeIconClass
        let retweetIconClass
        if(tweet.isLiked){
            likeIconClass='liked'
        }
        if(tweet.isRetweeted){
            retweetIconClass='retweeted'
        }

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
                        <span class="tweet-detail "><i class="fa-solid fa-heart ${likeIconClass}" data-like=${tweet.uuid}></i>
                            ${tweet.likes}
                        </span>
                        <span class="tweet-detail "><i class="fa-solid fa-retweet ${retweetIconClass}" data-retweet=${tweet.uuid}></i>
                            ${tweet.retweets}
                        </span>
                    </div>   
                </div>            
        </div>`

    });

    return bodyHtml
}

function renderLike(data){  
    let tweetObject = tweetsData.filter(ele=>data==ele.uuid)[0]
    if(tweetObject.isLiked){
        tweetObject.likes--
    }else{
        tweetObject.likes++
    }
    tweetObject.isLiked = !tweetObject.isLiked
    render()
}
function renderRetweet(data){  
    let tweetObject = tweetsData.filter(ele=>data==ele.uuid)[0]
    if(tweetObject.isRetweeted){
        tweetObject.retweets--
    }else{
        tweetObject.retweets++
    }
    tweetObject.isRetweeted = !tweetObject.isRetweeted
    render()
}

document.addEventListener('click',(e)=>{
    if(e.target.dataset.like){
        renderLike(e.target.dataset.like)
    }else if(e.target.dataset.retweet){
        renderRetweet(e.target.dataset.retweet)
    }else if(e.target.dataset.reply){
        renderLike(e.target.dataset.reply)
    }
});

const feed = document.getElementById('feed');
function render(){
    feed.innerHTML = feedHTML();
}
render()