import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-chart',
  standalone: true,
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;

      this.createBarChart();
      this.createPieChart();
    });
  }

  createBarChart() {
    const ctx = document.getElementById('barChart') as HTMLCanvasElement;
    const productNames = this.products.map(product => product.name);
    const productStocks = this.products.map(product => product.stock);

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: productNames,
        datasets: [
          {
            label: 'Stock Quantity',
            data: productStocks,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  createPieChart() {
    const ctx = document.getElementById('pieChart') as HTMLCanvasElement;

    const priceRanges = {
      low: 0,
      medium: 0,
      high: 0
    };

    this.products.forEach(product => {
      if (product.price <= 50) {
        priceRanges.low++;
      } else if (product.price <= 100) {
        priceRanges.medium++;
      } else {
        priceRanges.high++;
      }
    });

    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Low ($0 - $50)', 'Medium ($50 - $100)', 'High ($100+)'],
        datasets: [
          {
            data: [priceRanges.low, priceRanges.medium, priceRanges.high],
            backgroundColor: [
              'rgba(75, 192, 192, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true, 
        maintainAspectRatio: false, 
      }
    });
  }
}
