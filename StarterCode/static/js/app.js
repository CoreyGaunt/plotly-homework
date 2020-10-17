function retrievePlot(id) {

    // getting data from json file
    d3.json("samples.json").then((data) => {
        console.log(data)

    var samples = data.samples.filter(d => d.id === id)[0];
        console.log(samples);

    var sample_values = samples.sample_values.slice(0,10).reverse();
        console.log(sample_values);
    
    var topValues = samples.otu_ids.slice(0,10).reverse();
        console.log(topValues);

    var otu_id = topValues.map(d => "OTU " + d)
        console.log(otu_id)
    
    var labels = samples.otu_labels.slice(0,10);

    // bar chart
    var trace = {
        x: sample_values,
        y: otu_id,
        text: labels,
        marker: {
            color: 'red'},
            type: "bar",
            orientation: "h"
        };

    var data = [trace];

    var layout = {
        title: "Top 10 OTUs Bar Chart",
        yaxis: {
            tickmode:"linear",
        },
        margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 30
        }
    };

    Plotly.newPlot("bar",data,layout);

    // bubble chart

    var trace2 = {
        x: samples.otu_ids,
        y: samples.sample_values,
        mode: "markers",
        marker: {
            size: samples.sample_values,
            color: samples.otu_ids
        },
        text: samples.otu_labels
    };

    var layout2 = {
        title:"Top 10 OTUs Bubble Chart",
        xaxis:{title: "OTU ID"},
        height: 600,
        width: 1000
    };

    var data2 = [trace2];

    Plotly.newPlot("bubble",data2,layout2);
    });
}


function retrieveInfo(id) {
    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;
        console.log(metadata)
        var result = metadata.filter(d => d.id.toString() === id)[0];
        var info = d3.select('#sample-metadata');
        Object.entries(result).forEach((d) => {
            info.append("h6").text(d[0].toUpperCase() + ": " + d[1] + "\n");
        });
    });   
}


function optionChanged(id) {
    retrievePlot(id);
    retrieveInfo(id);
}

function init() {
    var dropDown = d3.select('#selDataset');
    d3.json("samples.json").then((data) => {
        console.log(data)
        data.names.forEach(d => {
            dropDown.append("option").text(d).property("value");
        });
        retrievePlot(data.names[0]);
        retrieveInfo(data.names[0]);
    });
}

init();