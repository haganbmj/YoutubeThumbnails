/**
 * Brendan Hagan v0.0.0.0.0.1
 * Built with CS5 in mind. 
 * Reference: http://jongware.mit.edu/idcs5/
 */

var doc = app.activeDocument;

var inputFile = new File(doc.path + "/in.csv");
// var inputFile = File.selectDialog("Select a source CSV file.");

var outputFolder = createDirectory(doc.path + "/out");
//var outputFolder = Folder.selectDialog("Select an output directory.");

doTheShit();

function doTheShit() {
	inputFile.open('r');
	var i = 0;
	while (!inputFile.eof) {
		var line = inputFile.readln().split(',');
		
		// Set the player names.
		doc.artLayers.getByName('p1_name').textItem.contents = line[0];
		doc.artLayers.getByName('p2_name').textItem.contents = line[2];
		
		// Hide all character graphics based on the two Groups.
		hideAllLayers(doc.layerSets.getByName('p1').artLayers);
		hideAllLayers(doc.layerSets.getByName('p2').artLayers);
		
		// Unhide the layers containing the active characters.
		doc.layerSets.getByName('p1').artLayers.getByName(line[1]).visible = true;
		doc.layerSets.getByName('p2').artLayers.getByName(line[3]).visible = true;
		
		// Save the file including the index to preserve order and the player names.
		savePNG(pad(i, 2) + "_" + line[0] + "-" + line[2]);
		i++;
	}
	inputFile.close();
}

/* Hide all layers in the specified set of layers */
function hideAllLayers(layers) {
	layers = layers || doc.layers;
	for (var i = 0; i < layers.length; i++) {
		layers[i].visible = false;
	}
}

/* Use or Create directory */
function createDirectory(folderPath) {
	var folder = Folder(folderPath);
	if (!folder.exists) { folder.create(); }
	return folder;
}

/* Output file. Uses the default PNG settings */
function savePNG(fileName) {
	doc.saveAs(File(outputFolder.absoluteURI + "/" + fileName), PNGSaveOptions, true, Extension.LOWERCASE);
}

function pad(n, width, z) {
	z = z || '0';
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}