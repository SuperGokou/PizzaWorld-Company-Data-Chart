// DATASETS
// Global variable with 1198 pizza deliveries (deliveryData)
// Global variable with 200 customer feedbacks (feedbackData)

// Initialize visualization on page load
createVisualization();

function filterByArea(area, feedbackDat, deliveryDat) {
    if (area === "All" || area === "hide") {
        loadTable(feedbackDat, deliveryDat);
        renderBarChart(deliveryDat);
        return;
    }

    let filteredDeliveries = deliveryDat.filter(item => item.area === area);
    let filteredFeedback = feedbackDat.filter(fb =>
        filteredDeliveries.some(del => del.delivery_id === fb.delivery_id)
    );

    loadTable(filteredFeedback, filteredDeliveries);
    renderBarChart(filteredDeliveries);
}

function dataFiltering(area, orderType, deliveryDat, feedbackDat) {
    if (orderType === "All" || orderType === "hide") {
        filterByArea(area, feedbackDat, deliveryDat);
        return;
    }

    let typeKey = orderType.toLowerCase();
    let filteredDeliveries = deliveryDat.filter(item => item.order_type === typeKey);
    let filteredFeedback = feedbackDat.filter(fb =>
        filteredDeliveries.some(del => del.delivery_id === fb.delivery_id)
    );

    filterByArea(area, filteredFeedback, filteredDeliveries);
}

function loadTable(feedbackDat, deliveryDat) {
    let totalPizzas = deliveryDat.reduce((sum, item) => sum + item.count, 0);
    let totalDeliveryTime = deliveryDat.reduce((sum, item) => sum + item.delivery_time, 0);
    let avgTime = totalDeliveryTime / deliveryDat.length;
    let totalSales = deliveryDat.reduce((sum, item) => sum + item.price, 0);

    let lowCount = feedbackDat.filter(item => item.quality === 'low').length;
    let mediumCount = feedbackDat.filter(item => item.quality === 'medium').length;
    let highCount = feedbackDat.filter(item => item.quality === 'high').length;

    const tableEle = document.getElementById("tableData");
    let dataHtml = `<tr><td>Number of pizza deliveries</td><td>${deliveryDat.length}</td></tr>`;
    dataHtml += `<tr><td>Number of all delivered pizzas (count)</td><td>${totalPizzas}</td></tr>`;
    dataHtml += `<tr><td>Average delivery time</td><td>${avgTime.toFixed(2)} mins</td></tr>`;
    dataHtml += `<tr><td>Total sales in USD</td><td>${totalSales.toFixed(2)}</td></tr>`;
    dataHtml += `<tr><td>Number of all feedback entries</td><td>${feedbackDat.length}</td></tr>`;
    dataHtml += `<tr><td>Number of feedback entries per quality category</td><td>Low: ${lowCount} Medium: ${mediumCount} High: ${highCount}</td></tr>`;

    tableEle.innerHTML = dataHtml;
}

function createVisualization() {
    let areaSelectBox = document.getElementById("area-category");
    let areaValue = areaSelectBox.options[areaSelectBox.selectedIndex].value;

    let typeSelectBox = document.getElementById("order-type-category");
    let typeValue = typeSelectBox.options[typeSelectBox.selectedIndex].value;

    dataFiltering(areaValue, typeValue, deliveryData, feedbackData);
}
