import React from "react";
import ReactExport from "react-data-export";
import {Tooltip} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import ImportExportIcon from '@material-ui/icons/ImportExport';
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

class ExcelDownload extends React.Component {
    render() {
        const data = [];
        if (this.props.data) {

            this.props.data.map((item, key) => {
                data[key] = {
                    'id' : item.id,
                    'user_name': item.user.name,
                    'user_mobile': item.user.mobile,
                    'tax': item.tax,
                    'pure_price': item.pure_price,
                    'total_price': item.total_price,
                    'post_cost': item.post_cost,
                    'status': item.order_status.value,
                    'discount': item.discount
                };
            });
        }

        return (
            <ExcelFile element={<Tooltip title="خروجی اکسل">
                <IconButton>
                    <ImportExportIcon />
                </IconButton>
            </Tooltip>}>
                <ExcelSheet data={data} name="orders">
                    <ExcelColumn  label="شماره سفارش" value="id"/>
                    <ExcelColumn  label="کاربر" value="user_name"/>
                    <ExcelColumn  label="موبایل" value="user_mobile"/>
                    <ExcelColumn  label="مالیات" value="tax"/>
                    <ExcelColumn  label="تخفیف" value="discount"/>
                    <ExcelColumn  label="هزینه پستی" value="post_cost"/>
                    <ExcelColumn  label="قیمت خالص" value="pure_price"/>
                    <ExcelColumn  label="قیمت کل" value="total_price"/>
                    <ExcelColumn  label="وضعیت" value="status"/>
                </ExcelSheet>
            </ExcelFile>
        );
    }
}

export default ExcelDownload;
