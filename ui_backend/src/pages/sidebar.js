import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Divider from "@material-ui/core/Divider";
import {Link} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        textAlign: 'right'
    },
    parent:{
      textAlign:'right'
    },
    nested: {
        paddingLeft: theme.spacing(4),
        textAlign: 'right'
    },
}));

export default function NestedList() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <div style={{ width: '300px'}}>
            <div style={{ width: '100%', padding: '20px', margin: '20px'}}>
                <Link to='/orders'>سفارشات</Link>
            </div>
            <div style={{ width: '100%', padding: '20px', margin: '20px'}}>
            <Link to='/products'>محصولات</Link>
            </div>
            <div style={{ width: '100%', padding: '20px', margin: '20px'}}>
            <Link to='/products/brands'>برندها</Link>
            </div>
            <div style={{ width: '100%', padding: '20px', margin: '20px'}}>
                <Link to='/products/attributes'>ویژگی ها</Link>
            </div>
            <div style={{ width: '100%', padding: '20px', margin: '20px'}}>
            <Link to='/products/categories'>دسته بندی محصولات</Link>
                <div style={{ width: '100%', padding: '20px', margin: '20px'}}>
                    <Link to='/users'>کاربران</Link>
                </div>
                <div style={{ width: '100%', padding: '20px', margin: '20px'}}>
                    <Link to='/users/access/control/list'>سطح دسترسی</Link>
                </div>
            </div>
        </div>
    );
}
