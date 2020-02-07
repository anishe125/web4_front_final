import React, {Component} from 'react';
import {FavoriteCityHeader} from "./FavoriteCityHeader";
import {CityInfo} from "../CityInfo";
import UpdateCity from "../../actions/UpdateCity"
import {connect} from "react-redux";
import AddCityToServer from "../../actions/AddCityToServer";
import DeleteCityFromServer from "../../actions/DeleteCityFromServer";
import UpdateCityOnServer from "../../actions/UpdateCityOnServer";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";


class FavoriteCity extends Component {

    constructor(props) {
        super(props);
        this.state = {error: false, download: !Boolean(props.cityInfo)};
        if (!props.cityInfo)
            props.add(props.name);

    }

    render() {
        let cityInfo = this.state.error
            ? <div className={"title-sm text-secondary ml-5"}>Ой...</div>
            : !this.state.download
                ? <CityInfo data={this.props.cityInfo}/>
                // eslint-disable-next-line react/jsx-no-undef
                : <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>;
        return <div>
            <div className={"d-flex flex-row align-items-center"}>
                <FavoriteCityHeader name={this.props.name} data={this.props.cityHeader} download={this.state.download} error={this.state.error}/>
                <div className={"ml-auto"}>
                    {/* eslint-disable-next-line react/jsx-no-undef */}
                    <Button className={"btn btn-circle btn-secondary"} onClick={this.props.delete.bind(null, this.props.name)}>X</Button>
                </div>
            </div>
            {cityInfo}
        </div>
    }

    static getDerivedStateFromProps(props, state) {
        return {error: Boolean(props.error), download: Boolean(props.download || !Boolean(props.cityInfo))}
    }
}

function mapDispatchToProps(dispatch) {
    return {
        add : (name) => {dispatch(AddCityToServer(name))},
        update: (name) => {dispatch(UpdateCity(name)); dispatch(UpdateCityOnServer(name))},
        delete: (name) => dispatch(DeleteCityFromServer(name))
    }
}

export default connect(null, mapDispatchToProps)(FavoriteCity)