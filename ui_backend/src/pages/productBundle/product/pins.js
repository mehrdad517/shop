import React, {Component} from 'react';
import Container from "@material-ui/core/Container";
import {Box} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import NavigationIcon from "@material-ui/icons/Navigation";
import Api from "../../../api";
import CircularProgress from "@material-ui/core/CircularProgress";
import {Link} from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Add from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

class ProductPins extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            row: 1,
            attributes: []
        };

        this.api = new Api();
    }

    componentDidMount() {
        this.handleRequest();
    }

    async handleRequest() {
        new Promise(resolve => {
            resolve(this.api.getProductAttributesPins(1).then((response) => {
                this.setState({
                    attributes: response
                });
            }).catch((error) => {
                console.log(error);
            }));
        });

        new Promise(resolve => {
            resolve(this.setState({
                loading: true,
            }))
        })

    }

    createTable = () => {
        let table = [];
        // Outer loop to create parent
        for (let i = 0; i < this.state.row; i++) {
            table.push(<tr>{children}</tr>)
        }
        return table
    }

    render() {
        console.log(this.state);
        if (!this.state.loading) {
            return (<CircularProgress color={"secondary"} />);
        }
        return (
            <div className='content'>
                <Container>
                    <Box style={{ margin: '10px 0 20px 0'}}>
                        <Grid container alignItems="center">
                            <Grid item xs={12} sm={6}>
                                <h2>تغییر و ویرایش محصول</h2>
                                <p style={{ color: '#8e8e8e'}}>موجودی قیمت تخفیف و ... را مشخص کنید.</p>
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
                                    <Link to='/products'>
                                        <Button variant="contained" color="default" >
                                            <NavigationIcon />
                                        </Button>
                                    </Link>
                                </div>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
                <Box boxShadow={2} style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '7px', minHeight: '200px'}} boxShadow={0}>
                    <table className='table-duplicate-row fadeIn'>
                        <thead>
                        <tr>
                            {this.state.attributes.map((attr, index)  => {
                                return(
                                    <th width='15%'>{attr.title}</th>
                                );
                            })}
                            <th>قیمت</th>
                            <th>موجودی</th>
                            <th>تخفیف</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        { this.state.row.map((r, index) => {
                            return(
                                <tr>
                                    {this.state.attributes.map((attr, key) => {
                                            return (
                                                <td>
                                                    <TextField key={key} value={0} select fullWidth={true} margin={"normal"}>
                                                        <MenuItem key={0} value={0}>انتخاب</MenuItem>
                                                        {attr.children.map((child, k) => {
                                                                return (
                                                                    <MenuItem key={k + 1} value={child.id}>{child.value}</MenuItem>
                                                                )
                                                            }
                                                        )};
                                                    </TextField>
                                                </td>
                                            )
                                        }
                                    )}
                                    <td><TextField name={`price[${index}]`} /></td>
                                    <td><TextField name={`count[${index}]`} /></td>
                                    <td><TextField name={`discount[${index}]`} /></td>
                                    <td></td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </Box>
            </div>
        );
    }
}

export default ProductPins;
