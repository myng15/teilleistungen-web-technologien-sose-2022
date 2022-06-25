const $mainContainer = document.querySelector("#main-container");
const $diagramBtn = document.querySelector("#diagram-btn");
const $impressumBtn = document.querySelector("#impressum-btn");

class LoadDataService {
  async loadDataFromServer(){
    const modules = await fetch("http://localhost:3000/modules", { mode: "cors" })
                          .then((response) => response.json()) 
                          .then((modules) => {
                            return modules;
                          });
    const moduleGroups = await fetch("http://localhost:3000/module_groups", { mode: "cors" })
                              .then((response) => response.json()) 
                              .then((groups) => {
                                return groups;
                              });
    const data = {modules: modules, moduleGroups: moduleGroups};
    return data;
  }
}

const dataService = new LoadDataService();
class DiagramService {
  async makeChartData(){
    const data = await dataService.loadDataFromServer();
    const modules = await data.modules;
    const moduleGroups = await data.moduleGroups;
    
    const moduleGroupsObject = {};
    // Using plain for-loops instead of reduce/forEach etc. because of asynchronous data
    for (const group of moduleGroups) {
      moduleGroupsObject[group.acronym] = {title: group.title, modulesCount: 0};
    }
    for (const module of modules) {
      moduleGroupsObject[module.moduleGroup].modulesCount++;
    }
    
    const chartData = [];
    for (const group in moduleGroupsObject) { // for ... in for Objects (instead of for ... of)
      chartData.push({name: group, title: moduleGroupsObject[group].title, value: moduleGroupsObject[group].modulesCount});
    }
  
    return chartData;
  }

  async showDiagram(){
    $mainContainer.innerHTML = "";

    const chartData = await this.makeChartData();
    const width = 400, height = 400;
    const svg = d3.select('#main-container')
                  .append('svg')
                  .attr('width', width)
                  .attr('height', height);

    const radius = 200;
    const g = svg.append('g').attr('transform', `translate(${width/2}, ${height/2})`);

    const pie = await d3.pie().sort(null).value((d) => d.value);
    
    const path = d3.arc().outerRadius(radius).innerRadius(0);

    const label = d3.arc().outerRadius(radius).innerRadius(radius - 100);

    const pieArcs = await g.selectAll('.arc').data(pie(chartData)).enter().append('g').attr('class', 'arc');

    const groups = []
    for (const item of chartData) {
      groups.push(item.name);
    };
    const colors = d3.scaleOrdinal()
                    .domain(groups)
                    .range(['#e9d8a6', '#f4a261', '#e76f51', '#52b69a', '#a8dadc', '#9f86c0']);

    pieArcs.append('path').attr('d', path).attr('fill', (d) => colors(d));

    const tooltip = d3.select('#main-container').append("div")
                      .attr("id", "tooltip");
    
    pieArcs.append('text')
      .attr('transform', d => {
        return `translate(${label.centroid(d)})`;})
      .text((d) => d.data.name)
      .style("text-anchor", "middle")
      .style("font-size", 15);

    pieArcs.on("mouseover", this.handleMouseOver)
           .on("mouseout", () => {
              tooltip.style("display", "none");
    });
  }

  handleMouseOver(e, d) { //e: MouseEvent, d: chart data
    d3.select("#tooltip")
            .style("left", e.pageX + "px")
            .style("top", e.pageY + "px")
            .style("display", "block")
            .style("box-shadow", "3px 3px 10px rgba(0, 0, 0, 0.4)")
            .style("border-radius", "10px")
            .text("Modulgruppe " + d.data.name + ": " + d.data.title);
  }
}

const diagramService = new DiagramService();
window.onload = function() {
  diagramService.showDiagram();
}