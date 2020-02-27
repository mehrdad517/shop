import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import NavigationIcon from "@material-ui/icons/Navigation";
import {Box} from "@material-ui/core";

class ProductCategoryHead extends Component {
    render() {
        return (
            <Box style={{ margin: '10px 0 20px 0'}}>
                <Grid container alignItems="center">
                    <Grid item xs={12} sm={6}>
                        <h2>دسته بندی محصولات</h2>
                        <p style={{ color: '#8e8e8e'}}>در این صفحه میتوانید محصولات را دسته بندی کرده و ویژگی های گروهی را تعیین نمایید.</p>
                        <p style={{ color: '#ff152f'}}>دسته بندی را تا رسیدن به برند ادامه دهید.</p>
                        <p style={{ color: '#ff152f'}}>برای اخرین فرزند ویژگی ها, برندها همچنین پارامترهای قیمتی را مشخص کنید.</p>
                        <p style={{ color: '#ff152f'}}>در صورت انتخاب نکردن اخرین دسته بندی کلیه ویژگی های تعیین شده ارث بری میکنند.</p>
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
        );
    }
}

export default ProductCategoryHead;
