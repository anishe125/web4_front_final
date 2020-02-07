import React, {Component} from 'react';
import {connect} from "react-redux";
import AddCity from "../../actions/AddCityToStore";
import Button from "react-bootstrap/Button";



class FavoriteHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {inputValue: ''};
    }

    render() {
        return <form className={"row"} onSubmit={(e) => {
            e.preventDefault();
            this.props.add(this.state.inputValue)
        }}>
            <div className="display-3 col-6">
                Избранное
            </div>
            <div className={"col d-flex"}>
                <input className={"form-control mt-auto"} placeholder={"Добавить новый город"} value={this.state.inputValue} onChange={(e) => {
                    this.setState({inputValue: e.target.value})
                }}/>
            </div>
            <div className={"mr-4 d-flex"}>
                {/* eslint-disable-next-line react/jsx-no-undef */}
                <Button type={"submit"} className={"btn btn-circle btn-secondary mt-auto"}>+</Button>
            </div>
        </form>
    }

}

function mapDispatchToProps(dispatch) {
    return {
        add: (name) => dispatch(AddCity(name))
    }
}

export default connect(null, mapDispatchToProps)(FavoriteHeader);