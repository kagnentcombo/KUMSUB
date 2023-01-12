
//our input tag
let inputData = document.getElementById("inputSearch");
//where the output get appears
let outputData = document.getElementById("outputPara");
// button which gives results on clicking
let resultBtn = document.getElementById("search");
//to get the prenounciation
let prenounciationArea = document.getElementById("audio");
//when no result is found :
let noResultFound = document.getElementById("no-result");
//our api key :
const ourAPIkey = "b806881b-0e5f-4e8e-ad96-462d96ef4fc0";
//our loading spinner
let showLoadingSpinner = document.querySelector(".spinnerLoading");
//output section
let outputSection = document.querySelector(".output");

let imageapi= document.getElementById("showpicture");


//our input tag
//let inputData2 = document.getElementById("inputSearch2");
// button which gives results on clicking
//let resultBtn2 = document.getElementById("search2");
let saveword_button_th = document.getElementById("saveword_button_th");
let saveword_button_en = document.getElementById("saveword_button_en");
let outputaudio = document.getElementById("outputaudio");
let title_word = document.getElementById("title_word");
let line = document.getElementById("line");
let foreground = document.getElementById("foreground");
let bookmark_th = document.getElementById("bookmark_th");
let bookmark_en = document.getElementById("bookmark_en");
let bookmark_title = document.getElementById("bookmark_title");
let bm_title_word_th = document.getElementById("bm_title_word_th");
let bm_title_word_en = document.getElementById("bm_title_word_en");
let list = document.getElementById("list");
var thaisimilar=[];

let favorite = document.getElementById("outputstar"); //ดาวคำ
let wordMarked_th = document.getElementById("wordMarked_th");
let wordMarked_en = document.getElementById("wordMarked_en");
let favorite_title_word_th = document.getElementById("favorite_title_word_th");
let favorite_title_word_en = document.getElementById("favorite_title_word_en");

// resultBtn2.addEventListener("click", giveResultsOfWord2);
// function giveResultsOfWord2(e) {
//   //after searching for once it shows the previous searched values so first clear them everytime
//   outputData2.innerText = "";
//   outputData.innerText = "";
//   prenounciationArea.innerHTML = "";
//   noResultFound.innerText = "";
//   e.preventDefault();
//   // ..first get the input which user types
//   let wordTyped = inputData2.value;
//   //alert(wordTyped);
//   if (wordTyped === "") {
//     alert("Please Type Something..");
//     return;
//   }
//   //get data from the api via function
//   getData2(wordTyped);
// }



