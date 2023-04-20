api.controller=function($scope,spScUtil,$q,spUtil,$rootScope) {
	/* widget controller */
	var c = this;

	c.g_form = false;

	c.submit = function(){
		if(c.g_form){
			c.g_form.submit()
			return;
		}
	}	


	$scope.$on('spModel.gForm.initialized', function (e, gFormInstance) {
		if(!c.g_form){
			c.g_form = gFormInstance;
		}

		//When submit
		c.g_form.$private.events.on('submitted', function(){
			submitRecordProcess();
		});

	});


	function submitRecordProcess(){
		postCatalogFormRequest().then(function(response){
      
			c.g_form = false;

			//Reset form after submit if was create
				c.server.update();
			
		})
	}


	function postCatalogFormRequest() {
		return spScUtil.submitProducer(c.data.sc_cat_item.sys_id, getVarData(c.data.sc_cat_item._fields), c.data._generatedItemGUID).then(null, function(response) {
			if (response.data.result && response.data.result.errMsg) {
				spUtil.addErrorMessage(response.data.result.errMsg);
			}

			return $q.reject(response);
		});
	}



	function getVarData(fields) {
		var reqData = {};
		for(var obj in fields)
			reqData[fields[obj].name] = fields[obj].value;
		return reqData;
	}


};

