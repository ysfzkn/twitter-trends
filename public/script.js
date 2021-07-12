/* var randomNumber = 0;
var result = [];
$.getJSON("data.json", function(json) {

    for(var i in json)
    result.push(json[i]);

var ColorsData = ['#90E0EF','#00B4D8','#0077B6','#03045E'];
for(i in $('.trends-container')[0].children){
    var colornumrand = [0,1,2,3,1,0,3,2,3,2,1,0,2,3,1,0,3,2,0,1];
    
    $($('.trends-container')[0].children[i]).css('background-color',ColorsData[colornumrand[i]]);
    
}

function randomnumber(){
    var randomnumbersforcolor = Math.floor(Math.random() * 4);
    
    randomNumber = Math.floor(Math.random() * 20);
    thisItem = $('.trends-container')[0].children[randomNumber].children[0];
    
    
    $(thisItem).slideDown('slow');
    $(thisItem).css('background-color',ColorsData[randomnumbersforcolor]);
    
    $(thisItem).text(result[Math.floor(Math.random() * 20)]);
    
    
}
setInterval(randomnumber,1000);
});

 */
// trendsBoxList,
const trendsBoxAll = $('.trends-container').children();

function main()
{
    fetch('/scrape')
    .then(response => response.text())
    .then(json => 
    {
        console.log("fonskiyona girdi")
    }).catch(err => console.log(err));

    $.getJSON("data.json", function(json)
    {

        json = JSON.parse(json)
        // json = JSON.parse(json.stdout)

        // console.log(json)
        // var result = [];
        // let i = 0
        // json.forEach(sub => 
        // {
        //     result.push(sub[i]);
        //     i += 1;
        // });

        // json = result
        console.log(json)
        
        class JsonObject 
        {
            constructor(title, index, color) 
            {
                this.title = title;
                this.index = index;
                this.color = color;
            }
        }

        // json list to all object making
        var jsonObjectList = [];

        for (item in json) 
        {

            if (item == 0 || item == 1 || item == 2 || item == 3 || item == 4) {
                firsts = new JsonObject(json[item], item, '#012a4a');
                jsonObjectList.push(new JsonObject(json[item], item, '#012a4a'));


            } else if (item == 5 || item == 6 || item == 7 || item == 8 || item == 9) {
                seconds = new JsonObject(json[item], item, '#014f86');
                jsonObjectList.push(new JsonObject(json[item], item, '#014f86'));

            } else if (item == 10 || item == 11 || item == 12 || item == 13 || item == 14) {
                thirds = new JsonObject(json[item], item, '#2c7da0');
                jsonObjectList.push(new JsonObject(json[item], item, '#2c7da0'));

            } else if (item == 15 || item == 16 || item == 17 || item == 18 || item == 19) {
                fourths = new JsonObject(json[item], item, '#61a5c2');
                jsonObjectList.push(new JsonObject(json[item], item, '#61a5c2'));

            }

        }

        newList = [];
        newlistcolor = [];

        function randomListmake(listName, index, color) {
            newList = listName.sort(() => Math.random() - 0.5);

            //console.log(newList);
        }

        var ColorsData = ['#012a4a', '#014f86', '#2c7da0', '#61a5c2'];
        for (i in $('.trends-container')[0].children) {
            var colornumrand = [0, 1, 2, 3, 1, 0, 3, 2, 3, 2, 1, 0, 2, 3, 1, 0, 3, 2, 0, 1];

            $($('.trends-container')[0].children[i]).css('background-color', ColorsData[colornumrand[i]]);

        }



        // Making trendbox and-Adding all trendssbox for data-id

        for (box in trendsBoxAll) {
            if (trendsBoxAll[box].tagName == 'DIV') {
                //adding data-id
                $(trendsBoxAll[box]).attr('data-id', `${box}`);
                //json randomize working
                randomListmake(jsonObjectList);
                //adding random json to list for title

                var newlistitle = [];
                var newlistcolor = [];
                var newlistindex = [];
                for (i in jsonObjectList) {
                    newlistitle.push(`${jsonObjectList[i].title}`);
                    newlistcolor.push(`${jsonObjectList[i].color}`);
                    newlistindex.push(`${jsonObjectList[i].index}`);
                }

                $(trendsBoxAll[box]).attr('data-titles', `${newlistitle}`);
                $(trendsBoxAll[box]).attr('data-colors', `${newlistcolor}`);
                $(trendsBoxAll[box]).attr('id', `feature-text-${box}`);
            }
        }


        function sleep(milliseconds) {
            const date = Date.now();
            let currentDate = null;
            do {
                currentDate = Date.now();
            } while (currentDate - date < milliseconds);
        }

        const arraywhowillmake = $($('.trendsbox'));

        let carouselTexts = class {
            constructor(text, color) {
                this.text = text;
                this.color = color;
            }
        }


        // hangi indekstekinin bilgileri alınıcak
        var itemfirsttt = $($('.trendsbox')[0]);
        var justonebox = itemfirsttt.attr('data-colors');
        var justoneboxtitle = itemfirsttt.attr('data-titles');


        // no we have a color list retry
        var backgroundColors = justonebox.split(",");
        var typeString = justoneboxtitle.split(",");

        console.log(backgroundColors);
        carouselText = [];
        for (nItem in backgroundColors) {
            const itemnwe = new carouselTexts(typeString[nItem], backgroundColors[nItem]);
            carouselText.push(itemnwe);
        }


        $(document).ready(async function () {
            carousel(carouselText, "#feature-text")

        });

        async function typeSentence(sentence, eleRef, delay = 100) {
            const letters = sentence.split("");
            let i = 0;
            while (i < letters.length) {
                await waitForMs(delay);
                $(eleRef).append(letters[i]);
                i++
            }
            return;
        }

        async function deleteSentence(eleRef) {
            const sentence = $(eleRef).html();
            const letters = sentence.split("");
            let i = 0;
            while (letters.length > 0) {
                await waitForMs(100);
                letters.pop();
                $(eleRef).html(letters.join(""));
            }
        }

        async function carousel(carouselList, eleRef) {
            var i = 0;
            while (true) {
                updateFontColor(eleRef, carouselList[i].color)
                await typeSentence(carouselList[i].text, eleRef);
                await waitForMs(2000);
                await deleteSentence(eleRef);
                await waitForMs(500);
                i++
                if (i >= carouselList.length) {
                    i = 0;
                }
            }
        }

        function updateFontColor(eleRef, color) {
            $(eleRef).css('transition', '.5s all');
            $(eleRef).css('background-color', color);
        }

        function waitForMs(ms) {
            return new Promise(resolve => setTimeout(resolve, ms))
        }


        for( let j=1; j<20; j++)
        {
            var item = $($('.trendsbox')[j]);
            var justonebox2 = item.attr('data-colors');
            var justoneboxtitle2 = item.attr('data-titles');


            // no we have a color list retry
            var backgroundColors2 = justonebox2.split(",");
            var typeString2 = justoneboxtitle2.split(",");

            console.log(backgroundColors2);
            var carouselText2 = [];
            for (nItem in backgroundColors2) 
            {
                const itemnwe = new carouselTexts(typeString2[nItem], backgroundColors2[nItem]);
                carouselText2.push(itemnwe);
            }
            carousel(carouselText2, "#feature-text"+j);
        }
    });
}
main();
setInterval(main, 60000);

