export function status(key = null) {
    let status = [
        {'title' : 'در انتظار', 'color' : 'secondary'},
        {'title' : 'تایید شده', 'color' : 'primary'},
        {'title' : 'لغو شده', 'color' : 'secondary'},
        {'title' : 'مرجوعی', 'color' : 'secondary'},
        {'title' : 'تعدیلی', 'color' : 'primary'},
    ];

    if (key != null) {
        return status[key]
    } else {
        return status;
    }
}

export function transport(key = null) {
    let status = [
        {'title' : 'پیش فرض', 'color' : 'default'},
        {'title' : 'خروج از انبار', 'color': 'primary'},
        {'title' : 'در صف ارسال', 'color' : 'secondary'},
        {'title' : ' صف ارسال مجدد', 'color' : 'secondary'},
    ];

    if (key != null) {

        return status[key];
    } else {
        return status;
    }
}

export function delivery(key = null) {
    let status = [
        {'title' : 'پیش فرض', 'color' : 'default'},
        {'title' : 'تحویل مشتری', 'color': 'primary'},
        {'title' : 'تحویل پست', 'color' : 'secondary'},
        {'title' : 'بازگشت به انبار', 'color' : 'secondary'},
    ];

    if (key != null) {

        return status[key]

    } else {
        return status;
    }
}

export function items(key = null) {
    let status = [
        {'title' : 'پیش فرض', 'color' : 'primary'},
        {'title' : 'کسری کالا', 'color' : 'secondary'},
        {'title' : 'معیوبی کالا', 'color' : 'secondary'},
    ];

    if (key != null) {
        return status[key]
    } else {
        return status;
    }
}