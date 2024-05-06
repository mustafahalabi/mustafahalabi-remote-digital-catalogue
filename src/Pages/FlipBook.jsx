import React, { useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import './styles.css';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import pdf from './catalogue-01.pdf';
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
      <div
        className=" h-screen flex flex-col justify-start items-center scroll-mx-2 overflow-hidden"
        style={{
          backgroundImage:
            "url('https://mr-green-usa.s3.us-east-1.amazonaws.com/caglar-oskay-jjb8hu_6kme-unsplash05-03-2024:17:05:52.jpg')",
          objectPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className=" py-9 sm:py-20 text-center space-y-2">
          <h1 className="text-3xl sm:text-5xl font-semibold text-amber-500">
            Remote Digital Catalogue
          </h1>
          <p className="text-lg sm:text-2xl font-semibold text-gray-50">
            Swipe / Click on the corners to flip the pages
          </p>
        </div>

        <HTMLFlipBook
          showCover={true}
          drawShadow={true}
          showPageCorners
          maxShadowOpacity={0.2}
          swipeDistance={100}
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
