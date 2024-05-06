import React, { useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import './styles.css';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import pdf from './Catalogue.pdf';
import Loading from './Loading';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Pages = React.forwardRef((props, ref) => {
  return (
    <div className="demoPage" ref={ref}>
      <p>{props.children}</p>
      <p>Page number: {props.number}</p>
    </div>
  );
});

function FlipBook() {
  const [loading, setLoading] = useState(true);

  const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  return (
    <>
      {loading && <Loading loading={loading} />}
      <div className=" h-screen flex flex-col justify-center items-center scroll-mx-2 overflow-hidden">
        <h1 className="text-3xl sm:text-5xl font-semibold py-2 sm:py-12 text-gray-600">
          Remote Digital Catalogue
        </h1>
        <HTMLFlipBook
          showCover={true}
          drawShadow={true}
          flippingTime={600}
          showPageCorners
          maxShadowOpacity={0.2}
          height={600}
          width={400}
          maxHeight={900}
          minHeight={600}
          minWidth={400}
          maxWidth={600}
        >
          {[...Array(numPages).keys()].map((n) => (
            <Pages number={`${n + 1}`}>
              <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
                <Page
                  pageNumber={n + 1}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                  width={400}
                  className="border-3 border-black"
                />
              </Document>
            </Pages>
          ))}
        </HTMLFlipBook>
      </div>
    </>
  );
}

export default FlipBook;
