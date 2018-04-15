import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
	state = {
	  showAddModel : false,
	  showEditModel : false,
	  showDeleteModel : false,
	  graphData : [
	    {
	      'id' : 1523544202222,
	      'type': 'lineChart',
	      'layout': 'halfwidth',
	      'title' : 'LineChart - 12'
	    },
	    {
	      'id' : 1923578787222,
	      'type': 'barChart',
	      'layout': 'halfwidth',
	      'title' : 'BarChart - 1'
	    },
	    {
	      'id' : 3408544202222,
	      'type': 'polarChart',
	      'layout': 'fullwidth',
	      'title' : 'PolarChart - 1'
	    },
	    {
	      'id' : 8926754202222,
	      'type': 'pieChart',
	      'layout': 'fullwidth',
	      'title' : 'PieChart - 1'
	    }
	  ],
	  newGraphTitle : '',
	  chartTypes : [
	    {
	      id : 0,
	      name : 'lineChart',
	    },
	    {
	      id : 1,
	      name : 'barChart',
	    },
	    {
	      id : 2,
	      name : 'polarChart',
	    },
	    {
	      id : 3,
	      name : 'pieChart',
	    }
	  ],
	  defaultAddChart : 'lineChart',
	  layoutType : [
	    {
	      id : 0,
	      name : 'fullwidth'
	    },
	    {
	      id : 0,
	      name : 'halfwidth'
	    }
	  ],
	  defaultLayout : 'fullwidth',
	  selectedGraphObj : {
	      'id' : 1523544202222,
	      'type': 'lineChart',
	      'layout': 'halfwidth',
	      'title' : 'LineChart - 12'
	    },
	  editSelectedTitle : 'LineChart - 12',
	  editSelectedGraphType : 'lineChart',
	  editSelectedlayoutType : 'halfwidth',
	  selectedDeleteObj : {
	      'id' : 1523544202222,
	      'type': 'lineChart',
	      'layout': 'halfwidth',
	      'title' : 'LineChart - 12'
	    }

	};

	openAddModal() {
		this.state.showAddModel = true;
	}
	openEditModal() {
		this.state.showEditModel = true;
	}
	openDeleteModal() {
		this.state.showDeleteModel = true;
	}
	closeAddModel() {
		this.state.showAddModel = false;
	}
	closeEditModel() {
		this.state.showEditModel = false;
	}
	closeDeleteModel() {
		this.state.showDeleteModel = false;
	}
	changeSelectedGraphObj(obj) {
		this.state.selectedGraphObj = obj;
		this.state.selectedDeleteObj = obj;
		this.state.editSelectedTitle = obj.title;
		this.state.editSelectedGraphType = obj.type;
		this.state.editSelectedlayoutType = obj.layout;
	}
	addGraph() {
	    if (this.state.newGraphTitle && this.state.defaultAddChart && this.state.defaultLayout) {
	      const obj = {
	        id : Date.now(),
	        type: this.state.defaultAddChart,
	        layout: this.state.defaultLayout,
	        title : this.state.newGraphTitle
	      };
	    const newObj = [...this.state.graphData, obj];

	      const event = new CustomEvent('updateGraphData', { detail: newObj });
	      window.dispatchEvent(event);

	      this.state.graphData = newObj;
	      this.state.newGraphTitle = '';
	      this.closeAddModel();
	      alert('New graph added successfully');
	    }
	}

	editGraph() {
		const newGraphData = this.state.graphData.map((obj) => {
			if (this.state.selectedGraphObj.id === obj.id) {
			    obj = Object.assign(obj, {
			      type: this.state.editSelectedGraphType,
			      layout: this.state.editSelectedlayoutType,
			      title : this.state.editSelectedTitle
			    });
			    return obj;
			}
		  	return obj;
		});

		const event = new CustomEvent('updateGraphData', { detail: newGraphData });
		window.dispatchEvent(event);

		this.state.graphData = newGraphData;
		this.closeEditModel();
		alert('changes are saved successfully');
	}

	deleteSelectedGraph() {
		const objid = this.state.selectedDeleteObj.id;
	    const newData = this.state.graphData.filter((obj, index) => {
	      return obj.id != objid;
	    });

	    const event = new CustomEvent('updateGraphData', { detail: newData });
	    window.dispatchEvent(event);

	    this.state.graphData = newData;
	    this.state.selectedDeleteObj = newData[0];
	    this.closeDeleteModel();
	    alert('Selected graph is deleted successfully');
	}
}
