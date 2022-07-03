"use strict";
const list = data.galeryItems;
const title = data.galeryTitle;
let firstCounter = 0;//500 or less
let secondCounter = 0;//501 -> 999
let thirdCounter = 0;//1000 -> ~
let template = "";
const galeryTarget = document.querySelector("#galeryTarget");

//we first need to execute the function that creates the container for the galery
createGaleryContainer();//
//then we find the elements in the DOM to append the galery content
const galeryContent = document.querySelector("#galeryContent");
const btnPrev = document.querySelector("#btnPrev");
const btnNext = document.querySelector("#btnNext");

//styling for buttons
btnPrev.style.backgroundImage = `url(./icons/arrow-icon.png)`;//this path will be a CDN image
btnNext.style.backgroundImage = `url(./icons/arrow-icon.png)`;//this path will be a CDN image

function createGaleryContainer(){
    //create the title for the galery
    const galeryTitle = document.createElement("h2");
    galeryTitle.textContent = `${title}`;
    //this just creates the container of the galery
    const gridGalery = document.createElement("div");
    gridGalery.id = "gridGalery";
    gridGalery.classList.add("gridGalery");

    const btnPrev = document.createElement("button");
    btnPrev.id = "btnPrev";
    btnPrev.classList.add("btnPrev");

    const btnNext = document.createElement("button");
    btnNext.id = "btnNext";
    btnNext.classList.add("btnNext");

    const galeryContent = document.createElement("div");
    galeryContent.id = "galeryContent";
    galeryContent.classList.add("galeryContent");

    gridGalery.appendChild(btnPrev);
    gridGalery.appendChild(galeryContent);
    gridGalery.appendChild(btnNext);
    galeryTarget.appendChild(galeryTitle);//we append the title of the galery
    galeryTarget.appendChild(gridGalery);//we append to the target container

    /*
    <h2>Some of our cute clients</h2>

    <div id="gridGalery" class="gridGalery">
        <button id="btnPrev" class="btnPrev"></button>
            <div id="galeryContent" class="galeryContent">
            </div>
        <button id="btnNext" class="btnNext"></button>
    </div>
     */
}

//to use:
//list = [your objects that matched with your template]

function templateCreator(obj){//set here your template item
    //destructuring
    const {name,image,link,iconUrl} = obj;

    //creating
    const galeryItemContainer = document.createElement("div");
    galeryItemContainer.classList.add("galeryItemContainer");
    galeryItemContainer.style.backgroundImage = `url('${image}')`;

    const galeryPanel = document.createElement("div");
    galeryPanel.classList.add("galeryPanel");

    const clientName = document.createElement("span");
    clientName.classList.add("clientName");
    clientName.textContent = name;

    const a = document.createElement("a");
    a.href = link;
    a.target = "_blank";

    const igIcon = document.createElement("img");
    igIcon.src = iconUrl;
    igIcon.alt = "icon"

    //appending
    a.appendChild(igIcon);
    galeryPanel.appendChild(clientName);
    galeryPanel.appendChild(a);
    galeryItemContainer.appendChild(galeryPanel);

    /*`<div class="galeryItemContainer" style="background-image:url('./images/clients/client-${obj}.jpg')">
            <div class="galeryPanel">
                <span class="clientName">Catty ${obj}</span>
                <a href="https://www.instagram.com/alejandrovaqueral">
                    <img src="./icons/instagram-icon.png" alt="instagram icon">
                </a>
            </div>
        </div>`;*/
    return galeryItemContainer; 
}

function smallSetting(direction){//(true is btnNext) (false if btnPrev)
    //set the vales for component when (viewport width < 500px)
    galeryContent.innerHTML = "";//crear the html container
    template = "";//clear template 
    if(direction){
        firstCounter ++;//when next
    }else{
        firstCounter --;//when previous
    }
    template = templateCreator(list[firstCounter]);
    galeryContent.appendChild(template);//render template 
}

function midSetting(direction){//(true is btnNext) (false if btnPrev)
    //set the vales for component when (viewport width > 501px && < 999px)
    galeryContent.innerHTML = "";//crear the html container
    template = "";//clear template 
    if(direction){
        secondCounter++;
    }else{
        secondCounter --;
    }
    const start = secondCounter * 4;//0
    const end = start + 4;//4
    let elements = list.slice(start,end);
    elements.forEach((item)=>{
        template = templateCreator(item);
        galeryContent.appendChild(template);
    })
}

function bigSetting(direction){//(true is btnNext) (false if btnPrev)
    //set the vales for component when (viewport width > 1000px)
    galeryContent.innerHTML = "";//crear the html container
    template = "";//clear template 
    if(direction){
        thirdCounter++;
    }else{
        thirdCounter --;
    }
    const start = thirdCounter * 8;//0
    const end = start + 8;//4
    let elements = list.slice(start,end);
    elements.forEach((item)=>{
        template = templateCreator(item);
        galeryContent.appendChild(template);
    });
}

//button next
btnNext.addEventListener("click",()=>{
    if(window.innerWidth <= 500){
        if(firstCounter < list.length - 1){
            //set the vales for component when (viewport width < 500px)
            smallSetting(true);//(true is btnNext) (false if btnPrev)
        }
    }else if(window.innerWidth > 500 && window.innerWidth < 1000){//501 -> 999
        const pageLimit = Math.floor(list.length / 4);//sets a limit of pagination
        if(secondCounter < pageLimit){
            //set the vales for component when (viewport width > 501px && < 999px)
            midSetting(true);//(true is btnNext) (false if btnPrev)
        }
    }else{
        const pageLimit = Math.floor(list.length / 8);//sets a limit of pagination
        if(thirdCounter < pageLimit){
            //set the vales for component when (viewport width > 1000px)
            bigSetting(true);//(true is btnNext) (false if btnPrev)
        }
    }
});

//button previous
btnPrev.addEventListener("click",()=>{
    if(window.innerWidth <= 500){// less than 500px
        if(firstCounter > 0){
            //set the vales for component when (viewport width < 500px)
            smallSetting(false);//(true is btnNext) (false if btnPrev)
        }
    }else if(window.innerWidth > 500 && window.innerWidth < 1000){
        if(secondCounter > 0){
            //set the vales for component when (viewport width > 501px && < 999px)
            midSetting(false);//(true is btnNext) (false if btnPrev)
        }
    }else{
        if(thirdCounter > 0){
            //set the vales for component when (viewport width > 1000px)
            bigSetting(false);//(true is btnNext) (false if btnPrev)
        }
    }
})

//first render 
function firstRender(){
    if(window.innerWidth <= 500){//less than 500px
        template = templateCreator(list[firstCounter]);
        galeryContent.appendChild(template);
    }else if(window.innerWidth > 500 && window.innerWidth < 1000){//501 -> 999
        const start = 0;
        const end = 4;
        let elements = list.slice(start,end);
        elements.forEach((item)=>{
            template = templateCreator(item);
            galeryContent.appendChild(template);
        });
    }else{//max than 1000px
        const start = 0;//0
        const end = 8;//8
        let elements = list.slice(start,end);
        elements.forEach((item)=>{
            template = templateCreator(item);
            galeryContent.appendChild(template);
        });
    }
}

firstRender();
