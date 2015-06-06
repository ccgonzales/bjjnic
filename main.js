
var Tester = function( options ) {
        if ( !(this instanceof Tester)) {
            return new Tester( options );
        }

        	this.$el = $(options.element);
        	this.purpleBelt = options.purpleBelt;
        	this.blueBelt = options.blueBelt;

			/*
			this.moveList = options.list || [
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
			*/

			this.moveList = [];
			this.defaultBlue = [6, 7, 8, 10, 11, 12, 13, 14,20,21,22,23,24,25,26,27,31,32,33,34,39,40,41,43,46,48,52,53,56,57,58,59,60,62,69,72,74,75,77,85,87];
			this.defaultPurple = [];

			this.customSet = [];

			this.moveTotal = 0;
			this.availableMoves = [];

			this.$el.find("#getMove").on('click', this, this.getMove);
			this.$el.find("#resetMoves").on('click', this, this.resetMoves);
			this.$el.find('#selectMoves').on('click', this, this.setCustomList);

			this.$el.find("[name=beltType]").on('change', this, this.createList);

			this.init();

};
		
		Tester.prototype.init = function() {
			this.$el.find('#header').html('Start Drilling!');

			this.$el.find('#displayMove').addClass('hide');
			this.$el.find('#displayMove').html('');


			this.$el.find('#getMove').removeAttr('disabled' );
			this.$el.find('#getMove').addClass('hide');

			this.$el.find('#selectBeltType').removeClass('hide');
			this.$el.find('#selectionList').removeClass('hide');
			this.$el.find('#selectMoves').removeClass('hide');

			this.$el.find('#previousList').css('visibility', 'hidden');
			var offset = this.$el.find('#previousList').offset();
			//this.$el.find('#previousList > ul').css('height', document.documentElement.clientHeight - (this.$el.find('#getMove').height() + offset.top));
			this.$el.find('#previousList > ul').empty();
			this.$el.find('#intro').removeClass('hide');

			//this.availableMoves = this.moveList.slice();
			this.availableMoves = [];
			this.moveTotal = 0;

			this.previousList = [];
			this.previousMove = "";

			this.createList();
		};

		Tester.prototype.getMove = function(event) {
			var that = event.data;
			var numberOfMoves = that.availableMoves.length;
			var newMoveIndex = that._generateNumber(numberOfMoves)
			
			
			that.$el.find('#header').html('Current Move:');
			that.$el.find('#intro').addClass('hide');

			that.$el.find('#displayMove').removeClass('hide');
			
			numberOfMoves !== 0 ? that._displayMove(newMoveIndex) : that._showReset();

			
			if(that.previousMove !== "") {
				that.addToPreviousList();
			}

			that.previousMove = that.availableMoves[newMoveIndex];
			that.availableMoves.splice(newMoveIndex, 1);

		};

		Tester.prototype._generateNumber = function(maxNumber) {
			return Math.floor((Math.random() * maxNumber))
		};

		Tester.prototype._displayMove = function(moveIndex) {
			this.$el.find('#displayMove').html(this.availableMoves[moveIndex]);
			this._updateCount();
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
			this.$el.find('#displayMove').addClass('hide');
			this.$el.find('#displayMove').html('');
			this.$el.find('#getMove').attr('disabled', 'disabled');
		};

		Tester.prototype.resetMoves = function(event) {
			var that = event.data;
			that.init();
		};

		Tester.prototype._updateCount = function() {
			this.$el.find('#displayMove').append($('<div id="moveCount"></div>').html((this.moveTotal - this.availableMoves.length + 1) + " of " + this.moveTotal));

		}

		Tester.prototype.setCustomList = function(event) {
			var that = event.data;
			that.$el.find('input[name=move]:checked').each(function() {
				++that.moveTotal;
				var moveIndex = parseInt($(this).val());
				that.availableMoves.push((moveIndex + 1) +" " + that.moveList[moveIndex]);
			});

			that.$el.find('#getMove').removeClass('hide');
			that.$el.find('#selectionList').addClass('hide');
			that.$el.find('#selectMoves').addClass('hide');
			that.$el.find('#selectBeltType').addClass('hide');

			that.$el.find('#getMove').trigger('click');
		}

		Tester.prototype.createList = function(event) {
			var that =  typeof event != 'undefined' ? event.data : this;

			var beltType = that.$el.find('[name=beltType]:checked').val();

			if (beltType === "blueBelt" ) {
				that.moveList = that.blueBelt.slice();
			}
			if (beltType === "purpleBelt" ) {
				that.moveList = that.purpleBelt.slice();
			}

			that.$el.find('#selectionList ul').empty();

			$.each(that.moveList, function(key){
			that.$el.find('#selectionList ul').append($("<li></li>").append(
				$('<input />').attr({
					'type': 'checkbox',
					'name': 'move',
					'value': key,
					'id': key,
					'checked': beltType === "blueBelt" ? that.isDefault(key, that.defaultBlue) : that.isDefault(key, that.defaultPurple) 
				})).append($('<label><label>').attr('for', key).html((key + 1) +" "+that.moveList[key])));
		});

		}

		Tester.prototype.isDefault = function(key, defaultSet){

			for(var i = 0; i < defaultSet.length; i++) {
				 if(key === (defaultSet[i]-1)) {
				 	return 'checked';
				 }
			}
			return;
		}



