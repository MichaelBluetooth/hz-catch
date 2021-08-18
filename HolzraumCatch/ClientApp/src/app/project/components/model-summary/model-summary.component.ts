import { Component, Input, OnChanges, OnInit } from "@angular/core";
import { Label } from "ng2-charts";
import { ChartType, ChartOptions } from "chart.js";
import { SummaryData } from "src/app/core/models/summary-data";

@Component({
  selector: "app-model-summary",
  templateUrl: "./model-summary.component.html",
  styleUrls: ["./model-summary.component.css"],
})
export class ModelSummaryComponent implements OnChanges {
  @Input() type: string;
  @Input() data: SummaryData[];

  showChart = false;
  colors: string[];

  ngOnChanges() {
    this.pieChartLabels = this.data ? this.data.map((d) => d.label) : [];
    this.pieChartData = this.data ? this.data.map((d) => d.count) : [];
    this.showChart = true;

    let colorsKey = `chart_${this.type}_colors`;
    this.colors = JSON.parse(localStorage.getItem(colorsKey));

    if (!this.colors || this.colors.length < this.pieChartData.length) {
      this.colors = this.getRandomColors(this.pieChartData.length);
      localStorage.setItem(
        `chart_${this.type}_colors`,
        JSON.stringify(this.colors)
      );
    }

    this.pieChartColors = [
      {
        backgroundColor: this.colors,
      },
    ];
  }

  // Pie
  public pieChartOptions: any = {
    responsive: true,
    legend: {
      position: "right",
    },
    // plugins: {
    //   datalabels: {
    //     formatter: (value, ctx) => {
    //       const label = ctx.chart.data.labels[ctx.dataIndex];
    //       return label;
    //     },
    //   },
    // }
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = "pie";
  public pieChartLegend = true;
  // public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: [
        "rgba(255,0,0,0.3)",
        "rgba(0,255,0,0.3)",
        "rgba(0,0,255,0.3)",
      ],
    },
  ];

  getRandomColors(number) {
    let colors = [];
    for (let i = 0; i < number; i++) {
      colors.push(this.getRandomColor());
    }
    return colors;
  }

  getRandomColor() {
    let letters = "0123456789ABCDEF".split("");
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
