// Shared Chart.js configuration and utilities for mapahalasu

// Color palette for different sensors (used in charts)
const sensorColors = [
    '#a18ffa', '#ff6b6b', '#4ecdc4', '#45b7d1',
    '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7', '#2ecc71'
];

// Map noise level to color (used in map markers and legends)
function getColor(noiseValue) {
    return noiseValue > 65 ? '#ff0000' :
        noiseValue > 60 ? '#ff2600' :
            noiseValue > 55 ? '#FF552B' :
                noiseValue > 50 ? '#DF8A09' :
                    noiseValue > 45 ? '#BF9E00' :
                        '#9F9F00';
}

// Format measurement window in human-readable form
function formatWindow(seconds) {
    if (seconds >= 60) return Math.round(seconds / 60) + ' min';
    return seconds + ' s';
}

// Default dataset style for Chart.js line charts
function defaultDatasetStyle(color, overrides = {}) {
    return Object.assign({
        borderColor: color,
        backgroundColor: color + '33',
        borderWidth: 2,
        fill: false,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 4,
        pointHoverBackgroundColor: color,
        pointHitRadius: 8
    }, overrides);
}

// Default Chart.js options for noise charts
function defaultChartOptions(overrides = {}) {
    const base = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                mode: 'index',
                intersect: false
            },
            legend: {
                display: true,
                position: 'top'
            }
        },
        interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false
        }
    };
    // Deep merge scales and plugins if provided
    if (overrides.scales) {
        base.scales = Object.assign(base.scales || {}, overrides.scales);
        delete overrides.scales;
    }
    if (overrides.plugins) {
        base.plugins = Object.assign(base.plugins, overrides.plugins);
        delete overrides.plugins;
    }
    return Object.assign(base, overrides);
}

// Filter data by time range (hours back from now)
function filterDataByTimeRange(data, hoursBack) {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const cutoffTimestamp = currentTimestamp - (hoursBack * 3600);
    return data.filter(reading => reading.timestamp >= cutoffTimestamp);
}

// Group array of readings by sensor ID, sorted by timestamp
function groupDataBySensor(data) {
    const grouped = {};
    data.forEach(reading => {
        if (!grouped[reading.id]) {
            grouped[reading.id] = [];
        }
        grouped[reading.id].push(reading);
    });
    Object.keys(grouped).forEach(sensorId => {
        grouped[sensorId].sort((a, b) => a.timestamp - b.timestamp);
    });
    return grouped;
}

// Group daily records by sensor ID, sorted by date
function groupDailyDataBySensor(data) {
    const grouped = {};
    data.forEach(record => {
        if (!grouped[record.sensor]) {
            grouped[record.sensor] = [];
        }
        grouped[record.sensor].push(record);
    });
    Object.keys(grouped).forEach(sensorId => {
        grouped[sensorId].sort((a, b) => a.date.localeCompare(b.date));
    });
    return grouped;
}