function getData2(wordTyped) {
  //to check the progress of data
  outputSection.style.display = "block";
  showLoadingSpinner.style.display = "flex";
      //alert("in");
   
      // alert(name+' '+year);
       // search student by name and year param and set hyperlink to info of student
   
       const xhttp = new XMLHttpRequest();
       xhttp.onload = function(){
       let json = this.responseText;
       if(!Object.keys(json).length){
        try {
          showLoadingSpinner.style.display = "none";
        }
        finally {
          outputData.innerHTML = `&rarr; <strong>ไม่พบผลลัพธ์</strong> <br>`;
          findsimilarthai(wordTyped);
        }
        return;
    }
       let ressuts = JSON.parse(json);
       if(ressuts == null){
        try {
          showLoadingSpinner.style.display = "none";
        }
        finally {
          outputData.innerHTML = `&rarr; <strong>ไม่พบผลลัพธ์ กรุณาพิมคำที่มีความหมาย</strong> <br>`;
        }
        return;}
       let count = ressuts.length;
       let outbool = 0;
       //หาคำที่มี1ความหมาย
       for(let c = 0;c<count;c++){
        let tmp = ressuts[c][0];
        //tmp = tmp.slice(0, -2);   // console.log(tmp);   //console.log(tmp.includes(wordTyped)); //  console.log(ressuts[c]) //  console.log(tmp === (wordTyped));
        if(tmp === (wordTyped)){
          showLoadingSpinner.style.display = "none";
         // console.log(ressuts[c]);
          let tmp2 = outputData.innerHTML;
          outputData.innerHTML = tmp2+'\n'+ressuts[c];
          outbool++;
        }
       }
      //หาคำที่มีมากกว่า 1 ความหมาย/คำติดอัคระอักษรพิเศษ
      if (outbool == 0){
        for(let c = 0;c<count;c++){
          let tmp = ressuts[c][0];
          tmp = tmp.replace(/[-a-zA-Z1-9๑-๙]/gmu,"");
          tmp = tmp.trim();
            if(tmp === (wordTyped)){
             showLoadingSpinner.style.display = "none";
         //    console.log(ressuts[c]);
             let tmp2 = outputData.innerHTML;
             outputData.innerHTML = tmp2+'<br>'+ressuts[c];
             outbool++;
          }
         }

       }

       if (outbool == 0){
        //หาคำไกล้เคียง case (sprint อื่น)
        showLoadingSpinner.style.display = "none";
        outputData.innerHTML = `&rarr; <strong>ไม่พบผลลัพธ์</strong><br>`;
        for(let c = 0;c<count;c++){
          let tmp = ressuts[c][0];
          tmp = tmp.replace(/[-a-zA-Z1-9๑-๙]/gmu,"");
          tmp = tmp.trim();
          thaisimilar.push(tmp);
          }
        findsimilarthai(wordTyped);
        return;
     }
    showLoadingSpinner.style.display = "none";
    foreground.style.display= "block";
     title_word.innerHTML= wordTyped;
     line.style.display = "block";
     giveSoundth(wordTyped);

     favoriteWord_th(wordTyped); //บันทึกคำที่สนใจ

     //saveword_button_th.style.display = "block";
     showimage2(wordTyped);
     saveword_th();
        

          
        
   }
       xhttp.open("GET","/getlongdo/"+wordTyped);
       xhttp.send()



    

}

function generateSuggestion_thai(word){
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function(){
  let json = this.responseText;
  if(!Object.keys(json).length){return;}
  let ressuts = JSON.parse(json);
  let count = 0 ;
  let outbool = 0;
  while (ressuts[count]) {
      count++;
  }
  for(let c = 0;c<count;c++){
   let tmp = ressuts[c][0];
   tmp = tmp.replace(/[-a-zA-Z1-9๑-๙]/gmu,"");
   tmp = tmp.trim();
   if(tmp === (word)){
     outbool++;
   }
  }
  if (outbool == 0){return;}else{
    let newSpan=document.createElement("span");
    newSpan.className = "display-suggestions";
    newSpan.innerText = word;
    newSpan.onclick = function() {
    clearoutput();
    getData2(word);}
    noResultFound.appendChild(newSpan);
  }   
}
  xhttp.open("GET","/getlongdo/"+word);
  xhttp.send()
}

function findsimilarthai (word,ressuts)
{

  let worddummy="";
  if (word.length==0)
  {
    return;
  }
  if (word.length>=2)
  {
    worddummy+=word.charAt(0)+word.charAt(1);
  }
  else if (word.length==1)
  {
    worddummy=word;
  }

  const xhttp= new XMLHttpRequest();
    xhttp.onload=function()
    {
      let similarword=this.responseText;
      if(!Object.keys(similarword).length){return;}
      similarword= JSON.parse(similarword);
      var listsimilar= [];
      var n=similarword.length;
      if (n==0)return;
      outer:for (let i=0;i<n;i++)
      {
        for (let j=0;j<listsimilar.length;j++)
        {
          if(similarword[i][0]==listsimilar[j])
          {
            continue outer;
          }
        }
        listsimilar.push(similarword[i][0]);
      }
      if(Array.isArray(thaisimilar) && thaisimilar.length){
        for(let c=0;c<thaisimilar.length;c++){
          listsimilar.push(thaisimilar[c]);
        }
      }
      let newlistsimilar = [...new Set(listsimilar)];

      outputData.innerHTML += `<span>เราพบคำที่คล้ายกับที่คุณค้นหา</span>`;
      for (let i=0;i<newlistsimilar.length;i++)
      {
        generateSuggestion_thai(newlistsimilar[i]);
      }
      return ;

    }
  
    xhttp.open("GET","/getsimilar/"+worddummy);
    xhttp.send()

}

