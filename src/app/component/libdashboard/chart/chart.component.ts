import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppConfig } from 'src/app/model/appconfig';
import { AppConfigService } from 'src/app/service/app-config.service';
import { AvailableBooksService } from 'src/app/service/availablebooks.service';
import { AvailableVideosService } from 'src/app/service/availablevideos.service';
import { BookService } from 'src/app/service/book.service';
import { VideoService } from 'src/app/service/video.service';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnDestroy {
  type: string;
  chartData: any;
  stackedData: any;
  chartOptions: any;
  stackedOptions: any;
  numBooks: number;
  numVideos: number;
  numAvailableBooks: number;
  numAvailableVideos: number;
  numPatrons: number;
  numBookRequests: number;
  totalFees: number;
  reservedRooms: number;
  numEvents: number;
  config: AppConfig;
  subscription: Subscription;
  multiAxisData: any;
  multiAxisOptions: any;
  horizontalOptions: any;
  basicOptions: any;

  constructor(private configService: AppConfigService, private bookService: BookService,private videoService: VideoService,private availableVideosService: AvailableVideosService,private availableBooksService: AvailableBooksService) { }
  

  ngOnInit(): void {
    this.bookService.fetchAllBooks().subscribe({
      next: (data)=>{
        this.numBooks = data.length;
        this.videoService.fetchVideos().subscribe({
          next: (data)=>{
            this.numVideos = data.length;
            this.chartData = {
              labels: ['Books', 'Videos'],
              datasets: [
                  {
                      data: [this.numBooks, this.numVideos],
                      backgroundColor: [
                        "#42A5F5",
                        "#66BB6A",
                    ],
                    hoverBackgroundColor: [
                        "#64B5F6",
                        "#81C784",
                    ]
                  }
              ]
          };
          this.chartOptions = {
            title: {
                display: true,
                text: 'Collections',
                fontSize: 16
            },
            legend: {
                position: 'bottom'
            }
        };
        this.config = this.configService.config;
          this.updateChartOptions();
          this.subscription = this.configService.configUpdate$.subscribe(config => {
              this.config = config;
              this.updateChartOptions();
          });
          }
    
        });
        
      }

    });
    this.bookService.fetchAllBooks().subscribe({
      next: (data)=>{
        this.numBooks = data.length;
        this.videoService.fetchVideos().subscribe({
          next: (data)=>{
            this.numVideos = data.length;
            this.availableVideosService.fetchAvailableVideos().subscribe({
              next: (data)=>{
                this.numAvailableVideos = data.length;
                this.availableBooksService.fetchAvailableBooks().subscribe({
                  next: (data)=>{
                    this.numAvailableBooks = data.length;
                    this.numAvailableBooks = (this.numBooks-this.numAvailableBooks);
                    this.numAvailableVideos =(this.numVideos-this.numAvailableVideos);
                    console.log(this.numAvailableBooks);
                    this.stackedData = {
                      labels: ['Books', 'Videos', 'Rooms'],
                      datasets: [{
                          type: 'bar',
                          label: 'Total',
                          backgroundColor: '#42A5F5',
                          data: [
                            this.numBooks,
                            this.numVideos
                          ]
                      }, {
                          type: 'bar',
                          label: 'Checked Out',
                          backgroundColor: '#66BB6A',
                          data: [
                            this.numAvailableBooks,
                            this.numAvailableVideos
                          ]
                      },]
                  };
          
                  this.stackedOptions = {
                      tooltips: {
                          mode: 'index',
                          intersect: false
                      },
                      responsive: true,
                      scales: {
                          xAxes: [{
                              stacked: true,
                          }],
                          yAxes: [{
                              stacked: true
                          }]
                      }
                  };
          
                  this.config = this.configService.config;
                  this.updateChartOptions();
                  this.subscription = this.configService.configUpdate$.subscribe(config => {
                      this.config = config;
                      this.updateChartOptions();
                  });
                  }
            
                });
              }
        
            });
            
          }
    
        });
        
      }

    });
    
  }
  updateChartOptions() {
    if (this.config.dark)
        this.applyDarkTheme();
    else
        this.applyLightTheme();
}

applyDarkTheme() {
    this.basicOptions = {
        plugins: {
            legend: {
                labels: {
                    color: '#ebedef'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#ebedef'
                },
                grid: {
                    color: 'rgba(255,255,255,0.2)'
                }
            },
            y: {
                ticks: {
                    color: '#ebedef'
                },
                grid: {
                    color: 'rgba(255,255,255,0.2)'
                }
            }
        }
    };

    this.horizontalOptions = {
        indexAxis: 'y',
        plugins: {
            legend: {
                labels: {
                    color: '#ebedef'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#ebedef'
                },
                grid: {
                    color: 'rgba(255,255,255,0.2)'
                }
            },
            y: {
                ticks: {
                    color: '#ebedef'
                },
                grid: {
                    color: 'rgba(255,255,255,0.2)'
                }
            }
        }
    };

    this.multiAxisOptions = {
        plugins: {
            legend: {
                labels: {
                    color: '#ebedef'
                }
            },
            tooltips: {
                mode: 'index',
                intersect: true
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#ebedef'
                },
                grid: {
                    color: 'rgba(255,255,255,0.2)'
                }
            },
            y: {
                type: 'linear',
                display: true,
                position: 'left',
                ticks: {
                    min: 0,
                    max: 100,
                    color: '#ebedef'
                },
                grid: {
                    color: 'rgba(255,255,255,0.2)'
                }
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                grid: {
                    drawOnChartArea: false,
                    color: 'rgba(255,255,255,0.2)'
                },
                ticks: {
                    min: 0,
                    max: 100,
                    color: '#ebedef'
                }
            }
        }
    };

    this.stackedOptions = {
        plugins: {
            legend: {
                labels: {
                    color: '#ebedef'
                }
            },
            tooltips: {
                mode: 'index',
                intersect: false
            }
        },
        scales: {
            x: {
                stacked: true,
                ticks: {
                    color: '#ebedef'
                },
                grid: {
                    color: 'rgba(255,255,255,0.2)'
                }
            },
            y: {
                stacked: true,
                ticks: {
                    color: '#ebedef'
                },
                grid: {
                    color: 'rgba(255,255,255,0.2)'
                }
            }
        }
    };
}

applyLightTheme() {
    this.basicOptions = {
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            },
            y: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            }
        }
    };

    this.horizontalOptions = {
        indexAxis: 'y',
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            },
            y: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            }
        }
    };

    this.multiAxisOptions = {
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            },
            tooltips: {
                mode: 'index',
                intersect: true
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            },
            y: {
                type: 'linear',
                display: true,
                position: 'left',
                ticks: {
                    min: 0,
                    max: 100,
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                grid: {
                    drawOnChartArea: false,
                    color: '#ebedef'
                },
                ticks: {
                    min: 0,
                    max: 100,
                    color: '#495057'
                }
            }
        }
    };

    this.stackedOptions = {
        plugins: {
            tooltips: {
                mode: 'index',
                intersect: false
            },
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        },
        scales: {
            x: {
                stacked: true,
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            },
            y: {
                stacked: true,
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            }
        }
    };
}
ngOnDestroy() {
  if (this.subscription) {
      this.subscription.unsubscribe();
  }
}
}
