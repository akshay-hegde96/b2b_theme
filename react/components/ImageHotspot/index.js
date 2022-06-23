import React,{useState} from 'react'
import ImageHotspots from 'react-image-hotspots'
import styles from "./image.css";
import { useProduct } from "vtex.product-context";

function index() {
  const productContextValue = useProduct();

    const [hotSpotText,setText] = useState("");
    const hotspotOne=()=>{

      setText("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s");
    }

    const hotspotTwo=()=>{
      setText("when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries");
    }

    const hotspotThree=()=>{
      setText("but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets");
    }

    const hotspotFour=()=>{
      setText("containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum");
    }


    const hotspots = [
        { x: 30, y: 20, content: <span onClick={hotspotOne} className={styles.hotSpot}>1</span> },
        { x: 50, y: 20, content: <span onClick={hotspotTwo} className={styles.hotSpot}>2</span> },
        { x: 20, y: 60, content: <span onClick={hotspotThree} className={styles.hotSpot}>3</span> },
        { x: 50, y: 40, content: <span onClick={hotspotFour} className={styles.hotSpot}>4</span> }
      ]
const urls = productContextValue?.product?.items?.map((products)=>products.images)
const url= urls[0].map((products)=>products.imageUrl);
// console.log("aaaaa",productContextValue?.product?.items)

// const [scale,setScale] = useState(1);
// const zoomIn = () => {
//  setScale(scale*2)
// }

// const zoomOut = () => {
//  setScale(scale/2)
// }
    return (
      <React.Fragment>
       <div  className={styles.imgHotspotContainer}>
         {/* <div style={{transform:`scale(${scale})`, overflow:'scroll'}}> */}
           <ImageHotspots
              src={url[0]}
              alt='Product Image'
              hideFullscreenControl={true}
              hideZoomControls={true}
              hotspots={hotspots}
              hideMinimap={true}
            />
         {/* </div> */}
         <div>
         {/* <button onClick={()=>zoomIn()}>Zoom in</button>
          <button onClick={()=>zoomOut()}>Zoom out</button> */}
         </div>
            {hotSpotText ?  <div className={styles.textContainer}>
            {hotSpotText}
            </div>
            :
          null
          }
 </div>

       </React.Fragment>
    )

}

export default index
