// button.js File 
import React from "react"; // Import React (Mandatory Step) 

// Create our Button component as a functional component. 
const Button = (props) => { 
	return ( 
	<input type="button" value={props.label} /> 
	); 
}; 
export default Button; // Export our button component
