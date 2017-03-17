function render(){
	if(circleYellow.x != Infinity)
	 game.debug.geom(circleYellow,'#fdf814');
	
	if(circleBlue.x != Infinity)
	 game.debug.geom(circleBlue,'#33b3e8');

	if(click != null){
		game.debug.geom(click,  '#fdf814')
	}
	
}