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

music.volume = 0.55;

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

chapter4Btn.onclick = ()=>{

    alert("Lesson 12 😄");

};

