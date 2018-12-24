var steem = require('steem'); //get steemsj --> npm install steem --save

const greylist = ['steem', 'darlene.kitchen', ]

const blacklist =  ['keks', 'umeko', 'arslanmalik', 'slateslate', 'ankitagupta', 'iqbalkhan', 'kiyo', 'jamecarvalho', 'malikidrees', 'srabonisingh', 'kevinglazebrook', 'waseemali', 'thedarkvoice', 'cheater', 'preetkam', 'shopen', 'luigion', 'thatgaby', 'cmalescov', 'ady-was-here', 'radudangratian', 'martie7', ]

const donations = ['fbslo']



//get snake's voting power
steem.api.getAccounts(["steemsnake"], function(err, response){
  var secondsago = (new Date - new Date(response[0].last_vote_time + "Z")) / 1000;
   var vpow = response[0].voting_power + (10000 * secondsago / 432000);
    vpow = Math.min(vpow / 100, 100).toFixed(2);
    var pow = Math.round(vpow)

console.log('Start Steem Snake Voting Bot! Voting power: ' + vpow + "%")

//get voting power for different play modes
var weight_easy = Math.round(0.125 * pow)
console.log("Weight easy/point is "+ weight_easy/100 + "%")
var weight_normal = Math.round(0.25 * pow)
console.log("Weight normal/point is " + weight_normal/100 + "%")
var weight_hard = Math.round(0.75 * pow)
console.log("Weight hard/point is " + weight_hard/100 + "%")
        //voter's accoutn name and posting key
        const voter = 'voter_account'
        const wif = 'this_is_voter_password'
        //RPC node
        steem.api.setOptions({ url: 'https://api.steemit.com' });
        //stream tx's in Steem Blockchain
        steem.api.streamTransactions('head', function(err, result) {
          let txType = result.operations[0][0]
          let txData = result.operations[0][1]

          let newcomment = checkComment(txType,txData)
          if (newcomment) {
            console.log('New Comment: ', txData)
          }
        });
        //check for comments
        function checkComment(txType,txData) {
          //easy
          if(txType == 'comment' && txData.permlink.includes("re-steemsnake-steem-snake-results") && txData.json_metadata.includes("easy")) {
            //get result from comment
            var body1 = txData.body
            var points = body1.split(" ") && body1.split("!");
            var result = points[0]
            var code = result.split(" ")
            console.log("Result: " + code[3] + " Mode: Easy")
            //get upvote weight from comment and config 
            var weight = weight_easy * code[3]

            let author = txData.author
            let permlink = txData.permlink


            //donations: if user is on donations list, he/she get higher upvote
            if(donations.includes(txData.author)){
              var weight_donations = weight * 2
                if (weight_donations > 10000){
                  var weightfull = 10000
                  steem.broadcast.vote(wif,voter,author,permlink,weightfull,console.log);
                }
                steem.broadcast.vote(wif,voter,author,permlink,weight_donations,console.log);
                console.log("Author @" + txData.author + " donated. Voted: " + weight_donations / 100 + "%")
            }

            //greylist: if author is on greylist, he/she get only 1/2  of upvote
            if(greylist.includes(txData.author)){
              var weight_grey = weight * 0.5
                if (weight_grey > 10000){
                  var weightfull = 10000
                  steem.broadcast.vote(wif,voter,author,permlink,weightfull,console.log);
                }
                steem.broadcast.vote(wif,voter,author,permlink,weight_grey,console.log);
                console.log("Author @" + txData.author + " is on Greylist. Voted: " + weight_grey / 100 + "%")
            }

            //blacklist: Author don't get upvote
            if(blacklist.includes(txData.author)){
              var weight_black = 0
              steem.broadcast.vote(wif,voter,author,permlink,weight_black,console.log);
              console.log("Author @" + txData.author + " is on Blacklist. Voted: " + weight_black / 100 + "%")
            }

            //normal author
            if (donations.includes(txData.author) == false && blacklist.includes(txData.author) == false && greylist.includes(txData.author) == false){
                if (weight > 10000){
                  var weightfull = 10000
                  steem.broadcast.vote(wif,voter,author,permlink,weightfull,console.log);
                }
                steem.broadcast.vote(wif,voter,author,permlink,weight,console.log);
                console.log("Author @" + txData.author + ". Voted: " + weight/100 + "%")
              }
            }


          //normal mode
          if(txType == 'comment' && txData.permlink.includes("re-steemsnake-steem-snake-results") && txData.json_metadata.includes("normal")) {

            var body1 = txData.body
            var points = body1.split(" ") && body1.split("!");
            var result = points[0]
            var code = result.split(" ")
            console.log("Result: " + code[3] + " Mode: Normal")

            var weight = weight_normal * code[3]

            let author = txData.author
            let permlink = txData.permlink


            //donations
            if(donations.includes(txData.author)){
              var weight_donations = weight * 2
                if (weight_donations > 10000){
                  var weightfull = 10000
                  steem.broadcast.vote(wif,voter,author,permlink,weightfull,console.log);
                }
                steem.broadcast.vote(wif,voter,author,permlink,weight_donations,console.log);
                console.log("Author @" + txData.author + " donated. Voted: " + weight_donations / 100 + "%")
            }


            //greylist
            if(greylist.includes(txData.author)){
              var weight_grey = weight * 0.5
                if (weight_grey > 10000){
                  var weightfull = 10000
                  steem.broadcast.vote(wif,voter,author,permlink,weightfull,console.log);
                }
                steem.broadcast.vote(wif,voter,author,permlink,weight_grey,console.log);
                console.log("Author @" + txData.author + " is on Greylist. Voted: " + weight_grey / 100 + "%")
            }

            //blacklist
            if(blacklist.includes(txData.author)){
              var weight_black = 0
              steem.broadcast.vote(wif,voter,author,permlink,weight_black,console.log);
              console.log("Author @" + txData.author + " is on Blacklist. Voted: " + weight_black / 100 + "%")
            }

            //normal author
            if (donations.includes(txData.author) == false && blacklist.includes(txData.author) == false && greylist.includes(txData.author) == false){
                if (weight > 10000){
                  var weightfull = 10000
                  steem.broadcast.vote(wif,voter,author,permlink,weightfull,console.log);
                }
                steem.broadcast.vote(wif,voter,author,permlink,weight,console.log);
                console.log("Author @" + txData.author + ". Voted: " + weight/100 + "%")
              }
            }

          //hard
          if(txType == 'comment' && txData.permlink.includes("re-steemsnake-steem-snake-results") && txData.json_metadata.includes("hard")) {

            var body1 = txData.body
            var points = body1.split(" ") && body1.split("!");
            var result = points[0]
            var code = result.split(" ")
            console.log("Result: " + code[3] + " Mode: Normal")

            var weight = weight_hard * code[3]

            let author = txData.author
            let permlink = txData.permlink


            //donations
            if(donations.includes(txData.author)){
              var weight_donations = weight * 2
                if (weight_donations > 10000){
                  var weightfull = 10000
                  steem.broadcast.vote(wif,voter,author,permlink,weightfull,console.log);
                }
                steem.broadcast.vote(wif,voter,author,permlink,weight_donations,console.log);
                console.log("Author @" + txData.author + " donated. Voted: " + weight_donations / 100 + "%")
            }


            //greylist
            if(greylist.includes(txData.author)){
              var weight_grey = weight * 0.5
                if (weight_grey > 10000){
                  var weightfull = 10000
                  steem.broadcast.vote(wif,voter,author,permlink,weightfull,console.log);
                }
                steem.broadcast.vote(wif,voter,author,permlink,weight_grey,console.log);
                console.log("Author @" + txData.author + " is on Greylist. Voted: " + weight_grey / 100 + "%")
            }

            //blacklist
            if(blacklist.includes(txData.author)){
              var weight_black = 0
              steem.broadcast.vote(wif,voter,author,permlink,weight_black,console.log);
              console.log("Author @" + txData.author + " is on Blacklist. Voted: " + weight_black / 100 + "%")
            }

            //normal author
            if (donations.includes(txData.author) == false && blacklist.includes(txData.author) == false && greylist.includes(txData.author) == false){
                if (weight > 10000){
                  var weightfull = 10000
                  steem.broadcast.vote(wif,voter,author,permlink,weightfull,console.log);
                }
                steem.broadcast.vote(wif,voter,author,permlink,weight,console.log);
                console.log("Author @" + txData.author + ". Voted: " + weight/100 + "%")
            }
          }
      }
  });
