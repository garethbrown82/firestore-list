import * as React from 'react';

export class AddItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = { textboxText: "" }
        this.onChange = this.onChange.bind(this);
    }
    onChange = (event) => {
        event.preventDefault();
        this.setState({
            textboxText: event.target.value
        });
    }

    render() {
        return (
            <div className="mt-5">
                <h4>Add item</h4>
                <div className="form-group">
                    <input className="form-control"
                        type="text"
                        onChange={this.onChange}
                        value={ this.state.textboxText } />
                    <button className="btn btn-success mt-3" onClick={ () => this.props.addItem(this.state.textboxText)}>Add item</button>
                </div>
            </div>
        );
    };
}