
var Tester = function( options ) {
        if ( !(this instanceof Tester)) {
            return new Tester( options );
        }

        	this.$el = $(options.element);
			this.moveList = [
			"6 Four-Points Base",
			"7 Elbow Escape Movement (3 Options)",
			"8 Stand up in Base",
			"10 Same Side Wrist Grab Escape",
			"11 Two-Hand Wrist Grab Escape",
			"12 One-Hand Lapel Grab Defense (Straight Arm)",
			"13 One-Hand Lapel Grab Defense (Bent Arm)",
			"14 One-Hand Lapel Grab Defense (Bent Wrist)",
			"20 T-Position Hip Throw",
			"21 T-Position Leg Throw",
			"22 T-Position Throw from Behind (Sitting Down)",
			"23 Maintain the Mount (Swimming Through Arms)",
			"24 Maintain the Mount (Pulling Hands off Knees)",
			"25 Maintain the Mount (Pushing Opponent's Head)",
			"26 Upa with Choke Defense",
			"27 Basic Elbow Escape",
			"31 Basic Armlock with Partner",
			"32 American Armlock (from Mount)",
			"33 Sit-up Sweep (from Guard)",
			"34 Kimura (from Guard)",
			"39 Scissor Sweep to Mount",
			"40 Armlock from Guard",
			"41 Triangle from Guard",
			"43 Guillotine Choke Defense",
			"46 Standing Guillotine Choke Defense (Buckle the Knees)",
			"48 Basic Pass the Guard (Knee on Floor)",
			"52 Regain the Guard from Cross Body",
			"53 Cross Body Defense (Turn on Knees)",
			"56 American Armlock from Cross Body",
			"57 Chicken Wing from Cross Body Kimura",
			"58 Maintain Back Control with Hooks",
			"59 Escape from Back Control with Hooks",
			"60 Choke with Collar from Back",
			"62 Rear Choke Escape (Finger Point)",
			"69 Wrestlers Head and Arm Defense (Hips under Opponent)",
			"72 Rear Bear Hug Defense (Opponent Lifts You Up)",
			"74 Cross Body Headlock Defense (Make a Frame)",
			"75 Mounted Punch Attack (Bucking Defense)",
			"77 Basic Hook Sweep from Guard",
			"85 Basic Armlock from Cross Body",
			"87 Pass the Guard (Standing Up)"
			];


			this.$el.find("#getMove").on('click', this, this.getMove);
			this.$el.find("#resetMoves").on('click', this, this.resetMoves);

			this.init();

};
		
		Tester.prototype.init = function() {
			this.$el.find('#header').html('Start Drilling!');
			this.$el.find('#displayMove').html('');
			this.$el.find('#getMove').removeAttr('disabled' );

			this.$el.find('#previousList').css('visibility', 'hidden');
			var offset = this.$el.find('#previousList').offset();
			//this.$el.find('#previousList > ul').css('height', document.documentElement.clientHeight - (this.$el.find('#getMove').height() + offset.top));
			this.$el.find('#previousList > ul').empty();
			this.$el.find('#intro').removeClass('hide');

			this.availableMoves = this.moveList.slice();
			this.previousList = [];
			this.previousMove = "";
		};

		Tester.prototype.getMove = function(event) {
			var that = event.data;
			var numberOfMoves = that.availableMoves.length;
			console.log(numberOfMoves + " " + that.previousList.length);
			var newMoveIndex = that._generateNumber(numberOfMoves)
			
			
			that.$el.find('#header').html('Current Move:');
			that.$el.find('#intro').addClass('hide');
			
			numberOfMoves !== 0 ? that._showMove(newMoveIndex) : that._showReset();

			
			if(that.previousMove !== "") {
				that.addToPreviousList();
			}

			that.previousMove = that.availableMoves[newMoveIndex];
			that.availableMoves.splice(newMoveIndex, 1);


		};

		Tester.prototype._generateNumber = function(maxNumber) {
			return Math.floor((Math.random() * maxNumber))
		};

		Tester.prototype._showMove = function(moveIndex) {
			this.$el.find('#displayMove').html(this.availableMoves[moveIndex]);
		};

		Tester.prototype.addToPreviousList = function() {
			this.previousList.push(this.previousMove);
			this.updatePreviousList(this.previousMove);
		};

		Tester.prototype.updatePreviousList = function(moveName) {
			if(this.$el.find('#previousList').css('visibility') === 'hidden') {
				this.$el.find('#previousList').css('visibility', 'visible');
			}
			this.$el.find('#previousList ul').prepend($('<li></li>').html(moveName));
		};

		Tester.prototype._showReset = function() {
			this.$el.find('#header').html('All moves complete!');
			this.$el.find('#displayMove').html('');
			this.$el.find('#getMove').attr('disabled', 'disabled');
		};

		Tester.prototype.resetMoves = function(event) {
			var that = event.data;
			that.init();
		};



$(function() {

	var testerOptions = {
		element: "#loader"
	}

	var testme = new Tester(testerOptions);
});