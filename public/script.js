
const trendsBoxAll = $('.trends-container').children();

function scrape()
{
    fetch('/scrape')
    .then(response => response.text())
    .then(json => 
    {
        console.log("scrape çalıştı");
        console.log(json);
    }).catch(err => console.log(err));
}

function run()
{
    
    $.getJSON("public/data.json", function(json)
    {
        console.log("data.json erişim başarılı")
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
    
        var jsonObjectList = [];
    
        for (var item in json) 
        {
            if (item == 0 || item == 1 || item == 2 || item == 3 || item == 4) 
            {
              
                jsonObjectList.push(new JsonObject(json[item], item, '#012a4a'));
    
    
            } 
            else if (item == 5 || item == 6 || item == 7 || item == 8 || item == 9) 
            {
                jsonObjectList.push(new JsonObject(json[item], item, '#014f86'));
    
            } 
            else if (item == 10 || item == 11 || item == 12 || item == 13 || item == 14) 
            { 
                jsonObjectList.push(new JsonObject(json[item], item, '#2c7da0'));
    
            } 
            else if (item == 15 || item == 16 || item == 17 || item == 18 || item == 19) 
            {
                jsonObjectList.push(new JsonObject(json[item], item, '#61a5c2'));
            }
    
        }
    
        var newList = [];
        var newlistcolor = [];
    
        function randomListmake(listName, index, color) 
        {
            newList += listName.sort(() => Math.random() - 0.5);
        }
    
        var ColorsData = ['#012a4a', '#014f86', '#2c7da0', '#61a5c2'];
        for (let i in $('.trends-container')[0].children) {
            var colornumrand = [0, 1, 2, 3, 1, 0, 3, 2, 3, 2, 1, 0, 2, 3, 1, 0, 3, 2, 0, 1];
    
            $($('.trends-container')[0].children[i]).css('background-color', ColorsData[colornumrand[i]]);
    
        }

        for (let box in trendsBoxAll) 
        {
            if (trendsBoxAll[box].tagName == 'DIV') 
            {
                //adding data-id
                $(trendsBoxAll[box]).attr('data-id', `${box}`);
                //json randomize working
                randomListmake(jsonObjectList);
                //adding random json to list for title
    
                var newlistitle = [];
                newlistcolor = [];
                var newlistindex = [];
                for (i in jsonObjectList) 
                {
                    newlistitle.push(`${jsonObjectList[i].title}`);
                    newlistcolor.push(`${jsonObjectList[i].color}`);
                    newlistindex.push(`${jsonObjectList[i].index}`);
                }
    
                $(trendsBoxAll[box]).attr('data-titles', `${newlistitle}`);
                $(trendsBoxAll[box]).attr('data-colors', `${newlistcolor}`);
                $(trendsBoxAll[box]).attr('id', `feature-text-${box}`);
            }
        }
    
    
        function sleep(milliseconds) 
        {
            const date = Date.now();
            let currentDate = null;
            do {
                currentDate = Date.now();
            } while (currentDate - date < milliseconds);
        }

        let carouselTexts = class 
        {
            constructor(text, color) 
            {
                this.text = text;
                this.color = color;
            }
        }
    
        // hangi indekstekinin bilgileri alınıcak
        var itemfirsttt = $($('.trendsbox')[0]);
        var justonebox = itemfirsttt.attr('data-colors');
        var justoneboxtitle = itemfirsttt.attr('data-titles');

        var backgroundColors = justonebox.split(",");
        var typeString = justoneboxtitle.split(",");
    
        console.log(backgroundColors);
        var carouselText = [];
        for (let nItem in backgroundColors) 
        {
            const itemnwe = new carouselTexts(typeString[nItem], backgroundColors[nItem]);
            carouselText.push(itemnwe);
        }
    
    
        $(document).ready(async function () 
        {
            carousel(carouselText, "#feature-text")
    
        });
    
        async function typeSentence(sentence, eleRef, delay = 100) 
        {
            const letters = sentence.split("");
            let i = 0;
            while (i < letters.length) {
                await waitForMs(delay);
                $(eleRef).append(letters[i]);
                i++
            }
            return;
        }
    
        async function deleteSentence(eleRef) 
        {
            const sentence = $(eleRef).html();
            const letters = sentence.split("");
            let i = 0;
            while (letters.length > 0) {
                await waitForMs(100);
                letters.pop();
                $(eleRef).html(letters.join(""));
            }
        }
    
        async function carousel(carouselList, eleRef) 
        {
            var i = 0;
            while (true) 
            {
                updateFontColor(eleRef, carouselList[i].color)
                await typeSentence(carouselList[i].text, eleRef);
                await waitForMs(2000);
                await deleteSentence(eleRef);
                await waitForMs(500);
                i++
                if (i >= carouselList.length) 
                {
                    i = 0;
                }
            }
        }
    
        function updateFontColor(eleRef, color) 
        {
            $(eleRef).css('transition', '.5s all');
            $(eleRef).css('background-color', color);
        }
    
        function waitForMs(ms) 
        {
            return new Promise(resolve => setTimeout(resolve, ms))
        }
    
       
        for(let j=1; j<=20; j++)
        {
          var item2 = $($('.trendsbox')[j-1]);
          var justonebox2 = item2.attr('data-colors');
          var justoneboxtitle2= item2.attr('data-titles');
              
              
              // no we have a color list retry
          var backgroundColors2 = justonebox2.split(",");
          var typeString2 = justoneboxtitle2.split(",");
      
          console.log(backgroundColors2);
          var carouselText2 =[];
          for(nItem in backgroundColors2)
          {
              const itemnwe = new carouselTexts(typeString2[nItem],backgroundColors2[nItem]);
              carouselText2.push(itemnwe);
          }
          carousel(carouselText2, "#feature-text"+j);
        }
    });
}

scrape();
run();
setTimeout(scrape,180000);
setInterval(run, 180000);
setInterval(()=> location.reload(), 180000);