// $.get("scrape.py", function(json) {

//     // json class
//     class JsonObject {
//         constructor(title, index,color) {
//           this.title = title;
//           this.index = index;
//           this.color = color;
//         }
//       }

//     // json list to all object making
//     var jsonObjectList = [];

//     for(item in json){

//         if(item == 0 || item == 1 || item == 2 || item == 3 ||item == 4 ){
//             firsts = new JsonObject(json[item],item,'#012a4a');
//             jsonObjectList.push(new JsonObject(json[item],item,'#012a4a'));


//         }else if(item == 5 || item == 6 || item == 7 || item == 8 ||item == 9 ){
//             seconds =  new JsonObject(json[item],item,'#014f86');
//             jsonObjectList.push(new JsonObject(json[item],item,'#014f86'));

//         }else if(item == 10 || item == 11 || item == 12 || item == 13 ||item == 14 ){
//             thirds = new JsonObject(json[item],item,'#2c7da0');
//             jsonObjectList.push(new JsonObject(json[item],item,'#2c7da0'));

//         }else if(item == 15 || item == 16 || item == 17 || item == 18 ||item == 19 ){
//             fourths = new JsonObject(json[item],item,'#61a5c2');
//             jsonObjectList.push(new JsonObject(json[item],item,'#61a5c2'));

