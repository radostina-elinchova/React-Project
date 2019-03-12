import React from 'react';

const innerState = {
	title: null,
	description: null,
	imageUrl: null

};

const handleChange = (event) => {
		
		innerState[event.target.name] = event.target.value;
}

const CreateForm = (props) => {
	

    return (
        <div className="create-form">
            <h1>Create game</h1>
            <form onSubmit={(event) => {
                // TODO: prevent the default behaviour of the click event, call the createGame function and pass it the data from the form
				event.preventDefault();
				props.createGame(innerState)
            }}>
                <label>Title</label>
                <input type="text" onChange={this.handleChange} name = "title" id="title"/>
                <label>Description</label>
                <textarea type="text" onChange={this.handleChange} name = "description" id="description"/>
                <label>ImageUrl</label>
                <input type="text" onChange={this.handleChange} name = "imageUrl" id="imageUrl"/>
                <input type="submit" value="Create"/>
            </form>
        </div>
    )
};

export default CreateForm;

