let url =
  "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

d3.json(url).then(({ names }) => {
  names.forEach((name) => {
    d3.select("select").append("option").text(name);
  });
  optionChanged();
});

const optionChanged = () => {
  let choice = d3.select("select").node().value;

  d3.json(url).then(({ metadata, samples }) => {
    let meta = metadata.filter((obj) => obj.id == choice)[0];
    let sample = samples.filter((obj) => obj.id == choice)[0];

    d3.select(".panel-body").html("");

    Object.entries(meta).forEach(([key, val]) => {
      d3.select(".panel-body")
        .append("h4")
        .text(`${key.toUpperCase()}: ${val}`);
    });

    const{otu_ids, otu_labels, sample_values} = sample;

    var data = [
        {
          x: sample_values.slice(0, 10).reverse(),
          y: otu_ids.slice(0, 10).reverse().map(y => `OTU ${y}`),
          text: otu_labels.slice(0,10).reverse(),
          type: 'bar',
          orientation:"h"
        }
      ];
      
      Plotly.newPlot('bar', data); 
      
      var trace1 = {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: 'markers',
        marker: {
          size: sample_values,
          color: otu_ids,
          colorscale: "Earth"
        }
      };
      
      var data = [trace1];
      
      Plotly.newPlot('bubble', data);

      var data = [
        {
          domain: { x: [0, 1], y: [0, 1] },
          value: meta.wfreq,
          title: { text: "<b>Belly Button Washing Frequency</b> <br> Scrubs per week"},
          type: "indicator",
          mode: "gauge+number",
          delta: { reference: 400 },
          gauge: { axis: { range: [null, 9] } }
        }
      ];
      Plotly.newPlot('gauge', data);

  });
};