//         }

//     }

//      //console.log(jsonObjectList);





//     // Making random list from Json

//     newList =[];
//     newlistcolor = [];
//     function randomListmake(listName,index,color){
//         newList = listName.sort(() => Math.random() - 0.5);

//         //console.log(newList);
//     }

//     var ColorsData = ['#012a4a','#014f86','#2c7da0','#61a5c2'];
// for(i in $('.trends-container')[0].children){
//     var colornumrand = [0,1,2,3,1,0,3,2,3,2,1,0,2,3,1,0,3,2,0,1];

//     $($('.trends-container')[0].children[i]).css('background-color',ColorsData[colornumrand[i]]);

// }



//     // Making trendbox and-Adding all trendssbox for data-id

//     for(box in trendsBoxAll){
//         if(trendsBoxAll[box].tagName =='DIV'){
//             //adding data-id
//             $(trendsBoxAll[box]).attr('data-id' ,`${box}` );
//             //json randomize working
//             randomListmake(jsonObjectList);
//             //adding random json to list for title

//             var newlistitle=[];
//             var newlistcolor= [];
//             var newlistindex = [];
//             for(i in jsonObjectList){
//                 newlistitle.push(`${jsonObjectList[i].title}`);
//                 newlistcolor.push(`${jsonObjectList[i].color}`);
//                 newlistindex.push(`${jsonObjectList[i].index}`);
//             }

//             $(trendsBoxAll[box]).attr('data-titles' ,`${newlistitle}` );
//             $(trendsBoxAll[box]).attr('data-colors' ,`${newlistcolor}` );
//             $(trendsBoxAll[box]).attr('id' ,`feature-text-${box}` );







//         }
//     }


//     function sleep(milliseconds) {
//         const date = Date.now();
//         let currentDate = null;
//         do {
//           currentDate = Date.now();
//         } while (currentDate - date < milliseconds);
//       }



//     const arraywhowillmake = $($('.trendsbox'));




//     let carouselTexts = class{
//         constructor(text, color) {
//             this.text = text;
//             this.color = color;
//         }
//      }


//      // hangi indekstekinin bilgileri alınıcak
//     var itemfirsttt = $($('.trendsbox')[0]);
//     var justonebox = itemfirsttt.attr('data-colors');
//     var justoneboxtitle= itemfirsttt.attr('data-titles');


//         // no we have a color list retry
//     var backgroundColors = justonebox.split(",");
//     var typeString = justoneboxtitle.split(",");

//     console.log(backgroundColors);
//     carouselText =[];
//     for(nItem in backgroundColors){
//         const itemnwe = new carouselTexts(typeString[nItem],backgroundColors[nItem]);
//         carouselText.push(itemnwe);
//     }


//       $( document ).ready(async function() {
//         carousel(carouselText, "#feature-text")

//       });

//       async function typeSentence(sentence, eleRef, delay = 100) {
//         const letters = sentence.split("");
//         let i = 0;
//         while(i < letters.length) {
//           await waitForMs(delay);
//           $(eleRef).append(letters[i]);
//           i++
//         }
//         return;
//       }

//       async function deleteSentence(eleRef) {
//         const sentence = $(eleRef).html();
//         const letters = sentence.split("");
//         let i = 0;
//         while(letters.length > 0) {
//           await waitForMs(100);
//           letters.pop();
//           $(eleRef).html(letters.join(""));
//         }
//       }

