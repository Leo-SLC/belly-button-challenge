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

    var data = [
        {
          x: ['giraffes', 'orangutans', 'monkeys'],
          y: [20, 14, 23],
          type: 'bar',
          orientation:"h"
        }
      ];
      
      Plotly.newPlot('bar', data);    

  });
};
