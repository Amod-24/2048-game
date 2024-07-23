function createBoard(){
    let gridDiv = document.querySelector(".grid");
    for (let i = 0;i<16;i++){
        let div = document.createElement("div");
        div.setAttribute('id',`id_${i}`);
        div.textContent = "";
        gridDiv.appendChild(div);
    }
}
createBoard();
function generate(){
    let numArray = [2,2,2,2,2,2,2,2,2,4];
    let num = numArray[Math.floor(Math.random()*10)];
    
    let allBoxes = [...document.querySelectorAll(".grid>div")];
    // document.innerText = `${allBoxes}`;
    let emptyPlace = allBoxes.filter((a)=>a.textContent == "");
    let numberOfEmptyPlaces = emptyPlace.length;
    if (numberOfEmptyPlaces == 0){
        return;
    }
    let finalBlock = emptyPlace[Math.floor(Math.random()*numberOfEmptyPlaces)];
    finalBlock.textContent = num;
    let cells = Array.from(document.querySelector(".grid").children);
    cells.forEach(i =>{
        if(i.textContent == ""){
            i.style.backgroundColor = "#736d67";
        }
        if(i.textContent == 2){
            i.style.backgroundColor = "#9d9287";
            i.style.fontSize = "60px"
        }
        if(i.textContent == 4){
            i.style.backgroundColor = "#b7a089";
            i.style.fontSize = "60px"
        }
    })
}
generate();
// ----------------------------------------------------------------------------------------
let score = 0;
function shiftArrayLeft(values){
    let finalArray = values.filter((i) => i != "");
    for (let i = finalArray.length;i < 4;i++){
        finalArray.push("");
    }
    return finalArray;
}
function shiftArrayRight(values){
    let finalArray = values.filter((i) => i != "");
    for (let i = finalArray.length;i < 4;i++){
        finalArray.unshift("");
    }
    return finalArray;
}

// ----------------------------------------------------------------------------------------

function shiftRow(rowNumber,direction){
    let rowValues = [];
    for (let i = 4*(rowNumber-1); i<4*rowNumber;i++){
        rowValues.push(document.querySelector(`#id_${i}`).textContent);
    };
    
    if (direction == "L"){
        rowValues = shiftArrayLeft(rowValues);
        for(let g = 1; g<4; g++){
            if(rowValues[g] == rowValues[g-1]){
                rowValues[g-1] *= 2;
                rowValues[g] = 0;
                score += rowValues[g-1]
            }
        };
        rowValues = shiftArrayLeft(rowValues);
        
    };
    if (direction == "R"){
        rowValues = shiftArrayRight(rowValues);
        for(let g = 2; g>=0; g--){
            if(rowValues[g] == rowValues[g+1]){
                rowValues[g+1] *= 2;
                rowValues[g] = 0;
                score += rowValues[g+1]
            }
        };
        rowValues = shiftArrayRight(rowValues);
    };
    for (let i = 4*(rowNumber-1); i<4*rowNumber;i++){
        document.querySelector(`#id_${i}`).textContent = rowValues[i%4];
    };
    // console.log(score);
    document.querySelector("#score").textContent = `${score}`;
};
function shiftLeft(){
    shiftRow(1,"L");
    shiftRow(2,"L");
    shiftRow(3,"L");
    shiftRow(4,"L");
};
function shiftRight(){
    shiftRow(1,"R");
    shiftRow(2,"R");
    shiftRow(3,"R");
    shiftRow(4,"R");
};
// ----------------------------------------------------------------------------------------
// shiftLeft();
// shiftRight();
// ----------------------------------------------------------------------------------------