function clearoutput() {
  outputData.innerText = "";
  noResultFound.innerText = "";
  line.style.display = "none";
  title_word.innerHTML= "";
  imageapi.innerHTML="";
 outputaudio.style.display ="none";
 favorite.style.display = "none";
 saveword_button_th.style.display = "none";
 saveword_button_en.style.display = "none";
 bookmark_th.innerText="";
 bookmark_en.innerText="";
 bm_title_word_th.style.display = "none";
 bm_title_word_en.style.display = "none";

 wordMarked_th.innerHTML="";
 wordMarked_en.innerHTML="";
 favorite_title_word_th.style.display = "none";
 favorite_title_word_en.style.display = "none";
}

//event listeners after clicking on resultBtn
resultBtn.addEventListener("click", giveResultsOfWord);
function giveResultsOfWord(e) {
  thaisimilar = [];
  //after searching for once it shows the previous searched values so first clear them everytime
  var list= document.getElementById("list").value;
  clearoutput();
  e.preventDefault();
  
  // ..first get the input which user types
  let wordTyped = inputData.value; 
  //alert(wordTyped);
  if (wordTyped === "") {
    alert("Please Type Something..");
    return;
  }
  if(list==1)
  {
    getData(wordTyped);
  }
  else if(list ==2 )
  {
    getData2(wordTyped);
  }
  
  //get data from the api via function
  //getData(wordTyped);


}

 function generateSuggestion_eng(word){
  const xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    `https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${ourAPIkey}`,
    true
  );
  xhr.onload = function () {
    const parsedData = JSON.parse(this.responseText);
    if (!parsedData.length) {return;}
    if (typeof parsedData[0] === "string") {return;}
    try {
      const tmp = ` <strong>Meaning of <span style="color:#0a6b65be;">${word}</span> : </strong> ${parsedData[0].shortdef[0]} <br><br> Pronunciation in Text : ${parsedData[0].hwi.prs[0].ipa} <br><br> Part Of Speech: ${parsedData[0].fl}`;
    } catch (error) {
      return;
    }
      let newSpan = document.createElement("span");
      newSpan.className = "display-suggestions";
      newSpan.innerText = word;
      newSpan.onclick = function() {
        clearoutput();
        getData(word);}
      noResultFound.appendChild(newSpan);
    
  };
  xhr.send();
}

function getData(wordTyped) {
  //to check the progress of data
  showLoadingSpinner.style.display = "flex";
  outputSection.style.display = "block";
  const xhr = new XMLHttpRequest();
  //to get the items from this api
  xhr.open(
    "GET",
    `https://www.dictionaryapi.com/api/v3/references/learners/json/${wordTyped}?key=${ourAPIkey}`,
    true
  );
  //main  program to load the content from the API
  xhr.onload = function () {
    const parsedData = JSON.parse(this.responseText);
    if (!parsedData.length) {
      showLoadingSpinner.style.display = "none";
      outputData.innerHTML = `&rarr; <strong>No Result Found</strong> , Please Type Something Meaningfull ... `;
      return;
    }
    // //if result in not in the parsedData then give some auto suggestions via api
    if (typeof parsedData[0] === "string") {
      showLoadingSpinner.style.display = "none";
      let notFound = document.createElement("h4");
      notFound.className = "notFoundMessage";
      notFound.innerHTML = `Sorry,There is No Match Found Similar to <span style="color:#0a6b65be;">${wordTyped}</span>.<br>I Have Found Some Results Similar To The Word You Typed.`;
      noResultFound.appendChild(notFound);
      parsedData.forEach((suggestions) => {
        generateSuggestion_eng(suggestions);
      });
   
      return;
    }
    showLoadingSpinner.style.display = "none";

    try {
      outputData.innerHTML = ` <strong>Meaning of <span style="color:#0a6b65be;">${wordTyped}</span> : </strong> ${parsedData[0].shortdef[0]} <br><br> Pronunciation in Text : ${parsedData[0].hwi.prs[0].ipa} <br><br> Part Of Speech: ${parsedData[0].fl}`;
    } catch (error) {
      outputData.innerHTML = `&rarr; <strong>No Result Found</strong> , Please Type Something Meaningfull ... `;
      return;
    }
    foreground.style.display= "block";
    line.style.display = "block";
    title_word.innerHTML= wordTyped;
   // saveword_button_en.style.display = "block";
    //check whether the prenounciation sound is present or not
    showimage(wordTyped);
    saveword_en();
    try {
      const audio = parsedData[0].hwi.prs[0].sound.audio;
      if (audio) {
        giveSound(audio);
       
      }
    }
    catch(err) {
      giveSound_en(wordTyped);
      
    }
    favoriteWord_en(wordTyped);
  

  };
  //send the request to the server
  xhr.send();
}

