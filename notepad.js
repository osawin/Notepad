const e = React.createElement;

class TextBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: this.props.value,
		}
	}

  	handleChange(event) {
    	this.setState({value: event.target.value});
    	this.props.update(event.target.value);
  	}
  	
  	newNote(data)
  	{
  		this.setState({value: data});
  	}
  	  
	render() {
		return e('form',
			{
				method: "POST",
			},
			this.props.title,
			e('textarea',
				{value: this.state.value, onChange: () => this.handleChange(event)}
			)
		);
	}
}

class Btn extends React.Component {
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

class Master extends React.Component {

	constructor(props)
	{
		super(props);
		var list = Array(0).fill(null);
		list.push({name: "Untitled", text: ""});
		this.state = {
			notes: list,
			mode: "master",
			place: 0,
			newName: "Untitled",
			newText: "",
		}
		this.updateName = this.updateName.bind(this);
		this.updateText = this.updateText.bind(this);
	}
	
	create () {
		var list = this.state.notes;
		list.push({name: "Untitled", text: ""});
		var index = list.length-1;
		this.setState({mode: "editing", notes: list, place: index, newName: "Untitled", newText: ""});
	}
	
	updateName (name) {
		this.setState({newName: name});
	}
	
	updateText (text) {
		this.setState({newText: text})
	}
	
	save () {
		var list = this.state.notes;
		list[this.state.place].name = this.state.newName;
		list[this.state.place].text = this.state.newText;
		this.setState({mode:"master", notes:list})
	}
	
	remove () {
	 var list = this.state.notes;
	 var removed = list.splice(this.state.place,1);
	 this.setState({mode:"master", notes:list});
	}
	
	edit (index) {
		this.changeName.newNote(this.state.notes[index].name);
		this.changeText.newNote(this.state.notes[index].text);
		this.setState({
			mode:"editing",
			place:index,
			newName: this.state.notes[index].name,
			newText: this.state.notes[index].text,
		});
	}
	
	renderNew()
	{
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
		return e(TextBox,
			{
       			value: this.state.newName,
    			title: "Name",
	   			className: "name " + this.state.mode+" off",
	   			update: this.updateName,
	   			ref: changeName => {this.changeName = changeName},
			},
	   	);
	}
	
	renderText()
	{
		return e(TextBox,
			{
       			value: this.state.newText,
       			title: "Text",
	   			className: "text " + this.state.mode+" off",
	   			update: this.updateText,
	   			ref: changeText => {this.changeText = changeText},
			},
	   	);
	}
	
	render () {
		return e('div',
			{},
			e('div',
				{},
				this.renderSave(),
				this.renderRemove(),
				this.renderName(),
				this.renderText(),
			),
			e('div',
				{},
				this.renderNew(),
				e('div',
					{
						className: this.state.mode+" on",
					},
					"Existing Notes",
				),
				this.state.notes.map((item,index) => 
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
ReactDOM.render(e(Master), domContainer);