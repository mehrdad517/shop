import React, {Component} from 'react';
import './table.css';

class Table extends Component {


    render() {
        return (
            <div>
                <div style={{ backgroundColor: '#fff', marginBottom: '25px'}} className='header box-shadow'>
                    <div className='container'>
                        <div className='row display-flex'>
                            <div className='col-sm-10'>
                                <div className="dropdown rtl">
                                    <a className="dropdown-toggle" id="dropdownMenuButton"
                                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span className='fa fa-bars'></span>&nbsp;منوی پنل ادمین
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                                        <a className="dropdown-item" href="#">کاربران</a>
                                        <a className="dropdown-item" href="#">محصولات</a>
                                        <a className="dropdown-item" href="#">سفارشات</a>
                                    </div>
                                </div>
                            </div>
                            <div className='col-sm-2 text-right'>
                                <div className="dropdown rtl">
                                    <a className="dropdown-toggle" id="dropdownMenuButton"
                                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <img style={{ width: '32px', height: '32px', borderRadius: '50px'}} src="https://panel.bimic.ir/modules/admin/web/img/user.jpg"/>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                                        <a className="dropdown-item" href="#">کاربران</a>
                                        <a className="dropdown-item" href="#">محصولات</a>
                                        <a className="dropdown-item" href="#">سفارشات</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-xs-12 col-sm-6 col-md-6 col-lg-6'>
                            <h5>تراکنش ها</h5>
                            <p style={{ color: '#8e8e8e'}}>تمامی‌تراکنش‌های شما در این صفحه لیست‌شده اند</p>
                        </div>
                        <div className='col-xs-12 col-sm-6 col-md-6 col-lg-6'>
                            <button type="button" className="btn btn-dark box-shadow">بازگشت به پیشخوان</button>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-xs-12'>
                            <div className="search-box shadow-lg bg-white rounded">
                                <div className="search-box-body">
                                    <div className='row'>
                                        <div className='col-12'>
                                            <h5><span className="fa fa-search"></span>&nbsp;<span>جستجو در تراکنش ها</span></h5>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-12'>
                                            <form>
                                                <div className="form-row">
                                                    <div className="form-group col-md-6">
                                                        <label htmlFor="inputEmail4">Email</label>
                                                        <input type="email" className="form-control" id="inputEmail4"
                                                               placeholder="Email" />
                                                    </div>
                                                    <div className="form-group col-md-6">
                                                        <label htmlFor="inputPassword4">Password</label>
                                                        <input type="password" className="form-control" id="inputPassword4"
                                                               placeholder="Password" />
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group col-md-6">
                                                        <label htmlFor="inputCity">City</label>
                                                        <input type="text" className="form-control" id="inputCity" />
                                                    </div>
                                                    <div className="form-group col-md-2">
                                                        <label htmlFor="inputZip">Zip</label>
                                                        <input type="text" className="form-control" id="inputZip" />
                                                    </div>
                                                </div>
                                                <button type="submit" className="btn btn-success box-shadow">فیلتر نتایج</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='table-options'>
                        <div className='row'>
                            <div className='col-sm-2'>
                                <select className='form-control'>
                                    <option>10</option>
                                    <option>10</option>
                                    <option>10</option>
                                    <option>10</option>
                                    <option>10</option>
                                </select>
                            </div>
                            <div className='col-sm-4'></div>
                            <div className='col-sm-6  text-right'>
                                <button className='btn btn-light'><b className='fa fa-file-excel-o text-success'></b>&nbsp;خروجی اکسل</button>
                            </div>
                        </div>
                    </div>
                    <div className='row' style={{ marginBottom : '50px'}}>
                        <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                            <div className='table-responsive'>
                                <table className='table'>
                                    <thead>
                                    <tr>
                                        <th>#&nbsp;<span className='fa fa-sort'></span></th>
                                        <th>نام&nbsp;<span className='fa fa-sort'></span></th>
                                        <th>نام خانوادگی</th>
                                        <th>مبدا</th>
                                        <th>مقصد</th>
                                        <th>عملیات</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>#</td>
                                        <td>نام</td>
                                        <td>نام خانوادگی</td>
                                        <td>مبدا</td>
                                        <td>مقصد</td>
                                        <td>
                                            <button className='btn btn-outline-danger btn-sm'>ویرایش</button>
                                            <button className='btn btn-outline-primary btn-sm'>مشاهده</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>#</td>
                                        <td>نام</td>
                                        <td>نام خانوادگی</td>
                                        <td>مبدا</td>
                                        <td>مقصد</td>
                                        <td>
                                            <button className='btn btn-outline-danger btn-sm'>ویرایش</button>
                                            <button className='btn btn-outline-primary btn-sm'>مشاهده</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>#</td>
                                        <td>نام</td>
                                        <td>نام خانوادگی</td>
                                        <td>مبدا</td>
                                        <td>مقصد</td>
                                        <td>
                                            <button className='btn btn-outline-danger btn-sm'>ویرایش</button>
                                            <button className='btn btn-outline-primary btn-sm'>مشاهده</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>#</td>
                                        <td>نام</td>
                                        <td>نام خانوادگی</td>
                                        <td>مبدا</td>
                                        <td>مقصد</td>
                                        <td>
                                            <button className='btn btn-outline-danger btn-sm'>ویرایش</button>
                                            <button className='btn btn-outline-primary btn-sm'>مشاهده</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>#</td>
                                        <td>نام</td>
                                        <td>نام خانوادگی</td>
                                        <td>مبدا</td>
                                        <td>مقصد</td>
                                        <td>
                                            <button className='btn btn-outline-danger btn-sm'>ویرایش</button>
                                            <button className='btn btn-outline-primary btn-sm'>مشاهده</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>#</td>
                                        <td>نام</td>
                                        <td>نام خانوادگی</td>
                                        <td>مبدا</td>
                                        <td>مقصد</td>
                                        <td>
                                            <button className='btn btn-outline-danger btn-sm'>ویرایش</button>
                                            <button className='btn btn-outline-primary btn-sm'>مشاهده</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>#</td>
                                        <td>نام</td>
                                        <td>نام خانوادگی</td>
                                        <td>مبدا</td>
                                        <td>مقصد</td>
                                        <td>
                                            <button className='btn btn-outline-danger btn-sm'>ویرایش</button>
                                            <button className='btn btn-outline-primary btn-sm'>مشاهده</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>#</td>
                                        <td>نام</td>
                                        <td>نام خانوادگی</td>
                                        <td>مبدا</td>
                                        <td>مقصد</td>
                                        <td>
                                            <button className='btn btn-outline-danger btn-sm'>ویرایش</button>
                                            <button className='btn btn-outline-primary btn-sm'>مشاهده</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>#</td>
                                        <td>نام</td>
                                        <td>نام خانوادگی</td>
                                        <td>مبدا</td>
                                        <td>مقصد</td>
                                        <td>
                                            <button className='btn btn-outline-danger btn-sm'>ویرایش</button>
                                            <button className='btn btn-outline-primary btn-sm'>مشاهده</button>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div>
                                    <nav aria-label="...">
                                        <ul className="pagination">
                                            <li className="page-item"><a className="page-link" href="#">1</a></li>
                                            <li className="page-item active" aria-current="page">
                                                <a className="page-link" href="#">2 <span
                                                    className="sr-only">(current)</span></a>
                                            </li>
                                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Table;