$(function() {

	var testerOptions = {
		element: "#loader",
		blueBelt: ["Tie the Belt",
"Roll Forward" ,
"Roll Backward",
"Bridge (Upa)",
"Teeter Totter",
"Four-Points Base",
"Elbow Escape Movement (3 Options)",
"Stand up in Base",
"Two-Handed Choke Defense",
"Same Side Wrist Grab Escape",
"Two-Hand Wrist Grab Escape",
"One-Hand Lapel Grab Defense (Straight Arm)",
"One-Hand Lapel Grab Defense (Bent Arm)",
"One-Hand Lapel Grab Defense (Bent Wrist)",
"Round House Punch Defense",
"Straight Punch Defense",
"Front Kick Defense",
"Low Kick Defense",
"High Kick Defense",
"T-Position Hip Throw",
"T-Position Leg Throw",
"T-Position Throw from Behind (Sitting Down)",
"Maintain the Mount (Swimming Through Arms)",
"Maintain the Mount (Pulling Hands off Knees)",
"Maintain the Mount (Pushing Opponent's Head)",
"Upa with Choke Defense",
"Basic Elbow Escape",
"Basic Cross Choke",
"Basic Cross Choke from Mount",
"Basic Armlock Movement",
"Basic Armlock with Partner",
"American Armlock (from Mount)",
"Sit-up Sweep (from Guard)",
"Kimura (from Guard)",
"Proper Posture in the Guard",
"Cross Choke from Guard",
"Cross Choke Defense in the Guard (Squeeze the Bread)",
"Cross Choke Defense in the Guard (Comb the Hair)",
"Scissor Sweep to Mount",
"Armlock from Guard",
"Triangle from Guard",
"Guillotine Choke from Guard",
"Guillotine Choke Defense",
"Standing Guillotine Choke",
"Standing Guillotine Choke Defense (Hands on Knees)",
"Standing Guillotine Choke Defense (Buckle the Knees)",
"Rear Bear Hug Defense (Arms Pinned)",
"Basic Pass the Guard (Knee on Floor)",
"Squeeze the Bread",
"Establish Cross Body Position",
"Maintain Cross Body Position",
"Regain the Guard from Cross Body",
"Cross Body Defense (Turn on Knees)",
"Basic Mount from Cross Body (Arm Out)",
"Basic Mount from Cross Body (Arm In)",
"American Armlock from Cross Body",
"Chicken Wing from Cross Body Kimura",
"Maintain Back Control with Hooks",
"Escape from Back Control with Hooks",
"Choke with Collar from Back",
"Mata Leao",
"Rear Choke Escape (Finger Point)",
"Standing Head Lock Defense (Lift Opponent)",
"Overhead Club Defense (Close the Distance)",
"Standing Rear Naked Choke Defense (Flip Opponent)",
"Standing Headlock Punch Defense",
"Front Bear Hug Defense (Arms Pinned)",
"Cross Body Headlock Defense (Opponents Head Low)",
"Wrestlers Head and Arm Defense (Hips under Opponent)",
"Front Bear Hug Defense (Arms Free)",
"Neck Defense (Pinned to Wall - One Hand)",
"Rear Bear Hug Defense (Opponent Lifts You Up)",
"Standing Rear Naked Choke Defense",
"Cross Body Headlock Defense (Make a Frame)",
"Mounted Punch Attack (Bucking Defense)",
"Two-Handed Lapel Grab Defense",
"Basic Hook Sweep from Guard",
"Armbar Protection from Guard",
"Choke Protection from Guard",
"Cross Body Headlock Defense (Go to Back)",
"Cross Body Headlock Defense (Go to Knees)",
"Cross Body Neck Crank (Pass the Leg)",
"Close the Gap",
"Mount Defense (Move Away)",
"Basic Armlock from Cross Body",
"Bajana (Double Leg Takedown)",
"Pass the Guard (Standing Up)",
"Standing Hair/Ear Grab Defense"],

	purpleBelt: ["Double Ankle Grab Sweep", "Both Hands on Ankle Sweep to Armlock", "Push Sweep From Scissors", "Handstand Sweep", "Arm Inside Sweep", "Arm Inside Sweep to Armbar", "Sweep from Seated Guard", "Overhead Sweep", "Leg Pinching Sweep", "Scissor Sweep Standing from Guard", "Hook Sweep from Guard", "Kick over Sweep (Balloon)", "Sweep from Guard (Spider Guard)", "Star Sweep", "Sweep from Guard", "Sweep from Guard (Stand in Base-Holding the Belt)", "Sweep from Guard (Stand in Base-Holding the Collar)", "Sweep from Guard (Hand on Knee)", "Half Guard to Half Mount (Leg Straight)", "Half Guard to Half Mount (Leg Bent)", "Half Guard to Half Mount (Holding Belt)", "Sweep to Mount and Choke", "Shoulder Grab (Bent Arm)", "Shoulder Grab (Straight Arm)", "Lapel Grab With Both Hands", "Defense Against Front Thrust Kick", "Standing Guillotine Defense", "Both Hands Grab from Behind", "Standing Head Lock Defense (Taken to Ground)", "Two Hands Against Wall Defense", "Under Arm Collar Choke from Guard", "Mount to Back", "Achilles Ankle Lock (Passing Guard)", "Omo Plata", "Kimura from Cross Body", "Choke from Cross Body", "Cross Body to Knee on the Stomach", "Escape Knee on Stomach (Going to Knees)", "Armlock from Knee on Stomach", "Triangle Choke to Armbar", "Ankle lock When Passing Guard (Stacking)", "Knee Bar from Guard", "North South Foot Lock", "Ankle Lock from Open Guard", "Knife Stab Defense", "Overhead Knife Stab Defense", "Knee Bar from Cross Body", "Neck Crank from Cross Body", "Choke from Knee on Stomach", "Straight Armlock from Cross Body (Both Knees Up)", "Guard to Back", "Foot Lock from Back Mount (Feet Crossed)", "Helicopter Armbar", "Half Guard to Cross Body", "Escape from North South (Knees Under Armpits)", "Pass Half Guard to Mount", "Head & Arm Choke from Guard", "Choke from Half Mount", "Knee Bar from Passing Guard", "Choke from Guard (Holding your Elbow)", "Double Armlock", "Arm Trapped Armlock (Hand on Lapel)", "Squeeze the Bread (Both Hands)", "Shoulder Lock from Guard", "Escape Knee on Stomach by Making Hook", "Escape Knee on Stomach (Using Knees)", "Escape Knee on Stomach (Holding Belt)", "Choke from Knee on Stomach (Crossing Hands)", "Pass Guard & Defend Recompense", "Counter to Kimura", "Helio Gracie Choke from Mount", "Escape from Mount (Two Hands on Belt)", "Cross Body to Mount (Foot Between Legs)", "Cross Body to Mount (Holding Your Foot)", "Cross Body to Mount (Holding Opponent's Legs)", "Defense Against UPA (Locking Legs)", "Mount by Pushing Opponent's Legs", "Lapel Choke (Mount Going to North South)", "Defense Against Lapel Choke", "Squeeze the Bread from Mount (Nutcracker)", "Lapel Choke from Cross Body", "Counter Elbow Escape", "North South Escape to Choke", "North South Escape (Foot in Belt)", "North South to Back", "North South Escape to Armlock", "North South Position Fishing to Half Guard", "Choke from Guard (Using Gi)"]
	}

	var testme = new Tester(testerOptions);
});