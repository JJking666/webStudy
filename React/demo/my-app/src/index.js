import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class EssayForm extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      value:''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('提交的文章: ' + this.state.value);
    event.preventDefault();
  }
  render() {
    return (
      <form onSubmit={handleSubmit}>
        <label>
          文章是：
          <textarea onChange={this.handleChange} value={this.state.value}></textarea>
        </label>
        <input type="submit" value="提交"></input>
      </form>
    )
  }
}