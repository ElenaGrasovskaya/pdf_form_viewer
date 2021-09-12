import { useEffect, useRef } from "react";
import PageData from './pageInfo_R208.json';

export default function PdfViewerComponent(props) {
const containerRef = useRef(null);

console.log( 'Data loaded for page rendering', PageData);
/*setTimeout( () => { 
    documentDataLoaded = props.documentData;
}, 5000 ); 
while(!documentDataLoaded)
{
   console.log("STILL LOADING DATA" , documentDataLoaded);
}
let documentDataLoaded = [{
    'rect' : [50,50,20,20],
    'id' : "R243",
    'name' : "Date",

}];
console.log("Real data", documentDataLoaded[0].rect);*/

    

useEffect(() => {
	const container = containerRef.current;
	let instance, PSPDFKit;
	(async function() {
		PSPDFKit = await import("pspdfkit");
		instance = await PSPDFKit.load({
		// Container where PSPDFKit should be mounted.
		container,
		// The document to open.
		document: props.document,
		// Use the public directory URL as a base URL. PSPDFKit will download its library assets from here.
		baseUrl: `${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}`
		});

            const request = await fetch("./logo.jpg");
            const blob = await request.blob();
            const imageAttachmentId = await instance.createAttachment(blob);


        let annotationTopBlock = new PSPDFKit.Annotations.RectangleAnnotation({   //this is the top block for all pages, it covers the sign fron tge native library
            pageIndex: 0,
            boundingBox: new PSPDFKit.Geometry.Rect({
                left: 0,
                top: 0,
                width:  595,
                height:  100
            }),
            strokeWidth: 1,
            strokeColor: PSPDFKit.Color.WHITE,
            isEditable: false,
            fillColor: PSPDFKit.Color.WHITE
        });

        const annotationLogo = new PSPDFKit.Annotations.ImageAnnotation({
            pageIndex: 0,
            
            contentType: "image/jpeg",
            imageAttachmentId,
            description: "Example Image Annotation",
            boundingBox: new PSPDFKit.Geometry.Rect({
              left: 0,
              top: 0,
              width: 595,
              height: 90,
            }),
          });

        instance.create([annotationTopBlock, annotationLogo]);
        
        for(let i=0; i<PageData.annotations.length; i++) {


        const widget = new PSPDFKit.Annotations.WidgetAnnotation({
            id: PSPDFKit.generateInstantId(),
            pageIndex: 0,
            formFieldName: PageData.annotations[i].name,
            boundingBox: new PSPDFKit.Geometry.Rect({
                left: PageData.annotations[i].rect[0],
                top:  PageData.annotations[i].rect[1],
                width:  PageData.annotations[i].rect[2],
                height:  PageData.annotations[i].rect[3]
            }),
        });
        const formField = new PSPDFKit.FormFields.TextFormField({
            name:  PageData.annotations[i].name,
            annotationIds: new PSPDFKit.Immutable.List([widget.id]),
            value: '',
        });
        
        let annotation = new PSPDFKit.Annotations.RectangleAnnotation({
            pageIndex: 0,
            boundingBox: new PSPDFKit.Geometry.Rect({
                left: PageData.annotations[i].rect[0],
                top:  PageData.annotations[i].rect[1],
                width:  PageData.annotations[i].rect[2],
                height:  PageData.annotations[i].rect[3]
            }),
            strokeWidth: 1,
            strokeColor: PSPDFKit.Color.GREY,
            isEditable: false
        });
        const annotationText = new PSPDFKit.Annotations.TextAnnotation({
            pageIndex: 0,
            text: PageData.annotations[i].tooltipText,
            font: "Helvetica",
            isBold: false,
            horizontalAlign: "left",
            boundingBox: new PSPDFKit.Geometry.Rect({
                left: PageData.annotations[i].rect[0],
                top:  PageData.annotations[i].rect[1] - 20, //Moving field headings up so they dont cover the active field
                width:  PageData.annotations[i].rect[2],
                height:  PageData.annotations[i].rect[3]-10 //Reducing the block size to prevent the overlay with active field zone
                }),
            fontColor: PSPDFKit.Color.GREY,
            isEditable: false
          });
        

        instance.create([widget, formField, annotation, annotationText]);
    }

          
    

       /* const freetextAnnotation  = new PSPDFKit.TextAnnotation({
            boundingBox: new PSPDFKit.Geometry.Rect({ 
                left: PageData.annotations[i].rect[0],
                top:  PageData.annotations[i].rect[1] - 100,
                width:  PageData.annotations[i].rect[2],
                height:  PageData.annotations[i].rect[3], }),
            fontSize: 40,
            text: PageData.annotations[i].name,
            pageIndex: 0
        })*/

        
    
       /* for (let i=0; i< PageData.text.length; i++) {
            const textAnnotation  = new PSPDFKit.TextAnnotation({
            boundingBox: new PSPDFKit.Geometry.Rect({ 
                left: PageData.text[i].rect[0],
                top: PageData.text[i].rect[1],
                width: PageData.text[i].rect[2],
                height: PageData.text[i].rect[3] }),
            fontSize: 40,
            text: "Some Annotations",
            pageIndex: 0
        })*/

        

	})();

    return () => PSPDFKit && PSPDFKit.unload(container);
}, []);


return (
	<div ref={containerRef} style={{ width: "100%", height: "100vh"}}/>
);
}