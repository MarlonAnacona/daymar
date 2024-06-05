
import Chart from 'chart.js/auto';
import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services/services.service';
// core components
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public chart: any;
  public chart1: any;
  public chart2: any;
  long:number=0;
  latitude:number=0;

  days:any[]=[];
  daysSelecte:any;
  temperature:any[]=[];
  precipitation:any[]=[];
  humety:any[]=[]
  monthOptions:any[]=[];
  farmName: string ="";
  selectFarmOption:any;
  services:any[]=[];
  users:any[]=[]
  materials:any[]=[]
  process:any;
  serviciosgetAll:any;
  constructor(private service:ServicesService){

  }
  async ngOnInit() {
    this.service.refresacarToken()
    this.service.getallRegistryService().subscribe({next:(data)=>{
      this.serviciosgetAll=data;
     this.days=data.map(x=>x.client_name+' '+x.creation_date);
     this.services=data.map(x=>x.amount_service*x.service_unit_price);

      this.createChart()
    },error:(err)=>{}})


  this.service.getUsers().subscribe({next:(data)=>{
    this.users=data

  },error:(err)=>{}})


  this.service.getallRegistry().subscribe({next:(data)=>{
    this.materials=data.map((x:any)=>x.email);

    this.materials= data
  },error:(err)=>{}})


  this.service.getProccesService().subscribe({next:(data)=>{
    this.process=data.map((x:any)=>x.process_price);
  },error:(err)=>{}})



  }




  createChart() {
    var mode = 'light';
    var fonts = {
      base: 'Open Sans',
    };
    var colors = {
      gray: {
        100: '#f6f9fc',
        200: '#e9ecef',
        300: '#dee2e6',
        400: '#ced4da',
        500: '#adb5bd',
        600: '#8898aa',
        700: '#525f7f',
        800: '#32325d',
        900: '#212529',
      },
      theme: {
        default: '#172b4d',
        primary: '#228B22',
        secondary: '#f4f5f7',
        info: '#11cdef',
        success: '#2dce89',
        danger: '#f5365c',
        warning: '#fb6340',
      },
      black: '#12263F',
      white: '#FFFFFF',
      transparent: 'transparent',
    };
    const plugin = {
      id: 'customCanvasBackgroundColor',
      beforeDraw: (
        chart: { width?: any; height?: any; ctx?: any },
        args: any,
        options: { color: string }
      ) => {
        const { ctx } = chart;
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = options.color || '#172b4d';
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
      },
    };
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart('MyChart', {
      type: 'bar', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: [
          ...this.days
        ],
        datasets: [
          {
            label: 'Produccion ',

            data: [...this.services],

          },

        ],
      },

      options: {
        maintainAspectRatio: true,
        backgroundColor: 'red',

        font: {
          family: fonts.base,
          size: 13,
        },
        layout: {
          padding: 10,
        },
        elements: {
          point: {
            radius: 4,
            hitRadius: 20,

            backgroundColor: colors.theme['primary'],
          },
          line: {
            tension: 0.4,
            borderWidth: 4,
            borderColor: colors.theme['primary'],
            backgroundColor: colors.transparent,
            borderCapStyle: 'round',
          },
          arc: {
            backgroundColor: colors.theme['primary'],
            borderColor: mode == 'dark' ? colors.gray[800] : colors.white,
            borderWidth: 4,
          },
        },

        responsive: true,

        scales: {
          y: {
            offset: true,
            ticks: {
              color: 'white',
            },
            grid: {
              drawOnChartArea: false,
              tickLength: 10,
              tickWidth: 4,
              tickColor: 'yellow',
            },
          },

          x: {
            offset: true,
            ticks: {
              color: 'white',
            },
            grid: {
              tickColor: 'yellow',
              tickLength: 15,
              tickWidth: 3,
              drawOnChartArea: false,
            },
          },
        },
      },
      plugins: [plugin],
    });

    if (this.chart1) {
      this.chart1.destroy();
    }
    this.chart1 = new Chart('precipitacion', {
      type: 'line', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: [
          ...this.days
        ],
        datasets: [
          {
            label: 'precipitación %',

            data: [...this.precipitation],
          },
        ],
      },

      options: {
        maintainAspectRatio: true,
        backgroundColor: 'red',

        font: {
          family: fonts.base,
          size: 13,
        },
        layout: {
          padding: 10,
        },
        elements: {
          point: {
            radius: 4,
            hitRadius: 20,

            backgroundColor: colors.theme['primary'],
          },
          line: {
            tension: 0.4,
            borderWidth: 4,
            borderColor: colors.theme['primary'],
            backgroundColor: colors.transparent,
            borderCapStyle: 'round',
          },
          arc: {
            backgroundColor: colors.theme['primary'],
            borderColor: mode == 'dark' ? colors.gray[800] : colors.white,
            borderWidth: 4,
          },
        },

        responsive: true,

        scales: {
          y: {
            offset: true,
            ticks: {
              color: 'white',
            },
            grid: {
              drawOnChartArea: false,
              tickLength: 10,
              tickWidth: 4,
              tickColor: 'yellow',
            },
          },

          x: {
            offset: true,
            ticks: {
              color: 'white',
            },
            grid: {
              tickColor: 'yellow',
              tickLength: 15,
              tickWidth: 3,
              drawOnChartArea: false,
            },
          },
        },
      },
      plugins: [plugin],
    });

    if (this.chart2) {
      this.chart2.destroy();
    }
    this.chart2 = new Chart('humedad', {
      type: 'line', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: [
          ...this.days
        ],
        datasets: [
          {
            label: 'Humedad %',

            data: [...this.humety],
          },
        ],
      },

      options: {
        maintainAspectRatio: true,
        backgroundColor: 'red',

        font: {
          family: fonts.base,
          size: 13,
        },
        layout: {
          padding: 10,
        },
        elements: {
          point: {
            radius: 4,
            hitRadius: 20,

            backgroundColor: colors.theme['primary'],
          },
          line: {
            tension: 0.4,
            borderWidth: 4,
            borderColor: colors.theme['primary'],
            backgroundColor: colors.transparent,
            borderCapStyle: 'round',
          },
          arc: {
            backgroundColor: colors.theme['primary'],
            borderColor: mode == 'dark' ? colors.gray[800] : colors.white,
            borderWidth: 4,
          },
        },

        responsive: true,

        scales: {
          y: {
            offset: true,
            ticks: {
              color: 'white',
            },
            grid: {
              drawOnChartArea: false,
              tickLength: 10,
              tickWidth: 4,
              tickColor: 'yellow',
            },
          },

          x: {
            offset: true,
            ticks: {
              color: 'white',
            },
            grid: {
              tickColor: 'yellow',
              tickLength: 15,
              tickWidth: 3,
              drawOnChartArea: false,
            },
          },
        },
      },
      plugins: [plugin],
    });
  }









}
