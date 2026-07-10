// ======================================================
// HAPPY BIRTHDAY WEBSITE
// VERSION 3.0
// PART 1A
// ======================================================



// ======================================================
// DOM ELEMENTS
// ======================================================

const chapter1 = document.getElementById("chapter1");
const chapter2 = document.getElementById("chapter2");

const title = document.getElementById("title");
const subtitle = document.getElementById("subtitle");

const beginBtn = document.getElementById("beginBtn");

const chapterTitle = document.getElementById("chapterTitle");
const chapterText = document.getElementById("chapterText");

const continueBtn = document.getElementById("continueBtn");

const storyImage = document.getElementById("storyImage");

const music = document.getElementById("bgMusic");

const starContainer = document.getElementById("star-container");

const shootingContainer =
document.querySelector(".shooting-stars");



// ======================================================
// WEBSITE DATA
// ======================================================

const chapters = [

{

title:
"Every star in the sky shines tonight...",

text:
"Because today belongs to someone truly special.",

image:null,

button:"Begin Journey ✨"

},

{

title:
"Hi, Madam ji ❤️",

text:
`Today isn't just another date.
Today is the day someone incredibly precious came into this world.
And somehow...
out of billions of people...
life decided our paths should cross.
I still think that's one of the nicest things fate has ever done.`,

image:"images/cat1.jpg",

button:"Turn the Page →"

}

];



// ======================================================
// GLOBAL VARIABLES
// ======================================================

let currentChapter = 0;

let typing = false;

let musicStarted = false;



// ======================================================
// MUSIC
// ======================================================

music.volume = 0.30;

function startMusic(){

if(musicStarted) return;

music.play().catch(()=>{});

musicStarted = true;

}



// ======================================================
// STAR GENERATOR
// ======================================================

function createStars(total=350){

for(let i=0;i<total;i++){

const star=document.createElement("div");

star.className="star";

const size=Math.random()*3+1;

star.style.width=size+"px";

star.style.height=size+"px";

star.style.left=Math.random()*100+"%";

star.style.top=Math.random()*100+"%";

star.style.opacity=Math.random()*0.8+.2;

star.style.animationDuration=
(Math.random()*4+2)+"s";

star.style.animationDelay=
(Math.random()*5)+"s";

if(size>2.5){

star.style.boxShadow="0 0 8px white";

}

starContainer.appendChild(star);

}

}



// ======================================================
// INITIALIZE BACKGROUND
// ======================================================

createStars();
// ======================================================
// PART 1B
// SHOOTING STARS + TYPEWRITER ENGINE
// ======================================================



// ======================================================
// SHOOTING STARS
// ======================================================

function createMeteor(){

    const meteor = document.createElement("div");

    meteor.className = "shooting-star";

    meteor.style.top = Math.random()*40 + "%";

    meteor.style.left = (70 + Math.random()*30) + "%";

    meteor.style.animationDuration =
    (0.8 + Math.random()*1.2) + "s";

    meteor.style.setProperty(

        "--angle",

        (-20 - Math.random()*35) + "deg"

    );

    shootingContainer.appendChild(meteor);

    setTimeout(()=>{

        meteor.remove();

    },2000);

}



function meteorLoop(){

    createMeteor();

    if(Math.random() < 0.35){

        setTimeout(

            createMeteor,

            Math.random()*900 + 200

        );

    }

    if(Math.random() < 0.15){

        setTimeout(

            createMeteor,

            Math.random()*1200 + 400

        );

    }

    setTimeout(

        meteorLoop,

        Math.random()*11000 + 4000

    );

}



// ======================================================
// UNIVERSAL TYPEWRITER
// ======================================================

function typeWriter(

element,

text,

speed,

finished

){

    let index = 0;

    element.innerHTML = "";

    typing = true;

    function type(){

        if(index >= text.length){

            typing = false;

            if(finished){

                finished();

            }

            return;

        }

        const character = text.charAt(index);

        if(character === "\n"){

            element.innerHTML += "<br>";

        }

        else{

            element.innerHTML += character;

        }

        index++;

        setTimeout(type,speed);

    }

    type();

}