//       async function carousel(carouselList, eleRef) {
//           var i = 0;
//           while(true) {
//             updateFontColor(eleRef, carouselList[i].color)
//             await typeSentence(carouselList[i].text, eleRef);
//             await waitForMs(2000);
//             await deleteSentence(eleRef);
//             await waitForMs(500);
//             i++
//             if(i >= carouselList.length) {i = 0;}
//           }
//       }

//       function updateFontColor(eleRef, color) {
//         $(eleRef).css('transition','.5s all');
//         $(eleRef).css('background-color', color);
//       }

//       function waitForMs(ms) {
//         return new Promise(resolve => setTimeout(resolve, ms))
//       }






//     var item2 = $($('.trendsbox')[1]);
//     var justonebox2 = item2.attr('data-colors');
//     var justoneboxtitle2= item2.attr('data-titles');


//         // no we have a color list retry
//     var backgroundColors2 = justonebox2.split(",");
//     var typeString2 = justoneboxtitle2.split(",");

//     console.log(backgroundColors2);
//     carouselText2 =[];
//     for(nItem in backgroundColors2){
//         const itemnwe = new carouselTexts(typeString2[nItem],backgroundColors2[nItem]);
//         carouselText2.push(itemnwe);
//     }
//     carousel(carouselText2, "#feature-text2");







//       var item3 = $($('.trendsbox')[2]);
//       var justonebox3 = item3.attr('data-colors');
//       var justoneboxtitle3= item3.attr('data-titles');


//           // no we have a color list retry
//       var backgroundColors3 = justonebox3.split(",");
//       var typeString3 = justoneboxtitle3.split(",");


//       carouselText3 =[];
//       for(nItem in backgroundColors3){
//           const itemnwe = new carouselTexts(typeString3[nItem],backgroundColors3[nItem]);
//           carouselText3.push(itemnwe);
//       }
//         carousel(carouselText3, "#feature-text3");


//     var item4 = $($('.trendsbox')[3]);
//       var justonebox4 = item4.attr('data-colors');
//       var justoneboxtitle4= item4.attr('data-titles');


//           // no we have a color list retry
//       var backgroundColors4 = justonebox4.split(",");
//       var typeString4 = justoneboxtitle4.split(",");


//       carouselText4 =[];
//       for(nItem in backgroundColors4){
//           const itemnwe = new carouselTexts(typeString4[nItem],backgroundColors4[nItem]);
//           carouselText4.push(itemnwe);
//       }
//         carousel(carouselText4, "#feature-text4");

//         var item5 = $($('.trendsbox')[4]);
//       var justonebox5 = item5.attr('data-colors');
//       var justoneboxtitle5= item5.attr('data-titles');


//           // no we have a color list retry
//       var backgroundColors5 = justonebox5.split(",");
//       var typeString5 = justoneboxtitle5.split(",");


//       carouselText5 =[];
//       for(nItem in backgroundColors5){
//           const itemnwe = new carouselTexts(typeString5[nItem],backgroundColors5[nItem]);
//           carouselText5.push(itemnwe);
//       }
//         carousel(carouselText5, "#feature-text5");




//     var item6 = $($('.trendsbox')[5]);
//       var justonebox6 = item6.attr('data-colors');
//       var justoneboxtitle6= item6.attr('data-titles');


//           // no we have a color list retry
//       var backgroundColors6 = justonebox6.split(",");
//       var typeString6 = justoneboxtitle6.split(",");


//       carouselText6 =[];
//       for(nItem in backgroundColors6){
//           const itemnwe = new carouselTexts(typeString6[nItem],backgroundColors6[nItem]);
//           carouselText6.push(itemnwe);
//       }
//         carousel(carouselText6, "#feature-text6");




//     var item7 = $($('.trendsbox')[6]);
//       var justonebox7 = item7.attr('data-colors');
//       var justoneboxtitle7= item7.attr('data-titles');


//           // no we have a color list retry
//       var backgroundColors7 = justonebox7.split(",");
//       var typeString7 = justoneboxtitle7.split(",");


