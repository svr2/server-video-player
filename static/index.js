
var appData = {
    query : "",
    videos : []
}

function SendQuery(query){
    var url = new URL(window.location.href+"videos/");
    url.searchParams.append('name',query)
    fetch(url).then((response)=>{response.json().then((data)=>{
        appData.videos= []
        for(i = 0; i < data.length; i++){
            let video = { id: '', file : ''}
            video.id = "card-"+i
            video.file = data[i]
            appData.videos.push(video)
        }
    })})
}


///

Vue.component('video-card', {

    props : ['video'],
    data: function () {
      return {
        count: 0
      }
    },
    mounted: function(){
        var vid = this.$refs.vidElement
    },
    methods: {
        toggleVideo : function(){
            var vid = this.$refs.vidElement
            console.log("works")
            if(vid.paused){
                vid.play().catch()
            } else {
                vid.pause().catch()
            }
        }
    },
    template: `
        <a class="vid" ref="vidAnchor" v-bind:href="/watch/+video.file"   
            @mouseover="toggleVideo"
            @mouseleave="toggleVideo"
        >
            <div class="thumb"  ref="thumb"></div>
            <video loop ref="vidElement" v-bind:src="'/cdn/videos/' + video.file" preload=auto></video>
            <p> {{ video.file.substr(0,video.file.length-4).replace(/_/g,' ') }} </p>
        </a>    
    `
  })
  

///


var app = new Vue({ 
    el : "#app",
    data : appData,
    watch : {
        query : SendQuery
    },
    methods : {
    }
})



SendQuery("")