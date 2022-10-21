import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
import StorageUtil from '../../utils/storageUtil';
class Logout extends Component {
    componentDidMount() {
        StorageUtil.removeUser()
        let shadesEl = document.querySelector('.profilePanel');
        if (shadesEl) {
            shadesEl.classList.remove('show');
        }
        this.props.onLogout();
    }

    render() {
        console.log('[ i am logout ]');
        return <Redirect to="/" />;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout())
    };
};

export default connect(null, mapDispatchToProps)(Logout);