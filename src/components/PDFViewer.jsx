import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import styles from "../styles/s-components/pdfviewer.module.scss";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { useSwipeable } from "react-swipeable";


pdfjs.GlobalWorkerOptions.workerSrc = 
window.location.origin + "/pdf.worker.min.mjs";
  
export default function PDFViewer({
  startPage = 1,
  pageNumber,
  onPageChange,
  onUnitTestClick,
  units,
  toggleTheme,
  theme
}) {
  const [numPages, setNumPages] = useState(null);
  const onLoadSuccess = ({ numPages }) => setNumPages(numPages);
  const nextPage = () => onPageChange(Math.min(pageNumber + 1, numPages));
  const prevPage = () => onPageChange(Math.max(pageNumber - 1, 1));
  const currentUnit = units.find(u => pageNumber === u.startPage);
  const [scale, setScale] = useState(1.5);
  const zoomIn = () => setScale(s => Math.min(s + 0.2, 2));
  const zoomOut = () => setScale(s => Math.max(s - 0.2, 0.8));

  const handlers = useSwipeable({
  onSwipedLeft: () => nextPage(),
  onSwipedRight: () => prevPage(),
  preventDefaultTouchmoveEvent: true,
  trackMouse: true
});

  return (
    <div {...handlers} className={styles.viewerWrapper}>
      <div className={styles.viewerWrapper_all}> 
        <div className={styles.viewerWrapper_all_unit}>
          <button onClick={()=>{
             onPageChange(4)
          }}>Unit 1 (p.4)</button>
          <button onClick={()=>{
             onPageChange(11)
          }}>Unit 2 (p.11)</button>
          <button onClick={()=>{
             onPageChange(19)
          }}>Unit 3 (p.19)</button>
          <button onClick={()=>{
             onPageChange(29)
          }}>Unit 4 (p.29)</button>
          <button onClick={()=>{
             onPageChange(37)
          }}>Unit 5 (p.37)</button>
          <button onClick={()=>{
             onPageChange(46)
          }}>Unit 6 (p.46)</button>
          <button onClick={()=>{
             onPageChange(55)
          }}>Unit 7 (p.55)</button>
          <button onClick={()=>{
             onPageChange(63)
          }}>Unit 8 (p.63)</button>
          <button onClick={()=>{
             onPageChange(71)
          }}>Unit 9 (p.71)</button>
          <button onClick={()=>{
             onPageChange(79)
          }}>Unit 10 (p.79)</button>
          
        </div>
        <div className={styles.pdfContainer}>
        <Document file="/book.pdf" onLoadSuccess={onLoadSuccess}>
          <Page
            pageNumber={pageNumber}
              scale={scale}
          />
        </Document>

        {/* Кнопка появляется, если есть текущий юнит */}
        {currentUnit && pageNumber === currentUnit.startPage && (
          <div className={styles.overlay}>
            <button className={styles.unitTestBtn} onClick={() => onUnitTestClick(currentUnit.id)}>
              Перейти к тесту по теме: {currentUnit.title}
            </button>
          </div>
        )}
      </div>

      </div>
      <div className={styles.toolbar}>
  <button onClick={prevPage}>
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/></svg>
  </button>
  <span>{pageNumber} / {numPages || "--"}</span>
  <button onClick={nextPage}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/></svg></button>

  <button className={styles.plbar} onClick={zoomOut}>−</button>
  <button className={styles.plbar} onClick={zoomIn}>+</button>

    <button style={{fontSize:"24px"}} onClick={toggleTheme}>
          {theme === "light" ? "🌙" : "☀️"}
    </button>
</div>
    </div>
  );
}