function getPhotos(images) {
   images.map(image => {
    imageapi.innerHTML=`<br><br><img src="${image.src.tiny}" class="outputimage">`
   })
}

function showimage(wordTyped)
{
  const xhr= new XMLHttpRequest();
  xhr.open("GET",`https://api.unsplash.com/search/photos/?client_id=mLw31hbioTDcgKVkG9xixBkv3AY21ESo3vTd_z79cyk&page1&query=${wordTyped}`);
  xhr.onload=function()
  {
    let iMage=this.responseText;
    iMage=JSON.parse(iMage);
    if(iMage.results.length == 0){
      alert("No image to show on display!!!");
    } else {
      let imageshow = iMage.results[0].urls.raw;
     // console.log(iMage.results[0]);
     imageapi.innerHTML=`<br><br><img src="${imageshow}" class="outputimage" >`
    }

    
  }
  xhr.send();

}

function showimage2(wordTyped)
{
  
  fetch(`https://api.pexels.com/v1/search?query=${wordTyped}&locale=th-TH`,{
  headers: {
    Authorization: "563492ad6f91700001000001176416596be647ddbf9cfa76f8eb44a9"
  }
})
   .then(resp => {
    return resp.json()
   })
   .then(data => {
  //  console.log(data.photos);
    getPhotos(data.photos);
   })
   
}

function playsound_eng() { 
  var playbutton_eng = document.getElementById("engaudio"); 
  playbutton_eng.play(); 
}




//get the sound / prenounciation
function giveSound(audio) {//primary api eng sound
  let subfolderOfWord = audio.charAt(0);
  let soundLocated = `https://media.merriam-webster.com/soundc11/${subfolderOfWord}/${audio}.wav?key=${ourAPIkey}`;
  let getAudio = document.createElement("audio");
  prenounciationArea.innerHTML = '<audio id="engaudio" src="'+ soundLocated+'"></audio> ';
  outputaudio.style.display ="block";
  outputaudio.innerHTML = `<button id="play_btn"  onclick="playsound_eng();"
class='audio' style='font-size:30px'; type="button" value="Play"><img src="/resources/volume.png"></img></button>`;

}


//get the thai sound / prenounciation
function giveSoundth(wordTyped) {

  outputaudio.style.display ="block";
  outputaudio.innerHTML = `<button id="play_btn"  onclick="responsiveVoice.speak(' `+wordTyped+`', 'Thai Female');"
class='audio' style='font-size:30px'; type="button" value="Play"><img src="/resources/volume.png"></img></button>`;
 
}


function giveSound_en(wordTyped) { //secondary api eng sound
  outputaudio.style.display ="block";
  outputaudio.innerHTML = `<button id="play_btn"  onclick="responsiveVoice.speak(' `+wordTyped+`', 'UK English Female');"
class='audio' style='font-size:30px'; type="button" value="Play"><img src="/resources/volume.png"></img></button>`;
 
}

function favoriteWord_th(wordTyped){
  favorite.style.display = "block";
  let favWord_th = JSON.parse(localStorage.getItem('favWord_th')); //เช็คว่าคำที่หาบันทึกยัง
  
  favorite.innerHTML = `<button id="favorite_btn2"  onclick="makeFav_th('`+wordTyped+`'); "
  class='favbutton' style='font-size:30px;border:none'; type="button" value="fav"><img src="/resources/starblack.png" width="50" height="50"
  id="favorite_img"></img></button>`;
  for(var word in favWord_th){
    if (favWord_th[word] === wordTyped){
      favorite.innerHTML = `<button id="favorite_btn2"  onclick="makeFav_th('`+wordTyped+`');"
  class='favbutton' style='font-size:30px;border:none'; type="button" value="fav"><img src="/resources/star.png" width="50" height="50"
  id="favorite_img"></img></button>`;
     }
  } 
}

