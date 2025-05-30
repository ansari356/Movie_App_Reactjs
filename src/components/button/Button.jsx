import React from 'react';
import PropTypes from 'prop-types';
// Import PropTypes for runtime type checking of props.
// Helps catch bugs by verifying prop types during development.
// Useful for ensuring passed props are correct.
// Acts as documentation for expected prop types.
// Not required for production but good for maintenance.
// Improves code quality and developer experience.
import './button.scss';

const Button = props => {
    return (
        <button
            className={`btn ${props.className}`}
            onClick={props.onClick ? () => props.onClick() : null}
        >
                    {props.children}
 
        </button>
             /*  Checks if an onClick function is passed as a prop.
             If yes, assigns it as the click event handler.
             If no, disables the click handler to avoid errors.
             This prevents runtime errors when clicking if no handler is given.
            Allows using the button with or without click functionality.
             Ensures safe and flexible component usage. */
        
            // Renders whatever JSX or text is passed inside the Button tags.
            // Supports any type of content: text, icons, or other components.
            // Makes the Button component reusable for different content.
            // props.children is a special React prop for nested elements.
            // Allows full control over the button’s visible content.
            // Keeps the component flexible and generic. */
    );
}

export const OutlineButton = props => {
    return (
        <Button
            className={`btn-outline ${props.className}`}
            onClick={props.onClick ? () => props.onClick() : null}
        >
            {props.children}
        </Button>
    );
}
// The OutlineButton is a custom React functional component that builds on top of another component called Button. Its purpose is to create a button with a special outline style, useful for distinguishing it visually from solid buttons.

// It takes in props, which may include:

// className: to add custom styling.

// onClick: a function to run when the button is clicked.

// children: any content inside the button (like text or icons).

// It adds a class called "btn-outline" to apply specific CSS styles for outline buttons.

// It checks if an onClick handler is provided. If yes, it wraps and passes it to the inner button.

// It displays whatever is passed inside the button using props.children.


Button.propTypes = {
    onClick: PropTypes.func
}

// Button.propTypes: This sets the expected prop types for the Button component.

// onClick: This specifies that if the onClick prop is provided, it must be a function.

// PropTypes.func: This is a PropTypes validator that checks if the value is a function.
export default Button;
