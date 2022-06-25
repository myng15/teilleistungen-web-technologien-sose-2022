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
  toggleBtn($diagramBtn, $impressumBtn);
  diagramService.showDiagram();
}

function toggleBtn(btnOff, btnOn) {
  // Turn on btnOff
  if (btnOff.classList.contains('btn-light')) {
    btnOff.classList.remove('btn-light');
    btnOff.classList.add('btn-warning');
  }
  // Turn off btnOn
  if (btnOn.classList.contains('btn-warning')){
    btnOn.classList.remove('btn-warning');
    btnOn.classList.add('btn-light');
  }
}

$diagramBtn.addEventListener('click', () => {
  toggleBtn($diagramBtn, $impressumBtn);
  diagramService.showDiagram();
})

$impressumBtn.addEventListener('click', () => {
  toggleBtn($impressumBtn, $diagramBtn);
  $mainContainer.innerHTML = ` 
    <section id="impressum" class="container">
      <h1>Impressum</h1>

      <h3>Herausgeber</h3>
      <p>My Nguyen</p>
      
      <h3>Kontakt</h3>
      <p>contact@uni-bamberg.com</p>
      
      <h3>Disclaimer</h3>
      <h5 class="text-secondary">Nach Vorlage der Universität Bamberg</h5>
      <p>Die Zusammenstellung der Informationen auf dieser Website wurde von My Nguyen mit größtmöglicher Sorgfalt vorgenommen. Dennoch kann keinerlei Gewähr für Aktualität, Korrektheit, Vollständigkeit oder Qualität der bereitgestellten Informationen und Daten übernommen werden. Haftungsansprüche gegen My Nguyen oder die Autoren beziehungsweise Verantwortlichen dieser Website für Schäden materieller oder immaterieller Art, die auf gegebenenfalls fehlerhaften oder unvollständigen Informationen und Daten beruhen, sind, soweit nicht Vorsatz oder grobe Fahrlässigkeit vorliegt, ausgeschlossen.</p>

      <p>Vorgesagte gilt auch für Informationen auf Websites, auf die mittels eines Hyperlinks verwiesen wird. Der Inhalt dieser Websites liegt vollständig außerhalb des Verantwortungsbereiches von My Nguyen, war aber zur Zeit der Verlinkung frei von illegalen Inhalten. Auf die Gestaltung der gelinkten Websites kann nicht Einfluss genommen werden. Für Schäden, die aus fehlerhaften oder unvollständigen Inhalten auf den mittels Link verwiesenen Websites resultieren, haften My Nguyen und die Autoren beziehungsweise Verantwortlichen dieser Website nicht.</p>
        
      <p>Alle auf dieser Website veröffentlichten Texte, Bilder und Grafiken unterliegen dem Urheberrecht und anderen Gesetzen zum Schutz des geistigen Eigentums. Das Copyright für die von My Nguyen erstellten Objekte der Website liegt bei My Nguyen. Auf der Website genannte und gegebenenfalls durch Dritte geschützte Marken- und Warenzeichen unterliegen ohne Einschränkung den Bestimmungen des jeweils geltenden Kennzeichenrechts und den Besitzrechten der jeweils eingetragenen Eigentümer.</p>
    </section>`;
})