// ======================================================
// TYPE CHAPTER 1
// ======================================================

function loadLandingPage(){

    typeWriter(

        title,

        chapters[0].title,

        70,

        ()=>{

            typeWriter(

                subtitle,

                chapters[0].text,

                40,

                ()=>{

                    beginBtn.style.opacity = "1";

                    beginBtn.style.pointerEvents = "auto";

                }

            );

        }

    );

}



// ======================================================
// IMAGE LOADER
// ======================================================

function showImage(src){

    if(!src){

        storyImage.style.display = "none";

        return;

    }

    storyImage.style.display = "block";

    storyImage.src = src;

    storyImage.classList.remove("show");

    setTimeout(()=>{

        storyImage.classList.add("show");

    },150);

}



// ======================================================
// START WEBSITE
// ======================================================

meteorLoop();

loadLandingPage();
// ======================================================
// PART 2A
// CHAPTER MANAGER
// ======================================================


// =====================================
// Show Chapter
// =====================================

function showChapter(number){

    document.querySelectorAll(".chapter").forEach(ch=>{

        ch.classList.remove("active");

    });

    const nextChapter =
    document.getElementById("chapter"+number);

    nextChapter.classList.add("active");

    currentChapter = number;

}



// =====================================
// Begin Journey Button
// =====================================

beginBtn.addEventListener("click",()=>{

    if(typing) return;

    startMusic();

    beginBtn.classList.add("button-click");

    chapter1.classList.add("fadeOut");

    setTimeout(()=>{

        chapter1.classList.remove("active");

        chapter1.classList.remove("fadeOut");

        chapter2.classList.add("active");

        loadChapter2();

    },800);

});



function loadChapter2(){

    chapterTitle.innerHTML="";

    chapterText.innerHTML="";
    showImage("images/cat1.jpg");

    continueBtn.classList.remove("show");

    const heading =
    "Hi, Madam ji ❤️";

    const message =
`Today isn't just another date.
Today is the day someone incredibly precious came into this world.
And somehow...
out of billions of people...
life decided our paths should cross.
I still think that's one of the nicest things fate has ever done.`;

    let h=0;
    let p=0;

    function typeHeading(){

    if(h === 0){
        typing = true;
    }

    if(h < heading.length){

        chapterTitle.innerHTML += heading.charAt(h);

        h++;

        setTimeout(typeHeading,70);

    }

    else{

        setTimeout(typeMessage,500);

    }

}

    function typeMessage(){

        if(p < message.length){

            const ch=message.charAt(p);

            if(ch=="\n"){

                chapterText.innerHTML+="<br>";

            }

            else{

                chapterText.innerHTML+=ch;

            }

            p++;

            setTimeout(typeMessage,30);

        }

        else{

            storyImage.classList.add("show");

            setTimeout(()=>{

                continueBtn.classList.add("show");

            },500);

        }
        
    }

    typeHeading();

}

// =====================================
// Continue Button (Chapter 2 -> 3)
// =====================================

continueBtn.onclick = ()=>{

    document.getElementById("chapter2").classList.remove("active");
    document.getElementById("chapter3").classList.add("active");

    typeChapter3Heading();

};


// =====================================
// CHAPTER 3
// =====================================

const chapter3Title = document.getElementById("chapter3Title");
const chapter3Text = document.getElementById("chapter3Text");
const chapter3Image = document.getElementById("storyImage2");
const chapter3Btn = document.getElementById("chapter3Btn");

const chapter3Heading =
"Then... there was you.💗";

const chapter3Message =
`We started as two people
who barely knew each other.

And somehow...

we ended up sharing random thoughts,
laughing at the dumbest things,
sending reels,
and making ordinary days
a little less ordinary.

I still think that's pretty cool.`;

let c3h = 0;
let c3p = 0;

function typeChapter3Heading(){

    chapter3Title.innerHTML = "";
    chapter3Text.innerHTML = "";

    chapter3Image.src = "images/cat2.jpg";
    chapter3Image.classList.add("show");

    chapter3Btn.classList.remove("show");

    c3h = 0;
    c3p = 0;

    typeHeading3();

}

