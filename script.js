let activeApplicationsChart;
let applicationsTimeChart;
let genderChart;

function buildCharts() {
  Chart.defaults.font.family =
    "Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif";
  Chart.defaults.color = "#6b7280";

  // Stacked Bar
  const ctx1 = document.getElementById("activeApplicationsChart");
  activeApplicationsChart = new Chart(ctx1, {
    type: "bar",
    data: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Applications",
          data: [35, 28, 38, 32, 40, 45, 36],
          backgroundColor: "#6d28d9",
          borderRadius: 10,
          barThickness: 14,
          stack: "stack1",
        },
        {
          label: "Shortlisted",
          data: [20, 18, 24, 22, 26, 28, 24],
          backgroundColor: "#fbbf24",
          borderRadius: 10,
          barThickness: 14,
          stack: "stack1",
        },
        {
          label: "Rejected",
          data: [12, 14, 10, 12, 9, 11, 10],
          backgroundColor: "#fb6a4a",
          borderRadius: 10,
          barThickness: 14,
          stack: "stack1",
        },
        {
          label: "On Hold",
          data: [6, 8, 7, 5, 7, 6, 8],
          backgroundColor: "#cfd3e6",
          borderRadius: 10,
          barThickness: 14,
          stack: "stack1",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#111827",
          padding: 10,
          cornerRadius: 12,
        },
      },
      scales: {
        x: {
          stacked: true,
          grid: { display: false },
          ticks: { font: { size: 12 } },
        },
        y: {
          stacked: true,
          grid: { color: "rgba(17,24,39,0.06)" },
          ticks: {
            callback: function (value) {
              return value + "%";
            },
          },
          suggestedMax: 100,
        },
      },
    },
  });

  // Line Chart
  const ctx2 = document.getElementById("applicationsTimeChart");
  applicationsTimeChart = new Chart(ctx2, {
    type: "line",
    data: {
      labels: ["8 AM", "10 AM", "12 PM", "2 PM", "4 PM", "6 PM", "8 PM"],
      datasets: [
        {
          label: "Applications",
          data: [50, 60, 70, 92, 72, 66, 84],
          borderColor: "#fb6a4a",

          backgroundColor: (context) => {
            const chart = context.chart;
            const { ctx, chartArea } = chart;

            if (!chartArea) return "rgba(251,106,74,0.15)";

            const gradient = ctx.createLinearGradient(
              0,
              chartArea.top,
              0,
              chartArea.bottom,
            );

            gradient.addColorStop(0, "rgba(251,106,74,0.28)");
            gradient.addColorStop(0.6, "rgba(251,106,74,0.10)");
            gradient.addColorStop(1, "rgba(251,106,74,0.00)");

            return gradient;
          },

          fill: true,
          tension: 0.45,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: "#fb6a4a",
          pointBorderColor: "#ffffff",
          pointBorderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#111827",
          padding: 10,
          cornerRadius: 12,
        },
      },
      scales: {
        x: { grid: { display: false }, ticks: { font: { size: 12 } } },
        y: {
          grid: { color: "rgba(17,24,39,0.06)" },
          ticks: {
            callback: function (value) {
              return value + "%";
            },
          },
          suggestedMax: 100,
        },
      },
    },
  });

  // Doughnut
  const ctx3 = document.getElementById("genderChart");
  genderChart = new Chart(ctx3, {
    type: "doughnut",
    data: {
      labels: ["Male", "Female"],
      datasets: [
        {
          data: [62, 38],
          backgroundColor: ["#6d28d9", "#fb6a4a"],
          borderWidth: 0,
          hoverOffset: 8,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "80%",
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#111827",
          padding: 10,
          cornerRadius: 12,
        },
      },
    },
  });
}

window.addEventListener("load", () => {
  buildCharts();

  // Mini switches
  document.querySelectorAll(".mini-switch").forEach((sw) => {
    sw.addEventListener("click", () => sw.classList.toggle("on"));
  });

  // Sidebar active state
  document.querySelectorAll(".sidebar__nav .nav-item").forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelectorAll(".sidebar__nav .nav-item").forEach((x) => {
        x.classList.remove("active");
      });
      item.classList.add("active");
    });
  });
});

// Circle Progress Cards
const circles = document.querySelectorAll(".circle-progress");
circles.forEach((circle) => {
  const val = circle.getAttribute("data-value");
  const color = circle.getAttribute("data-color");
  circle.style.setProperty("--v", val);
  circle.style.setProperty("--p-color", color);
});


// Active Applications Legend Toggles

const legendWrap = document.getElementById("activeAppsLegend");

if (legendWrap) {
  legendWrap.querySelectorAll(".legend-pill").forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = Number(btn.dataset.dataset);

      const currentlyVisible = activeApplicationsChart.isDatasetVisible(index);
      activeApplicationsChart.setDatasetVisibility(index, !currentlyVisible);
      activeApplicationsChart.update();

      btn.classList.toggle("is-on", !currentlyVisible);
    });
  });
}
