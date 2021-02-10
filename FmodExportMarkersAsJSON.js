studio.menu.addMenuItem({
	name: "Export markers as JSON",
	isEnabled: function() { var event = studio.window.browserCurrent(); return event && event.isOfExactType("Event"); },
	keySequence: "Alt+E",
	execute: function()
	{
		const event = studio.window.browserCurrent();

		let output = {};

		output.Id = event.id;
		output.Markers = [];

		const parameterPresetIds = event.getParameterPresets().map(function (item) {
			return item.id
		});

		const markers = event.timeline.markers;
		const markerIds = markers.map(function (item) {
			return item.id
		});

		for (var i = 0; i < markers.length; i++)
		{
			const marker = markers[i];

			let obj = {};

			obj.Type = marker._native.uiName.replace(/\s+/, "");
			
			if (marker.position != 0.0)
			{
				obj.Position = marker.position;
			}
			
			if (marker.length != 0.0)
			{
				obj.Length = marker.length;
			}
			
			if ((marker.name != undefined) && (marker.name.length > 0))
			{
				obj.Name = marker.name;
			}
			
			if (marker.tempo != 0.0)
			{
				obj.Tempo = marker.tempo;
			}
			
			if (marker.destination != undefined)
			{
				obj.DestinationIndex = markerIds.indexOf(marker.destination.id);
			}
			
			if (marker.looping != 0)
			{
				obj.Looping = marker.looping;
			}
			
			if (marker.transitionOffset != 0)
			{
				obj.TransitionOffset = marker.transitionOffset;
			}
			
			if (marker.quantizationInterval != 0)
			{
				obj.QuantizationInterval = marker.quantizationInterval;
			}
			
			if ((marker.triggerConditions != undefined) && (marker.triggerConditions.length > 0))
			{
				obj.TriggerConditions = [];
				
				for (let j = 0 ; j < marker.triggerConditions.length; ++j)
				{
					const triggerCondition = marker.triggerConditions[j];

					let obj2 = {};

					obj2.ParameterIndex = parameterPresetIds.indexOf(triggerCondition.parameter.id);
					obj2.Minimum = triggerCondition.minimum;
					obj2.Maximum = triggerCondition.maximum;
					
					obj.TriggerConditions.push(obj2);
				}
			}
			
			output.Markers.push(obj);
		}

		studio.system.print(JSON.stringify(output));
	}
});