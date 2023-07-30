import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

class CircularIndeterminateClass extends Component {
    state = {
        show: false,
        activeApiCount: 0,
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Backdrop open={true} style={{ zIndex: 9998 }} />
                <CircularProgress
                    open={true}
                    className={classes.progress}
                    style={{ zIndex: 9999, position: 'fixed', top: '50%', left: '50%' }}
                />
            </div>
        );
    }
}

const styles = theme => ({
    progress: {
        margin: theme.spacing(2),
        color: '#304e77',
    },
});

CircularIndeterminateClass.propTypes = {
    classes: PropTypes.object.isRequired,
};

let Spinner = withStyles(styles)(CircularIndeterminateClass);

export default Spinner;