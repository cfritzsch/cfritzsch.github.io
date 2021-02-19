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
    //console.log(file);
    //if (file) {
    // Ensure it's an image
    if(file.type.match(/image.*/)) {
        const reader = new FileReader();

        PreviewDefaultText.style.display = "none";
        previewImage.style.display = "block";
		
		previewImage.decode()
		.then(() => {
			console.log('previewImage decoded')
		})
		.catch((encodingError) => {
			console.log('previewImage decoding error')
			console.log(encodingError)
		})

        reader.addEventListener("load", function() {
			//console.log('reader loaded')
			//console.log(this.result);
            previewImage.setAttribute("src", this.result);

			document.getElementById("buttonCalculate").disabled = false;
        })

		//console.log('readingDataURL')
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
    //console.log(partListTable.rows.length)
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
		//generateValidColoring().then(function(im){drawMosaic()});
		//drawPreview();
		generateValidColoringAndDraw();
	}, 200);
    
})


// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
//var cell1 = row.insertCell(0);

var myDropdown = document.getElementsByClassName("dropdown-item")
for (var i = 0; i < myDropdown.length; i++) {
    myDropdown[i].addEventListener('click', function () {
        var partList = getPartList(this.id)
        //console.log(partList)
        setTableItemsFromPartList(partList)
    })
}


var drawPreview = function () {
    //console.log(imageData)
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

    context.fillStyle = "black";
    context.globalCompositeOperation = 'destination-over'
    context.fillRect(0, 0, canvas.width, canvas.height);
}


var drawMosaic = function (im) {
	
    //console.log(im)
	width = im.length;
	height = im[0].length;
	
    var canvas = document.getElementById("previewMosaicCanvas")
    var context = canvas.getContext("2d");

    canvas.width = width*30;
    canvas.height = height*30;

    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            //var index = (y*width + x) * 4;
            var red = im[x][y][0];
            var green = im[x][y][1];
            var blue = im[x][y][2];

            var centerX = (x+0.5) * canvas.width / (width);
            var centerY = (y+0.5) * canvas.height / (height);
            var radius = canvas.width / (width+1)/2.1;

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
                [5, 19, 29, 698], // r, g, b, count
                [159, 195, 233, 57],
                [248, 187, 61, 65],
                [10, 52, 99, 121],
                [108, 110, 104, 141],
                [53, 33,  0, 554],
                [169, 85,  0, 85],
                [149, 138, 115, 137],
                [160, 165, 169, 51],
                [204, 112, 42, 29],
                [254, 138, 24, 74],
                [88, 42, 18, 250],
                [96, 116, 161, 52],
                [228, 205, 158, 283],
                [255, 255, 255, 149]
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



const generateValidColoringAndDraw = async () => {
    const im = await generateValidColoring();
	console.log('coloring done -> drawing')
    drawMosaic(im);
}



var generateValidColoring = function () {
	//var red[] = new float[imageData.width*imageData.height];
	//var green[] = new float[imageData.width*imageData.height];
	//var blue[] = new float[imageData.width*imageData.height];
	
	//console.log('starting coloring')
	
	var colorList = getPartList('dropdownButtonBeatles');
	var im = imageData;
	
	// Calculate distance of all pixels to all colors
	// Add a bit of randomness into color
	var pxCount = 0;
	var distMat = createArray(imageData.width, imageData.height, colorList.length);
	var outIm = createArray(imageData.width, imageData.height, 3);
	
	var limitedParts = false;
	
	//console.log('starting coloring for loop');
	for (var x = 0; x < imageData.width; x++) {
        for (var y = 0; y < imageData.height; y++) {
			var index = (y*imageData.width + x) * 4;
            var red = imageData.data[index] + Math.random()-0.5;
            var green = imageData.data[index + 1] + Math.random()-0.5;
            var blue = imageData.data[index + 2] + Math.random()-0.5;
			
			// Calculate distance of color of each pixel 
			// to each color in the list
			// and get best available color at the same time
			var bestCol = 0;
			var bestDist = Infinity;
			for (var col = 0; col < colorList.length; col++) {
				distMat[x][y][col] = Math.pow(red-colorList[col][0], 2) + Math.pow(green-colorList[col][1], 2) + Math.pow(blue-colorList[col][2], 2);
				if (distMat[x][y][col] < bestDist && colorList[col][3] > 0) { // check that best color is still available
					bestDist = distMat[x][y][col];
					bestCol = col;
				}
			}
			outIm[x][y][0] = colorList[bestCol][0];
			outIm[x][y][1] = colorList[bestCol][1];
			outIm[x][y][2] = colorList[bestCol][2];
			pxCount = pxCount + 1;
			if (limitedParts) {
				colorList[bestCol][3] = colorList[bestCol][3] - 1;
			}
		}
	}
	//console.log('coloring done');
	
	//console.log(colorList)
	//console.log(outIm);
	
	var distMatOrig = distMat;
	
	return outIm;
	
}


function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}