function shiftColumn(columnNumber,direction){
    let columnValues = [];
    for (let i = columnNumber-1; i<columnNumber+12; i += 4){
        columnValues.push(document.querySelector(`#id_${i}`).textContent);
    };
    if (direction == "U"){
        columnValues = shiftArrayLeft(columnValues);
        for(let g = 1; g<4; g++){
            if(columnValues[g] == columnValues[g-1]){
                columnValues[g-1] *= 2;
                columnValues[g] = 0;
                score += columnValues[g-1];
            }
        };
        columnValues = shiftArrayLeft(columnValues);

    };
    if (direction == "D"){
        columnValues = shiftArrayRight(columnValues);
        for(let g = 2; g>=0; g--){
            if(columnValues[g] == columnValues[g+1]){
                columnValues[g+1] *= 2;
                columnValues[g] = 0;
                score += columnValues[g+1];
            }
        };
        columnValues = shiftArrayRight(columnValues);
        
    };
    for (let i = columnNumber-1; i<columnNumber+12; i += 4){
        document.querySelector(`#id_${i}`).textContent = columnValues[Math.floor(i/4)];
    };
    document.querySelector("#score").textContent = `${score}`;
};
function shiftUp(){
    shiftColumn(1,"U");
    shiftColumn(2,"U");
    shiftColumn(3,"U");
    shiftColumn(4,"U");
};
function shiftDown(){
    shiftColumn(1,"D");
    shiftColumn(2,"D");
    shiftColumn(3,"D");
    shiftColumn(4,"D");
};
// shiftUp();
// shiftDown();
// ----------------------------------------------------------------------------------------
function control(e){

    if(e.keyCode == 37){
        shiftLeft(); 
        generate();  
    }
    if(e.keyCode == 38){
        shiftUp();
        generate();
    }
    if(e.keyCode == 39){
        shiftRight();
        generate();
    }
    if(e.keyCode == 40){
        shiftDown();
        generate();
    }
    if(isGameOver()){
    // console.log("over");
    document.body.removeEventListener("keyup",control);
    let result = document.querySelector("#result");
    result.textContent = "Game Over!";
    result.style.color = "red";
    };
    if(checkForWin()){
    // console.log("over");
    document.body.removeEventListener("keyup",control);
    let result = document.querySelector("#result");
    result.textContent = "YOU WIN";
    result.style.color = "green";
    };
    if (score > 9999){
        document.querySelector("#score").style.fontSize = "20px";
    }
    let cells = Array.from(document.querySelector(".grid").children);
    cells.forEach(i =>{
        if(i.textContent == ""){
            i.style.backgroundColor = "#736d67";
            i.style.fontSize = "60px"
        }
        if(i.textContent == 2){
            i.style.backgroundColor = "#9d9287";
            i.style.fontSize = "60px"
        }
        if(i.textContent == 4){
            i.style.backgroundColor = "#b7a089";
            i.style.fontSize = "60px"
        }
        if(i.textContent == 8){
            i.style.backgroundColor = "#b58a5f";
            i.style.fontSize = "60px"
        }
        if(i.textContent == 16){
            i.style.backgroundColor = "#c38140";
            i.style.fontSize = "60px"
        }
        if(i.textContent == 32){
            i.style.backgroundColor = "#e5811d";
            i.style.fontSize = "60px"
        }
        if(i.textContent == 64){
            i.style.backgroundColor = "#e5b31d";
            i.style.fontSize = "60px"
        }
        if(i.textContent == 128){
            i.style.backgroundColor = "#dff20b";
            i.style.fontSize = "60px"
        }
        if(i.textContent == 256){
            i.style.backgroundColor = "#41f20b";
            i.style.fontSize = "60px"
        }
        if(i.textContent == 512){
            i.style.backgroundColor = "#0bf2c4";
            i.style.fontSize = "60px"
        }
        if(i.textContent == 1024){
            i.style.backgroundColor = "#0bb4f2";
            i.style.fontSize = "40px"
            i.style.alignItems = "centre"
        }
        if(i.textContent == 2048){
            i.style.backgroundColor = "#0b16f2";
            i.style.fontSize = "40px"
        }
    })
}
document.querySelector("body").addEventListener("keyup",control);
// ----------------------------------------------------------------------------------------

function isGameOver(){
    // console.log("over");
    for(let i = 0;i<16;i++){
        if(document.querySelector(`#id_${i}`).textContent == 0){
            return false;
        }
    }
    for (let i = 0;i<16;i+=4){
        for (let j = i+1; j<i+4; j++){
            if (document.querySelector(`#id_${j}`).textContent == document.querySelector(`#id_${j-1}`).textContent){
                return false;
            }
        }
    }
    for (let i = 0;i<4;i++){
        for (let j = i+4; j<=i+12; j+=4){
            if (document.querySelector(`#id_${j}`).textContent == document.querySelector(`#id_${j-4}`).textContent){
                return false;
            }
        }
    }
    return true;
}

function checkForWin(){
    for(let i = 0;i<16;i++){
        if(document.querySelector(`#id_${i}`).textContent == 2048){
            return true;
        }
    }
}
let restart  = document.querySelector("#restart-button");
restart.addEventListener('click',()=>{
    score = 0;
    document.querySelector("#score").textContent = `${score}`;
    for (let i=0;i<16;i++){
        document.querySelector(`#id_${i}`).textContent = "";
    };
    generate();
    generate();
    document.querySelector("#result").innerHTML = "Join the numbers and get to the <b>2048</b> tile!";
    document.querySelector("#result").textContent.style.color = "black"
    
});
