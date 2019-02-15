class List extends React.Component {
  constructor(){
    super()
    this.changeHandler = this.changeHandler.bind(this);
    this.addItem = this.addItem.bind(this);
    this.validations = this.validations.bind(this);
  }

  state = {
    list : [],
    word : "",
    datetime: "", // moment().format('MMMM Do YYYY, h:mm:ss a');
    error : ""
  }

  changeHandler(event) {
    this.setState({word:event.target.value});
    console.log("event.target.value", event.target.value);
  }

  validations() {
    let words = this.state.word;
    let validity = true;
    let errors;

    if (!words) {
      validity = false;
      errors = "Cannot be empty";
    } 

    // if (typeof words !== "undefined") {
    //   var regex = /^[a-z]+$/i
    //   if (!words.match(regex)) {
    //     validity = false;
    //     errors = "Only Letters";
    //   }
    // }  

    if (words.length > 200) {
      validity = false;
      errors = "Must be less than 200 characters";
    }

    this.setState({error: errors});
    console.log(this.state.error)
    return validity;
  }

  addItem(item) {
    if (this.validations()) {
      this.setState({ list: [...this.state.list, item] });
      this.setState({ word: "" });
    } else {
      console.log(this.state.error);
    }
  }

  editItem(list, item, index) {
    if (this.validations()) {
      let newItem = this.state.list;
      newItem[index] = item
      this.setState({ list: newItem});
      this.setState({ word: "" })
    }
  }

  deleteItem() {
    
  }

  render() {
      // render the list with a map() here
      var mapper = this.state.list.map((item, index) => 
        <div key={index}>
          <li>{item}</li>
          <button onClick={() => {this.editItem(this.state.list, this.state.word, index);}}>Edit item</button>
        </div>
      );

      console.log("rendering");
      console.log(this.state.list)
      console.log(this.state.error)
      return (
        <div className="list">
          <input onChange={this.changeHandler} value={this.state.word}/>
          <button onClick={() => {this.addItem(this.state.word); }}>Add item</button>
          <span>{this.state.error}</span>
          {mapper}
        </div>
      );
  }
}

ReactDOM.render(
    <List/>,
    document.getElementById('root')
);

