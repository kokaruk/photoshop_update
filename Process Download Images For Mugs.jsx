// suppress dialogues
app.displayDialogs = DialogModes.NO;

// downloads folder
var downloadFolder = Folder.selectDialog();
if (downloadFolder){
    var epsFiles = downloadFolder.getFiles("*.eps");
    var processedFolder = new Folder(downloadFolder.absoluteURI + "/Upload");
    if(!processedFolder.exists) processedFolder.create();

    for(var myCounter = 0; myCounter < epsFiles.length; myCounter++){
          var myFileFolder = new Folder(processedFolder.absoluteURI + "/" + epsFiles[myCounter].name.slice(0, -4))
          if (!myFileFolder.exists) myFileFolder.create();
          processDownloaded(epsFiles[myCounter], myFileFolder);
    }
}

function processDownloaded(myFile, myFileFolder) {
  handsComp(myFile, myFileFolder);
  oneMugComp(myFile, myFileFolder);
  oneMugTilt(myFile, myFileFolder);
  twoMug(myFile, myFileFolder) ;
}


 // hands comp
 function handsComp(myFile, myFileFolder) {
    var compRef = new File("/Users/dimz/Dropbox/Documents/00 Templates and samples/Graphics/Mug_Mockup/mug_mockup06.psd");
    var compRef_SmartLayer = "mug design copy";
    var compRef_SmartLayerDesign = "Your Design Goes Here";
    var docRef = editComp(compRef);
    updateSmartLayer(compRef_SmartLayer, docRef, compRef_SmartLayerDesign, myFile)
    prepareAndExport(myFileFolder, compRef, docRef) ;
 }

 // one mug large comp
 function oneMugComp(myFile, myFileFolder) {
    var compRef = new File("/Users/dimz/Documents/WORK/D/DropOfDye/Templates/Scene-4.psd");
    var compRef_SmartLayer = "MUG";
    var compRef_SmartLayerDesign = "Mug";
    var docRef = editComp(compRef);
    updateSmartLayer(compRef_SmartLayer, docRef, compRef_SmartLayerDesign, myFile)
    prepareAndExport(myFileFolder, compRef, docRef) ;
 }

// one mug tilt comp
 function oneMugTilt(myFile, myFileFolder) {
    var compRef = new File("/Users/dimz/Documents/WORK/D/DropOfDye/Templates/Scene-11.psd");
    var compRef_SmartLayer = "MUG";
    var compRef_SmartLayerDesign = "Mug";
    var docRef = editComp(compRef);
    updateSmartLayer(compRef_SmartLayer, docRef, compRef_SmartLayerDesign, myFile)
    prepareAndExport(myFileFolder, compRef, docRef) ;
 }

// two mugs tilt comp
 function twoMug(myFile, myFileFolder) {
    var compRef = new File("/Users/dimz/Documents/WORK/D/DropOfDye/Templates/Scene-6.psd");
    var compRef_SmartLayerDesign = "Mug";
    var docRef = editComp(compRef);
    var compRef_SmartLayer = "MUG 1";
    updateSmartLayer(compRef_SmartLayer, docRef, compRef_SmartLayerDesign, myFile)
    var compRef_SmartLayer = "MUG 2";
    updateSmartLayer(compRef_SmartLayer, docRef, compRef_SmartLayerDesign, myFile)
    prepareAndExport(myFileFolder, compRef, docRef) ;
 }

function editComp(compRef) {
    return app.open(compRef);
 }

function updateSmartLayer(compRef_SmartLayer, docRef, compRef_SmartLayerDesign, myFile) {
    var layerRef = app.activeDocument.artLayers.getByName(compRef_SmartLayer);
    docRef.activeLayer = layerRef;
    EditSmartObject();
    var smartLayerDocRef =  app.activeDocument;
    var previousArtLayer = app.activeDocument.artLayers.getByName(compRef_SmartLayerDesign);
    previousArtLayer.remove();
    replaceContents(myFile);
    resize();
    smartLayerDocRef.save();
    smartLayerDocRef.close();
 }

function prepareAndExport(myFileFolder, compRef, docRef) {
    resizeTo800();     
    var webFile = new File(myFileFolder.absoluteURI+"/"+compRef.name.slice(0, -4) + ".jpg");
    SaveForWeb(webFile, 60)
    docRef.close(SaveOptions.DONOTSAVECHANGES);
    }


function EditSmartObject(){
    var id6 = stringIDToTypeID( "placedLayerEditContents" );
    var desc3 = new ActionDescriptor();
    executeAction( id6, desc3, DialogModes.NO );
}

function replaceContents (newFile) {  
var idPlc = charIDToTypeID( "Plc " ); 
var desc11 = new ActionDescriptor();  
var idnull = charIDToTypeID( "null" );
desc11.putPath( idnull, new File(newFile) );
var idFTcs = charIDToTypeID( "FTcs" ); 
var idQCSt = charIDToTypeID( "QCSt" );   
var idQcsa = charIDToTypeID( "Qcsa" ); 
desc11.putEnumerated( idFTcs, idQCSt, idQcsa );
var idOfst = charIDToTypeID( "Ofst" );     
var desc12 = new ActionDescriptor();     
var idHrzn = charIDToTypeID( "Hrzn" );    
var idPxl = charIDToTypeID( "#Pxl" );      
desc12.putUnitDouble( idHrzn, idPxl, 0.000000 );     
var idVrtc = charIDToTypeID( "Vrtc" );    
var idPxl = charIDToTypeID( "#Pxl" );    
desc12.putUnitDouble( idVrtc, idPxl, 0.000000 );
var idOfst = charIDToTypeID( "Ofst" );
desc11.putObject( idOfst, idOfst, desc12 );
executeAction( idPlc, desc11, DialogModes.NO );
}

function resize (){
    var startRulerUnits = app.preferences.rulerUnits;  
    app.preferences.rulerUnits = Units.PIXELS;  
    var bounds = activeDocument.activeLayer.bounds;  
    var height = bounds[3].value - bounds[1].value;
    var docHeight = activeDocument.height;
    var newSize = (100 / height) * docHeight*0.85;  
    activeDocument.activeLayer.resize(newSize, newSize, AnchorPosition.MIDDLECENTER);
    app.preferences.rulerUnits = startRulerUnits;  
}

function SaveForWeb(saveFile,jpegQuality) {  
var sfwOptions = new ExportOptionsSaveForWeb();   
   sfwOptions.format = SaveDocumentType.JPEG;   
   sfwOptions.includeProfile = false;   
   sfwOptions.interlaced = 0;   
   sfwOptions.optimized = true;   
   sfwOptions.quality = jpegQuality; //0-100   
activeDocument.exportDocument(saveFile, ExportType.SAVEFORWEB, sfwOptions);  
}  

function resizeTo800() {
     var startRulerUnits = app.preferences.rulerUnits;  
    app.preferences.rulerUnits = Units.PIXELS;  
    var docHeight = activeDocument.width;
    activeDocument.resizeImage (800) 
     app.preferences.rulerUnits = startRulerUnits;  
}