function favoriteWord_en(wordTyped){
  favorite.style.display = "block";
  let favWord_en = JSON.parse(localStorage.getItem('favWord_en')); //เช็คว่าคำที่หาบันทึกยัง

  favorite.innerHTML = `<button id="favorite_btn3"  onclick="makeFav_en('`+wordTyped+`');"
  class='favbutton' style='font-size:30px;border:none'; type="button" value="fav"><img src="/resources/starblack.png" width="50" height="50"
  id="favorite_img"></img></button>`;
  for(var word in favWord_en){
    if (favWord_en[word] === wordTyped){
      favorite.innerHTML = `<button id="favorite_btn3"  onclick="makeFav_en('`+wordTyped+`');"
  class='favbutton' style='font-size:30px;border:none;'; type="button" value="fav";><img src="/resources/star.png" width="50" height="50"
  id="favorite_img"></img></button>`;
  
     }
  } 
  
}




function makeFav_th(wordTyped){
  let favWord_th = JSON.parse(localStorage.getItem('favWord_th'));
  let checkWord = 0;


  //เช็คคำ
  

  if (favWord_th === null) {//firstword
    favWord_th=[];
    favWord_th.push(wordTyped);
    localStorage.setItem("favWord_th", JSON.stringify(favWord_th));
  } else {
    if(favWord_th.length > 10){favWord_th.shift();}
   for(var word in favWord_th){
     if (favWord_th[word] === wordTyped){
       checkWord = 1;
      }
 }
    if(checkWord == 0){
      favWord_th.push(wordTyped);
      localStorage.setItem("favWord_th", JSON.stringify(favWord_th));
    }
    
  }
  
  //เช็คปุ่ม
  if( document.getElementById("favorite_img").src.match(/starblack\.png$/)){
    document.getElementById("favorite_img").src = "/resources/star.png";
  }else{
    document.getElementById("favorite_img").src = "/resources/starblack.png";
    let index = favWord_th.indexOf(wordTyped);
    favWord_th.splice(index, 1);
    localStorage.setItem("favWord_th", JSON.stringify(favWord_th));
  }

}

function makeFav_en(wordTyped){
  let favWord_en = JSON.parse(localStorage.getItem('favWord_en'));
  let checkWord = 0;

  
  //เช็คคำ


  if (favWord_en === null) {//firstword
    favWord_en=[];
    favWord_en.push(wordTyped);
    localStorage.setItem("favWord_en", JSON.stringify(favWord_en));
  } else {
    if(favWord_en.length > 10){favWord_en.shift();}
   for(var word in favWord_en){
     if (favWord_en[word] === wordTyped){
       checkWord = 1;
      }
 }  
    if(checkWord == 0){
      favWord_en.push(wordTyped);
      localStorage.setItem("favWord_en", JSON.stringify(favWord_en));
    }
 
  }

  //เช็คปุ่ม
  if( document.getElementById("favorite_img").src.match(/starblack\.png$/)){
    document.getElementById("favorite_img").src = "/resources/star.png";
  }else{
    document.getElementById("favorite_img").src = "/resources/starblack.png";
    let index = favWord_en.indexOf(wordTyped);
    favWord_en.splice(index, 1);
    localStorage.setItem("favWord_en", JSON.stringify(favWord_en));
  }

}


//saveword_button_th.addEventListener("click", saveword_th);
function saveword_th() {
  let thaiword = JSON.parse(localStorage.getItem('thaiword'));
  
  if (thaiword === null) {//firstword
    thaiword=[];
    thaiword.push(title_word.innerHTML);
    localStorage.setItem("thaiword", JSON.stringify(thaiword));
  } else {
    if(thaiword.length > 19){thaiword.shift();}
   for(var word in thaiword){
     if (thaiword[word] === title_word.innerHTML){
       return;
      }
 } 
    thaiword.push(title_word.innerHTML);
     localStorage.setItem("thaiword", JSON.stringify(thaiword));
  }
}



