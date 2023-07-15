import { v4 as uuidv4 } from 'https://jspm.dev/uuid'; //for universal random uuid
import tweetsData from './data.js'
const tweetInput = document.getElementById('tweet-input')

//have main feed
function feedHTML(){

    let bodyHtml =""
    tweetsData.forEach(tweet => {
       
        //color the icon it clicked
        let likeIconClass
        let retweetIconClass
        if(tweet.isLiked){
            likeIconClass='liked'
        }
        if(tweet.isRetweeted){
            retweetIconClass='retweeted'
        }

        //added later
        let repliesHtml=''
        if(tweet.replies.length>0){
            tweet.replies.forEach((rpy)=>{
                repliesHtml += `
                <div class="tweet-reply">
                <div class="tweet-inner">
                    <img src="${rpy.profilePic}" class="profile-pic">
                        <div>
                            <p class="handle">${rpy.handle}</p>
                            <p class="tweet-text">${rpy.tweetText}</p>
                        </div>
                    </div>
            </div>   `
            })
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
                        <div class="hidden" id="replies-${tweet.uuid}">${repliesHtml}</div> 
                        </div>          
                   
                </div>`
    });

    return bodyHtml
}

//like/dislike the like icon and  increase/decreases like
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
//like/dislike the retweet icon and increase/decreases retweet
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
//like/dislike the retweet icon and increase/decreases retweet
function renderReply(data){  
    document.getElementById(`replies-${data}`).classList.toggle('hidden')
}

document.addEventListener('click',(e)=>{
    if(e.target.dataset.like){
        renderLike(e.target.dataset.like)
    }else if(e.target.dataset.retweet){
        renderRetweet(e.target.dataset.retweet)
    }else if(e.target.dataset.reply){
        renderReply(e.target.dataset.reply)
    }else if(e.target.id=='tweet-btn'){
        addTweet()
    }
});


const feed = document.getElementById('feed');
function render(){
    feed.innerHTML = feedHTML();
}
//calling main function
render()

function addTweet(){
    const tweetData = {
        handle: `@hemantsah2912 💎`,
        profilePic:`./images/scrimbalogo.png`,
        likes: 0,
        retweets: 0,
        tweetText: tweetInput.value,
        replies: [],
        isLiked: false,
        isRetweeted: false,
        uuid: uuidv4(),
    }
    if(tweetInput.value){
        tweetsData.unshift(tweetData)
    }
    tweetInput.value=''   
    render()
}