//       carouselText7 =[];
//       for(nItem in backgroundColors7){
//           const itemnwe = new carouselTexts(typeString7[nItem],backgroundColors7[nItem]);
//           carouselText7.push(itemnwe);
//       }
//         carousel(carouselText7, "#feature-text7");


//     var item8 = $($('.trendsbox')[7]);
//       var justonebox8 = item8.attr('data-colors');
//       var justoneboxtitle8= item8.attr('data-titles');


//           // no we have a color list retry
//       var backgroundColors8 = justonebox8.split(",");
//       var typeString8 = justoneboxtitle8.split(",");


//       carouselText8 =[];
//       for(nItem in backgroundColors8){
//           const itemnwe = new carouselTexts(typeString8[nItem],backgroundColors8[nItem]);
//           carouselText8.push(itemnwe);
//       }
//         carousel(carouselText8, "#feature-text8");



//     var item9 = $($('.trendsbox')[8]);
//       var justonebox9 = item9.attr('data-colors');
//       var justoneboxtitle9= item9.attr('data-titles');


//           // no we have a color list retry
//       var backgroundColors9 = justonebox9.split(",");
//       var typeString9 = justoneboxtitle9.split(",");


//       carouselText9 =[];
//       for(nItem in backgroundColors9){
//           const itemnwe = new carouselTexts(typeString9[nItem],backgroundColors9[nItem]);
//           carouselText9.push(itemnwe);
//       }
//         carousel(carouselText9, "#feature-text9");



//     var item10 = $($('.trendsbox')[9]);
//       var justonebox10 = item10.attr('data-colors');
//       var justoneboxtitle10= item10.attr('data-titles');


//           // no we have a color list retry
//       var backgroundColors10 = justonebox10.split(",");
//       var typeString10 = justoneboxtitle10.split(",");


//       carouselText10 =[];
//       for(nItem in backgroundColors10){
//           const itemnwe = new carouselTexts(typeString10[nItem],backgroundColors10[nItem]);
//           carouselText10.push(itemnwe);
//       }
//         carousel(carouselText10, "#feature-text10");

//     var item11 = $($('.trendsbox')[10]);
//       var justonebox11 = item11.attr('data-colors');
//       var justoneboxtitle11= item11.attr('data-titles');


//           // no we have a color list retry
//       var backgroundColors11 = justonebox11.split(",");
//       var typeString11 = justoneboxtitle11.split(",");


//       carouselText11 =[];
//       for(nItem in backgroundColors11){
//           const itemnwe = new carouselTexts(typeString11[nItem],backgroundColors11[nItem]);
//           carouselText11.push(itemnwe);
//       }
//         carousel(carouselText11, "#feature-text11");



//     var item12 = $($('.trendsbox')[11]);
//       var justonebox12 = item12.attr('data-colors');
//       var justoneboxtitle12= item12.attr('data-titles');


//           // no we have a color list retry
//       var backgroundColors12 = justonebox12.split(",");
//       var typeString12 = justoneboxtitle12.split(",");


//       carouselText12 =[];
//       for(nItem in backgroundColors12){
//           const itemnwe = new carouselTexts(typeString12[nItem],backgroundColors12[nItem]);
//           carouselText12.push(itemnwe);
//       }
//         carousel(carouselText12, "#feature-text12");


//     var item13 = $($('.trendsbox')[12]);
//       var justonebox13 = item13.attr('data-colors');
//       var justoneboxtitle13= item13.attr('data-titles');


//           // no we have a color list retry
//       var backgroundColors13 = justonebox13.split(",");
//       var typeString13 = justoneboxtitle13.split(",");


//       carouselText13 =[];
//       for(nItem in backgroundColors13){
//           const itemnwe = new carouselTexts(typeString13[nItem],backgroundColors13[nItem]);
//           carouselText13.push(itemnwe);
//       }
//         carousel(carouselText13, "#feature-text13");




//     var item14 = $($('.trendsbox')[13]);
//       var justonebox14 = item14.attr('data-colors');
//       var justoneboxtitle14= item14.attr('data-titles');