function typeHeading3(){

    if(c3h < chapter3Heading.length){

        chapter3Title.innerHTML += chapter3Heading.charAt(c3h);

        c3h++;

        setTimeout(typeHeading3,70);

    }

    else{

        setTimeout(typeMessage3,500);

    }

}

function typeMessage3(){

    if(c3p < chapter3Message.length){

        const ch = chapter3Message.charAt(c3p);

        if(ch === "\n"){

            chapter3Text.innerHTML += "<br>";

        }

        else{

            chapter3Text.innerHTML += ch;

        }

        c3p++;

        setTimeout(typeMessage3,30);

    }

    else{

        setTimeout(()=>{

            chapter3Btn.classList.add("show");

        },500);

    }

}

chapter3Btn.onclick = ()=>{

    document.getElementById("chapter3").classList.remove("active");
    document.getElementById("chapter4").classList.add("active");

    typeChapter4Heading();

};


// =====================================
// CHAPTER 4
// =====================================

const chapter4Title = document.getElementById("chapter4Title");
const chapter4Text = document.getElementById("chapter4Text");
const chapter4Image = document.getElementById("storyImage3");
const chapter4Btn = document.getElementById("chapter4Btn");

const chapter4Heading =
"Things I Admire About You 💗";

const chapter4Message =
`It was never just one thing.

It wasn't one conversation.
Or one smile.
Or one moment.

It was always the little things.

The way you genuinely care
about the people around you.

You're kind
without trying to prove it.

You have this beautiful ability to make people
feel comfortable just by being yourself.

And that's something
I've always admired about you.`;

let c4h = 0;
let c4p = 0;

function typeChapter4Heading(){

    chapter4Title.innerHTML = "";
    chapter4Text.innerHTML = "";

    chapter4Image.src = "images/cat3jpg.jpg";
    chapter4Image.classList.add("show");

    chapter4Btn.classList.remove("show");

    c4h = 0;
    c4p = 0;

    typeHeading4();

}

function typeHeading4(){

    if(c4h < chapter4Heading.length){

        chapter4Title.innerHTML += chapter4Heading.charAt(c4h);

        c4h++;

        setTimeout(typeHeading4,70);

    }

    else{

        setTimeout(typeMessage4,500);

    }

}

function typeMessage4(){

    if(c4p < chapter4Message.length){

        const ch = chapter4Message.charAt(c4p);

        if(ch === "\n"){

            chapter4Text.innerHTML += "<br>";

        }

        else{

            chapter4Text.innerHTML += ch;

        }

        c4p++;

        setTimeout(typeMessage4,30);

    }

    else{

        setTimeout(()=>{

            chapter4Btn.classList.add("show");

        },500);

    }

}

// =====================================
// GO TO LESSON 13
// =====================================

chapter4Btn.onclick = ()=>{

    document
    .getElementById("chapter4")
    .classList.remove("active");

    document
    .getElementById("chapter6")
    .classList.add("active");

};


// =====================================
// CHAPTER 6 (LESSON 13)
// =====================================

const chapter6Title =
document.getElementById("chapter6Title");

const chapter6Text =
document.getElementById("chapter6Text");

const fairyLights =
document.getElementById("fairyLights");

const decorations =
document.getElementById("decorations");

const balloonContainer =
document.getElementById("balloonContainer");

const cakeArea =
document.getElementById("cakeArea");

const wishArea =
document.getElementById("wishArea");

const celebrateBtn =
document.getElementById("celebrateBtn");

let celebrationStep = 0;


// =====================================
// MAIN BUTTON
// =====================================

celebrateBtn.onclick = ()=>{

switch(celebrationStep){

case 0:

turnLightsOn();

celebrateBtn.innerHTML =
"🎀 Decorate";

break;



case 1:

decorateRoom();

celebrateBtn.innerHTML =
"🎈 Bring Balloons";

break;



case 2:

releaseBalloons();

celebrateBtn.innerHTML =
"🎂 Cake Time";

break;



case 3:

showCake();

celebrateBtn.style.display = "none";

break;



case 4:

makeWish();

celebrateBtn.innerHTML =
"❤️ Wish Made";

break;



case 5:

alert("Lesson 14 Coming Next ❤️");

break;

}

celebrationStep++;

};



