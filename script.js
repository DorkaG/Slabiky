"use strict";

let samohlasky = ["a", "á", "e", "é", "i", "í", "o", "ó", "u", "ú", "ů", "y", "ý", "ě", "ou", "au", "A", "Á", "E", "É", "I", "Í", "O", "Ó", "U", "Ú", "Ů", "Y", "Ý", "Ě", "OU", "AU"];
let souhlasky = ["b", "B", "c", "C", "č", "č", "d", "D", "ď", "Ď", "f", "F", "g", "G", "h", "H", "ch", "Ch", "j", "J", "k", "K", "m", "M", "n", "N", "p", "P", "q", "Q", "ř", "Ř", "s", "S", "š", "Š", "t", "T", "ť", "Ť", "v", "V", "w", "W", "x", "X", "z", "Z", "ž", "Ž"];
let interpunkce = [" ", ",", ".", "?", "!", "...", ";", "-", "'"];

//let text = "máma ouha chrní";
// let text = "Vlku nevrkej ráno";
// let text = "Láska zrada eroze prst";
let text = "mamlase";


let znaky = text.split("");                          //text se rozdeli na znaky



for (let i = 0; i < znaky.length; i++) {
    if (znaky[i] === "o") {                          //osetreni dvouhlasky ou
        if (znaky[i+1] === "u") {
            znaky.splice(i, 1, "ou")
            znaky.splice(i+1, 1)
        }
    }

    if (znaky[i] === "a") {              //osetreni dvouhlasky au
        if (znaky[i+1] === "u") {
            znaky.splice(i, 1, "au")
            znaky.splice(i+1, 1)
        }
    }

    if (znaky[i] === "c") {              //osetreni ch
        if (znaky[i+1] === "h") {
            znaky.splice(i, 1, "ch")
            znaky.splice(i+1, 1)
        }
    }
}

console.log(`Toto je text rozdeleny na znaky: ${znaky}`);

let znakyJakoObjekty = [];          //znaky dány jako objekty, zejm. kvůli r a l, kde se pozná jen podle kontextu, zda jde o slabikotvorné, nebo ne. Zde slabikotvorné chápány jako samohlásky

for (let i = 0; i < znaky.length; i++) {
    if (samohlasky.includes(znaky[i])) {
        znakyJakoObjekty.push({znak: znaky[i], typ: "samohlaska"});
    }
    else if (souhlasky.includes(znaky[i])) {
        znakyJakoObjekty.push({znak: znaky[i], typ: "souhlaska"});
    }
    else if (interpunkce.includes(znaky[i])) {
        znakyJakoObjekty.push({znak: znaky[i], typ: "interpunkce"});
    }
    else if (znaky[i] === "r") {
        if (samohlasky.includes(znaky[i-1]) || samohlasky.includes(znaky[i+1])) {
            znakyJakoObjekty.push({znak: "r", typ: "souhlaska"});
            }
        else {
            znakyJakoObjekty.push({znak: "r", typ: "samohlaska"});
            }
        }
    else if (znaky[i] === "R") {
        if (samohlasky.includes(znaky[i-1]) || samohlasky.includes(znaky[i+1])) {
            znakyJakoObjekty.push({znak: "R", typ: "souhlaska"});
            }      
        else {
            znakyJakoObjekty.push({znak: "R", typ: "samohlaska"});
                }
        }
    else if (znaky[i] === "l") {
        if (samohlasky.includes(znaky[i-1]) || samohlasky.includes(znaky[i+1])) {
            znakyJakoObjekty.push({znak: "l", typ: "souhlaska"});
                }      
        else {
           znakyJakoObjekty.push({znak: "l", typ: "samohlaska"});
                }
        }
    else if (znaky[i] === "L") {
        if (samohlasky.includes(znaky[i-1]) || samohlasky.includes(znaky[i+1])) {
            znakyJakoObjekty.push({znak: "L", typ: "souhlaska"});
                    }      
        else {
            znakyJakoObjekty.push({znak: "L", typ: "samohlaska"});
                    }
        }
    
}

console.log(znakyJakoObjekty);

let slabika = [];
let poleSlabik = [];

// let opakuj = 0;
// while (opakuj < znakyJakoObjekty.length) {

    for (let i = 0; i < znakyJakoObjekty.length; i++) {
        if (znakyJakoObjekty[i].typ === "souhlaska") {
            slabika.push(znakyJakoObjekty[i].znak);
        }
        else if (znakyJakoObjekty[i].typ === "interpunkce") {
            slabika.push(znakyJakoObjekty[i].znak);
                if (znakyJakoObjekty[0].typ !== "souhlaska") {
                    hotovaSlabika(i);
                    break;
                }
        }
        else if (znakyJakoObjekty[i].typ === "samohlaska") {                //ma
            slabika.push(znakyJakoObjekty[i].znak);
                if (znakyJakoObjekty[i+1].typ === "interpunkce" || znakyJakoObjekty[i+1].typ === "samohlaska") {        //ma.
                    hotovaSlabika(i);
                    break;
                }
                else if (znakyJakoObjekty[i+1].typ === "souhlaska") {       //mam
                    for (let a = i + 2; a < znakyJakoObjekty.length; a++) {
                        if (znakyJakoObjekty[a].typ === "samohlaska"){  //mama
                            hotovaSlabika(i);
                            break; 
                        }
                        else if (znakyJakoObjekty[a].typ === "souhlaska") {          //mamlas. třesk
                            for (let b = i + 3; b < znakyJakoObjekty.length; b++) {
                                if (znakyJakoObjekty[b].typ === "samohlaska") {         //mamlas
                                    slabika.push(znakyJakoObjekty[i+1].znak); 
                                    hotovaSlabika(i+1);
                                    break;  
                                }
                                else if (znakyJakoObjekty[b].typ === "interpunkce") {   // třesk.
                                    for (let x = i+1; x < b; x++) {
                                        slabika.push(znakyJakoObjekty[x].znak);
                                    }
                                    hotovaSlabika(b-1);
                                    break;
                                }
                            }    
                        }       


                    }
                }
        }
    }






// }

function hotovaSlabika(index) {
    poleSlabik.push(slabika.join(""));

    for (let i = 0; i <= index; i++) {
        znakyJakoObjekty.shift();
    }

    slabika = [];

}
console.log("Pole znaků, resp. to, co z něj zbylo:")
console.log(znakyJakoObjekty);

console.log("Pole slabika by mělo být prázdné:")
console.log(slabika);

console.log("Pole slabik by mělo obsahovat aktuální slabiku:")
console.log(poleSlabik);

