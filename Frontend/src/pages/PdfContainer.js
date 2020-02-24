import React from 'react';

export default (props) => {
  const bodyRef = React.createRef();
  const createPdf = () => props.createPdf(bodyRef.current);
  return (
    <section className="pdf-container">
    
      <section className="pdf-toolbar">
     
                     
      </section>
     
      <section className="pdf-body" ref={bodyRef}>
        {props.children}
      </section>
      <button className="btn-pdf" style={{display: "block", marginLeft:"auto",float : "left",clear:"left" ,backgroundColor: "#008CBA" , borderRadius:"0.25rem", overflow:"visible" , fontFamily:"inherit" ,  boxSizing:"border-box", fontWeight:"400" ,color:"white", border:"1px solid transparent", lineHeight:"1.5", height:"37.5px", width:"auto",}} onClick={createPdf}> Download Pdf </button>
    </section>
  )
}