// =====================================
// LIGHTS
// =====================================

function turnLightsOn(){

for(let i=0;i<18;i++){

const bulb =
document.createElement("div");

bulb.className = "light";

bulb.style.left =
(3 + i*5.3)+"%";

bulb.style.top =
(Math.random()*18)+"px";

bulb.style.animationDelay =
(Math.random()*2)+"s";

fairyLights.appendChild(bulb);

}

}



// =====================================
// DECORATIONS
// =====================================

function decorateRoom(){

const colors =

["red","blue","yellow","pink"];

for(let i=0;i<14;i++){

const streamer =
document.createElement("div");

streamer.className =
"streamer "+colors[i%4];

streamer.style.left =
(5+i*7)+"%";

streamer.style.top="-15px";

streamer.style.animationDelay =
(Math.random()*2)+"s";

decorations.appendChild(streamer);

}

}



// =====================================
// BALLOONS
// =====================================

function releaseBalloons(){

setInterval(()=>{

const balloon =
document.createElement("div");

balloon.className = "balloon";

const colors=[

"#ff4d6d",

"#6ec6ff",

"#ffd84d",

"#ff7cc8",

"#90ee90"

];

balloon.style.background =

colors[Math.floor(

Math.random()*colors.length)];

balloon.style.left =

Math.random()*95+"%";

balloon.style.animationDuration =

(8+Math.random()*5)+"s";

balloonContainer.appendChild(balloon);

setTimeout(()=>{

balloon.remove();

},14000);

},500);

}



// =====================================
// CAKE
// =====================================

function showCake(){

cakeArea.innerHTML = `

<img
id="birthdayCake"
src="images/cake.png">

<p id="cakeInstruction"
style="
margin-top:18px;
font-size:22px;
">

👉 Swipe across the cake
to cut it.

</p>

`;

enableCakeCut();

}

// =====================================
// CAKE CUT
// =====================================

function enableCakeCut(){

const cake =
document.getElementById("birthdayCake");

let dragging = false;

cake.addEventListener("mousedown",()=>{

dragging = true;

});

document.addEventListener("mouseup",()=>{

dragging = false;

});

cake.addEventListener("mousemove",(e)=>{

if(!dragging) return;

cutCake();

});



// Mobile

cake.addEventListener("touchmove",(e)=>{

cutCake();

});

}

// =====================================
// CUT CAKE
// =====================================

function cutCake(){

const cake =
document.getElementById("birthdayCake");

const text =
document.getElementById("cakeInstruction");

if(cake.dataset.cut) return;

cake.dataset.cut = true;

cake.src = "images/cake-cut.png";

cake.style.transform =
"scale(1.08)";

text.innerHTML =

"🎉 Cake Cut! 🎉";

launchConfetti();

setTimeout(()=>{

wishArea.innerHTML = `

<div class="wish-box">

<h3>🌠 Make a Wish 🌠</h3>

<p>

Close your eyes...

Take a deep breath...

And wish for
whatever makes
your heart smile.

</p>

</div>

`;

setTimeout(()=>{

    celebrateBtn.style.display = "inline-block";

    celebrateBtn.innerHTML =
    "❤️ Wish Made";

    celebrationStep = 5;

},3000);

},1800);

}// =====================================
// CONFETTI
// =====================================

function launchConfetti(){

for(let i=0;i<80;i++){

const piece =
document.createElement("div");

piece.style.position="absolute";

piece.style.left="50%";

piece.style.top="50%";

piece.style.width="8px";

piece.style.height="8px";

piece.style.background=

`hsl(${Math.random()*360},90%,65%)`;

piece.style.pointerEvents="none";

piece.style.borderRadius="50%";

piece.style.zIndex="999";

document.body.appendChild(piece);

const x=(Math.random()-0.5)*700;

const y=(Math.random()-0.5)*700;

piece.animate([

{

transform:

"translate(0,0)",

opacity:1

},

{

transform:

`translate(${x}px,${y}px)`,

opacity:0

}

],{

duration:1800

});

setTimeout(()=>{

piece.remove();

},1800);

}

}



