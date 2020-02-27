import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import NavigationIcon from "@material-ui/icons/Navigation";
import {Box} from "@material-ui/core";

class TicketCategoryHead extends Component {
    render() {
        return (
            <Box style={{ margin: '10px 0 20px 0'}}>
                <Grid container alignItems="center">
                    <Grid item xs={12} sm={6}>
                        <h2>بخش بندی تیکت ها</h2>
                        <p style={{ color: '#8e8e8e'}}>در این صفحه میتوانید تیکت ها را بخش بندی کنید.</p>
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
                            <Link to='/tickets'>
                                <Button variant="contained" color="default" >
                                    <NavigationIcon />
                                </Button>
                            </Link>
                        </div>
                    </Grid>
                </Grid>
            </Box>
        );
    }
}

export default TicketCategoryHead;
