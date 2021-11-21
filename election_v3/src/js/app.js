App = {
    web3Provider: null,
    contracts: {},
    account: '0x0',
    hasVoted: false,
  
    init: function() {
      return App.initWeb3();
    },
  
    // Old initWeb3
    // initWeb3: function() {
    //   // TODO: refactor conditional
    //   if (typeof web3 !== 'undefined') {
    //     // If a web3 instance is already provided by Meta Mask.
    //     App.web3Provider = web3.currentProvider;
    //     web3 = new Web3(web3.currentProvider);
    //   } else {
    //     // Specify default instance if no web3 instance provided
    //     App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
    //     web3 = new Web3(App.web3Provider);
    //   }
    //   return App.initContract();
    // },

    initWeb3: function() {

			// Is there is an injected web3 instance?
			if (typeof web3 !== 'undefined') {
			ethereum.enable().then(() => {
			web3 = new Web3(web3.currentProvider);
			});
			} else {

			// If no injected web3 instance is detected, fallback to the TestRPC
			web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));			
			}

			App.web3Provider=web3.currentProvider;
			return App.initContract();
			},
  
    initContract: function() {
      $.getJSON("Election.json", function(election) {
        // Instantiate a new truffle contract from the artifact
        App.contracts.Election = TruffleContract(election);
        // Connect provider to interact with contract
        App.contracts.Election.setProvider(App.web3Provider);
  
        App.listenForEvents();
  
        return App.render();
      });
    },
  
    // Listen for events emitted from the contract
    listenForEvents: function() {
      App.contracts.Election.deployed().then(function(instance) {
        // Restart Chrome if you are unable to receive this event
        // This is a known issue with Metamask
        // https://github.com/MetaMask/metamask-extension/issues/2393
        instance.votedEvent({}, {
          fromBlock: 'latest',
          toBlock: 'latest'
        }).watch(function(error, event) {
          console.log("event triggered", event)
          // Reload when a new vote is recorded
          App.render();
        });
      });
    },
  
    render: function() {
      var electionInstance;
      var loader = $("#loader");
      var content = $("#content");
  
      loader.show();
      content.hide();
      
      
      // Load account data
      web3.eth.getCoinbase(function(err, account) {
        if (err === null) {
          App.account = account;
          $("#accountAddress").html("Your Account: " + account);
        }
      });
  
      // Load contract data
      App.contracts.Election.deployed().then(function(instance) {
        electionInstance = instance;
        return electionInstance.candidatesCount();
      }).then(function(candidatesCount) {
        var candidatesResults = $("#candidatesResults");
        candidatesResults.empty();
        
        var candidatesSelect = $('#candidatesSelect');
        candidatesSelect.empty();
        
        var maxVoters = $("#maxVoters");
        //nilai max voters
        electionInstance.maxVoters().then(function(nilaiMax){
          maxVoters.empty();
          maxVoters.append("Maksimum voter : ",nilaiMax[`c`][0]);
        })  

        var curVoters = $("#curVoters");
        // nilai current voters
        electionInstance.curVoters().then(function(jumlahVote){
          curVoters.empty();
          curVoters.append("jumlah vote saat ini : ",jumlahVote[`c`][0]);
          // candidatesResults.empty();
          // candidatesSelect.empty();
        })
        
        var vote1 = $("#voteSatu");
        var vote2 = $("#voteDua");
        var vote3 = $("#voteTiga");
  
        vote1.empty()
        vote2.empty()
        vote3.empty()
        
        var height1 = $("#height1")
        var height2 = $("#height2")
        var height3 = $("#height3")
        var tinggi = 25;
        var a= 1;
        for (var i = 1; i <= candidatesCount; i++) {
          electionInstance.candidates(i).then(function(candidate) {
            var id = candidate[0];
            var name = candidate[1];
            //return array
            var voteCount = candidate[2];
            //return angka
            var jumlahVote = voteCount[`c`]
            // Render candidate Result

            // Render candidate Result
            // var candidateTemplate = "<tr><td>" + id + "</td><td>" + name + "</td><td>" + "</td><td>" + name + "</td><td>" + voteCount + "</td></tr>"
            if (id == 1) {
                var candidateTemplate = '<div class="col-md-6 col-lg-4"> <div class="card mx-30"> <img src="https://cdn1-production-images-kly.akamaized.net/P85Ddv6JF2FbVJeoCgCelmhtt4U=/640x360/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/1439641/original/042027300_1482131661-reddit.jpg" class="card-img-top" alt="..."> <div class="card-body"> <h5 class="card-title" style="text-align:center;">' + name + '</h5> <h6 style="text-align:center;"> Vote: ' + voteCount + '</h6> <p class="card-text"> Perwakilan dari desa Konoha <div class="socials"> </div> </div> </div> </div>'
                candidatesResults.append(candidateTemplate);
            } else {
                var candidateTemplate = '<div class="col-md-6 col-lg-4"> <div class="card mx-30"> <img src="https://cdn.idntimes.com/content-images/duniaku/post/20191008/naruto-sasuke-uchiha-kecil-be340da3b7c782e66836584d5940ea73.jpg" class="card-img-top" alt="..."> <div class="card-body"> <h5 class="card-title" style="text-align:center;">' + name + '</h5> <h6 style="text-align:center;"> Vote: ' + voteCount + '</h6> <p class="card-text">  Perwakilan dari kota Binjai <div class="socials"> </div> </div> </div> </div>'
                candidatesResults.append(candidateTemplate);
            }

            // Render candidate ballot option
            var candidateOption = "<option value='" + id + "' >" + name + "</ option>"
            candidatesSelect.append(candidateOption);
            // Append to specific graph
            if (a == 1) {
              vote1.append(jumlahVote)
              height1.css("height",tinggi*jumlahVote)
            } else if (a==2) {
              vote2.append(jumlahVote)
              height2.css("height",tinggi*jumlahVote)
            } else if (a==3){
              vote3.append(jumlahVote)
              height3.css("height",tinggi*jumlahVote)
          }
            a++;
  
          });
        }

        //Get last voter
        var voterList = $("#voterList");
        App.contracts.Election.deployed().then(function(instance) {
          instance.curVoters().then(function(jumlahVote){
            var jumlahVotes = jumlahVote[`c`][0];
            for (var i = 0; i < jumlahVotes; i++) {
              instance.voterList(i).then(function(list){
                voterList.append(list,"</br>");
              })
            }

          })
        })
        
       
        return electionInstance.voters(App.account);
      }).then(function(hasVoted) {
        // Do not allow a user to vote
        var maximumVoter = maxVoters.firstChild.nextSibling.data
        var totalVoter= curVoters.firstChild.nextSibling.data
        if(hasVoted|| maximumVoter == totalVoter) {
          $('form').hide();
        }
        loader.hide();
        content.show();
      }).catch(function(error) {
        console.warn(error);
      });
    },
  
    castVote: function() {
      var candidateId = $('#candidatesSelect').val();
      App.contracts.Election.deployed().then(function(instance) {
        return instance.vote(candidateId, { from: App.account });
      }).then(function(result) {
        // Wait for votes to update
        $("#content").hide();
        $("#loader").show();
      }).catch(function(err) {
        console.error(err);
      });
    }
  };
  
  $(function() {
    $(window).load(function() {
      App.init();
    });
  });
  