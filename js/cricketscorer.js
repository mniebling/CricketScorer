$(document).ready(function() {

	var mode = 'add',
		P1 = new Player();
		P2 = new Player();

	function Player() {
		this.score = 0;
		this.marks = 0;
		this.rounds = 0;
		this.MPR = 0;
		this.slashes = {
			'20': 0,
			'19': 0,
			'18': 0,
			'17': 0,
			'16': 0,
			'15': 0,
			'25': 0,
		};
	};


	// First-run
	$('.btn-done.p2').hide();


	// New game
	$('.btn-new').on('click', function() {

		location.reload();
	});


	// Remove Darts toggle
	$('.btn-remove').on('click', function() {

		if(mode === 'add') {
			mode = 'remove';
			$(this).text('Done removing');
			$('.btn-add').html('&#xf056;'); // font awesome minus sign
		}
		else {
			mode = 'add';
			$(this).text('Remove Darts');
			$('.btn-add').html('&#xf0fe;'); // font awesome plus sign
		}
	});


	// Mark button
	$('.btn-add').on('click', function() {

		// typically, call add mark and pass the button which was clicked
		if(mode === 'add') {
			addMark($(this));
		}

		// but if we're in remove mode, call remove mark instead
		if(mode === 'remove') {
			removeMark($(this));
		}
	});


	// End turn
	$('.btn-done').on('click', function() {

		// calculate MPR
		if($(this).hasClass('p1')) {

			P1.rounds++;
			P1.MPR = (P1.marks / P1.rounds).toFixed(2);
			$('.score-box-mpr.p1').text(P1.MPR + ' MPR');
		}
		else {

			P2.rounds++;
			P2.MPR = (P2.marks / P2.rounds).toFixed(2);
			$('.score-box-mpr.p2').text(P2.MPR + ' MPR');
		}

		// show & hide done buttons
		$('.btn-done').toggle();
	});


	// add marks, compute points, update game state
	function addMark($elem) {

		// is it player one or two?
		if($elem.hasClass('p1')) {

			// add a mark
			P1.marks++;

			// add it to the slashes data
			var countOfSlashes = ++P1.slashes[$elem.attr('data-val')];

			// if there are 3 or fewer slashes, add a visual mark
			if (countOfSlashes <= 3) {
				
				var s = '';
				for(var i = 1; i <= countOfSlashes; i++) {
					s += '&#xf05d; '; // font awesome checkmark
				}
				$elem.prev().html(s);
			}

			// if there are more than 3 slashes, and the other player doesn't have 3, add points
			else if (P2.slashes[$elem.attr('data-val')] < 3) {
				
				P1.score += +$elem.attr('data-val');
				$('.score-box-points.p1').text(P1.score);
			}
		}
		else {

			P2.marks++;
			var countOfSlashes = ++P2.slashes[$elem.attr('data-val')];

			if (countOfSlashes <= 3) {
				
				var s = '';
				for(var i = 1; i <= countOfSlashes; i++) {
					s += '&#xf05d; ';
				}
				$elem.next().html(s);
			}

			else if (P1.slashes[$elem.attr('data-val')] < 3) {
				
				P2.score += +$elem.attr('data-val');
				$('.score-box-points.p2').text(P2.score);
			}
		}
	}


	// remove marks if possible and update game state etc
	function removeMark($elem) {

		// is it player one or two?
		if($elem.hasClass('p1')) {

			// if there's a mark to be removed...
			if(P1.marks > 0 && P1.slashes[$elem.attr('data-val')] > 0) {

				// remove a mark
				P1.marks--;

				// remove it from the slashes data
				var countOfSlashes = --P1.slashes[$elem.attr('data-val')];
				

				// if there are now fewer than 3 slashes, remove a visual mark
				if (countOfSlashes < 3) {
				
					var s = '';
					for(var i = 1; i <= countOfSlashes; i++) {
						s += '&#xf05d; '; // &#xf05d; = font awesome checkmark
					}
					$elem.prev().html(s);
				}

				// if there are 3 or more slashes, and the other player doesn't have 3, remove points
				else if (P2.slashes[$elem.attr('data-val')] < 3) {
					
					P1.score -= +$elem.attr('data-val');
					$('.score-box-points.p1').text(P1.score);
				}
			}
		}

		else {

			if(P2.marks > 0 && P2.slashes[$elem.attr('data-val')] > 0) {

				P2.marks--;

				var countOfSlashes = --P2.slashes[$elem.attr('data-val')];
				
				if (countOfSlashes < 3) {
				
					var s = '';
					for(var i = 1; i <= countOfSlashes; i++) {
						s += '&#xf05d; '; // &#xf05d; = font awesome checkmark
					}
					$elem.next().html(s);
				}

				else if (P1.slashes[$elem.attr('data-val')] < 3) {
					
					P2.score -= +$elem.attr('data-val');
					$('.score-box-points.p2').text(P2.score);
				}
			}
		}
	}


	function debug() {
		console.log(P1, P2);
	}

});