

import axios from "axios";
import {useEffect} from "react";
import React, { useState } from 'react';
import $ from 'jquery';
window.jQuery = $;
require('signalr');

const Test = () => {
	useEffect(() => {
		var options = {
			qs: {
				AuthType: 1,
				Token: "EAAAAN5FrWlvVj6HiLgcPHSM5VbXlKqWQTYAEpuhxjsvp8XuYlSU/S18bhL1oJD9YAHORg==",
				ModuleId: 10,
			}
		};
	
		var connection = $.hubConnection('http://200.48.100.203:5030', options);
		var proxy = connection.createHubProxy('S10ERPHub');   
	
		proxy.on("receiveS10ERPDataResult", function (response) {
			const data = JSON.parse(response);
			console.log(data);
			console.log(data.Data);
		})
	 
		 // atempt connection, and handle errors
		 connection.start()
		 .done(function(){ console.log('Now connected, connection ID=' + connection.id); })
		 .fail(function(){ console.log('Could not connect'); });
	}, [])

	return (  
		<div className="row h-100">
		<h1>test</h1>
		</div>
	)
};
export default Test;
