window.onload = function () {

    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title:{
            text: "Biểu Đồ Hiệu Suất Các Thiết Bị Chấn Đột Dập"
        },	
        axisY: {
            title: "Thời gian hoạt động",
            titleFontColor: "#4F81BC",
            lineColor: "#4F81BC",
            labelFontColor: "#4F81BC",
            tickColor: "#4F81BC"
        },
        axisY2: {
            title: "Thời gian dừng",
            titleFontColor: "#C0504E",
            lineColor: "#C0504E",
            labelFontColor: "#C0504E",
            tickColor: "#C0504E"
        },	
        toolTip: {
            shared: true
        },
        legend: {
            cursor:"pointer",
            itemclick: toggleDataSeries
        },
        data: [{
            type: "column",
            name: "Proven Oil Reserves (bn)",
            legendText: "Thời gian hoạt động",
            showInLegend: true, 
            color: "rgba(197, 112, 0,0.8)",
            dataPoints:[
                { label: "M01", y: 500.21 },
                { label: "M02", y: 302.25 },
                { label: "M03", y: 157.20 },
                { label: "M04", y: 148.77 },
                { label: "M05", y: 101.50 },
                { label: "M06", y: 97.8 },
                { label: "M07", y: 101.50 },
                { label: "M08", y: 201.50 },
                { label: "M09", y: 190.50 },
                { label: "M10", y: 300.50 },
                { label: "M11", y: 20.50 },
                { label: "M12", y: 787.50 },
                { label: "M13", y: 673.50 },
                { label: "M14", y: 111.50 },
                { label: "M15", y: 800.50 }
            ]
        },
        {
            type: "column",	
            name: "Oil Production (million/day)",
            legendText: "Thời gian dừng",
            axisYType: "secondary",
            showInLegend: true,
            color: "rgba(0, 204, 255,0.8)",
            dataPoints:[
                { label: "M01", y: 900.46 },
                { label: "M02", y: 80.27 },
                { label: "M03", y: 200.99 },
                { label: "M04", y: 400.45 },
                { label: "M05", y: 122.92 },
                { label: "M06", y: 390.1 },
                { label: "M07", y: 101.50 },
                { label: "M08", y: 321.50 },
                { label: "M09", y: 540.50 },
                { label: "M10", y: 821.50 },
                { label: "M11", y: 101.50 },
                { label: "M12", y: 647.50 },
                { label: "M13", y: 215.50 },
                { label: "M14", y: 416.50 },
                { label: "M15", y: 520.50 }
            ]
        }]
    });
    chart.render();
    
    function toggleDataSeries(e) {
        if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        }
        else {
            e.dataSeries.visible = true;
        }
        chart.render();
    }
    
    }