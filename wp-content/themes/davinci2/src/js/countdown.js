import './lib/jquery.countdown.min';

const countdown = {
	init(){
		let clock = $('#clock');

		if (clock.length != 0 && clock.data('time').length != 0) {

			var timeend = clock.data('time');
			var template = $("#clock-template").html();
			clock.countdown(timeend).on('update.countdown', function (event) {
				$(this).html(event.strftime(template));
			});
		}
	}
};

countdown.init();