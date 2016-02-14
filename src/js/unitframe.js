/*!
 * UnitFrame 0.1.0 
 * UnitFrame is a simple jQuery plugin for conversion of units of different quantities
 * 
 * @author: pavan <adilson.pavan@gmail.com>
 * 
 * Date: 03-31-2014
 */

(function ( $ ){
 
	//define quantities
	
	var quantity = {
		"Length":['m','cm','mm','in','ft','nm'],
		"Pressure":['Pa','MPa','GPa','psi','kgf/cm²','kpsi','Gpsi','atm'], 
	}
	
	//define conversion factor
	
	var factor = {
		"m":1,"cm":100,"mm":1000,"in":39.370079,"ft":3.2808399,"nm":1e9,
		"Pa":1,"MPa":1.e-6,"GPa":1.e-9,"psi":0.00014503774,"kgf/cm²":1.01972e-005,"kpsi":1.4503774e-07,"Gpsi":1.4503774e-13,"atm":9.8692327e-06
	}
	
	/**
	 * UnitFrame constructor.
	 *
	 * @param options	configuration parameters of the component
	 * @constructor
	 */
	$.fn.unitframe = function ( options ){
	
		//component settings
		var settings = $.extend( {
			quantity:	'Pressure',
			label:		'none'
		}, options);
		
		return this.each(function(){
		
			//create html component	
			html = '<label style="font-weight:normal;">' + settings['label'] + '</label>';
			html += '<input type="text" id="value" name="value" style="margin-left:10px;height:27px;"/>';
			html += '<select id="units" name="units" style="margin-left:10px;height:26px;">';
			
			for (unit in quantity[settings.quantity]){
				html += '<option value="'+ quantity[settings.quantity][unit] +'">' + quantity[settings.quantity][unit] + '</option>';
			}
			html += '</select>';
			$(this).append(html);
			
			var from_unit = quantity[settings.quantity][0]; //first unit
			
			//implements the event of component
			$('#units').change(function(){
				
				var from = $('#value').val();
				var to_unit = $('select[name=units] option:selected').val();				
				var convert_value = convert(from,from_unit,to_unit); 
				
				$('#value').val(convert_value);
				
				from_unit = to_unit;
			});
			
		});
		
  };

  /**
   * Converts the units by the conversion factor.
   *
   * @param {Number} from				from is the value for conversion 
   * @param {String} from_unit	from_unit is the current unit
   * @param {String} to_unit		to_unit is the unit for conversion
   * @returns {Number}					return the conversion value 
   */
  function convert(from, from_unit, to_unit){
  	factor_1 = factor[from_unit]; 
  	factor_2 = factor[to_unit];
  	
  	if (factor_1==0) return 0;
  	
  	return (from/factor_1)*factor_2;
  };
  

})( jQuery );