//           // no we have a color list retry
//       var backgroundColors14 = justonebox14.split(",");
//       var typeString14 = justoneboxtitle14.split(",");


//       carouselText14 =[];
//       for(nItem in backgroundColors14){
//           const itemnwe = new carouselTexts(typeString14[nItem],backgroundColors14[nItem]);
//           carouselText14.push(itemnwe);
//       }
//         carousel(carouselText14, "#feature-text14");




//     var item15 = $($('.trendsbox')[14]);
//       var justonebox15 = item15.attr('data-colors');
//       var justoneboxtitle15= item15.attr('data-titles');


//           // no we have a color list retry
//       var backgroundColors15 = justonebox15.split(",");
//       var typeString15 = justoneboxtitle15.split(",");


//       carouselText15 =[];
//       for(nItem in backgroundColors15){
//           const itemnwe = new carouselTexts(typeString15[nItem],backgroundColors15[nItem]);
//           carouselText15.push(itemnwe);
//       }
//         carousel(carouselText15, "#feature-text15");


//     var item16 = $($('.trendsbox')[15]);
//       var justonebox16 = item16.attr('data-colors');
//       var justoneboxtitle16= item16.attr('data-titles');


//           // no we have a color list retry
//       var backgroundColors16 = justonebox16.split(",");
//       var typeString16 = justoneboxtitle16.split(",");


//       carouselText16 =[];
//       for(nItem in backgroundColors16){
//           const itemnwe = new carouselTexts(typeString16[nItem],backgroundColors16[nItem]);
//           carouselText16.push(itemnwe);
//       }
//         carousel(carouselText16, "#feature-text16");



//     var item17 = $($('.trendsbox')[16]);
//       var justonebox17 = item17.attr('data-colors');
//       var justoneboxtitle17= item17.attr('data-titles');


//           // no we have a color list retry
//       var backgroundColors17 = justonebox17.split(",");
//       var typeString17 = justoneboxtitle17.split(",");


//       carouselText17 =[];
//       for(nItem in backgroundColors17){
//           const itemnwe = new carouselTexts(typeString17[nItem],backgroundColors17[nItem]);
//           carouselText17.push(itemnwe);
//       }
//         carousel(carouselText17, "#feature-text17");




//     var item18 = $($('.trendsbox')[17]);
//       var justonebox18 = item18.attr('data-colors');
//       var justoneboxtitle18= item18.attr('data-titles');


//           // no we have a color list retry
//       var backgroundColors18 = justonebox18.split(",");
//       var typeString18 = justoneboxtitle18.split(",");


//       carouselText18 =[];
//       for(nItem in backgroundColors18){
//           const itemnwe = new carouselTexts(typeString18[nItem],backgroundColors18[nItem]);
//           carouselText18.push(itemnwe);
//       }
//         carousel(carouselText18, "#feature-text18");




//     var item19 = $($('.trendsbox')[18]);
//       var justonebox19 = item19.attr('data-colors');
//       var justoneboxtitle19= item19.attr('data-titles');


//           // no we have a color list retry
//       var backgroundColors19 = justonebox19.split(",");
//       var typeString19 = justoneboxtitle19.split(",");


//       carouselText19 =[];
//       for(nItem in backgroundColors19){
//           const itemnwe = new carouselTexts(typeString19[nItem],backgroundColors19[nItem]);
//           carouselText19.push(itemnwe);
//       }
//         carousel(carouselText19, "#feature-text19");




//     var item20 = $($('.trendsbox')[19]);
//       var justonebox20 = item20.attr('data-colors');
//       var justoneboxtitle20= item20.attr('data-titles');


//           // no we have a color list retry
//       var backgroundColors20 = justonebox20.split(",");
//       var typeString20 = justoneboxtitle20.split(",");


//       carouselText20 =[];
//       for(nItem in backgroundColors20){
//           const itemnwe = new carouselTexts(typeString20[nItem],backgroundColors20[nItem]);
//           carouselText20.push(itemnwe);
//       }
//         carousel(carouselText20, "#feature-text20");

// });