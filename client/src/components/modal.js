import React from "react";

// The Modal component, which is displayed when a recipe card is clicked.
const Modal = ({ selectedCard, closeModal }) => {
  return (
    // Container for the modal, centers the modal content.
    <div style={{
      flex: "1",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}>
      {/* Modal content styling */}
      <div style={{
        border: "8px solid #1212128f",
        borderRadius: "4px",
        padding: "20px",
        backgroundColor: "rgb(28 28 28 / 91%)",
        maxWidth: "400px",
        display: 'flex',
        flexDirection: 'column',
        color: 'white'
      }}>
        {/* Modal header with the recipe title */}
        <div style={{
          backgroundColor: 'rgb(0 0 0 / 55%)',
          margin: '-20px',
          marginBottom: '20px'
        }}>
          <h2 style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            color: 'white'
          }}>
            {selectedCard.title}
          </h2>
        </div>
        
        {/* Author display with a "by" prefix */}
        <p style={{marginTop: "-12px", marginBottom: "-20px"}}>by</p>
        <h4 style={{color: '#e3e38f'}}>{selectedCard.authors}</h4>
        
        {/* Ingredients displayed with a specific color */}
        <p style={{color: 'rgb(211 119 119)'}}>{selectedCard.ingredients}</p>
        
        {/* Description of the recipe */}
        <p style={{ whiteSpace: "pre-line" }}>{selectedCard.description}</p>
        
        {/* Close button for the modal */}
        <button 
          onClick={closeModal}
          style={{
            fontSize: '25px',
            fontWeight: '700',
            width: '30px',
            height: '30px',
            position: 'absolute',
            alignSelf: 'end',
            color: '#8d437a',
            border: 'none',
            backgroundColor: 'rgb(255 255 255 / 4%)',
            marginTop: '-19px',
            marginRight: '-19px'
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Modal;
