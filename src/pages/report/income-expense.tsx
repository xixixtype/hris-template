'use client';
import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CiWallet } from 'react-icons/ci';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { IoDocumentOutline } from 'react-icons/io5';
import ApexCharts, { ApexOptions } from 'apexcharts';
import { RiMoneyDollarBoxLine } from 'react-icons/ri';
import { Calendar as CalendarIcon } from 'lucide-react';
import { FaSearch, FaRegTrashAlt } from 'react-icons/fa';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { MdArrowForwardIos, MdDownload, MdOutlineDateRange } from 'react-icons/md';
import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

export default function IncomeExpense() {
  const [date, setDate] = React.useState<Date>();

  const reports = [
    {
      title: 'Report',
      icon: IoDocumentOutline,
      paragraf: 'Income vs Expense Summary',
      color: '#8231d3',
    },
    {
      title: 'Duration',
      icon: MdOutlineDateRange,
      paragraf: 'Dec-2023 to Jul-2023',
      color: '#6c757d',
    },
    {
      title: 'Total Income',
      icon: CiWallet,
      paragraf: '$13,500.00',
      color: '#8231d3',
    },
    {
      title: 'Total Expense',
      icon: RiMoneyDollarBoxLine,
      paragraf: '$117,530.00',
      color: '#6c757d',
    },
  ];

  const series = [
    {
      name: 'Total Orders',
      data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
    },
    {
      name: 'Total Sales',
      data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
    },
  ];

  const options: ApexOptions = {
    chart: {
      height: 350,
      type: 'bar',
      zoom: {
        enabled: true,
      },
      foreColor: '#5a75d7',
    },
    stroke: {
      curve: 'smooth',
    },
  };

  return (
    <div className="w-full">
      <div className="flex w-full justify-between pt-10 items-center">
        <div className="grid">
          <h1 className="font-semibold mb-3 text-xl">Manage Income Vs Expense</h1>
          <div className="flex items-center gap-3">
            <Link href="/">Dashboard</Link>
            <MdArrowForwardIos className="text-xs" />
            <h1>Manage Income Vs Expense Report</h1>
          </div>
        </div>
        <Button className="bg-purple-500 text-white px-2 w-9 h-9 rounded-md">
          <MdDownload />
        </Button>
      </div>

      <div className="my-10">
        <div className="grid grid-cols-3 items-end justify-end">
          <div className="grid">
            <h1>Start Month</h1>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  className={cn(
                    'w-[280px] border border-gray-500 bg-transparent hover:bg-transparent justify-start text-left font-normal',
                    !date && 'text-muted-foreground',
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid">
            <h1>End Month</h1>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  className={cn(
                    'w-[280px] border border-gray-500 bg-transparent hover:bg-transparent justify-start text-left font-normal',
                    !date && 'text-muted-foreground',
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex gap-2">
            <Button className="bg-purple-500 text-xs px-2 w-9 h-9 text-white rounded-md p-3 mx-0 text-center">
              <FaSearch />
            </Button>
            <Button className="bg-red-500 text-xs px-2 w-9 h-9 text-white rounded-md p-3 mx-0 text-center">
              <FaRegTrashAlt />
            </Button>
          </div>
        </div>
      </div>

      <ReactApexChart options={options} series={series} type="bar" height={350} />
    </div>
  );
}
