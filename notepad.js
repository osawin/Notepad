const e = React.createElement;

class TextBox extends React.Component {
	//this component is the text boxes
	//   where the name and content of the notes are entered
	constructor(props) {
		super(props);
		this.state = {
			value: this.props.value,
		}
	}

  	handleChange(event) {
  		//handles the user writing something
    	this.setState({value: event.target.value});
    	this.props.update(event.target.value);
  	}
  	
  	edit(data)
  	{
  		//how the master changes the data in this when a new note is loaded
  		this.setState({value: data});
  	}
  	  
	render() {
		return e('form',
			{
				method: "POST",
				className: this.props.className,
			},
			e ('div',
				{
					className: 'title',
				},
				this.props.title,
			),
			e('textarea',
				{value: this.state.value, onChange: (event) => this.handleChange(event), rows: this.props.rows}
			)
		);
	}
}

class Btn extends React.Component {
	//all of the buttons.
	render() {
		return e(
      		'button',
      		{
      			className: this.props.className,
      			onClick: () => this.props.onClick(),
      		},
       		this.props.value,
		);
	}	
}

class Notepad extends React.Component {

	constructor(props)
	{
		super(props);
		var list = Array(0).fill(null);
		list.push({name: "Untitled", text: ""});
		this.state = {
			notes: list,        //the list of notes
			mode: "master",     //'master' when looking over the list of notes, 'editing' when editing a specific note. Swapping sets the display css property to hide the unused elements
			place: 0,           //the note currently being edited
			newName: "Untitled",//the current name in the name text box
			newText: "",        //the current text in the content text box
		}
		var storage = localStorage.getItem('oliversawin.notepad.notes');
		if (storage)
		{
			storage = JSON.parse(storage);
			this.state.notes = storage;
		}
		this.updateName = this.updateName.bind(this);
		this.updateText = this.updateText.bind(this);
	}
	
	create () {
		//callback when a new note is made
		//adds a new note to the list, and set up the view to begin editing
		var list = this.state.notes;
		list.push({name: "Untitled", text: ""});
		var index = list.length-1;
		this.nameBox.edit("Untitled");
		this.textBox.edit("");
		this.setState({mode: "editing", notes: list, place: index, newName: "Untitled", newText: ""});
	}
	
	updateName (name) {
		//called by the name textbox when something is changed
		this.setState({newName: name});
	}
	
	updateText (text) {
		//called by the content textbox when something is changed
		this.setState({newText: text})
	}
	
	save () {
		//called by the save button
		//uses the newName and newText value to change the permanent value of the note being edited
		//returns the user to looking at the list
		var list = this.state.notes;
		list[this.state.place].name = this.state.newName;
		list[this.state.place].text = this.state.newText;
		this.setState({mode:"master", notes:list});
		localStorage.setItem('oliversawin.notepad.notes', JSON.stringify(this.state.notes));
	}
	
	remove () {
		//called by the delete button
		//removes the current note from the list of notes
		//returns the user to looking at the list
		var list = this.state.notes;
		var removed = list.splice(this.state.place,1);
		this.setState({mode:"master", notes:list});
	}
	
	edit (index) {
		//called by clicking on a note
		//sets up the textboxes and sets user in editing mode
		this.nameBox.edit(this.state.notes[index].name);
		this.textBox.edit(this.state.notes[index].text);
		this.setState({
			mode:"editing",
			place:index,
			newName: this.state.notes[index].name,
			newText: this.state.notes[index].text,
		});
	}
	
	renderNew()
	{
		//creates the create new note button
		return e(Btn,
			{
       			value: "new Note", 
	   			onClick: () => this.create(),
	   			className: "button " + this.state.mode+" on",
			},
	   	);
	}
	
	renderSave()
	{
		//creates the save button
		return e(Btn,
			{
       			value: "Save",
	   			onClick: () => this.save(),
	   			className: "button " + this.state.mode+" off",
			},
	   	);
	}
	
	renderRemove()
	{
		//creates the delete button
		return e(Btn,
			{
       			value: "Delete",
	   			onClick: () => this.remove(),
	   			className: "button " + this.state.mode+" off",
			},
	   	);
	}
	
	renderName()
	{
		//creates the name textbox
		return e(TextBox,
			{
       			value: this.state.newName,
    			title: "Name",
	   			className: "name " + this.state.mode+" off",
	   			update: this.updateName,
	   			ref: nameBox => {this.nameBox = nameBox},
	   			rows: 1,
			},
	   	);
	}
	
	renderText()
	{
		//creates the content textbox
		return e(TextBox,
			{
       			value: this.state.newText,
       			title: "Text",
	   			className: "text " + this.state.mode+" off",
	   			update: this.updateText,
	   			ref: textBox => {this.textBox = textBox},
	   			rows: 30,
			},
	   	);
	}
	
	render () {
		return e('div',
			{},
			e('div', //this div holds the editing note mode
				{},
				this.renderSave(),
				this.renderRemove(),
				this.renderName(),
				this.renderText(),
			),
			e('div', //this div holds the list of notes mode
				{},
				this.renderNew(),
				e('div',
					{
						className: this.state.mode+" on",
					},
					"Existing Notes",
				),
				this.state.notes.map((item,index) => //this creates a list of buttons, one for each note
					e(
						Btn,
						{
							key: index,
							className: "note "+this.state.mode+" on",
							value: item.name,
							onClick: () => this.edit(index)
						},
					)
				),
			),
		)
	}
}


const domContainer = document.querySelector('#root');
ReactDOM.render(e(Notepad), domContainer);