<template>




  <div class="min-h-screen space-y-5 md:space-y-10 bg-light-primary flex justify-center items-center flex-col flex-wrap text-light-secondary dark:bg-dark-primary dark:text-dark-secondary p-4 ">
    
    <div class=" md:w-1/2 rounded bg-white overflow-hidden shadow-lg">
  <div class="px-6 py-4">
    <div class="text-gray-700 text-base">
        <div class="flex justify-between">
            <h1 class="font-bold underline mb-1">How to Play</h1>
            <span class="text-xs font-bold cursor-pointer underline" @click="collapse()">{{ labelMessage }}</span>
        </div>

        <div v-show="!collapsed">
            <p class="text-sm">
            Above the open cards are hidden cards in sequence. Swap the open cards position to get the default arrangement of the closed cards.
            </p>
            <p class="text-sm font-bold">NB: The number of cards that are accurately positioned is stated below. It's a game of memory 😀 </p>
            <p>To swap, click on an open card and click on another open card to swap the positions of both cards</p>
            <span class="text-blue-500 text-xs">You are allowed to check your swap a max of <strong class="font-extrabold">10</strong> times. This value reduces as you check your swaps</span>
            <br>
            <span class="text-sm font-bold">
                Here's a video tutorial
            </span>
            <div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/317ce6bd0fe04b63a91a5957b0720a7f?sid=5b51b77d-a8cb-4984-bb38-3f91c09a27c3" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>
            </div>


        </div>
        
     
  </div>

</div>

    <div class="flex">
        <div v-for="(entity, index) in entities" :key="index" class="relative flex justify-between">
            <div  class="   transition ease-linear hover:scale-105 delay-75 md:text-9xl text-4xl my-1  py-2 border-2 border-black  mx-1 hover:cursor-pointer  md:p-5 rounded-sm hover:bg-light-white dark:hover:bg-dark-primary">
            <span    v-html="entity">
            </span> 
            
            </div>
            <div :class="{'overlay-removed': removeOverlay}" class="overlay  absolute  top-0 left-0 "></div>
        </div>
        
       
    </div>
    <div class="flex">
        <span :class="[selected === index ? 'selected' : '']" @click="select(index)"  v-for="(card, index) in cards" :key="index" class=" w-1/4 transition ease-linear hover:scale-105 delay-75 md:text-9xl text-4xl my-1 border-gray-500 py-2 border-2  mx-1 hover:cursor-pointer  md:p-5 rounded-sm hover:bg-light-white dark:hover:bg-dark-primary" v-html="card"></span> 
    </div>

    
  <div class="text-black font-bold text-lg ">
      <p class="font-bold">Number of cards placed correctly: {{ match }}</p>
      <p class="font-bold">Checks remaining: {{ counter }}</p>
  </div>



    <div style="z-index: 3000;" class="flex  justify-between">
        <button @click="check()" class="border-2 mx-1 px-10 md:px-20 md:py-5 py-3 md:text-2xl bg-white text-light-primary rounded-lg font-bold hover:text-green-950 dark:bg-dark-primary">Check</button>
        <button v-if="counter <1 || match === 5" @click="printEntities()" class="border-2 mx-1 px-10 md:px-20 md:py-5 py-3 md:text-2xl bg-white text-light-primary rounded-lg font-bold hover:text-green-950 dark:bg-dark-primary">Reset</button>
    </div>
    
    <div v-if="match === 5" class="confetti ">
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
    <div class="confetti-piece"></div>
</div>
  </div>
 
</template>

<script setup>

import { ref, onBeforeMount } from 'vue';

let theme = ref('light');

let entities = ref([]);

let removeOverlay = ref(false);

let cards = ref([]);

let selected = ref('');

let match = ref(0);

let counter = ref(10);

let collapsed = ref(false)

let labelMessage = ref('Collapse')


function toggle() {
    
    if (theme.value === 'light') {
        
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
        theme.value = 'dark';
    } else {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
        theme.value = 'light';
    }
}

function collapse()
{
    collapsed.value = !collapsed.value;

    if (collapsed.value) {
        labelMessage.value = 'Expand'
    } else {
        labelMessage.value = 'Collapse'
    }
}

function printEntities () {
    let htmlEntities = generateHTMLEntities();
    entities.value = htmlEntities
    setCardElements(htmlEntities);
    initializeGame();
}

function initializeGame() {
    removeOverlay.value = false;
    counter.value = 10;
}

function setCardElements(elements) {
    do {
        cards.value = shuffle([...elements]);
        matchCards();
   } while(match.value > 0)

}

function generateHTMLEntities() {
    let e = [];

    for (let i = 0; i < 5; i++) {
        let char = 127790 + randomIntFromInterval(1, 100);
        let cardElement = '&#'+ char + ";";
        if (!e.includes(cardElement)) {
            e.push(cardElement);
        } else {
            i--;
        } 
    }

    return e;
}
function check() {
    
    if (counter.value < 1) {
        alert('You ran out of checks!');
        removeOverlay.value = true;
        return;
    }
   
    matchCards();

    if (match.value === 5) {
        removeOverlay.value = true;
        alert("You won!");
        return;
    }

    counter.value--;

    if (counter.value < 1) {
        alert('You ran out of checks!');
        removeOverlay.value = true;
        return;
    }
}

