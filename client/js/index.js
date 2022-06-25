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