//saveword_button_en.addEventListener("click", saveword_en);
function saveword_en() {
  let engword = JSON.parse(localStorage.getItem('engword'));
 
  if (engword === null ) {//firstword
     engword = [];
     engword.push(title_word.innerHTML);
    localStorage.setItem("engword", JSON.stringify(engword));

  } else {
    if(engword.length > 19){engword.shift();}
  for(let word in engword){
    if (engword[word] === title_word.innerHTML){
      return;
     }
} 
    engword.push(title_word.innerHTML); 
    localStorage.setItem("engword", JSON.stringify(engword));
  

  }

}


let history = document.getElementById("history");
history.addEventListener("click", showbookmark);
function showbookmark(e) {
  clearoutput();
  //showLoadingSpinner.style.display = "flex";
  outputSection.style.display = "block";
  foreground.style.display= "block";
  title_word.innerHTML= "ประวัติการค้นหา";



let thaiword = JSON.parse(localStorage.getItem('thaiword'));

if (!(thaiword === null)) {
  bm_title_word_th.style.display = "block";
  line.style.display = "block";
  thaiword.forEach((words) => {
    let newSpan = document.createElement("button");
    newSpan.className = "display-bookmark";
    newSpan.innerText = words;
    newSpan.onclick = function() {
      clearoutput();
      getData2(words);}
      bookmark_th.appendChild(newSpan);
  
  });

}

//showLoadingSpinner.style.display = "none";
//let notFound = document.createElement("h4");
//notFound.className = "notFoundMessage";
//notFound.innerHTML = `Sorry,There is No Match Found Similar to <span style="color:#0a6b65be;"></span>.<br>I Have Found Some Results Similar To The Word You Typed.Please Have a Look !`;
//noResultFound.appendChild(notFound);



let engword = JSON.parse(localStorage.getItem('engword'));

if (!(engword === null)){
  bm_title_word_en.style.display = "block";
  engword.forEach((words) => {
  let newSpan = document.createElement("button");
  newSpan.className = "display-bookmark";
  newSpan.innerText = words;
  newSpan.onclick = function() {
    clearoutput();
    getData(words);}

    bookmark_en.appendChild(newSpan);

});
}

}


//กดปุ่มโชว์คำที่บันทึก
let showfavorite = document.getElementById("favorite");
showfavorite.addEventListener("click", showfavWord); 
function showfavWord(e) {
  clearoutput();
  outputSection.style.display = "block";
  foreground.style.display= "block";
  outputSection.style.display = "block";
  foreground.style.display= "block";
  title_word.innerHTML= "คำที่สนใจ";


  // คำภาษาไทย
  let favWord_th = JSON.parse(localStorage.getItem('favWord_th'));

  if (!(favWord_th === null)) {
  favorite_title_word_th.style.display = "block";
  line.style.display = "block";
  favWord_th.forEach((words) => {
    let newSpan = document.createElement("button");
    newSpan.className = "display-wordMarked";
    newSpan.innerText = words;
    newSpan.onclick = function() {
      clearoutput();
      getData2(words);}
      wordMarked_th.appendChild(newSpan);
  
  });

  }

  // คำภาษาอังกฤษ
  let favWord_en = JSON.parse(localStorage.getItem('favWord_en'));

  if (!(favWord_en === null)){
  favorite_title_word_en.style.display = "block";
  line.style.display = "block";
  favWord_en.forEach((words) => {
  let newSpan = document.createElement("button");
  newSpan.className = "display-wordMarked";
  newSpan.innerText = words;
  newSpan.onclick = function() {
    clearoutput();
    getData(words);}

    wordMarked_en.appendChild(newSpan);

  });
  }
}





var english = /^[a-z][a-z]*$/i;
function lancheck(){
  let tmp = inputData.value; 
  if(english.test(tmp.charAt(0))){
    list.value = '1';
  }else{list.value='2';}
  
}