function matchCards()
{
    match.value = 0;
    for (let i = 0; i < 5; i++) {
        if (entities.value[i] === cards.value[i]) {
            match.value++;
        }
    }
}

function select(index) {
    if (selected.value === '') {
        selected.value = index;
    }
    else if (index === selected.value) {
        selected.value = ''
    } else {
        let selectedItem = cards.value[selected.value];
        let itemToBeSwapped = cards.value[index];
        cards.value[index] = selectedItem;
        cards.value[selected.value] = itemToBeSwapped;
        selected.value = ''

    } 
}


function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) { 
        const j = Math.floor(Math.random() * (i + 1)); 
        [array[i], array[j]] = [array[j], array[i]]; 
    } 
    return array;
}


onBeforeMount( () => {
     printEntities();
})

</script>

<style>

.selected {
    position: relative;
    top: -2rem;
    background: white;
    scale: 1.1;
    transition: linear .6s;
    z-index: 100;
}

.overlay-removed {
    background: transparent !important;
}

.overlay {
    position: absolute;
    height: 100%;
    width: 99%;
    background-color: rgba(0, 0, 0, 1); /* Semi-transparent black overlay */
    justify-content: center;
    align-items: center;
}


.confetti {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 1000;
}
.confetti-piece {
    position: absolute;
    width: 10px;
    height: 30px;
    background: #ffd300;
    top: 0;
    opacity: 0;
}
.confetti-piece:nth-child(1) {
    left: 7%;
    transform: rotate(-40deg);
    animation: makeItRain 1000ms infinite ease-out;
    animation-delay: 182ms;
    animation-duration: 1116ms;
}
.confetti-piece:nth-child(2) {
    left: 14%;
    transform: rotate(4deg);
    animation: makeItRain 1000ms infinite ease-out;
    animation-delay: 161ms;
    animation-duration: 1076ms;
}
.confetti-piece:nth-child(3) {
    left: 21%;
    transform: rotate(-51deg);
    animation: makeItRain 1000ms infinite ease-out;
    animation-delay: 481ms;
    animation-duration: 1103ms;
}
.confetti-piece:nth-child(4) {
    left: 28%;
    transform: rotate(61deg);
    animation: makeItRain 1000ms infinite ease-out;
    animation-delay: 334ms;
    animation-duration: 708ms;
}
.confetti-piece:nth-child(5) {
    left: 35%;
    transform: rotate(-52deg);
    animation: makeItRain 1000ms infinite ease-out;
    animation-delay: 302ms;
    animation-duration: 776ms;
}
.confetti-piece:nth-child(6) {
    left: 42%;
    transform: rotate(38deg);
    animation: makeItRain 1000ms infinite ease-out;
    animation-delay: 180ms;
    animation-duration: 1168ms;
}
.confetti-piece:nth-child(7) {
    left: 49%;
    transform: rotate(11deg);
    animation: makeItRain 1000ms infinite ease-out;
    animation-delay: 395ms;
    animation-duration: 1200ms;
}
.confetti-piece:nth-child(8) {
    left: 56%;
    transform: rotate(49deg);
    animation: makeItRain 1000ms infinite ease-out;
    animation-delay: 14ms;
    animation-duration: 887ms;
}
.confetti-piece:nth-child(9) {
    left: 63%;
    transform: rotate(-72deg);
    animation: makeItRain 1000ms infinite ease-out;
    animation-delay: 149ms;
    animation-duration: 805ms;
}
.confetti-piece:nth-child(10) {
    left: 70%;
    transform: rotate(10deg);
    animation: makeItRain 1000ms infinite ease-out;
    animation-delay: 351ms;
    animation-duration: 1059ms;
}
.confetti-piece:nth-child(11) {
    left: 77%;
    transform: rotate(4deg);
    animation: makeItRain 1000ms infinite ease-out;
    animation-delay: 307ms;
    animation-duration: 1132ms;
}
.confetti-piece:nth-child(12) {
    left: 84%;
    transform: rotate(42deg);
    animation: makeItRain 1000ms infinite ease-out;
    animation-delay: 464ms;
    animation-duration: 776ms;
}
.confetti-piece:nth-child(13) {
    left: 91%;
    transform: rotate(-72deg);
    animation: makeItRain 1000ms infinite ease-out;
    animation-delay: 429ms;
    animation-duration: 818ms;
}
.confetti-piece:nth-child(odd) {
    background: #7431e8;
}
.confetti-piece:nth-child(even) {
    z-index: 1;
}
.confetti-piece:nth-child(4n) {
    width: 5px;
    height: 12px;
    animation-duration: 2000ms;
}
.confetti-piece:nth-child(3n) {
    width: 3px;
    height: 10px;
    animation-duration: 2500ms;
    animation-delay: 1000ms;
}
.confetti-piece:nth-child(4n-7) {
  background: red;
}
@keyframes makeItRain {
    from {opacity: 0;}
    50% {opacity: 1;}
    to {transform: translateY(350px);}
}
</style>