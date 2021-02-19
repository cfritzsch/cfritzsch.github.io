const imageFile = document.getElementById("imageFile");
//const previewContainer = document.getElementById("imagePreview");
//const previewImage = previewContainer.querySelector(".img-fluid");
const previewImage = document.getElementById("previewImg");
//const PreviewDefaultText = previewContainer.querySelector(".image-preview__default-text");
const PreviewDefaultText = document.getElementById("image-preview__default-text");
const RGBResultTextarea = document.getElementById("RGBResult");
const widthInput = document.getElementById("widthInputValue");
const heightInput = document.getElementById("heightInputValue");

var imageData = [];

imageFile.addEventListener("change", function() {
    const file = this.files[0]
    console.log(file);
    //if (file) {
    // Ensure it's an image
    if(file.type.match(/image.*/)) {
        const reader = new FileReader();

        PreviewDefaultText.style.display = "none";
        previewImage.style.display = "block";

		previewImage.decode().then(() => {
			console.log('previewImage decoded')
		});

        reader.addEventListener("load", function() {
            previewImage.setAttribute("src", this.result);

			document.getElementById("buttonCalculate").disabled = false;
        })

        reader.readAsDataURL(file);
    } else {
        PreviewDefaultText.style.display = null;
        previewImage.style.display = null;

        document.getElementById("buttonCalculate").disabled = true;

        previewImage.setAttribute("src", "");
        RGBResultTextarea.value = "";
        if (file) {
            alert('The file you selected is not a valid image file');
        }
    }
})


var partListTableAddRowButton = document.getElementById("addTableRow")
partListTableAddRowButton.addEventListener('click', function () {
    var partListTable = document.getElementById("partTable")
    console.log(partListTable.rows.length)
    var row = table.insertRow(partListTable.rows.length()-1);
})


var calculateButton = document.getElementById("buttonCalculate")
calculateButton.addEventListener('click', function () {
	var resizeCanvas = document.createElement('canvas');
            
	resizeCanvas.width = widthInput.value;
	resizeCanvas.height = heightInput.value;
	context = resizeCanvas.getContext('2d');
	setTimeout(() => { 
		context.drawImage(previewImage, 0, 0, resizeCanvas.width, resizeCanvas.height);
	}, 100);
	setTimeout(() => {  
		imageData = context.getImageData(0, 0, resizeCanvas.width, resizeCanvas.height);
		drawPreview();
	}, 200);
    
})


// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
//var cell1 = row.insertCell(0);

var myDropdown = document.getElementsByClassName("dropdown-item")
for (var i = 0; i < myDropdown.length; i++) {
    myDropdown[i].addEventListener('click', function () {
        var partList = getPartList(this.id)
        console.log(partList)
        setTableItemsFromPartList(partList)
    })
}


var drawPreview = function () {
    console.log(imageData)
    var canvas = document.getElementById("previewMosaicCanvas")
    var context = canvas.getContext("2d");

    canvas.width = imageData.width*30;
    canvas.height = imageData.height*30;

    for (var x = 0; x < imageData.width; x++) {
        for (var y = 0; y < imageData.height; y++) {
            var index = (y*imageData.width + x) * 4;
            var red = imageData.data[index];
            var green = imageData.data[index + 1];
            var blue = imageData.data[index + 2];
            //var alpha = imageData.data[index + 3];

            var centerX = (x+0.5) * canvas.width / (imageData.width);
            var centerY = (y+0.5) * canvas.height / (imageData.height);
            var radius = canvas.width / (imageData.width+1)/2.1;

            context.fillStyle = rgbToHex(`(${red},${green},${blue})`);
            context.beginPath();
            context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
            context.closePath();
            context.fill();
        }
    }

    //context.fillStyle = "black";
    //context.globalCompositeOperation = 'destination-over'
    //context.fillRect(0, 0, canvas.width, canvas.height);
}


function rgbToHex(rgb) {
    var a = rgb.split("(")[1].split(")")[0].split(",");
    return "#" + a.map(function(x) {
      x = parseInt(x).toString(16);
      return (x.length == 1) ? "0"+x : x;
    }).join("");
  }


var getPartList = function (id) {
    switch (id) {
        case "dropdownButtonBeatles":
            console.log("beatles");
            var partList = [
                [100, 200, 10, 2],
                [234, 123, 10, 4],
                [50, 233, 100, 6]
              ];
            return partList;
            break;
        case "dropdownButtonMonroe":
            console.log("monroe");
            return [];
            break;
        case "dropdownButtonCustom":
            console.log("custom");
            break;
        default:
            console.log("unknown");
            break;
      }
}


var setTableItemsFromPartList = function (partList) {
    var partListTable = document.getElementById("partTable")
    console.log(partListTable)
}