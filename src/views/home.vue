<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
    <va-card stripe stripe-color="secondary">
      <va-card-title>現在の時刻[日本標準時](Current time)</va-card-title>
      <va-card-content class="text-2xl text-center font-bold">
        {{ currentTime }}
      </va-card-content>
    </va-card>
    <va-card stripe stripe-color="primary">
      <va-card-title>総参加数(Total number of participants)</va-card-title>
      <va-card-content class="text-2xl text-center font-bold">
        0 人
      </va-card-content>
    </va-card>
    <va-card stripe stripe-color="success">
      <va-card-title>提出成功数(successful submissions)</va-card-title>
      <va-card-content class="text-2xl text-center font-bold">
        0 人
      </va-card-content>
    </va-card>
    <va-card stripe stripe-color="danger">
      <va-card-title>提出失敗数(submission failures)</va-card-title>
      <va-card-content class="text-2xl text-center font-bold">
        0 人
      </va-card-content>
    </va-card>
  </div>
  <div class="flex justify-between">
    <div class="w-1/2">
      <va-card stripe stripe-color="warning" class="mt-4">
        <va-card-title>提出状況(Submission status)</va-card-title>
        <va-card-content class="text-2xl text-center font-bold">
          <canvas ref="chart"></canvas>
        </va-card-content>
      </va-card>
    </div>
  </div>
</template>

<script lang="ts">
import Chart from 'chart.js/auto';
 
export default {
  data() {
    return {
      currentTime: new Date().toLocaleTimeString(),
      chartData: {
        labels: ['10/20', '10/21', '10/22'],
        datasets: [
          {
            label: '提出成功数',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            data: [12, 19, 3],
          },
          {
            label: '提出失敗数',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            data: [2, 3, 20],
          },
        ],
      },
    };
  },
  mounted() {
    setInterval(() => {
      this.currentTime = new Date().toLocaleTimeString();
    }, 1000);
    const ctx = this.$refs.chart.getContext('2d');
    ctx.canvas.height = 350;
    Chart.defaults.color = "#0BB48E";
    new Chart(ctx, {
      type: 'bar',
      data: this.chartData,
      options: {
        plugins:{
          legend:{
            labels:{
              font:{
                size: 13,
                family: 'Noto Sans JP Variable',
                style: 'normal',
              },
            },
          }
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  },
};
</script>