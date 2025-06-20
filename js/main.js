

// DATASETS

// Global variable with 1198 pizza deliveries
// console.log(deliveryData);

// Global variable with 200 customer feedbacks
// console.log(feedbackData.length);


// FILTER DATA, THEN DISPLAY SUMMARY OF DATA & BAR CHART

createVisualization();

function matchFeedback(feedbackDat, deliveryDat){


}


function switchFunction(area, feedbackDat, deliveryDat){
    switch (area){
        case "All":
            loadTable(feedbackDat, deliveryDat);
            renderBarChart(deliveryDat);
            break;
        case "Boston":
            let areadeliveryData1 = deliveryDat.filter((value, index) => {
                return (value.area === "Boston");
            });
            let newfeedback1 = feedbackDat.filter(a => areadeliveryData1.some(b => b.delivery_id === a.delivery_id));
            loadTable(newfeedback1, areadeliveryData1);
            renderBarChart(areadeliveryData1);
            break;
        case "Cambridge":
            let areadeliveryData2 = deliveryDat.filter((value, index) => {
                return (value.area === "Cambridge");
            });
            let newfeedback2 = feedbackDat.filter(a => areadeliveryData2.some(b => b.delivery_id === a.delivery_id));

            loadTable(newfeedback2, areadeliveryData2);
            renderBarChart(areadeliveryData2);
            break;
        case "Somerville":
            let areadeliveryData3 = deliveryDat.filter((value, index) => {
                return (value.area === "Somerville");
            });
            let newfeedback3 = feedbackDat.filter(a => areadeliveryData3.some(b => b.delivery_id === a.delivery_id));
            loadTable(newfeedback3, areadeliveryData3);
            renderBarChart(areadeliveryData3);
            break;
    }
}
function dataFiltering(area, ordertype, deliveryDat, feedbackDat) {

    switch (ordertype){
        case "All":
            switchFunction(area, feedbackDat, deliveryDat)
            break;
        case "Web":
            let deliveryDatatype1 = deliveryDat.filter((value, index) => {
                return (value.order_type === "web");
            });

            let newfeedback1 = feedbackDat.filter(a => deliveryDatatype1.some(b => b.delivery_id === a.delivery_id));
            switchFunction(area, newfeedback1, deliveryDatatype1)
            break;
        case "Phone":
            let deliveryDatatype2 = deliveryDat.filter((value, index) => {
                return (value.order_type === "phone");
            });
            let newfeedback2 = feedbackDat.filter(a => deliveryDatatype2.some(b => b.delivery_id === a.delivery_id));
            switchFunction(area, newfeedback2, deliveryDatatype2)
            break;
        default:
            switchFunction(area, feedbackDat, deliveryDat)
            break;
    }
}
function loadTable(feedbackData, deliveryData){

    let feedbackDat = feedbackData;
    let deliveryDat = deliveryData;

    var count_pizza = 0;
    deliveryData.forEach(item =>{
        count_pizza += item.count
    });

    var sum_del_time = 0;
    deliveryData.forEach(item =>{
        sum_del_time += item.delivery_time
    });
    var ave_time = sum_del_time/Object.keys(deliveryDat).length;

    var sum_sales = 0;
    deliveryData.forEach(item =>{
        sum_sales += item.price
    });

    let low = feedbackDat.filter( (value, index) => {
        return (value.quality === 'low');
    });

    let medium = feedbackDat.filter( (value, index) => {
        return (value.quality === 'medium');
    });

    let high = feedbackDat.filter( (value, index) => {
        return (value.quality === 'high');
    });


    const tableEle = document.getElementById("tableData");
    let dataHtml = `<tr><td>Number of pizza deliveries</td><td>${Object.keys(deliveryDat).length}</td></tr>`
    dataHtml += `<tr><td>Number of all delivered pizzas (count)</td><td>${count_pizza}</td></tr>`
    dataHtml += `<tr><td>Average delivery time</td><td>${ave_time.toFixed(2)} mins</td></tr>`
    dataHtml += `<tr><td>Total sales in USD</td><td>${sum_sales.toFixed(2)}</td></tr>`
    dataHtml += `<tr><td>Number of all feedback entries</td><td>${Object.keys(feedbackDat).length}</td></tr>`
    dataHtml += `<tr><td>Number of feedback entries per quality category</td><td>Low: ${Object.keys(low).length} Medium: ${Object.keys(medium).length} High: ${Object.keys(high).length}</td></tr>`

    console.log(dataHtml)
    tableEle.innerHTML = dataHtml;


}
function createVisualization() {

    let areaselectBox = document.getElementById("area-category");
    let areaValue = areaselectBox.options[areaselectBox.selectedIndex].value;

    let typeselectBox = document.getElementById("order-type-category");
    let typeValue = typeselectBox.options[typeselectBox.selectedIndex].value;

    let feedbackDat = feedbackData;
    let deliveryDat = deliveryData;

    loadTable(feedbackDat, deliveryDat);
    renderBarChart(deliveryDat)

    dataFiltering(areaValue, typeValue, deliveryDat, feedbackDat)



    console.log(areaValue)
    console.log(typeValue)
}