// function [outIm, outColIm] = generateValidColoring(im, colorList, hueWeight, satWeight, valueWeight, unlimitedParts, doPostprocessing)

    // R = im(:,:,1); R = double(R(:)) + randn(size(R(:)))*0.1;
    // G = im(:,:,2); G = double(G(:)) + randn(size(G(:)))*0.1;
    // B = im(:,:,3); B = double(B(:)) + randn(size(B(:)))*0.1;
    
    // hsvIm = rgb2lab(cat(3,R,G,B));
    // H = hsvIm(:,:,1);
    // S = hsvIm(:,:,2);
    // V = hsvIm(:,:,3);
    
    // colorList = double(colorList);
    // colorListHSV = rgb2lab(cat(3,colorList(:,1), colorList(:,2), colorList(:,3)));
    
    // distMat = zeros(size(R,1),size(colorList,1));
    // for iCol = 1:size(colorList,1)
        // for iPx = 1:size(R,1)
            // if hueWeight == 0 && satWeight == 0 && valueWeight == 0
                // distMat(iPx, iCol) = (R(iPx)-colorList(iCol,1))^2 + (G(iPx)-colorList(iCol,2))^2 + (B(iPx)-colorList(iCol,3))^2;
            // else
                // distMat(iPx, iCol) = (H(iPx)-colorListHSV(iCol,1))^2 * hueWeight + (S(iPx)-colorListHSV(iCol,2))^2 * satWeight + (V(iPx)-colorListHSV(iCol,3))^2 * valueWeight;
            // end
            // //distMat(iPx, iCol) = colorangle([R(iPx),G(iPx),B(iPx)],colorList(iCol,1:3));
        // end
    // end
    // distMatOrig = distMat;
    
    // // First, fill image with closest colors (until they are empty)
    // // -> That's a pretty good first guess of the optimal solution 
    // outIm = im * 0;
    // outR = R * 0;
    // outG = G * 0;
    // outB = B * 0;
    // outCol = R * 0;
    // while any(~isinf(distMat(:)))
        // [px,col] = find(distMat == min(distMat(:)), 1);
        // outR(px) = colorList(col,1);
        // outG(px) = colorList(col,2);
        // outB(px) = colorList(col,3);
        // outCol(px) = col;
        // distMat(px, :) = Inf;
        
        // if ~unlimitedParts
            // colorList(col,4) = colorList(col,4) - 1;
            // if colorList(col,4) <= 0
                // distMat(:, col) = Inf; // use Inf dist as signal that color is empty
            // end
        // end
    // end
    
    // outIm(:,:,1) = reshape(outR(:),size(im,1),size(im,2));
    // outIm(:,:,2) = reshape(outG(:),size(im,1),size(im,2));
    // outIm(:,:,3) = reshape(outB(:),size(im,1),size(im,2));
    // outColIm = reshape(outCol(:),size(im,1),size(im,2));

// //     cost = imageCostFun(im, outIm);
// //     fprintf('\n  %.0f ',cost);
    
    // // Now, swap parts as long as possible to improve overall color similarity
    // // Also allow swapping with the unused pool
    // if ~unlimitedParts && doPostprocessing
        // keepRunning = true;
        // count = 0;
        // while keepRunning && count < 100
            // count = count +1;
            // keepRunning = false; fprintf('.')
            // for iPx = 1:size(outCol,1)
                // //if min(distMatOrig(iPx,:)) < distMatOrig(iPx,outCol(iPx))
                // if any(distMatOrig(iPx,:) < distMatOrig(iPx,outCol(iPx)))
                    // // suboptimal choice -> can we swap?
                    // //bestCol = find(distMatOrig(iPx,:) == min(distMatOrig(iPx,:)));
                    // bestCol = find(distMatOrig(iPx,:) < distMatOrig(iPx,outCol(iPx)));
                    // for iCol = 1:length(bestCol)
                        // possibleSwaps = find(outCol == bestCol(iCol));
                        // loss = distMatOrig(iPx,outCol(iPx)) - distMatOrig(iPx,bestCol(iCol)); // what did we loose by suboptimal choice?
                        // gains = (distMatOrig(possibleSwaps,outCol(iPx)) - distMatOrig(possibleSwaps,bestCol(iCol))); // what can we gain by swapping?

                        // if min(gains-loss) < 0 // -> swap
                            // idx = find((gains-loss) == min(gains-loss), 1);
                            // idx = possibleSwaps(idx);
    // //                         minDist = distMatOrig(iPx,bestCol);
    // //                         distMatOrig(iPx,bestCol) = distMatOrig(iPx,outCol(iPx));
    // //                         distMatOrig(iPx,outCol(iPx)) = minDist;
    // //                         minDist = distMatOrig(idx,bestCol);
    // //                         distMatOrig(idx,bestCol) = distMatOrig(idx,outCol(iPx));
    // //                         distMatOrig(idx,outCol(iPx)) = minDist;
                            // outR(iPx) = colorList(bestCol(iCol),1);
                            // outG(iPx) = colorList(bestCol(iCol),2);
                            // outB(iPx) = colorList(bestCol(iCol),3);
                            // outR(idx) = colorList(outCol(iPx),1);
                            // outG(idx) = colorList(outCol(iPx),2);
                            // outB(idx) = colorList(outCol(iPx),3);
                            // outCol(idx) = outCol(iPx);
                            // outCol(iPx) = bestCol(iCol);
                            // keepRunning = true;
                            // break
                        // elseif colorList(bestCol(iCol),4) > 0
                            // //there is a better color left in the pool -> swap
                            // colorList(bestCol(iCol),4) = colorList(bestCol(iCol),4) - 1;
                            // colorList(outCol(iPx),4) = colorList(outCol(iPx),4) + 1;
                            // outR(iPx) = colorList(bestCol(iCol),1);
                            // outG(iPx) = colorList(bestCol(iCol),2);
                            // outB(iPx) = colorList(bestCol(iCol),3);
                            // keepRunning = true;
                            // fprintf('-');
                            // break
                        // end
                    // end
                // end
            // end
        // end
        // outIm(:,:,1) = reshape(outR(:),size(im,1),size(im,2));
        // outIm(:,:,2) = reshape(outG(:),size(im,1),size(im,2));
        // outIm(:,:,3) = reshape(outB(:),size(im,1),size(im,2));
        // outColIm = reshape(outCol(:),size(im,1),size(im,2));

// //         cost = imageCostFun(im, outIm);
// //         fprintf(' %.0f',cost);
    // end
// end