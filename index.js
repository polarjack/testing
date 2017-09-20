
//const callFunDemo = require('./callFunDemo.js')

function dragoverHandler(evt) {
    evt.preventDefault();
}

function dropHandler(evt) {//evt 為 DragEvent 物件
    evt.preventDefault();
    var file = evt.dataTransfer.files[0];//由DataTransfer物件的files屬性取得檔案物件

    var reader = new FileReader();

    // If we use onloadend, we need to check the readyState.
    reader.onloadend = function(evt) {
      if (evt.target.readyState == FileReader.DONE) { // DONE == 2

        var wordArray = CryptoJS.lib.WordArray.create(evt.target.result);
        var hash = CryptoJS.SHA256(wordArray);

        //let memberId = document.getElementById('memberId').value
        // let docType = document.getElementById('docType').value
        // let docNumber = document.getElementById('docNumber').value
        // let docVer = document.getElementById('docVer').value
        // let note = document.getElementById('note').value

        let inf = document.getElementById('inf')
        inf.innerHTML = 'name : ' + file.name + '<br>' +
            'size : ' + file.size + ' bytes<br>' +
            'type : ' + file.type + '<br>' +
            'SHA-256 : ' + hash.toString()

        //const path = require('callFunDemo')

        //console.log(memberId + ' ' + docType + ' ' + docNumber + ' ' + docVer + ' ' + note)
      }
    };

    reader.readAsArrayBuffer(file)
}


// function setReg() {
//     //console.log("ddddd");
//     let message = document.getElementById('message')
//     if() {
//         message.innerHTML =
//     }else{
//         message.innerHTML =
//     }
// }
