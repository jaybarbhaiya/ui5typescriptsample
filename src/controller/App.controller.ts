import Controller from "sap/ui/core/mvc/Controller";
import AppComponent from "../Component";
import List from "sap/m/List";
import StandardListItem from "sap/m/StandardListItem";
import Event from "sap/ui/base/Event";

/**
 * @namespace com.myorg.myapp.controller
 */
export default class AppController extends Controller {

	public onInit() : void {
		// apply content density mode to root view
		this.getView().addStyleClass((this.getOwnerComponent() as AppComponent).getContentDensityClass());

		const oList: List = this.getView().byId("myList") as List;
		const oFirstItem: StandardListItem = oList.getItems()[0] as StandardListItem;

		oFirstItem.setSelected(true);
		this.handleSelectionChange(undefined, oFirstItem);
	}

	public handleSelectionChange(oEvent: Event, oListItem: StandardListItem) : void {
		if (oEvent) {
			alert((oEvent.getParameter("listItem") as StandardListItem).getId());
		} else {
			const sItemId: string = oListItem.getId();
			alert(sItemId);
		}
	}
}