(function() {

	data.cat_item_sys_id = $sp.getParameter('sys_id') || options.cat_item_sys_id
	
	if(data.cat_item_sys_id){
			data.sc_cat_item = $sp.getCatalogItem(data.cat_item_sys_id)
	}
	

})();
