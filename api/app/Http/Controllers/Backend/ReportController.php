<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    public function salesReport(Request $request)
    {
        $report = DB::select('call sales_daily_report');

        return response($report);
    }

    public function mapReports()
    {
        $report = DB::select('call map_reports');

        return response($report);
    }
}
